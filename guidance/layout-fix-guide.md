# 布局空间优化修改指南

> 针对当前 PRLab 主页「内容偏窄、字体偏小、页面空旷」问题的完整修改方案。  
> 所有修改均在 `index.html` 的 `<style>` 块中完成，无需改动 HTML 结构。

---

## 一、问题根因与修改概览

| 问题 | 当前值 | 修改后 | 影响区域 |
|------|--------|--------|---------|
| 内容区宽度过窄 | `max-width: 1100px` | `max-width: 1340px` | 所有 Section |
| 导航栏宽度略小 | `max-width: 1200px` | `max-width: 1400px` | Navbar |
| body 基准字号偏小 | `font-size: 16px` | `font-size: 17px` | 全局 |
| Section 纵向留白过大 | `padding: 80px 0` | `padding: 64px 0` | 所有 Section |
| 内容区水平内边距 | `padding: 0 40px` | `padding: 0 60px` | 所有 Section |
| Hero 区左右间距 | `padding: 0 40px` | `padding: 0 60px` | Hero |
| 统计数字偏小 | `font-size: 1.8rem` | `font-size: 2.2rem` | Hero Stats |
| stat-card 太窄 | `min-width: 90px` | `min-width: 110px` | Hero Stats |
| PI 简介文字偏小 | `font-size: 0.92rem` | `font-size: 0.95rem` | Members PI 卡 |
| Openings intro 被额外限宽 | `max-width: 800px` | 删除此限制 | Join Us |
| 细节文字倍率过低 | 多处 `0.78rem` | 统一提升 | 全局 |

**预期效果：**
- 1440px 显示器：内容区由 76% 扩大到约 89% 屏宽
- 1920px 显示器：内容区由 57% 扩大到约 68% 屏宽
- 字号整体提升，阅读密度更高，与 zhanglinfeng.tech 视觉感受接近

---

## 二、逐条修改说明

### 修改 1：基准字号 `body`

**位置：** `<style>` 块，`body { ... }` 规则

```css
/* 修改前 */
body {
    font-size: 16px;
}

/* 修改后 */
body {
    font-size: 17px;
}
```

**原因：** 17px 是现代学术/技术主页的主流基准值。`font-size: 17px` 使所有以 `rem` 为单位的子字号同步放大，无需逐一修改，效果最高效。

---

### 修改 2：导航栏最大宽度 `.navbar-inner`

**位置：** `.navbar-inner { ... }`

```css
/* 修改前 */
.navbar-inner {
    max-width: 1200px;
    padding: 0 32px;
}

/* 修改后 */
.navbar-inner {
    max-width: 1400px;
    padding: 0 60px;
}
```

**原因：** 导航栏宽度应与内容区宽度匹配，否则导航栏更宽而内容更窄，视觉上失衡。

---

### 修改 3：全局内容区宽度 `.section-container`

**位置：** `.section-container { ... }`

```css
/* 修改前 */
.section-container {
    max-width: 1100px;
    padding: 0 40px;
}

/* 修改后 */
.section-container {
    max-width: 1340px;
    padding: 0 60px;
}
```

**原因：** 这是最核心的修改。`1340px` 在 1440px 屏幕下留 50px 边距，占比约 93%，更接近 zhanglinfeng.tech 的视觉效果。`padding: 0 60px` 确保在极宽屏上内容不贴边。

> **注意：** `max-width` 从 1100px 提升到 1340px，增加了 240px 可用空间。Section 内各网格（Research、Openings 等）会自动撑开。

---

### 修改 4：Hero 区宽度 `.hero-inner`

**位置：** `.hero-inner { ... }`

```css
/* 修改前 */
.hero-inner {
    max-width: 1100px;
    padding: 0 40px;
    gap: 60px;
}

/* 修改后 */
.hero-inner {
    max-width: 1340px;
    padding: 0 60px;
    gap: 80px;
}
```

**原因：** Hero 区是页面第一屏，直接决定第一印象。宽度与其他 Section 保持一致，gap 增大让照片与文字间距更舒展。

---

### 修改 5：Section 纵向留白 `.section-wrap`

**位置：** `.section-wrap { ... }`

```css
/* 修改前 */
.section-wrap {
    padding: 80px 0;
}

/* 修改后 */
.section-wrap {
    padding: 64px 0;
}
```

**原因：** 80px 在内容较少的 Section（如 News、About）会产生大量空白，64px 仍有足够呼吸感，同时信息密度更高。

---

### 修改 6：Hero 统计数字区

**位置：** `.stat-number { ... }` 和 `.stat-card { ... }`

```css
/* 修改前 */
.stat-number {
    font-size: 1.8rem;
}
.stat-card {
    min-width: 90px;
    padding: 14px 22px;
}

/* 修改后 */
.stat-number {
    font-size: 2.2rem;
}
.stat-card {
    min-width: 110px;
    padding: 16px 26px;
}
```

**原因：** 统计数字是 Hero 区的视觉焦点，数字应足够醒目。`2.2rem`（约 37px）在宽版面下比 `1.8rem` 更突出。

---

### 修改 7：取消 Openings intro 的额外限宽

**位置：** `.openings-intro { ... }`

```css
/* 修改前 */
.openings-intro {
    max-width: 800px;
    /* 其他属性不变 */
}

/* 修改后 */
.openings-intro {
    /* 删除 max-width: 800px; */
    /* 其他属性不变 */
}
```

**原因：** Join Us Section 已经在 `1340px` 的 section-container 内，再对 intro 限制 800px 会造成右侧大面积空白，且与三列 opening-card 宽度不匹配。

---

### 修改 8：Hero 名字字号 `.hero-name`

**位置：** `.hero-name { ... }`

```css
/* 修改前 */
.hero-name {
    font-size: 3rem;
}

/* 修改后 */
.hero-name {
    font-size: 3.2rem;
}
```

**原因：** PI 姓名是 Hero 区最大标题，在更宽的版面中适度放大可增强视觉层次。

---

### 修改 9：Section 大标题 `.section-title`

**位置：** `.section-title { ... }`

```css
/* 修改前 */
.section-title {
    font-size: 1.9rem;
}

/* 修改后 */
.section-title {
    font-size: 2rem;
}
```

**原因：** Section 标题放大一点点，与更宽的内容区形成更好的视觉比例。

---

### 修改 10：细节文字整体提升（News、Members、Publications）

以下三处 `0.78rem` 偏小，在 17px 基准下为 13.3px，建议统一提升：

**位置 1：** `.news-date { ... }`

```css
/* 修改前 */
.news-date {
    font-size: 0.78rem;
}

/* 修改后 */
.news-date {
    font-size: 0.82rem;
}
```

**位置 2：** `.pub-venue-badge { ... }`

```css
/* 修改前 */
.pub-venue-badge {
    font-size: 0.78rem;
}

/* 修改后 */
.pub-venue-badge {
    font-size: 0.82rem;
}
```

**位置 3：** `.service-tag { ... }`

```css
/* 修改前 */
.service-tag {
    font-size: 0.8rem;
}

/* 修改后 */
.service-tag {
    font-size: 0.84rem;
}
```

---

### 修改 11：响应式断点调整

由于 `max-width` 从 1100px 扩大到 1340px，响应式断点需要同步更新，防止在中等屏幕宽度下内容过宽导致布局错乱。

**位置：** `@media` 响应式规则

```css
/* 修改前 */
@media (max-width: 768px) {
    .navbar-inner { padding: 0 20px; }
    .hero-inner { padding: 0 24px; }
    .section-container { padding: 0 24px; }
}

/* 修改后 */
@media (max-width: 1400px) {
    .section-container { padding: 0 40px; }
    .hero-inner { padding: 0 40px; }
    .navbar-inner { padding: 0 40px; }
}

@media (max-width: 768px) {
    .navbar-inner { padding: 0 20px; }
    .hero-inner { padding: 0 20px; gap: 32px; }
    .section-container { padding: 0 20px; }
}
```

**原因：** 在 1400px 以下的屏幕（如 1366px 的笔记本），将内边距从 60px 降回 40px，保持内容不被截断。

---

### 修改 12：Hero 区图片尺寸适配宽屏

**位置：** `.hero-image img { ... }`

```css
/* 修改前 */
.hero-image img {
    width: 220px;
    height: 220px;
}

/* 修改后 */
.hero-image img {
    width: 240px;
    height: 240px;
}
```

**原因：** 版面更宽后，图片尺寸也应适度增大，维持图文比例平衡。

---

## 三、修改优先级排序

按视觉影响大小排序，建议按此顺序逐步应用，每步可在浏览器预览效果：

| 优先级 | 修改项 | 预期最大视觉改善 |
|--------|--------|----------------|
| ★★★ | 修改 3：`.section-container` 扩宽到 1340px | 最直接解决"内容窄"问题 |
| ★★★ | 修改 4：`.hero-inner` 同步扩宽 | Hero 第一屏立即变宽 |
| ★★★ | 修改 2：`.navbar-inner` 匹配扩宽 | 导航栏与内容对齐 |
| ★★☆ | 修改 1：`body font-size: 17px` | 全局字号同步放大 |
| ★★☆ | 修改 5：Section padding 64px | 减少空旷感 |
| ★★☆ | 修改 7：删除 openings intro 限宽 | Join Us 区饱满 |
| ★☆☆ | 修改 6：统计数字放大 | Hero 数字更醒目 |
| ★☆☆ | 修改 8-9：标题字号微调 | 层次感更好 |
| ★☆☆ | 修改 10：细节文字提升 | 整体精细度提升 |
| ★☆☆ | 修改 11-12：响应式 + 图片 | 适配完整性 |

---

## 四、修改后预期效果

### 宽屏占比对比

| 屏幕 | 修改前内容宽度 | 修改前占比 | 修改后内容宽度 | 修改后占比 |
|------|--------------|-----------|--------------|-----------|
| 1440px | ~1020px | 70.8% | ~1220px | 84.7% |
| 1920px | ~1020px | 53.1% | ~1220px | 63.5% |
| 1366px | ~1020px | 74.7% | ~1220px | 89.3%（触发 1400px 断点，padding 降为 40px） |

> 注：内容宽度 = max-width - 两侧 padding。实际可见内容宽度以 min(屏幕宽, max-width) 计算。

### 字号对比（body 17px 基准后）

| 元素 | 修改前 | 修改后（17px 基准） |
|------|--------|-----------------|
| body 正文 | 16px | 17px |
| hero-name | 3rem = 48px | 3.2rem × 17px ≈ 54px |
| section-title | 1.9rem ≈ 30px | 2rem × 17px = 34px |
| bio-text | 1rem = 16px | 1rem × 17px = 17px |
| pub-title | 0.97rem ≈ 15.5px | 0.97rem × 17px ≈ 16.5px |
| news-date | 0.78rem ≈ 12.5px | 0.82rem × 17px ≈ 14px |
| service-tag | 0.8rem = 12.8px | 0.84rem × 17px ≈ 14.3px |

---

## 五、注意事项

1. **不要修改 Research 卡片 `grid-template-columns: repeat(3, 1fr)`**：扩宽后三列会自动撑开，不需要改网格定义。

2. **`.pub-item` 布局**：目前 pub-item 是 flex 横向排列，缩略图宽度固定 110px，扩宽后右侧文字区会自动更宽，正文换行减少，反而显得更整洁。

3. **Bootstrap CSS 不需要改动**：我们的自定义样式权重足够高，Bootstrap 的默认 `max-width` 等不会干扰到自定义类。

4. **移动端保持不变**：`@media (max-width: 768px)` 规则中的布局已合理，只需同步更新 padding 数值（见修改 11），不需要改变列数或排列方向。

5. **ClusterMaps 地图**：地图是外部嵌入的 iframe/script，宽度自适应，扩宽后会自动居中，无需处理。
