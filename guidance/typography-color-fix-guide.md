# 字体大小、颜色对比度与主题色调优化指南

> 本文档涵盖两部分：  
> **Part 1** — 将网站整体主题色从「蓝色系」切换为「红色系」（以 `#F42738` 为核心色）  
> **Part 2** — 修复正文颜色过淡、部分字体偏小、标题层次感不足的问题  
> 参考标准：[zhanglinfeng.tech](http://www.zhanglinfeng.tech/) 和 [MMLab@NTU](https://www.mmlab-ntu.com/research.html)  
> 所有修改均在 `index.html` 的 `<style>` 块中完成，无需改动 HTML 结构。

---

## ⚠️ 关于 `#F42738` 的对比度说明

用户希望使用 `#F42738`（鲜红色）作为主色调。  
在正式修改前，需要了解其在不同场景的对比度表现：

| 背景色 | 文字颜色 | WCAG 对比度 | 评级 | 适用场景 |
|--------|---------|------------|------|---------|
| 白色 `#FFFFFF` | `#F42738` | **~4.05:1** | AA（仅大字） | ❌ 不能用于正文，✅ 可用于装饰/图标/边框 |
| 白色 `#FFFFFF` | `#9C0011`（深红）| **~8.75:1** | AAA | ✅ 标题、Section 名称 |
| 白色 `#FFFFFF` | `#CC0020`（中红）| **~5.9:1** | AA | ✅ 大号字体标题、按钮文字 |
| 深红 `#9C0011` | 白色 `#FFFFFF` | **~8.75:1** | AAA | ✅ 按钮白文字 |
| `#F42738` | 白色 `#FFFFFF` | **~4.05:1** | AA（仅大字）| ✅ 按钮白文字（大字场景） |

**结论：**
- `#F42738` 不适合作为白底上的**文字颜色**（正文、作者名等），但非常适合作为**边框、图标、按钮背景、装饰线**等视觉元素的颜色
- 标题颜色应使用深红 `#9C0011`（对比度 8.75:1，AAA 级）
- 悬停状态可用 `#CC0020`

---

## Part 1：主题色从蓝色系切换为红色系

### 1.1 新的颜色变量系统设计

**完整的红色系调色盘：**

```css
/* 修改前（蓝色系） */
:root {
    --color-primary:      #1B3A5C;
    --color-accent:       #2E86AB;
    --color-accent-light: #EBF5FB;
    --color-text-main:    #2D3142;
    --color-text-sub:     #5A6475;
    --color-bg-page:      #F7F9FC;
    --color-bg-card:      #FFFFFF;
    --color-border:       #E4EAF0;
    --color-footer-bg:    #1B3A5C;
    /* text-body 变量不存在（本次新增） */
}

/* 修改后（红色系） */
:root {
    --color-primary:      #9C0011;   /* 深红：Section 标题、Logo、强调标题 */
    --color-accent:       #F42738;   /* 鲜红：边框装饰线、图标、Badge 边框 */
    --color-accent-dark:  #CC0020;   /* 中深红：按钮 hover、active 状态 */
    --color-accent-light: #FFE8EB;   /* 浅粉红：Tag/Badge 背景、卡片顶部装饰 */
    --color-text-main:    #1C1014;   /* 深暖黑：最大标题（PI 姓名、Year 折叠标题）*/
    --color-text-body:    #2D2225;   /* 深暖灰：正文段落（新增变量）*/
    --color-text-sub:     #5C4B4E;   /* 中暖灰：日期标注、次要说明 */
    --color-bg-page:      #FAF8F9;   /* 极浅暖白：页面背景 */
    --color-bg-card:      #FFFFFF;   /* 纯白：卡片背景 */
    --color-border:       #EDE3E5;   /* 暖粉边框：卡片、分割线 */
    --color-footer-bg:    #1C1014;   /* 深暖黑：Footer 背景 */
    --shadow-card:        0 2px 12px rgba(156,0,17,0.07);
    --shadow-card-hover:  0 6px 24px rgba(156,0,17,0.14);
    --radius-card:        12px;
}
```

**颜色替换对照表：**

| 旧变量/颜色 | 蓝色值 | 新变量/颜色 | 红色值 |
|------------|--------|------------|--------|
| `--color-primary` | `#1B3A5C` | `--color-primary` | `#9C0011` |
| `--color-accent` | `#2E86AB` | `--color-accent` | `#F42738` |
| （无）| — | `--color-accent-dark` | `#CC0020` |
| `--color-accent-light` | `#EBF5FB` | `--color-accent-light` | `#FFE8EB` |
| `--color-text-main` | `#2D3142` | `--color-text-main` | `#1C1014` |
| （无）| — | `--color-text-body` | `#2D2225` |
| `--color-text-sub` | `#5A6475` | `--color-text-sub` | `#5C4B4E` |
| `--color-bg-page` | `#F7F9FC` | `--color-bg-page` | `#FAF8F9` |
| `--color-border` | `#E4EAF0` | `--color-border` | `#EDE3E5` |
| `--color-footer-bg` | `#1B3A5C` | `--color-footer-bg` | `#1C1014` |

---

### 1.2 主题色替换：Navbar

**位置：** `#logo a`、`#logo span`、`#navigation a`、`#navigation a:hover`、`#navigation .active a`、`#navigation a::after`

```css
/* 修改前 */
#logo a { color: var(--color-primary); }   /* #1B3A5C 蓝 */
#logo span { color: var(--color-accent); } /* #2E86AB 蓝 */
#navigation a { color: var(--color-text-sub); }
#navigation a:hover,
#navigation .active a {
    color: var(--color-accent);            /* #2E86AB 蓝 */
    background: var(--color-accent-light); /* #EBF5FB 浅蓝 */
}
#navigation a::after { background: var(--color-accent); } /* 蓝色下划线 */

/* 修改后 */
/* 只需将 :root 的变量值更新，这几条规则无需修改 CSS 选择器 */
/* var(--color-primary) 现在是 #9C0011（深红）*/
/* var(--color-accent) 现在是 #F42738（鲜红）*/
/* var(--color-accent-light) 现在是 #FFE8EB（浅粉）*/
```

> ✅ Navbar 无需修改 CSS 规则，只需修改 `:root` 变量即可自动生效。

---

### 1.3 主题色替换：Hero Section

**位置：** `#home`（背景渐变）、`.hero-lab-badge`、`.social-btn`

```css
/* 修改前 */
#home {
    background: linear-gradient(135deg, #EDF3FA 0%, #FFFFFF 60%); /* 蓝调 */
}

/* 修改后 */
#home {
    background: linear-gradient(135deg, #FBF0F1 0%, #FFFFFF 60%); /* 极淡红调 */
}
```

其余 Hero 元素（`.hero-lab-badge`、`.social-btn hover`、`.stat-card`）颜色均通过 CSS 变量自动更新，无需单独修改。

---

### 1.4 主题色替换：卡片顶部装饰线

以下卡片均有 `border-top: 3px solid var(--color-accent)` 的装饰线，变量更新后自动变为红色，无需手动修改：
- `.service-card`
- `.research-card`
- `.opening-card`

---

### 1.5 主题色替换：PI 卡片左侧边框

**位置：** `.pi-card`

```css
/* 修改前 */
.pi-card {
    border-left: 5px solid var(--color-accent); /* 蓝色 */
}

/* 修改后 */
/* var(--color-accent) 已更新为 #F42738，自动生效，无需修改 */
```

---

### 1.6 主题色替换：Publications 年份折叠栏

**位置：** `.pub-year-header`

```css
/* 修改前 */
.pub-year-header {
    background: var(--color-primary);  /* #1B3A5C 深蓝 */
}
.pub-year-header:hover { background: #162f4a; } /* 手写的蓝色 hover */

/* 修改后（需修改 hover 颜色，变量无法覆盖这条手写值）*/
.pub-year-header:hover { background: #7A000E; } /* 深红 hover，比 #9C0011 更深 */
```

> ⚠️ 这是唯一一处**手写颜色值**需要改为红色系的地方，其余均通过变量自动生效。

---

### 1.7 主题色替换：Footer 手写颜色

**位置：** `.footer-section a:hover`（暂无手写蓝色，Footer 已使用变量）

Footer 背景色 `--color-footer-bg` 会从 `#1B3A5C`（深蓝）变为 `#1C1014`（深暖黑），自动生效。

---

### 1.8 ClusterMaps 地图球形颜色

地图是外部嵌入脚本，颜色无法通过 CSS 控制，可忽略或换为其他访客统计组件。

---

## Part 2：字体大小与正文颜色修复

### 2.1 问题汇总

当前（切换为红色系后）正文颜色问题的根因是：大量正文段落使用 `var(--color-text-sub)`（偏淡），而非新增的 `var(--color-text-body)`（深暖灰）。

字体大小方面以下元素仍偏小：

| 元素 | 当前 rem | 实际 px（17px基准）| 目标 |
|------|---------|-----------------|------|
| `section-title` | 2rem | 34px | → 2.2rem = 37.4px |
| `research-card p` | 0.88rem | 15px | → 0.94rem = 16px |
| `pub-authors` | 0.85rem | 14.5px | → 0.92rem = 15.6px |
| `opening-card li` | 0.88rem | 15px | → 0.94rem = 16px |
| `service-card strong` | 0.85rem | 14.5px | → 0.92rem = 15.6px |
| `members-group-title` | 0.8rem | 13.6px | → 0.87rem = 14.8px |
| `stat-label` | 0.75rem | 12.8px | → 0.82rem = 14px |

---

### 2.2 修改 B：Section 大标题

```css
/* 修改前 */
.section-title { font-size: 2rem; }

/* 修改后 */
.section-title { font-size: 2.2rem; }
```

---

### 2.3 修改 C：About 正文 `.bio-text`

```css
/* 修改前 */
.bio-text {
    font-size: 1rem;
    color: var(--color-text-sub);
}

/* 修改后 */
.bio-text {
    font-size: 1.05rem;
    color: var(--color-text-body);   /* 改为正文深色 */
}
```

---

### 2.4 修改 D：Hero 联系信息 `.hero-contact-item`

```css
/* 修改前 */
.hero-contact-item {
    font-size: 0.9rem;
    color: var(--color-text-sub);
}
.hero-contact-item a { color: var(--color-text-sub); }

/* 修改后 */
.hero-contact-item {
    font-size: 0.95rem;
    color: var(--color-text-body);
}
.hero-contact-item a { color: var(--color-text-body); }
```

---

### 2.5 修改 E：Hero 职称 `.hero-title`

```css
/* 修改前 */
.hero-title { font-size: 1.1rem; }

/* 修改后 */
.hero-title { font-size: 1.15rem; }
```

---

### 2.6 修改 F：统计标签 `.stat-label`

```css
/* 修改前 */
.stat-label { font-size: 0.75rem; }

/* 修改后 */
.stat-label { font-size: 0.82rem; }
```

---

### 2.7 修改 G：学术服务类别标题 `.service-card strong`

```css
/* 修改前 */
.service-card strong { font-size: 0.85rem; }

/* 修改后 */
.service-card strong { font-size: 0.92rem; }
```

---

### 2.8 修改 H：研究方向卡片标题 `.research-card h5`

```css
/* 修改前 */
.research-card h5 { font-size: 1rem; }

/* 修改后 */
.research-card h5 { font-size: 1.08rem; }
```

---

### 2.9 修改 I：研究方向卡片描述 `.research-card p`

```css
/* 修改前 */
.research-card p {
    font-size: 0.88rem;
    color: var(--color-text-sub);
}

/* 修改后 */
.research-card p {
    font-size: 0.94rem;
    color: var(--color-text-body);
}
```

---

### 2.10 修改 J：News 内容文字 `.news-content`

```css
/* 修改前 */
.news-content {
    font-size: 0.95rem;
    color: var(--color-text-sub);
    line-height: 1.65;
}
.news-content strong { color: var(--color-text-main); }

/* 修改后 */
.news-content {
    font-size: 1rem;
    color: var(--color-text-body);
    line-height: 1.7;
}
.news-content strong {
    color: var(--color-text-main);
    font-weight: 700;
}
```

---

### 2.11 修改 K：PI 简介 `.pi-bio`

```css
/* 修改前 */
.pi-bio {
    font-size: 0.95rem;
    color: var(--color-text-sub);
}

/* 修改后 */
.pi-bio {
    font-size: 1rem;
    color: var(--color-text-body);
}
```

---

### 2.12 修改 L：PI 职称 `.pi-role`

```css
/* 修改前 */
.pi-role { font-size: 0.9rem; }

/* 修改后 */
.pi-role { font-size: 0.95rem; }
```

---

### 2.13 修改 M：成员分组标题 `.members-group-title`

```css
/* 修改前 */
.members-group-title { font-size: 0.8rem; }

/* 修改后 */
.members-group-title { font-size: 0.87rem; }
```

---

### 2.14 修改 N：论文标题 `.pub-title`

```css
/* 修改前 */
.pub-title { font-size: 0.97rem; }

/* 修改后 */
.pub-title { font-size: 1rem; }
```

---

### 2.15 修改 O：论文作者 `.pub-authors`

```css
/* 修改前 */
.pub-authors {
    font-size: 0.85rem;
    color: var(--color-text-sub);
}

/* 修改后 */
.pub-authors {
    font-size: 0.92rem;
    color: var(--color-text-body);
}
```

---

### 2.16 修改 P：招募要求列表 `.opening-card li`

```css
/* 修改前 */
.opening-card li {
    font-size: 0.88rem;
    color: var(--color-text-sub);
}

/* 修改后 */
.opening-card li {
    font-size: 0.94rem;
    color: var(--color-text-body);
}
```

---

### 2.17 修改 Q：招募简介 `.openings-intro`

```css
/* 修改前 */
.openings-intro { color: var(--color-text-sub); }

/* 修改后 */
.openings-intro { color: var(--color-text-body); }
```

---

## 三、所有需要新增 `color: var(--color-text-body)` 的位置

修改 `:root` 后，以下元素需要将颜色从 `text-sub` 改为 `text-body`：

| CSS 选择器 | 颜色改为 `text-body` | 备注 |
|-----------|-------------------|------|
| `.bio-text` | ✅ | About 正文段落 |
| `.hero-contact-item` | ✅ | Hero 联系信息 |
| `.hero-contact-item a` | ✅ | Hero 邮件/地址链接 |
| `.research-card p` | ✅ | 研究方向描述 |
| `.news-content` | ✅ | 新闻内容文字 |
| `.pi-bio` | ✅ | PI 个人简介 |
| `.pub-authors` | ✅ | 论文作者列表 |
| `.opening-card li` | ✅ | 招募条件列表项 |
| `.openings-intro` | ✅ | 招募说明段落 |
| `.members-group-title` | ❌ 保留 `text-sub` | 分组标签，次要信息 |
| `.stat-label` | ❌ 保留 `text-sub` | 统计数字说明 |
| `.member-period` | ❌ 保留 `text-sub` | 入学/入职时间 |
| `.member-co-supervised` | ❌ 保留 `text-sub` | 联合导师附注 |

---

## 四、实施顺序

建议按以下顺序操作，每步在浏览器预览一次：

### Step 1：更新 `:root` 变量（效果最大，一步到位）
- 替换全部颜色变量为红色系
- 新增 `--color-text-body: #2D2225`
- 修改 `--color-accent-dark: #CC0020`

### Step 2：修改 `#home` 渐变背景
- `#EDF3FA` → `#FBF0F1`（浅蓝调 → 极淡粉红调）

### Step 3：修改 `.pub-year-header:hover` 手写颜色
- `#162f4a`（深蓝）→ `#7A000E`（深红）

### Step 4：批量切换正文颜色
- 将第三节表格中 ✅ 的元素从 `text-sub` 改为 `text-body`

### Step 5：字号微调
- 按 2.2–2.17 节逐条修改

---

## 五、修改后整体视觉预期

| 页面区域 | 修改后效果 |
|---------|-----------|
| Navbar | Logo 文字变深红，导航链接高亮变红，active 下划线红色 |
| Hero | 背景极浅粉调，姓名/职称/统计数字中深红，图标/边框/按钮 hover 鲜红 |
| About | 正文段落深暖灰（清晰），服务标签浅粉底红字 |
| Research | 卡片顶部装饰线红色，卡片标题深红，描述文字深暖灰 |
| News | 日期 Tag 浅粉底红字，内容文字深暖灰 |
| Members | PI 卡片左边框红色，标题深红 |
| Publications | 年份折叠栏深红底白字，论文 Badge 浅粉底红字，链接按钮浅粉 hover 变红 |
| Join Us | 三列卡片顶部红色线，CTA 横幅深暖黑底，邮件按钮红色 |
| Footer | 深暖黑底（替代深蓝），风格沉稳 |
