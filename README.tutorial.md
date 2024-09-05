# Launch InfoFusion Page

> [!TIP]
> You can use the `deployed InfoFusion` and skip the `local InfoFusion setup` steps.

## Using the Deployed InfoFusion

You can use our deployed [InfoFusion](https://rwkv-infofusion.vercel.app/) page.

This online deployment does not collect or upload any data. You can view the source code on the [GitHub repository](https://github.com/LeoLin4258/Infofusion).

**If you still have concerns, you can follow the steps below to launch the InfoFusion page locally.**

## Using Local InfoFusion
> [!TIP]
> If you have front-end development experience, you can directly clone this repository and use npm to start the project.
> The project uses `Next.js 14`, `Node 20`, and `npm`.

### 1. Clone the Repository
Open `cmd` or `terminal` and enter:

```bash
git clone https://github.com/LeoLin4258/Infofusion
```

Once cloning is complete, navigate into the InfoFusion folder:

```bash
cd Infofusion
```

### 2. Install Node Environment
Check if you have Node installed:

```bash
node -v
```
- If it shows `v xx.xx.x`, you can proceed to the next step.
- If it prompts that Node is not installed, you can download and install it from the [Node.js website](https://nodejs.org/en).

### 3. Install Required Dependencies
```bash
npm i
```

### 4. Start the Project
To launch InfoFusion locally, run:

```bash
npm run dev
```

If you see the following output, the project has started successfully:

```bash
> dashboard@0.1.0 dev
> next dev

   ▲ Next.js 14.0.4
   - Local:        http://localhost:3000
   - Environments: .env

 ✓ Ready in 1900ms
```

Now, you can access InfoFusion by entering `http://localhost:3000` in your browser.  
> On the first page load, it might take a little time. This delay will only occur the first time after starting the project.

# Install and Connect RWKV Runner
> [!NOTE]
> Before proceeding with this step, make sure you have installed and started RWKV Runner.
>
> You can follow the guide in the [RWKV Runner Documentation](https://rwkv.cn/RWKV-Runner/Introduction).

### 1. Check/Configure RWKV Runner API Port
In the RWKV-Runner application, click the `Settings` button on the left to go to the configuration page.

Copy the port number next to `API Port`.  
> The default port is usually `8000`.

### 2. Set InfoFusion API Port
Go to the InfoFusion page and click the `Settings` button on the left side of the page.

In the input field labeled `Runner Port`, enter the RWKV Runner API port number you just copied.  
> The format should be `http://127.0.0.1:8000`, where `8000` is replaced with your copied API port number.

Click the `Update/Test` button.

If a notification appears in the top right saying `✅Runner API connected`, InfoFusion has successfully connected to your RWKV Runner.

# Install and Connect PyWxDump
> [!WARNING]
> For the current version, please use `rwkvchat` from the [release](https://github.com/LeoLin4258/Infofusion/releases/tag/v1.0.0) instead of PyWxDump.
> 
> Download and double-click to run `rwkvchat`.

### 1. Launch PyWxDump
Double-click to run the `rwkvchat.exe` program.

### 2. Load Your WeChat Data
Go to the InfoFusion page and click the `Settings` button on the left side of the page.

Click the `Retry` button in the `WeChat Account` section.

After initializing and loading your WeChat data, you can go to the `Chat Page` to start using InfoFusion.

# Using InfoFusion
Once you've completed the steps above, you're ready to start using InfoFusion.

### Generate AI Responses
1. Go to the InfoFusion page.
2. Click the `Chat` button on the left.
3. Select a chat room.
4. Click the number button to the left of the `✨` button in the bottom right corner to choose how many responses you'd like to generate at once.
   > The more responses you choose, the longer it will take to generate them.
   > It's recommended to choose 3 or fewer.
5. Click the `✨` button in the bottom right corner to start generating responses.
6. Once the responses are generated, click on the one you think is suitable.
   > The content will be copied to your clipboard, and you can manually paste it into the WeChat app.

### Add the `✨AI Generated` Tag
Automatically add the `✨AI Generated` tag when copying responses:
1. After generating AI responses, click the `[] Add AI Generated tag` button at the bottom left of the response card.
2. When you click copy, the `✨AI Generated` tag will be added to the end of the content.

### Export Chat Data as JSONL
> This feature is currently unavailable and will be enabled in the next update.

Export chat data with a friend in JSONL format:
1. Go to the InfoFusion page.
2. Click the `Chat` button on the left.
3. Select a chat room.
4. Click the menu button in the top right corner.
5. Click `Export Chat Data`.
6. Wait for your file to process.
7. Once the file is ready, click the `Download` button, and the JSONL file will begin downloading in your browser.