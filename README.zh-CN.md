# InfoFusion

This project is available in multiple languages:
- [English](./README.md)

**InfoFusion** 是一个完全本地运行的 AI 驱动的网页工具，旨在从用户的计算机读取微信聊天数据，并使用 `RWKV runner` 生成智能自动回复。该项目集成了开源工具 `pywxdump`，以高效提取和处理微信数据。InfoFusion 基于 Next.js 和 NextUI 构建，提供现代化、响应式且用户友好的界面，确保您的数据隐私和控制权。

## 功能特性

- **本地数据处理：** 完全在用户计算机上运行，确保用户隐私，无需将数据发送到外部服务器。
- **微信数据提取：** 利用开源项目 `pywxdump`，安全地从本地机器读取和处理微信聊天数据。
- **AI 驱动的回复：** 使用 `RWKV runner` 生成基于聊天上下文的智能回复。
- **现代化 UI：** 基于 NextUI 构建，提供简洁、响应式的界面，提升用户体验。
- **TypeScript 支持：** 提供强类型支持，提升开发体验，确保代码的可维护性。

## 使用技术

InfoFusion 采用以下技术构建：

- **[RWKV-Runner](https://github.com/josStorer/RWKV-Runner)**：一个多功能的 AI 模型运行工具，支持基于上下文生成智能回复。
- **[PyWxDump](https://github.com/xaoyaoo/PyWxDump)**：一个开源工具，用于从本地存储中安全读取和提取微信数据。
- **[Next.js](https://nextjs.org/)**：一个用于构建快速且可扩展的网页应用的 React 框架。
- **[NextUI](https://nextui.org/)**：一个提供预设计 UI 组件的 React 组件库，用于创建现代化的网页界面。
- **[NextJS and NextUI Dashboard Template Starter](https://github.com/Siumauricio/nextui-dashboard-template?tab=readme-ov-file#nextjs-and-nextui-dashboard-template-starter)**：一个结合了 Next.js 和 NextUI 功能的强大仪表盘模板起始包。

## 快速开始

在开始之前，请确保 `RWKV-Runner` 和 `PyWxDump` 已经正确安装并在本地机器上运行。

### 先决条件

- **Node.js** (v20 或更新版本)
- **npm** 或 **yarn**
- **Python 3.x** （用于运行 `PyWxDump`）

### 安装步骤

1. **克隆仓库**

   首先将 InfoFusion 仓库克隆到你的本地机器：

   ```bash
   git clone https://github.com/LeoLin4258/InfoFusion
   cd InfoFusion
   ```

2. **安装依赖**

   安装必要的 Node.js 依赖：

   ```bash
   npm install
   ```

3. **本地启动应用**

   启动开发服务器：

   ```bash
   npm run dev
   ```

   打开浏览器并导航至 `http://localhost:3000` 以访问 InfoFusion。

## 生产环境构建

要创建优化后的生产环境构建，请执行以下命令：

```bash
npm run build
```

这将生成包含优化后应用的 `.next` 文件夹。

## 部署

InfoFusion 可以部署到任何支持 Node.js 应用的平台，例如 Vercel、Netlify 或你的自有服务器。

### 部署到 Vercel

Vercel 提供无缝的 Next.js 应用部署：

1. 将你的仓库推送到 GitHub。
2. 将你的仓库连接到 Vercel。
3. Vercel 会自动构建并部署你的应用。

## 使用指南

1. **加载微信聊天数据**

   使用 `PyWxDump` 提取你的本地微信聊天数据，通过 InfoFusion 网页界面上传提取的数据。

2. **生成 AI 回复**

   使用 RWKV runner 根据聊天内容生成智能、上下文相关的回复。

## 贡献

欢迎贡献！如果你想贡献代码，请 fork 该仓库，创建一个新分支，并提交 pull request。你也可以打开 issue 以报告错误或提出改进建议。

## 许可证

本项目基于 MIT 许可证授权。有关详细信息，请参见 [LICENSE](LICENSE) 文件。

## 鸣谢

- **[RWKV-Runner](https://github.com/josStorer/RWKV-Runner)**
- **[PyWxDump](https://github.com/xaoyaoo/PyWxDump)**
- **[Next.js](https://nextjs.org/)**
- **[NextUI](https://nextui.org/)**
- **[NextJS and NextUI Dashboard Template Starter](https://github.com/Siumauricio/nextui-dashboard-template?tab=readme-ov-file#nextjs-and-nextui-dashboard-template-starter)**
