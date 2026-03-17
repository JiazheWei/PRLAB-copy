# PRLab 实验室主页重构指引文档

> 目标：将现有多页面实验室网站重构为单页长滚动布局，参考 [zhanglinfeng.tech](http://www.zhanglinfeng.tech/) 的结构组织，采用 [MMLab@NTU](https://www.mmlab-ntu.com/team.html) 的色调与文案风格。

---

## 一、参考网站分析

### 1.1 zhanglinfeng.tech —— 结构参考

#### 整体架构
- **单页长滚动（Single-Page Long Scroll）**：所有内容集成在一个 HTML 文件中，通过锚点导航在各 Section 间跳转。
- **吸顶导航栏（Sticky Navbar）**：始终固定在顶部，左侧展示实验室名称，右侧为各 Section 锚点链接，滚动时高亮当前所在 Section。

#### 页面 Section 顺序

| 顺序 | Section | 内容描述 |
|------|---------|----------|
| 1 | **Hero（PI 个人卡片）** | PI 头像、姓名、职称、单位、邮箱、地址、社交链接（Google Scholar / GitHub / Twitter）、核心统计数字（论文数、引用数、成员数） |
| 2 | **About Me（关于我）** | PI 个人简历段落 + 学术服务（担任的 Area Chair、Reviewer 等） |
| 3 | **Research Directions（研究方向）** | 卡片式网格，每张卡片含图标、方向标题、简短描述（3-5 个研究方向） |
| 4 | **Recent News（最新动态）** | 时间线列表，按时间倒序，含日期标签、事件描述、相关链接（论文/GitHub），末尾有"查看全部"按钮 |
| 5 | **Lab Members（实验室成员）** | PI 卡片（大）+ 学生/成员卡片网格（含头像、姓名、研究方向简介、实习/合作经历、个人主页链接） |
| 6 | **Publications（论文）** | 按年份折叠分组，每条包含论文标题、作者（实验室成员加粗）、会议/期刊名称、[PDF] [项目页] 链接 |
| 7 | **Partners（合作伙伴）** | 企业/机构 Logo 横向排列 |
| 8 | **Footer** | 版权信息、联系邮箱 |

#### 视觉风格关键点
- 主题色：深海军蓝（`#003366`）作为标题/强调色，蓝色系渐变
- 导航链接 hover 效果：下划线动画
- Section 标题：左对齐大字 + 分割线（`<hr>`）
- 统计数字模块：大号数字 + 描述文字，横向排列
- Research 卡片：圆角白色卡片 + 轻微阴影，hover 上浮效果
- 成员卡片：正方形/圆形头像，卡片底部有社交链接

---

### 1.2 MMLab@NTU —— 色调与文案风格参考

#### 色调系统

| 用途 | 颜色 | 说明 |
|------|------|------|
| 页面背景 | `#FFFFFF` / `#F7F8FA` | 纯白或极浅灰，干净简洁 |
| 主文字 | `#1A1A2E` / `#2D3142` | 深色近黑，阅读舒适 |
| 品牌主色（深蓝绿） | `#1B4F72` / `#154360` | 深蓝色，用于 Section 标题、强调文字 |
| 辅助强调色 | `#2E86AB` / `#1A6B8A` | 中蓝色，用于链接、按钮、徽章 |
| 轻描边/分割线 | `#E8ECF0` | 极浅灰蓝 |
| 卡片背景 | `#FFFFFF` + `box-shadow: 0 2px 12px rgba(0,0,0,0.06)` | 白卡片 + 轻阴影 |
| Tag / Badge | `#EBF5FB` 背景 + `#1A6B8A` 文字 | 浅蓝底深蓝字 |

> **核心原则**：去掉现有橙色（`#e77e38`）辅助色，整体换成蓝色系；背景保持白/浅灰，干净学术感。

#### 文案风格

- **语言**：全英文（与当前保持一致），行文简洁、专业，避免夸张措辞
- **PI 简介**：第三人称（"Professor X is a ..."），凸显学历背景、学术成就、研究兴趣
- **成员简介**：3-4 句，介绍学历来源、研究方向，可提及知名导师/合作机构
- **Research 卡片**：标题精炼（3-6 字），描述 2-3 句，突出技术意义与应用价值
- **News 条目**：时间 + 事件，语气正式积极（"X papers were accepted by CVPR 2026. Congratulations!"）
- **Alumni 区**：格式统一（姓名 | 毕业年份 | 去向）
- **Join Us**：结尾用一句有感召力的话 + 邮件联系方式

---

## 二、当前网站结构分析

### 现有文件清单

```
PRLab-Website/
├── index.html          # PI 个人介绍页（Biography + Academic Services）
├── publications.html   # 论文列表页
├── people.html         # 实验室成员页
├── openings.html       # 招生/职位页
└── assets/
    ├── css/            # Bootstrap + 自定义样式
    ├── js/             # jQuery + members-data.js（成员数据）
    └── img/            # 论文图片 + 成员头像
```

### 各页内容梳理

| 文件 | 核心内容 |
|------|----------|
| `index.html` | PI 头像、姓名职称、联系方式、Biography 段落、学术服务（AC/Reviewer） |
| `publications.html` | 完整论文列表，按年份折叠，含缩略图、标题、作者、会议、链接 |
| `people.html` | 成员卡片（依赖 `members-data.js` 动态渲染），含 PI + 学生分组 |
| `openings.html` | 招聘信息，博士生/研究生/博后招募说明 |

### 现有问题

1. **多页割裂**：用户在页面间跳转，体验不连贯
2. **色调混杂**：当前使用海军蓝（`#003366`）+ 橙色（`#e77e38`），整体不够统一协调
3. **信息层级不清**：各页面独立设计，视觉语言略有差异
4. **缺少 News 模块**：当前无最新动态展示
5. **缺少 Partners 模块**：无合作机构展示

---

## 三、重构方案

### 3.1 总体策略

- 将所有子页面内容 **合并到单一 `index.html`**
- 保留 `members-data.js` 数据驱动的成员渲染方式（减少维护成本）
- 导航改为**锚点跳转**，并添加**滚动高亮**（ScrollSpy）效果
- 去掉 `publications.html`、`people.html`、`openings.html`，原链接重定向到首页对应锚点
- 色调系统完整替换为蓝色系（参见 §1.2）

### 3.2 重构后 Section 规划

```
#home           ← Hero（PI 卡片 + 统计数字）
#about          ← About / Biography + Academic Services
#research       ← Research Directions（卡片网格）
#news           ← Recent News（时间线）
#members        ← Lab Members（PI + 学生分组）
#publications   ← Publications（年份折叠）
#openings       ← Join Us / Openings
#partners       ← Partners / Collaborators（可选）
                ← Footer
```

### 3.3 导航栏设计

```
[PRLab · Nanjing University]    About  Research  News  Members  Publications  Join Us
```

- 左侧：实验室简称 + 学校名（点击回顶部）
- 右侧：Section 锚点链接，当前 Section 对应链接高亮
- 背景：白色半透明 + `backdrop-filter: blur(10px)`
- 阴影：`box-shadow: 0 2px 8px rgba(0,0,0,0.06)`

---

## 四、各 Section 详细设计规范

### 4.1 Hero Section（#home）

**布局**：两栏，左文右图

```
┌─────────────────────────────────────────────────────┐
│  [Lab Logo / 实验室名称]                             │
│                                                     │
│  Chenyang Si                    [圆形头像]           │
│  Associate Professor                                │
│  School of Intelligence Science and Technology      │
│  Nanjing University                                 │
│                                                     │
│  📧 chenyang.si@nju.edu.cn                          │
│  📍 Nanjing University Suzhou Campus, ...           │
│                                                     │
│  [Scholar] [GitHub] [Twitter/X]                     │
│                                                     │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐             │
│  │  XX+    │  │ XXXX+   │  │  XX+    │             │
│  │ Papers  │  │Citations│  │ Members │             │
│  └─────────┘  └─────────┘  └─────────┘             │
└─────────────────────────────────────────────────────┘
```

**样式**：
- 背景：白色或极浅蓝灰渐变（`linear-gradient(135deg, #F0F4F8, #FFFFFF)`）
- PI 姓名：`font-size: 2.8rem; font-weight: 800; color: #1B3A5C`
- 职称：`color: #2E86AB; font-weight: 600`
- 统计模块：卡片式，数字 `font-size: 2rem; color: #1B3A5C; font-weight: 700`

---

### 4.2 About Section（#about）

**布局**：全宽单栏

- **Biography** 子段：2-3 段，第三人称，介绍学历背景、研究经历、研究兴趣
- **Academic Services** 子段：可用卡片/标签组呈现 Area Chair 职责和期刊审稿

```
About
─────────────────────────────────────────
  [Biography 段落文字]

  Academic Services
  ├── Area Chair: NeurIPS, CVPR, ICCV ...
  └── Reviewer: TPAMI, IJCV, ...
```

---

### 4.3 Research Directions Section（#research）

**布局**：3 列网格（桌面端），1 列（移动端）

```
Research Directions
─────────────────────────────────────────
  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
  │  🔷 图标    │  │  🔷 图标   │  │  🔷 图标    │
  │  方向标题   │  │  方向标题  │  │  方向标题   │
  │             │  │            │  │             │
  │  两三行简介 │  │  两三行简介│  │  两三行简介 │
  └─────────────┘  └─────────────┘  └─────────────┘
  ┌─────────────┐  ┌─────────────┐
  │  ...        │  │  ...       │
  └─────────────┘  └─────────────┘
```

**建议研究方向（根据 PI 实际方向填写）**：
- Visual Understanding（视觉理解）
- Video Generation（视频生成）
- Generative Models（生成模型）
- Efficient AI（高效 AI）
- Multimodal Learning（多模态学习）

**样式**：
- 卡片：白色背景、`border-radius: 12px`、轻阴影、hover 上浮 `transform: translateY(-4px)`
- 图标颜色：`#2E86AB`
- 卡片顶部细线装饰：`border-top: 3px solid #2E86AB`

---

### 4.4 Recent News Section（#news）

**布局**：时间线列表

```
Recent News
─────────────────────────────────────────
  Feb 2026  ● X papers were accepted by CVPR 2026. Congratulations!
  Jan 2026  ● Paper "XXX" was accepted by ICLR 2026. [PDF] [Project]
  Dec 2025  ● Welcome [name] to join PRLab!
  ...
  
                    [ View All News ↓ ]
```

**样式**：
- 日期标签：`background: #EBF5FB; color: #1A6B8A; border-radius: 4px; padding: 2px 8px`
- 圆点：`#2E86AB`
- 默认展示最近 5 条，其余折叠（用 JS 控制）

---

### 4.5 Lab Members Section（#members）

**布局**：

1. **PI 卡片**（全宽横版）：头像（左）+ 详细简介（右）+ 研究兴趣标签
2. **成员分组**：
   - PhD Students（在读博士）
   - Master Students（在读硕士）
   - Research Interns（科研实习生）
   - Alumni（毕业去向）

每个成员卡片：
```
┌──────────────────────┐
│  [头像]              │
│  姓名                │
│  研究方向            │
│  [个人主页链接]      │
└──────────────────────┘
```

**样式（参考 MMLab 风格）**：
- 分组标题：`font-size: 1.1rem; color: #1B3A5C; text-transform: uppercase; letter-spacing: 0.05em`
- 成员卡片：白底圆角，hover 轻阴影加深
- 头像：圆形，`80px × 80px`（小卡）或 `100px × 100px`
- Alumni 区：表格形式（姓名 | 角色 | 毕业年份 | 去向）

---

### 4.6 Publications Section（#publications）

**布局**：按年份折叠分组，默认展开最近两年

```
Publications
─────────────────────────────────────────
  ▼ 2025 (12 papers)
  ┌────────────────────────────────────────────────────┐
  │ [论文缩略图]  Title of Paper                       │
  │               Author1, **Chenyang Si**, Author3   │
  │               CVPR 2025 (CCF-A)                   │
  │               [PDF] [Project] [Code]              │
  └────────────────────────────────────────────────────┘
  ...

  ▶ 2024 (8 papers)   ← 折叠状态
  ▶ 2023 (5 papers)   ← 折叠状态
```

**保留现有功能**：
- 论文缩略图（`.webp` 格式，现有图片资源不变）
- 年份折叠（`<details>` 或 Bootstrap collapse）
- 链接按钮（PDF / Project / Code / arXiv）

---

### 4.7 Join Us Section（#openings）

**布局**：简洁说明 + 联系方式

```
Join Us
─────────────────────────────────────────
  We are always looking for highly motivated students and researchers
  to join PRLab. We welcome applications from PhD students, Master's
  students, and Research Interns.

  📧 To apply: chenyang.si@nju.edu.cn

  Please include your CV and a brief statement of research interests.

  [ Learn More about Openings ]  ← 可展开详细说明
```

---

### 4.8 Partners Section（#partners）（可选）

**布局**：Logo 横向排列，灰度处理，hover 变彩色

合作机构建议包括：NTU、Sea AI Lab、CASIA 等 PI 有合作关系的机构/企业。

---

### 4.9 Footer

```
────────────────────────────────────────────────────────
  © 2025 PRLab · Nanjing University · chenyang.si@nju.edu.cn
  Designed with ♥ by PRLab
────────────────────────────────────────────────────────
```

---

## 五、技术实现要点

### 5.1 文件结构（重构后）

```
PRLab-Website/
├── index.html              # 唯一主页（合并所有 Section）
├── assets/
│   ├── css/
│   │   ├── bootstrap.min.css
│   │   ├── bootstrap-icons.min.css
│   │   ├── google-fonts.min.css
│   │   └── style.css       # 统一新样式（替换旧样式）
│   ├── js/
│   │   ├── jquery-3.3.1.min.js
│   │   ├── bootstrap.min.js
│   │   ├── members-data.js # 成员数据（保留）
│   │   └── main.js         # 新增：滚动高亮、新闻折叠等交互
│   └── img/                # 现有图片资源（保留）
```

### 5.2 颜色变量定义（CSS Custom Properties）

```css
:root {
  --color-primary:       #1B3A5C;   /* 深海蓝，标题/强调 */
  --color-accent:        #2E86AB;   /* 中蓝，链接/按钮/图标 */
  --color-accent-light:  #EBF5FB;   /* 浅蓝，Badge/Tag 背景 */
  --color-text-main:     #2D3142;   /* 主要正文 */
  --color-text-sub:      #5A6475;   /* 次要文字/说明 */
  --color-bg-page:       #F7F9FC;   /* 页面背景 */
  --color-bg-card:       #FFFFFF;   /* 卡片背景 */
  --color-border:        #E4EAF0;   /* 分割线/边框 */
  --shadow-card:         0 2px 12px rgba(30, 70, 110, 0.08);
  --shadow-card-hover:   0 6px 24px rgba(30, 70, 110, 0.14);
  --radius-card:         12px;
}
```

### 5.3 导航 ScrollSpy 逻辑（JS）

```javascript
// 监听滚动，高亮当前 Section 对应的导航链接
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#navigation a[href^="#"]');
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 80) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});
```

### 5.4 响应式断点规划

| 断点 | 布局变化 |
|------|----------|
| `≥ 1200px` | Research 卡片 3 列，Members 4 列 |
| `992px–1199px` | Research 卡片 3 列，Members 3 列 |
| `768px–991px` | Research 卡片 2 列，Members 2 列，Hero 文图上下排 |
| `< 768px` | 全部 1 列，导航折叠为 Hamburger |

---

## 六、重构工作流程建议

1. **[ ] 确认内容**：整理 PI 最新简介、研究方向、News 列表、成员数据、论文列表
2. **[ ] 设计系统**：按 §5.2 定义 CSS 变量，更新 `style.css`
3. **[ ] 搭建骨架**：在 `index.html` 中建立所有 Section 的 HTML 结构（空内容）
4. **[ ] Hero Section**：迁移并重新样式化 PI 信息
5. **[ ] About Section**：迁移 Biography + Academic Services
6. **[ ] Research Section**：新建研究方向卡片
7. **[ ] News Section**：新建，填入最新动态
8. **[ ] Members Section**：迁移 `people.html` 内容，复用 `members-data.js`
9. **[ ] Publications Section**：迁移 `publications.html` 内容
10. **[ ] Openings Section**：迁移 `openings.html` 内容
11. **[ ] Footer + ScrollSpy**：完善交互逻辑
12. **[ ] 响应式调试**：移动端测试

---

## 七、注意事项

- **成员数据**：`members-data.js` 中的数据结构保持不变，便于未来自动化更新
- **图片资源**：`assets/img/` 下的论文缩略图和成员头像无需改动
- **旧页面**：`publications.html`、`people.html`、`openings.html` 可保留但添加 redirect 到 `index.html` 对应锚点（避免外部链接失效）
- **SEO**：单页设计下，注意在各 Section 添加语义化 HTML5 标签（`<section>`、`<article>`、`<header>` 等）
- **性能**：论文列表较长，可对 Publications Section 非当前年份实现懒加载（Intersection Observer）
