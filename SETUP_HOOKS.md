# Git Hooks 自动化设置说明

## 🎯 功能说明

本项目已配置 Git pre-commit hook，当你提交包含 `people/` 目录下 `.md` 文件的修改时，会自动：
1. 运行 `generate_members_data.py` 脚本
2. 更新 `assets/js/members-data.js` 文件
3. 将更新后的文件添加到本次提交中

## ✅ 验证 Hook 是否启用

运行以下命令检查 hook 文件是否存在：

```bash
# Windows (PowerShell)
dir .git\hooks\pre-commit

# Linux/Mac
ls -la .git/hooks/pre-commit
```

## 🔧 Windows 用户额外设置

由于 Windows 默认不支持 shell 脚本，你需要确保 Git 可以执行 hook：

### 方法一：使用 Git Bash（推荐）
在 Git Bash 中给 hook 文件添加执行权限：
```bash
chmod +x .git/hooks/pre-commit
```

### 方法二：如果上面的方法不行
你可以手动运行脚本后再提交：
```bash
python generate_members_data.py
git add assets/js/members-data.js
git commit -m "Update members"
```

## 📝 如何添加新成员

1. 在 `people/` 目录下创建新的 `.md` 文件（例如：`zhangsan.md`）
2. 填写成员信息（YAML front matter 格式）：

```yaml
---
name: Zhang San
title: Master Student
period: 2025.09~Present
photo: ./assets/img/people/zhangsan.jpg
homepage: https://zhangsan.com
google_scholar: https://scholar.google.com/citations?user=xxx
email: zhangsan@example.com
github: https://github.com/zhangsan
order: 2
---
```

3. 提交更改：
```bash
git add people/zhangsan.md
git commit -m "Add new member: Zhang San"
```

4. Hook 会自动运行，更新 `members-data.js`

## 🔄 手动更新

如果你想手动测试或更新，直接运行：

```bash
python generate_members_data.py
```

## 📋 字段说明

| 字段 | 必填 | 说明 | 示例 |
|------|------|------|------|
| name | ✅ | 成员姓名 | "Ken Li" |
| title | ✅ | 职位/身份 | "Ph.D. Student" / "Master Student" / "Research Intern" / "Visiting Scholar" |
| period | ✅ | 在职时间 | "2025.09~Present" |
| photo | ✅ | 照片路径 | "./assets/img/people/liken.jpg" |
| homepage | ❌ | 个人主页 | "https://example.com" |
| google_scholar | ❌ | Google Scholar | "https://scholar.google.com/citations?user=xxx" |
| email | ❌ | 邮箱 | "example@mail.com" |
| github | ❌ | GitHub | "https://github.com/username" |
| co_supervised | ❌ | 联合指导 | "Co. w. Prof. Name" |
| order | ❌ | 排序顺序 | 1, 2, 3... (越小越靠前) |

## 🎨 成员分类

脚本会根据 `title` 字段自动分类：
- 包含 "Ph.D." 或 "PhD" → `phd_students`
- 包含 "Master" → `master_students`
- 包含 "Intern" → `research_interns`
- 包含 "Visiting" → `visiting_scholars`

## ⚠️ 注意事项

1. Markdown 文件必须包含 YAML front matter（`---` 包裹的部分）
2. 照片文件需要提前放置到 `assets/img/people/` 目录
3. 空字段可以留空，但不要删除字段名
4. 文档文件（`README.md`, `HOW_TO_ADD_MEMBER.md`）不会被处理

