# 张坤 · 在线简历（GitHub + Netlify 实时更新）

单页静态简历，零构建、零外部依赖（字体走系统栈，国内秒开），改完推送即自动发布。

## 文件说明

| 文件 | 用途 |
|------|------|
| `index.html` | 简历正文（内容、样式、脚本全内联，单文件自包含） |
| `resume-zhangkun.pdf` | 托管的 PDF 版（导航「下载PDF」直链此文件，方便 HR 转发） |
| `qr-demo.svg` | 智能询价系统演示链接的二维码（项目卡内，屏幕可扫、打印可扫） |
| `og-image.png` | 微信 / 社交平台分享链接时的预览图 |
| `404.html` | 访问不存在路径时自动跳回简历 |
| `netlify.toml` | Netlify 缓存与安全响应头配置 |

## 日常更新流程

1. 编辑 `index.html`
2. 本地预览：双击打开，或 `npx serve netlify-resume`
3. 提交推送：

```bash
git add .
git commit -m "更新简历"
git push
```

4. Netlify 约 30 秒自动重新发布

## 改业绩数据时的同步清单

以下位置需一次性替换（全局搜索旧数字）：

1. Hero 右侧业绩卡（数值 + 「已超 2025 全年」比例）
2. 数据条 4 项（`data-target` 与内联文本都要改）
3. 柱状图：`--h` 高度百分比（按 业绩/390万×97% 重新计算）+ 柱内数值
4. 核心优势绿色标签
5. 工作经历「区域增长模型构建」一条的增长链
6. 自我评价
7. `<meta name="description">`、`og-image.png`（重新生成）、页脚「最后更新」日期

## 资产再生成命令

```powershell
# PDF（改完 index.html 后重新导出，覆盖 netlify-resume\resume-zhangkun.pdf 及本地副本）
& "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=12000 --print-to-pdf="E:\Ingulf\简历\netlify-resume\resume-zhangkun.pdf" "file:///E:/Ingulf/简历/netlify-resume/index.html"

# 演示二维码（演示链接含 token，换 token 后必须重新生成并替换 qr-demo.svg）
python -c "import qrcode,qrcode.image.svg; qrcode.make('新链接', image_factory=qrcode.image.svg.SvgPathImage, box_size=20, border=2).save(r'netlify-resume\qr-demo.svg')"
```

## 备注

- `index.html#noanim` 可跳过入场动画直接呈现最终状态（供爬虫/存档/测试用）
- 演示链接（含 token）出现在 4 处 + `qr-demo.svg`，更换时全局替换
- `og:image` 目前是相对路径，绑定自定义域名后建议改为绝对 URL，微信/LinkedIn 预览更稳
- 需要纸质版：打开网页 → 页脚「打印 / 导出PDF」，或直接下载 `resume-zhangkun.pdf`

## 首次部署（GitHub + Netlify）

1. GitHub 新建仓库（如 `resume`），然后：

```bash
cd netlify-resume
git push -u origin main
```

2. [Netlify](https://app.netlify.com) → **Add new site → Import an existing project** → 选该仓库
3. 无构建命令，Publish directory 填 `.`，部署完成得 `https://<随机名>.netlify.app`
4. 可在 Site settings → Domain management 绑定自定义域名
