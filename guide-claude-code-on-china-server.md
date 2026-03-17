# 在中国大陆服务器上配置 Claude Code 指南

在无法直接访问外网的中国大陆服务器（含 Docker 容器）上使用 Claude Code。

## 原理

通过 SSH 远程端口转发，将服务器的流量经由本地代理（Clash）访问 Anthropic API。

```
Docker 容器 → 宿主机 (socat) → SSH 隧道 → 本地 Clash → Anthropic API
```

## 前置条件

- 本地有代理工具（如 Clash），监听 `127.0.0.1:7890`
- 服务器可通过 SSH 连接，且有 root 权限
- 服务器上已安装 Docker（如需在容器中使用）

## 配置步骤

### 第一步：本地 SSH Config 添加端口转发

编辑本地 `~/.ssh/config`，在目标服务器配置中加入 `RemoteForward`：

```
Host 你的服务器IP
  HostName 你的服务器IP
  User root
  RemoteForward 7890 127.0.0.1:7890
```

> 这样每次 SSH 连接时自动将服务器的 `127.0.0.1:7890` 转发到本地的 `127.0.0.1:7890`。

### 第二步：验证服务器端转发

确保本地 Clash 开启，然后 SSH 连接服务器：

```bash
ssh root@你的服务器IP
```

在服务器上设置代理并测试：

```bash
export http_proxy=http://127.0.0.1:7890
export https_proxy=http://127.0.0.1:7890
curl -I https://api.anthropic.com
```

返回 HTTP 状态码（如 404 或 403）说明转发成功。如果超时则检查本地 Clash 是否开启。

**如果不需要在 Docker 容器中使用，到这里就完成了。** 将环境变量写入 `~/.bashrc` 即可永久生效：

```bash
echo 'export http_proxy=http://127.0.0.1:7890' >> ~/.bashrc
echo 'export https_proxy=http://127.0.0.1:7890' >> ~/.bashrc
```

---

### 第三步：查看 Docker 网桥 IP（容器场景）

SSH 转发绑定在宿主机的 `127.0.0.1`，Docker 容器无法直接访问。需要通过 Docker 网桥 IP 中转。

```bash
ip addr show docker0
```

记下 `inet` 后面的 IP，例如 `172.18.0.1`。

### 第四步：安装 socat 并创建转发服务

socat 负责将 Docker 网桥上的流量转发到 `127.0.0.1`。

**安装 socat：**

```bash
# CentOS/RHEL
yum install socat -y

# Ubuntu/Debian
apt install socat -y
```

**创建 systemd 服务（将 `172.18.0.1` 替换为你的实际 Docker 网桥 IP）：**

用 `vi` 编辑 `/etc/systemd/system/socat-proxy.service`：

```bash
vi /etc/systemd/system/socat-proxy.service
```

写入以下内容：

```ini
[Unit]
Description=Socat proxy forwarder
After=network.target docker.service

[Service]
Type=simple
ExecStart=/usr/bin/socat TCP-LISTEN:7890,bind=172.18.0.1,fork,reuseaddr TCP:127.0.0.1:7890
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
```

> 注意：`ExecStart=` 后面的内容必须在同一行。

**启用并启动服务：**

```bash
systemctl daemon-reload && systemctl enable socat-proxy && systemctl start socat-proxy
```

**验证服务状态：**

```bash
systemctl status socat-proxy
```

显示 `active (running)` 即成功。该服务会开机自启、崩溃自动重启。

### 第五步：为 Docker 容器设置代理环境变量

将 `172.18.0.1` 替换为你的实际 Docker 网桥 IP：

```bash
for c in 容器名1 容器名2 容器名3; do docker exec $c bash -c "echo 'export http_proxy=http://172.18.0.1:7890' >> ~/.bashrc && echo 'export https_proxy=http://172.18.0.1:7890' >> ~/.bashrc"; done
```

### 第六步：验证容器网络

```bash
docker exec -it 容器名 bash -c "curl -I https://api.anthropic.com"
```

返回 HTTP 状态码即成功。之后在容器中安装 Claude Code CLI 即可使用。

---

## 日常使用

每次使用只需：

1. 本地打开 Clash
2. `ssh root@你的服务器IP`（端口转发自动生效）
3. 进入容器，直接使用 `claude`

## 注意事项

- **本地 Clash 必须保持开启**，否则整条链路断开
- 如果服务器重启，socat 服务会自动启动，容器中的环境变量也会保留
- 如果新增了 Docker 容器，需要为新容器重新执行第五步
- 如果 Docker 网桥 IP 变化（极少发生），需要更新 socat 服务和容器中的环境变量
- 本地代理端口如果不是 7890，需要将文中所有 `7890` 替换为你的实际端口
