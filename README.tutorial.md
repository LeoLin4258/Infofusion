
# Launching the InfoFusion Page

## Using the Online Page

You can use our deployed [InfoFusion](https://rwkv-infofusion.vercel.app/) page.

This online deployment does not collect or upload any data. You can view the source code in the [GitHub repository](https://github.com/LeoLin4258/Infofusion).

If you still have concerns, you can follow the steps below to launch the InfoFusion page locally.

  

## Launching InfoFusion Locally

> If you have experience in front-end development, you can directly clone this repository and use npm to start the project.
> This project uses `Next.js 14`, `Node 20`, `npm`.

  

#### 1. Clone the Project

Open `cmd` or `terminal` and enter:

```bash
git  clone  https://github.com/LeoLin4258/Infofusion
```

After the clone is complete, navigate to the InfoFusion folder:

```bash
cd  InfoFusion
```

#### 2. Install Node.js

Check if you have Node.js installed:

```bash
node  -v
```

- If it displays `v xx.xx.x`, you can proceed to the next step.

- If it prompts you that Node.js is not installed, you can go to the [Node.js official website](https://nodejs.org/en) to install it.

  

### 3. Install Necessary Dependencies

```bash
npm  i
```

### 4. Start the Project

Start InfoFusion locally:

```bash
npm  run  dev
```

If you see the following output, it means the project has started successfully:

```bash
> dashboard@0.1.0 dev
> next dev

▲  Next.js  14.0.4
-  Local:  http://localhost:3000
-  Environments:  .env

✓  Ready  in  1900ms
```

Now you can go to `http://localhost:3000` in your browser to access InfoFusion.

> The first time you visit the page after starting, it may take a moment to load. This only happens on the first visit after startup.

  

# Installing and Connecting RWKV Runner

> Before continuing this step, please ensure you have installed and are running RWKV Runner.

### 1. Check/Configure RWKV Runner API Port

In the RWKV-Runner application, click the `Settings` button on the left to go to the configuration page.

  

Copy the port number next to `API Port`.

> It is usually `8000` by default.

  

### 2. Set the InfoFusion API Port

Go to the InfoFusion page and click the `Settings` button on the left.

  

In the `Runner Port` input field, enter the RWKV Runner API port number you just copied.

> The format is `http://127.0.0.1:8000`.
> Replace `8000` with the API port number you just copied.

  

Click the `Update/Test` button.

  

If you see `✅Runner API connected` pop up in the upper right corner, it means InfoFusion has successfully connected to your RWKV Runner.

  

# Installing and Connecting PyWxDump

> If you have not installed PyWxDump yet, you can refer to the [PyWxDump GitHub repository](https://github.com/xaoyaoo/PyWxDump/blob/master/doc/UserGuide.md) for installation instructions.

> [!WARNING]  
> For the current version, please use the rwkvchat package in [release](https://github.com/LeoLin4258/Infofusion/releases/tag/v1.0.0) instead of PyWxDump.


### 1. Launch PyWxDump

Double-click to launch the `wxdump.exe` program.

>  `PyWxDump` will open a page by default, which you can ignore.

  

### 2. Load Your WeChat Data

Go to the InfoFusion page and click the `Settings` button on the left.

  

Click the `Retry` button in the `WeChat Account` card.

  

After initializing and loading your WeChat data, you can go to the `Chat` page to start using it.

  

# Using InfoFusion

After completing the above steps, you can start using InfoFusion.

  

### Generating AI Replies

1. Go to the InfoFusion page.

2. Click the `Chat` button on the left.

3. Select a chat room.

4. Click the number button to the left of the `✨` button at the bottom right, and choose how many replies you want to generate at once.

> The more replies, the longer it will take to generate.
> It is recommended to choose no more than 3.

5. Click the `✨` button at the bottom right to start generating replies.

6. After the replies are generated, you can click on the one you find suitable in the card.

> The content will be copied to your clipboard, and you can manually paste it into your WeChat application.

  

### Adding the `✨AI Generated` Tag

Automatically add the `✨AI Generated` tag when copying.

1. After the AI reply is generated, you can click the `[] Add AI Generated Tag` button at the bottom left of the card.

2. When you click to copy, the `✨AI Generated` tag will be added to the end of the content.

  

### Exporting Chat Data in jsonl Format

> This feature is currently unavailable and will be released in the next update.

  

Export chat data with a specific friend in jsonl format.

1. Go to the InfoFusion page.

2. Click the `Chat` button on the left.

3. Select a chat room.

4. Click the menu button at the top right.

5. Click `Export Chat Data`.

6. Wait for your file to be processed.

7. When the file is ready, click the `Download` button, and the jsonl file will start downloading in your browser.
