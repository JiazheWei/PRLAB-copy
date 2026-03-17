# 对话记录：在中国大陆服务器上配置 Claude Code

**日期：** 2026-03-03

---

## 背景

用户希望在一台位于中国大陆、无法直接访问外网的服务器上使用 Claude Code。服务器通过 SSH 连接，服务器上运行了多个 Docker 容器。

---

## 对话内容

### 1. 检查 VS Code 设置

**用户：** 请你看下 VS Code 的 settings.json 中有没有 `remote.extensionKind` 相关配置，强制插件走本地网络？

**Claude：** 检查了项目目录和 VS Code 全局用户设置文件 `C:\Users\wjz\AppData\Roaming\Code\User\settings.json`，没有找到 `remote.extensionKind` 配置。当前设置只有：
- `remote.SSH.remotePlatform`
- `remote.SSH.defaultExtensions`
- `python.defaultInterpreterPath`

---

### 2. 讨论方案

**用户：** 我想在连接一台中国大陆的服务器后依然使用 Claude Code，能不能通过 SSH 将服务器的流量转发到本地代理？

**Claude：** 提出两个方案：

**方案一：`remote.extensionKind`（强制插件本地运行）**
- 在 VS Code 设置中加 `"remote.extensionKind": { "anthropic.claude-code": ["ui"] }`
- 优点：配置简单，一行搞定
- 缺点：只能在 VS Code 插件里用，不能在服务器终端里用 `claude` CLI

**方案二：SSH 端口转发**
- 用 SSH `-R` 参数将本地代理端口转发到服务器
- 优点：服务器上完全像有网一样，CLI 也能用
- 缺点：依赖本地代理持续运行

---

### 3. 确认代理端口

**用户：** 本地代理用 Clash，用 `$Env:http_proxy="http://127.0.0.1:7890"` 挂代理，端口是 7890 吗？

**Claude：** 确认代理端口是 **7890**，协议是 **HTTP**。

---

### 4. 讨论 Dev Container 兼容性

**用户：** 连接服务器后如果用 Dev Container 插件进不同的 container，SSH 流量转发还能行吗？

**Claude：** 不能直接用。SSH `-R` 转发绑定在服务器的 `127.0.0.1:7890`，但 Docker 容器内的 `127.0.0.1` 是容器自己，不是宿主机。

提出两种解决思路：
- **思路 A：** 容器使用 `--network=host`（最简单）
- **思路 B：** 通过 Docker 网关访问宿主机（需要改 sshd 配置）

---

### 5. 方案一尝试与回退

**用户：** 先按方案一配置。

**Claude：** 在 `settings.json` 中添加了 `remote.extensionKind` 配置。

**用户：** 方案一不太行，请复原 settings.json。

**Claude：** 已复原 settings.json。

---

### 6. 配置方案二

**用户：** 连接服务器用 `ssh root@124.222.87.186`，按思路 A 配置。

**Claude：** 检查了 SSH config 文件，发现有两个重复的 `124.222.87.186` 条目。合并并添加了 `RemoteForward 7890 127.0.0.1:7890`。

---

### 7. 验证服务器端转发

**用户：** 在服务器上执行 `curl -I https://api.anthropic.com` 返回了 HTTP 状态码。

**Claude：** 确认 SSH 端口转发成功。

---

### 8. 处理 Docker 容器网络

**用户：** 服务器上有 5 个容器：pixart, instruct2p2, openai, creatidesign, workspace。

**Claude：** 由于容器已在运行，不能直接加 `--network=host`。改用 socat 做端口转发。

首先测试容器通过 `172.17.0.1:7890` 访问，超时失败。

检查 Docker 网桥 IP，发现实际是 `172.18.0.1`（不是默认的 `172.17.0.1`）。

---

### 9. 安装和配置 socat

**用户：** 服务器没有 `apt`。

**Claude：** 建议用 `yum install socat -y`，安装成功。

执行 socat 绑定 `172.18.0.1:7890` 成功。

验证容器通过 `172.18.0.1:7890` 访问 Anthropic API 成功：
```
docker exec pixart curl -I --proxy http://172.18.0.1:7890 https://api.anthropic.com
```
返回 HTTP/1.1 200 Connection established。

---

### 10. 为所有容器设置代理环境变量

执行命令为所有容器写入 `.bashrc`：
```bash
for c in pixart instruct2p2 openai creatidesign workspace; do docker exec $c bash -c "echo 'export http_proxy=http://172.18.0.1:7890' >> ~/.bashrc && echo 'export https_proxy=http://172.18.0.1:7890' >> ~/.bashrc"; done
```

---

### 11. 将 socat 做成系统服务

遇到多次粘贴多行命令的问题，最终通过 `vi` 手动编辑 `/etc/systemd/system/socat-proxy.service` 文件。

服务文件内容：
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

启用服务：
```bash
systemctl daemon-reload && systemctl enable socat-proxy && systemctl start socat-proxy
```

输出 `Created symlink`，确认服务正常启动并设为开机自启。

---

### 12. 最终验证

在容器内验证：
```bash
docker exec -it pixart bash -c "curl -I https://api.anthropic.com"
```
返回 HTTP/2 403，确认网络已通（403 是因为没带 API key，说明请求成功到达 Anthropic 服务器）。

---

### 13. 最终结论

配置完成。每次使用只需：
1. 本地 Clash 开着
2. 用 `ssh root@124.222.87.186` 连接（自动转发）
3. 进容器直接用 `claude`

已永久配好的内容：
- 本地 SSH config — 自动 RemoteForward
- 服务器 socat 服务 — 开机自启
- 容器 `.bashrc` — 自动加载代理环境变量

流量链路：
```
容器 → 172.18.0.1:7890 (socat) → 127.0.0.1:7890 (SSH转发) → 本地 Clash:7890 → Anthropic API
```
