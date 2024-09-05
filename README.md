# InfoFusion

This project is available in multiple languages:
- [简体中文](./README.zh-CN.md)

**InfoFusion** is a 100% locally run AI-powered web tool designed to read WeChat chat data from the user's computer and generate intelligent auto-replies using the `RWKV runner`. The project integrates with the open-source tool `pywxdump` to efficiently extract and process WeChat data. Built with Next.js and NextUI, InfoFusion provides a modern, responsive, and user-friendly interface, ensuring privacy and control over your data.

![a52a4877b12b9e4402ec94d0540f6b3](https://github.com/user-attachments/assets/7884f49b-603b-4130-8254-759128971287)
## Features

- **Local Data Processing:** Ensures user privacy by running entirely on the user's computer without sending any data to external servers.
- **WeChat Data Extraction:** Utilizes `pywxdump`, an open-source project, to securely read and process WeChat chat data directly from your local machine.
- **AI-Powered Replies:** Leverages the `RWKV runner` to generate contextually accurate and intelligent replies for WeChat conversations.
- **Modern UI:** Built with NextUI, offering a sleek, responsive interface for an enhanced user experience.
- **TypeScript Support:** Provides strong typing to improve the development experience and ensure better code maintainability.

 ## Planned Features

- [ ] Customizable reply styles
- [ ] UI notifications for new messages
- [ ] Summary of unread messages

## Technologies Used

InfoFusion is powered by the following technologies:

- **[RWKV-Runner](https://github.com/josStorer/RWKV-Runner)**: A versatile AI model runner, which facilitates the generation of intelligent replies based on context.
- **[PyWxDump](https://github.com/xaoyaoo/PyWxDump)**: An open-source tool for securely reading and extracting WeChat data from local storage.
- **[Next.js](https://nextjs.org/)**: A React framework known for building fast and scalable web applications.
- **[NextUI](https://nextui.org/)**: A React component library offering pre-designed UI components for creating modern web interfaces.
- **[NextJS and NextUI Dashboard Template Starter](https://github.com/Siumauricio/nextui-dashboard-template?tab=readme-ov-file#nextjs-and-nextui-dashboard-template-starter)**: A starter template that combines the power of Next.js and NextUI for a robust dashboard setup.

## Getting Started
> [!TIP] 
> You can visit the [Detailed Tutorial](./README.tutorial.md) for more comprehensive steps.


> [!NOTE]  
> For the current version, please use the rwkvchat package in [release](https://github.com/LeoLin4258/Infofusion/releases/tag/v1.0.0) instead of PyWxDump.

Before starting, please ensure that `RWKV-Runner` and `PyWxDump` are correctly installed and running on your local machine.

### Prerequisites

- **Node.js** (v20 or newer)
- **npm** or **yarn**
- **Python 3.x** (required for `PyWxDump`)

### Installation Steps

1. **Clone the Repository**

   Begin by cloning the InfoFusion repository to your local machine:

   ```bash
   git clone https://github.com/LeoLin4258/Infofusion
   cd InfoFusion
   ```

2. **Install Dependencies**

   Install the necessary Node.js dependencies:

   ```bash
   npm install
   ```

3. **Start the Application Locally**

   Run the development server:

   ```bash
   npm run dev
   ```

   Open your browser and navigate to `http://localhost:3000` to access InfoFusion.

## Building for Production

To create an optimized production build, execute the following command:

```bash
npm run build
```


This will generate the `.next` folder containing the optimized application.

## Deployment

InfoFusion can be deployed to any platform that supports Node.js applications, such as Vercel, Netlify, or your own server. 

### Deploying to Vercel

Vercel provides seamless deployment for Next.js applications:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/LeoLin4258/Infofusion.git)

or

1. Push your repository to GitHub.
2. Connect your repository to Vercel.
3. Vercel will automatically build and deploy your application.

## Usage

1. **Load WeChat Chat Data**

   Use `PyWxDump` to extract your local WeChat chat data. Upload the extracted data through the InfoFusion web interface.

2. **Generate AI Replies**

   Use the `RWKV Runner` to generate intelligent, contextually accurate replies based on your chat conversations.


## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository, create a new branch, and submit a pull request. You can also open an issue to report bugs or suggest improvements.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Acknowledgements

- **[RWKV-Runner](https://github.com/josStorer/RWKV-Runner)**
- **[PyWxDump](https://github.com/xaoyaoo/PyWxDump)**
- **[Next.js](https://nextjs.org/)**
- **[NextUI](https://nextui.org/)**
- **[NextJS and NextUI Dashboard Template Starter](https://github.com/Siumauricio/nextui-dashboard-template?tab=readme-ov-file#nextjs-and-nextui-dashboard-template-starter)**
