# PRLab 主页改版指导：参考 EPIC Lab (zhanglinfeng.tech) 解决「空旷感」与「字小看不清」

> **目标：** 对比分析 EPIC Lab (React + Tailwind) 的布局策略，找出 PRLab 当前主页「感觉空」「字多但看不清」的具体原因，并给出可直接执行的修改方案。
> **参考站：** [EPIC Lab - Linfeng Zhang](http://www.zhanglinfeng.tech/)（上海交大 EPIC 实验室）
> **约束：** PRLab 仍为纯静态 HTML/CSS，不引入 Tailwind 或 React。

---

## 一、EPIC Lab 布局特征分析

EPIC Lab 使用 React + Tailwind CSS 构建，核心布局模式如下：

### 1.1 全局容器与间距

| 属性 | EPIC Lab | PRLab 当前 | 差距分析 |
|------|----------|-----------|---------|
| 内容区最大宽度 | `max-w-7xl` = **1280px** | 1340px | PRLab 反而更宽，但内容填充度不够 |
| 水平内边距 | `px-4 sm:px-6 lg:px-8`（16/24/32px） | 60px | PRLab 边距过大，内容被挤窄 |
| Section 垂直间距 | `py-20` = **80px** | 64px | 差距不大，但 EPIC 内容更密集所以不显空 |
| 容器策略 | 严格的 `max-w-7xl mx-auto` 统一 | 已统一但内容分布不均 | — |

### 1.2 字体策略（关键差异）

| 元素 | EPIC Lab（Tailwind 等效） | PRLab 当前 | 问题 |
|------|------------------------|-----------|------|
| Hero 主标题 | `text-4xl md:text-5xl lg:text-6xl font-bold`（36→48→60px） | 3.2rem ≈ 54px | PRLab 偏小但差距不大 |
| Section 标题 | `text-3xl md:text-4xl font-bold`（30→36px） | 2.2rem ≈ 37px | 接近 |
| 子标题 | `text-2xl font-bold`（24px） | 无明确层级 | **PRLab 缺少二级标题层** |
| 正文段落 | `text-gray-600 leading-relaxed`（16px，行高 1.625） | 17px，行高 1.7 | PRLab 字号可以，但颜色浅 |
| 卡片描述 | `text-gray-600 text-sm`（14px） | 0.94rem ≈ 16px | PRLab 反而更大 |
| 标签/Badge | `text-sm font-medium`（14px） | 0.82-0.84rem ≈ 14px | 接近 |

**核心发现：** PRLab 的「字小看不清」主要不是字号问题，而是：
1. **信息密度过低** — 大段空白中零散分布小文字，视觉上显得文字很小
2. **缺少内容层次** — 没有足够的子标题、摘要文字、描述段落来填充空间
3. **卡片内容量少** — Research 卡片只有一句话描述，Members 卡片信息过简

### 1.3 Hero 区对比

| 特征 | EPIC Lab | PRLab |
|------|----------|-------|
| 布局 | 全宽背景图 + 渐变叠层 + 居中文字 | 左文右图双栏 |
| 背景 | 全宽照片 `bg-cover bg-center` + `from-black/60 via-black/40 to-black/70` 暗色渐变 | 浅粉渐变到白 |
| 视觉冲击力 | 极强（全屏沉浸式） | 较弱（大量留白） |
| 内容密度 | 名字 + 职位 + 机构 + 研究兴趣关键词 + 社交链接 + 统计数字，全部叠加在图上 | 分散在左侧区域 |
| 统计数字展示 | `text-4xl font-bold`（36px）白色数字在暗色背景上 | 卡片式、独立区域 |
| 高度 | `min-h-screen`（满屏） | 约 400px |

### 1.4 内容密度对比

| Section | EPIC Lab | PRLab | 改进方向 |
|---------|----------|-------|---------|
| About/Biography | 3-4 段完整文字 + 研究兴趣列表 + 招聘信息 + 合作伙伴 Logo 墙 | 2 段简介 + 学术服务标签 + 访客地图 | **增加合作伙伴/研究兴趣列表** |
| Research | 3 列卡片，每卡带图标 + 标题 + 详细描述 + 代表作链接 | 3 列卡片，每卡只有一句话 | **增加代表性论文/项目链接** |
| News | 时间轴样式，每条含日期 + Badge + 描述 | 类似但条目少 | 增加条目数 |
| Members | 4 列网格，每人大照片 + 姓名 + 研究方向 + 社交链接 | 自适应网格，卡片偏小 | **增大卡片尺寸，增加研究方向标签** |
| Publications | 按年分组、折叠式，带缩略图 | 类似 | 基本一致 |
| Join Us | 大色块 Banner + 详细要求 + 联系方式 | 三列卡片 + CTA | 基本一致 |
| Partners | **有合作伙伴 Logo 墙**（阿里、腾讯、蚂蚁等） | **无** | **新增** |

### 1.5 视觉填充策略对比

EPIC Lab 的页面不空的原因：

1. **全宽色块分割** — Hero 和部分 Section 使用 `bg-gradient-to-br from-blue-900 to-blue-800` 等深色块，让页面有「重量感」
2. **Partner Logo 墙** — `grid grid-cols-2 md:grid-cols-4 gap-8` 四列 Logo，填充了大面积空间
3. **成员卡片更大** — 使用 `aspect-[3/4]` 竖版照片卡片 + hover 叠层效果，视觉占比远大于 PRLab 的小方块
4. **渐变色彩丰富** — 从深蓝到浅灰的多层渐变，不单调
5. **内容量更多** — 每个 Section 有更多实际文字内容

---

## 二、PRLab「空旷感」的根本原因诊断

### 2.1 不是字号问题，是信息密度问题

当前 PRLab 的 body 字号 17px 已经高于 EPIC Lab 的 16px，字号本身没问题。空旷感来自：

| 症状 | 根因 | 对应区域 |
|------|------|---------|
| Research 区看起来空 | 5 张卡片只有 1-2 句话描述，没有代表作链接 | `#research` |
| About 区下方空旷 | 学术服务标签面积小，访客地图视觉重量弱 | `#about` |
| Members 区空 | 成员卡片太小（minmax 180px），网格间缝隙大 | `#members` |
| Hero 区右侧空 | 圆形头像 240px 占据了右侧但周围全是空白 | `#home` |
| 全局字体「小」的错觉 | 白色大面积空间中孤立的小字块，对比产生视觉缩小 | 全局 |

### 2.2 具体的视觉密度量化

在 1920px 屏幕上：

| 区域 | PRLab 可用宽度 | 实际内容填充率 | EPIC Lab 填充率 |
|------|--------------|-------------|----------------|
| Hero | 1220px | ~55%（左文 + 右图，中间大量空白） | ~90%（全宽图） |
| Research | 1220px（3 列 ≈ 各 387px） | ~60%（短文字卡片） | ~80%（更长描述 + 链接） |
| Members | 1220px | ~45%（小卡片 + 大缝隙） | ~85%（大卡片紧凑排列） |

---

## 三、修改方案

### 方案 A：增强内容密度（核心改动，效果最显著）

#### A1. Research 卡片增加代表性论文

当前每张 Research 卡片只有一句话描述。参考 EPIC Lab，在每卡底部增加 1-2 个代表性论文/项目链接：

```html
<!-- 修改前 -->
<div class="research-card">
    <div class="research-icon"><i class="bi bi-film"></i></div>
    <h5>Video Generation</h5>
    <p>We study generative models for high-quality...</p>
</div>

<!-- 修改后 -->
<div class="research-card">
    <div class="research-icon"><i class="bi bi-film"></i></div>
    <h5>Video Generation</h5>
    <p>We study generative models for high-quality...</p>
    <div class="research-works">
        <a href="#" class="research-work-tag">RepVideo</a>
        <a href="#" class="research-work-tag">Vchitect-2.0</a>
        <a href="#" class="research-work-tag">LaVie</a>
    </div>
</div>
```

新增 CSS：
```css
.research-works {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 14px;
    padding-top: 12px;
    border-top: 1px solid var(--color-border);
}

.research-work-tag {
    display: inline-block;
    padding: 3px 10px;
    background: var(--color-accent-light);
    color: var(--color-accent);
    border-radius: 6px;
    font-size: 0.82rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s;
}

.research-work-tag:hover {
    background: var(--color-accent);
    color: white;
}
```

**效果：** 每张卡片高度增加约 40-50px，整个 Research 区视觉填充率从 60% 提升到 80%+。

---

#### A2. 成员卡片增大

当前 `minmax(180px, 1fr)` 导致每张卡片太窄太小。

```css
/* 修改前 */
.members-grid {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 18px;
}

/* 修改后 */
.members-grid {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 20px;
}
```

同时在 `members.js` 的 `createMemberCard` 中，如果成员有 `research_interest` 字段，展示为标签：

```html
<!-- 成员卡片增加研究方向标签（可选） -->
<div class="member-interests">
    <span class="member-interest-tag">Video Generation</span>
</div>
```

```css
.member-interests {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin-top: 6px;
}

.member-interest-tag {
    background: var(--color-accent-light);
    color: var(--color-accent);
    padding: 2px 7px;
    border-radius: 4px;
    font-size: 0.72rem;
    font-weight: 500;
}
```

**效果：** 卡片更大更充实，网格填满度更高。

---

#### A3. About 区增加研究兴趣关键词块

参考 EPIC Lab 的「Research Interest」区块，在 bio 段落后增加显眼的研究兴趣列表：

```html
<!-- 在 bio-text 后、recruit-banner 前插入 -->
<div class="research-interest-block">
    <h3 class="ri-title">Research Interests</h3>
    <div class="ri-tags">
        <span class="ri-tag">Video Generation</span>
        <span class="ri-tag">Diffusion Models</span>
        <span class="ri-tag">Visual Understanding</span>
        <span class="ri-tag">Generative Model Acceleration</span>
        <span class="ri-tag">Image Editing & Morphing</span>
        <span class="ri-tag">Evaluation Benchmarks</span>
    </div>
</div>
```

```css
.research-interest-block {
    margin: 28px 0 8px;
}

.ri-title {
    font-size: 1.15rem;
    font-weight: 700;
    color: var(--color-primary);
    margin-bottom: 12px;
}

.ri-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.ri-tag {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 6px 14px;
    background: var(--color-bg-card);
    border: 1.5px solid var(--color-accent);
    border-radius: 8px;
    color: var(--color-accent);
    font-size: 0.88rem;
    font-weight: 600;
    transition: all 0.2s;
}

.ri-tag:hover {
    background: var(--color-accent);
    color: white;
}
```

**效果：** About 区多出一行醒目的彩色标签带，既填充空间又传达信息。

---

#### A4. 新增 Partners / Collaborators 区块（可选）

EPIC Lab 有明确的合作伙伴展示（阿里、腾讯、蚂蚁、深势科技、小红书等），这是一个高效的视觉填充区域：

```html
<!-- 可放在 About 区的 Academic Services 后，visitor map 前 -->
<h3 style="...">Collaborators & Partners</h3>
<div class="partners-grid">
    <div class="partner-item">
        <img src="./assets/img/partners/ntu-logo.png" alt="NTU">
        <span>NTU MMLab</span>
    </div>
    <div class="partner-item">
        <img src="./assets/img/partners/sea-logo.png" alt="Sea AI Lab">
        <span>Sea AI Lab</span>
    </div>
    <!-- ... -->
</div>
```

```css
.partners-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 16px;
    margin-top: 16px;
}

.partner-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 16px;
    background: var(--color-bg-card);
    border: 1.5px solid var(--color-border);
    border-radius: var(--radius-card);
    transition: box-shadow 0.2s;
}

.partner-item:hover {
    box-shadow: var(--shadow-card-hover);
}

.partner-item img {
    height: 40px;
    object-fit: contain;
    opacity: 0.7;
    transition: opacity 0.2s;
}

.partner-item:hover img { opacity: 1; }

.partner-item span {
    font-size: 0.82rem;
    color: var(--color-text-sub);
    font-weight: 500;
}
```

---

### 方案 B：正文字体可读性优化

即使信息密度提上来，仍需要在排版细节上增强可读性：

#### B1. 正文行高增大

EPIC Lab 使用 `leading-relaxed`（line-height: 1.625），PRLab 当前的正文 `line-height: 1.7` 已经不错。但部分区域偏紧：

```css
/* 以下区域行高偏紧，建议统一提升 */
.research-card p { line-height: 1.7; }   /* 当前可能未设置或较低 */
.opening-card li  { line-height: 1.65; } /* 当前偏紧 */
.pi-bio           { line-height: 1.8; }  /* 当前 OK */
```

#### B2. 正文字重微调

EPIC Lab 正文使用 `text-gray-600`（#4B5563）。PRLab 当前 `--color-text-body: #2D2225` 已经较深，但部分区域字重太轻导致视觉灰度不够：

```css
/* 关键正文区域建议增加 font-weight */
.bio-text         { font-weight: 400; }  /* 默认 400 即可 */
.news-content     { font-weight: 400; }
.pub-authors      { font-weight: 400; }  /* 确保不是 300 */
```

#### B3. 标题字重对比增强

EPIC Lab 标题普遍使用 `font-bold`（700）。PRLab 部分标题用了 700 但视觉对比度不够，因为周围留白太多：

```css
/* 增强 Section 标题的视觉锤 */
.section-title {
    font-size: 2.2rem;
    font-weight: 800;      /* 从 700 → 800，增强标题与正文的对比 */
    letter-spacing: -0.02em; /* 紧缩字间距让标题更紧凑有力 */
}
```

---

### 方案 C：空间布局调整

#### C1. Hero 区全宽背景强化

当前 Hero 背景是极淡的渐变，几乎看不出来。参考 EPIC Lab 的深色全宽 Hero，可以增加辨识度（不一定要改为深色，但需增加视觉重量）：

```css
/* 方案 C1-a：增强渐变色彩感 */
#home {
    background: linear-gradient(135deg, #FBE8EA 0%, #FFFFFF 50%, #F8F4F5 100%);
    /* 起始色略深，让渐变更明显 */
}

/* 方案 C1-b（激进）：深色 Hero */
#home {
    background: linear-gradient(135deg, #9C0011 0%, #1C1014 100%);
    /* Hero 内的文字颜色需同步改为白色 */
}
```

> 建议采用 C1-a，保持现有风格但增强色彩感。C1-b 需要大量 HTML 修改。

#### C2. Section 之间增加视觉分割

当前 Section 用白底 / 灰底交替，但色差太小（#FFFFFF vs #FAF8F9），几乎看不出分界：

```css
/* 增大交替色差 */
.section-wrap.alt-bg {
    background: #F5F0F1;  /* 比当前 #FAF8F9 更深一点的暖灰 */
}
```

或者在 Section 之间添加更明显的分割：

```css
.section-wrap + .section-wrap {
    border-top: 1px solid var(--color-border);
}
```

#### C3. 缩小全局侧边距

PRLab 当前 padding 60px，在 1920px 屏幕上留了很大边距。EPIC Lab 在大屏仅 32px（`lg:px-8`）：

```css
/* 在大屏减小边距，让内容更撑满 */
@media (min-width: 1400px) {
    .section-container { padding: 0 48px; }  /* 60px → 48px */
    .hero-inner        { padding: 0 48px; }
    .navbar-inner      { padding: 0 48px; }
    .footer-inner      { padding: 0 48px; }
}
```

---

### 方案 D：卡片设计强化

#### D1. Research 卡片增加 padding 和最小高度

```css
/* 修改前 */
.research-card {
    padding: 28px 24px;
}

/* 修改后 */
.research-card {
    padding: 32px 28px;
    min-height: 220px;     /* 确保卡片高度一致，不会因内容少而塌缩 */
    display: flex;
    flex-direction: column;
}

.research-card p {
    flex: 1;               /* 描述文字撑满剩余空间 */
}
```

#### D2. Member 卡片 hover 效果增强

EPIC Lab 成员卡片有 `group-hover:translate-y-0` 的 overlay 动画。PRLab 可以增加类似效果：

```css
.member-card {
    position: relative;
    overflow: hidden;
}

.member-card::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to top, rgba(156,0,17,0.05), transparent);
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
}

.member-card:hover::after {
    opacity: 1;
}
```

---

## 四、修改优先级排序

按「解决空旷感」效果从大到小排序：

| 优先级 | 方案 | 描述 | 改动量 | 效果 |
|--------|------|------|--------|------|
| ★★★ | A1 | Research 卡片增加代表作标签 | HTML+CSS | 立即填充最空的区域 |
| ★★★ | A2 | 成员卡片增大到 220px | CSS | 最空区域之一 |
| ★★★ | A3 | About 区增加 Research Interests 关键词块 | HTML+CSS | 填充空白 |
| ★★☆ | C2 | 增大 Section 交替色差 | CSS | 增加层次感 |
| ★★☆ | C3 | 缩小大屏侧边距 | CSS | 内容更撑满 |
| ★★☆ | B3 | 标题字重 800 + 紧缩字间距 | CSS | 增强视觉锤 |
| ★★☆ | D1 | Research 卡片增加 min-height | CSS | 卡片更饱满 |
| ★☆☆ | C1 | Hero 渐变增强 | CSS | 第一屏更有存在感 |
| ★☆☆ | A4 | 新增合作伙伴 Logo 墙 | HTML+CSS+图片 | 需准备素材 |
| ★☆☆ | B1 | 行高微调 | CSS | 精细调整 |
| ★☆☆ | D2 | 成员卡片 hover 效果 | CSS | 交互增强 |

---

## 五、EPIC Lab vs PRLab 设计哲学差异总结

| 维度 | EPIC Lab | PRLab（当前） | 建议方向 |
|------|----------|-------------|---------|
| **设计框架** | React + Tailwind（组件化、工具类优先） | 纯 HTML + 自定义 CSS | 保持不变 |
| **色彩策略** | 蓝色系 + 大量渐变色块 | 红色系 + 素白主调 | 增加渐变层次 |
| **信息密度** | 高（每个 Section 填满内容） | 中低（大量留白） | **提高到中高** |
| **视觉重量** | 重（深色 Hero、Partner Logo 墙、大照片卡片） | 轻（浅色调、小卡片） | 适度加重 |
| **交互** | 丰富（hover overlay、scale、弹窗） | 基础（hover 上浮） | 适度增强 |
| **字体策略** | 大标题极大（60px），正文适中（16px），对比极强 | 标题和正文字号差距不够大 | **增大标题/正文字号对比** |

---

## 六、实施路线建议

### Phase 1（快速见效，仅 CSS 修改）
1. 成员卡片 minmax 180px → 220px
2. Section 交替背景色差增大
3. 大屏侧边距 60px → 48px
4. Section 标题 font-weight 800 + letter-spacing 紧缩
5. Research 卡片 min-height + padding 增大

### Phase 2（HTML + CSS 修改）
1. Research 卡片增加代表作标签
2. About 区增加 Research Interests 关键词块
3. Hero 渐变增强

### Phase 3（内容补充）
1. 合作伙伴 Logo 墙（需准备图片素材）
2. 成员卡片增加研究方向标签（需更新 people/*.md 和 members.js）
3. 更多 News 条目

---

## 七、与已有 guidance 文件的关系

| 已有文件 | 状态 | 说明 |
|---------|------|------|
| `layout-fix-guide.md` | ✅ 已实施 | 宽度/字号基础优化，已在当前代码中生效 |
| `typography-color-fix-guide.md` | ✅ 已实施 | 红色系切换 + 正文颜色修复，已生效 |
| **本文档** | 🆕 新增 | 解决「空旷感」的进阶优化，在前两个文档基础上进一步改进 |

本文档的修改建议与前两个文档不冲突，是在已有基础上的增量优化。
