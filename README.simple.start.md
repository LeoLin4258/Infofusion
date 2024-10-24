# 快速开始（使用线上InfoFusion）

## 准备
-  一台可以运行RWKV Runner或者AI 00的设备
-   可以访问Github的网络
- 已经登录微信客户端
- 对设备拥有管理员权限

## 设置
### 1.下载【微信逆向工具】
> [!IMPORTANT]
> 在开始这一步之前，请确保你已经在设备上启动并登录了微信客户端

  1.1.前往[release](https://github.com/LeoLin4258/Infofusion/releases/tag/v1.1)下载`infofusion-wechat-server.exe`（50.2mb）

  1.2.下载完成后，双击打开`infofusion-wechat-server.exe`


> [!TIP]
> 你可能会在终端中看到`FileNotFoundError: 合并失败`的提示，你可以忽略并继续

### 2.启动RWKV Runner 或者 AI00

> [!NOTE]
> 如果你的本地还没有安装RWKV Runner 或者 AI00,你可以前往[RWKV文档](https://rwkv.cn/docs)查看教程。

#### RWKV Runner
   2.1 启动RWKV Runner

   2.2. 点击左侧`配置`按钮，前往配置界面

   2.3  复制或记住`API端口号`

#### AI00
   2.1. 启动AI00

   2.2. 复制并前往在终端中出现的 `WebUI`地址，一般默认为`http://localhost:65530/`

   2.3 验证你的AI00是否可以正常运行。你可以前往AI00提供的webui中尝试与ai对话，验证是否可以正常生成回复，如果可以，请前往下一步

   2.4  复制或记住在步骤2.2的`webUI`地址，一般为`http://localhost:65530/`


### 3.设置InfoFusion

   3.1 用浏览器打开 `https://infofusion.vercel.app/settings`

   3.2 在`Runner端口`的输入框中输入你在上一步复制的端口地址
   - RWKV Runner的地址一般为`http://localhost:8000/`
   - AI00的地址一般为`http://localhost:65530/api/oai/` 

   3.3 点击`更新/测试`按钮, 并且确认看到`✅Runner API connected`的提示

   3.4 在`设置你的微信账号`区域，选择识别出的微信id并且点击`选择`按钮

   3.5 等待初始化，当显示`初始化成功`后，你就已经完成了所有设置步骤。现在你可以前往聊天页开始使用了！

## 使用
InfoFusion的主要功能是，根据某个聊天室的聊天记录，为你生成回复。

### 生成回复
1. 前往聊天界面
2. 选中某一个聊天室
3. 点击右下角的数字按钮，（设置一次生成多少回复）
4. 点击右下角的✨按钮，进行生成
5. 你可以点击生成的内容，它会将内容复制到你的剪切板，然后你可以在微信客户端中粘贴这条回复

## 问题
Q: 生成的回复比较机械，或者质量较低

A: 模型大小和聊天记录长度会直接影响生成质量，建议使用7b或14b的[RWKV-6 中文小说模型](RWKV-6 中文小说模型). 并且选择一个聊天记录较长（30轮以上）的聊天室
