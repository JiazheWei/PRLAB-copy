# News 模块图标增强设计方案

## 一、现状分析

当前每条 news 的结构为：`日期色块 + 文字描述`，视觉上比较扁平，所有类型的 news 外观完全一致，无法让读者快速区分新闻类型。

## 二、核心改动：为每条 news 增加类型图标

在日期色块和文字之间，插入一个 **44×44 圆角图标方块**（复用 `.research-icon` 的视觉语言），通过不同图标和颜色区分新闻类型。

### 布局变化

```
修改前：
┌──────────┬──────────────────────────────────┐
│ 2025.07  │  文字描述...                       │
└──────────┴──────────────────────────────────┘

修改后：
┌──────────┬──────┬──────────────────────────────┐
│ 2025.07  │ 🎉  │  文字描述...                    │
└──────────┴──────┴──────────────────────────────┘
```

每条 `.news-item` 从原来的两栏（日期 + 内容）变为三栏（日期 + 图标 + 内容），仍使用 flexbox + `align-items: center`。

### 图标方块样式

```css
.news-type-icon {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
}
```

每种类型通过 CSS 类控制不同的 `background` 和 `color`。

## 三、新闻类型分类与图标映射

根据现有及未来可能出现的 news 类型，定义以下 **5 种类别**：

| 类型 | CSS 类名 | Bootstrap Icon | 图标底色 | 图标颜色 | 适用场景 |
|------|----------|----------------|----------|----------|----------|
| 论文中稿 | `.news-icon-accept` | `bi-trophy-fill` | `#FFF3E0` (暖橙浅底) | `#E65100` (深橙) | 论文被会议/期刊接收 |
| 论文发布 | `.news-icon-paper` | `bi-file-earmark-text-fill` | `var(--color-accent-light)` (浅粉) | `var(--color-accent)` (红) | 论文在 arXiv 发布、预印本 |
| 获奖荣誉 | `.news-icon-award` | `bi-award-fill` | `#FFF8E1` (金黄浅底) | `#F9A825` (金黄) | Oral、Best Paper、Highlight 等 |
| 成员动态 | `.news-icon-people` | `bi-person-plus-fill` | `#E8F5E9` (浅绿底) | `#2E7D32` (深绿) | 新成员加入、毕业、访问学者 |
| 实验室里程碑 | `.news-icon-lab` | `bi-flag-fill` | `#E3F2FD` (浅蓝底) | `#1565C0` (深蓝) | 实验室成立、搬迁、重大项目启动 |

### 现有 news 条目分类

| 日期 | 内容 | 归属类型 |
|------|------|----------|
| 2025.07 | DCM, TACA accepted by ICCV 2025 | `news-icon-accept` |
| 2025.07 | FreeMorph accepted by ICCV 2025 | `news-icon-accept` |
| 2025.05 | DaS accepted by SIGGRAPH 2025 | `news-icon-accept` |
| 2025.01 | FasterCache accepted by ICLR 2025 | `news-icon-accept` |
| 2025.01 | RepVideo released on arXiv | `news-icon-paper` |
| 2024.09 | MAN accepted by ECCV 2024 as Oral | `news-icon-award` |
| 2024.07 | FreeInit, HPFF accepted by ECCV 2024 | `news-icon-accept` |
| 2024.02 | FreeU (Oral) + VBench (Highlight) by CVPR 2024 | `news-icon-award` |
| 2024.01 | PRLab is established | `news-icon-lab` |

> **判定规则**：如果一条 news 同时涉及"中稿"和"Oral/Highlight"，优先使用 `news-icon-award`（获奖荣誉），因为 Oral/Highlight 比普通接收更值得突出。

## 四、CSS 实现细节

### 图标容器公共样式

```css
.news-type-icon {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
}
```

### 各类型配色

```css
/* 论文中稿 - 暖橙色系 */
.news-icon-accept {
    background: #FFF3E0;
    color: #E65100;
}

/* 论文发布 - 红色系（沿用主题色） */
.news-icon-paper {
    background: var(--color-accent-light);
    color: var(--color-accent);
}

/* 获奖荣誉 - 金黄色系 */
.news-icon-award {
    background: #FFF8E1;
    color: #F9A825;
}

/* 成员动态 - 绿色系 */
.news-icon-people {
    background: #E8F5E9;
    color: #2E7D32;
}

/* 实验室里程碑 - 蓝色系 */
.news-icon-lab {
    background: #E3F2FD;
    color: #1565C0;
}
```

## 五、HTML 修改示例

以第一条（论文中稿）为例：

```html
<!-- 修改前 -->
<div class="news-item">
    <span class="news-date">2025.07</span>
    <div class="news-content">
        <strong>DCM</strong> ... are accepted by <strong>ICCV 2025</strong>. Congratulations!
    </div>
</div>

<!-- 修改后 -->
<div class="news-item">
    <span class="news-date">2025.07</span>
    <div class="news-type-icon news-icon-accept">
        <i class="bi bi-trophy-fill"></i>
    </div>
    <div class="news-content">
        <strong>DCM</strong> ... are accepted by <strong>ICCV 2025</strong>. Congratulations!
    </div>
</div>
```

以"PRLab 成立"为例：

```html
<div class="news-item news-hidden">
    <span class="news-date">2024.01</span>
    <div class="news-type-icon news-icon-lab">
        <i class="bi bi-flag-fill"></i>
    </div>
    <div class="news-content">
        PRLab is established at ... Welcome to join us!
    </div>
</div>
```

## 六、响应式适配

在 `@media (max-width: 768px)` 中：

```css
.news-type-icon {
    width: 34px;
    height: 34px;
    font-size: 0.95rem;
    border-radius: 8px;
}
```

图标缩小但不隐藏，保持信息传达。

## 七、未来扩展

如果后续出现新的 news 类型，只需：

1. 在 CSS 中新增一个 `.news-icon-xxx` 配色类
2. 在对应 `<div class="news-type-icon">` 上添加该类名和 Bootstrap Icon

建议的预留类型：

| 类型 | CSS 类名 | 图标 | 场景 |
|------|----------|------|------|
| 开源项目 | `.news-icon-code` | `bi-code-slash` | 代码开源、重大更新 |
| 学术报告 | `.news-icon-talk` | `bi-mic-fill` | 受邀报告、Tutorial |
| 合作交流 | `.news-icon-collab` | `bi-people-fill` | 学术合作、联合项目 |
