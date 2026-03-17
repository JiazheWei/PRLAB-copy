# 🚀 实验室成员管理自动化系统

## ✨ 已完成的设置

### 1. 文件清理
✅ 删除了 `people/` 目录下的旧示例文件
✅ 保留了文档文件（`README.md`, `HOW_TO_ADD_MEMBER.md`）

### 2. 自动化脚本
✅ 创建了 `generate_members_data.py` - 自动将 MD 文件转换为 JS

### 3. Git Hook
✅ 配置了 `.git/hooks/pre-commit` - 提交时自动更新成员数据

### 4. 示例文件
✅ 创建了 `people/liken.md` - Ken Li 的示例数据

## 🎯 使用流程

### 添加新成员的完整流程：

```bash
# 1. 创建成员的 MD 文件
# 在 people/ 目录下创建，例如：people/zhangsan.md

# 2. 编辑 MD 文件，填写信息
---
name: Zhang San
title: Ph.D. Student
period: 2025.09~Present
photo: ./assets/img/people/zhangsan.jpg
homepage: https://zhangsan.com
google_scholar: https://scholar.google.com/citations?user=xxx
email: zhangsan@example.com
github: https://github.com/zhangsan
order: 2
---

# 3. 提交到 Git（Hook 会自动运行）
git add people/zhangsan.md
git commit -m "Add new member: Zhang San"

# 完成！members-data.js 会自动更新
```

## 🔧 如何验证自动化是否工作

### 测试 1：手动运行脚本
```bash
python generate_members_data.py
```
应该看到输出：
```
🔄 Generating members-data.js from markdown files...
✓ Processed: liken.md -> phd_students
✓ Generated: assets\js\members-data.js
📊 Statistics:
   - phd_students: 1 member(s)
   Total: 1 member(s)
✅ Done!
```

### 测试 2：验证生成的数据
打开 `assets/js/members-data.js`，应该能看到 Ken Li 的信息

### 测试 3：在浏览器中查看
打开 `people.html`，应该能看到 Ken Li 的卡片显示

## ⚠️ Windows 用户注意事项

Git Hook 在 Windows 上可能需要额外配置。如果 hook 不自动运行：

### 方案 A：手动运行后提交
```bash
python generate_members_data.py
git add assets/js/members-data.js people/xxx.md
git commit -m "Update members"
```

### 方案 B：使用 Git Bash
在 Git Bash 中添加执行权限：
```bash
chmod +x .git/hooks/pre-commit
```

### 方案 C：创建批处理脚本
创建 `update_members.bat`：
```batch
@echo off
python generate_members_data.py
if %ERRORLEVEL% EQU 0 (
    echo ✅ Members data updated successfully
) else (
    echo ❌ Error updating members data
)
```

使用：
```bash
update_members.bat
git add .
git commit -m "Update members"
```

## 📁 项目文件结构

```
PRLab-Website/
├── people/                          # 成员 MD 文件目录
│   ├── liken.md                    # Ken Li 的信息
│   ├── README.md                   # 说明文档
│   └── HOW_TO_ADD_MEMBER.md       # 添加成员指南
├── assets/
│   ├── js/
│   │   ├── members-data.js         # 自动生成的成员数据
│   │   └── members.js              # 渲染逻辑
│   └── img/
│       └── people/                 # 成员照片目录
│           └── liken.jpg
├── .git/
│   └── hooks/
│       └── pre-commit              # Git Hook 脚本
├── generate_members_data.py        # 转换脚本
├── people.html                     # 成员页面
├── SETUP_HOOKS.md                  # Hook 设置说明
└── README_AUTOMATION.md           # 本文件
```

## 🎨 支持的成员类型

根据 `title` 字段自动分类：

| Title 关键词 | 分类 | 示例 |
|-------------|------|------|
| Ph.D. / PhD | phd_students | "Ph.D. Student" |
| Master | master_students | "Master Student" |
| Intern | research_interns | "Research Intern" |
| Visiting / Visitor | visiting_scholars | "Visiting Scholar" |

## 📞 问题排查

### 问题 1：脚本运行报错
```bash
# 检查 Python 版本（需要 Python 3.6+）
python --version

# 检查文件编码（应该是 UTF-8）
```

### 问题 2：生成的数据不正确
- 检查 MD 文件的 YAML 格式是否正确
- 确保有 `---` 包裹的 front matter
- 字段名和值之间要有冒号和空格

### 问题 3：页面不显示
- 确保 `people.html` 引入了 `members-data.js`
- 清除浏览器缓存
- 打开浏览器控制台查看错误信息

## 🎉 完成！

现在你的实验室网站已经具备自动化的成员管理功能了！

每次添加或修改成员信息，只需：
1. 编辑 MD 文件
2. 提交到 Git
3. Hook 自动更新数据
4. 刷新网页查看

简单、高效、不容易出错！🚀

