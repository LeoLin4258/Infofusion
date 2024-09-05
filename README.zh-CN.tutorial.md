# 启动InfoFusion页面
> [!TIP]
> 你可以使用`使用部署好的InfoFusion`,并且跳过`使用本地InfoFusion`步骤

## 使用部署好的InfoFusion

你可以使用我们部署好的[InfoFusion](https://infofusion.vercel.app/)页面

> 该线上部署的页面不会收集，上传任何数据。源代码可以在[Github 仓库](https://github.com/LeoLin4258/Infofusion)查看

下一步，请前往 [安装和连接RWKV Runner](#安装和连接RWKV-Runner)

## 使用本地的InfoFusion
> [!TIP]
> 如果你有前端页面开发经验，你可以直接克隆本仓库，并且使用npm启动该项目
> 项目使用`Next.js 14` `node 20` `npm`

#### 1. 克隆项目
打开`cmd`或者`terminal`并输入：

``` bash
git clone https://github.com/LeoLin4258/Infofusion
```

当克隆完成后，进入InfoFusion文件夹
``` bash
cd InfoFusion
```
#### 2. 安装node环境
检查你是否已安装node环境
``` bash
node -v
```
- 如果显示`v xx.xx.x`则可以跳至下一步
- 如果提示你没有安装node环境，你可以前往[nodejs官网](https://nodejs.org/zh-cn)安装node环境

### 3. 安装必要依赖
``` bash
npm i
```
### 4. 启动项目
在本地启动InfoFusion
``` bash
npm run dev
```
如果你看到以下输出，则证明项目已经启动
``` bash
> dashboard@0.1.0 dev
> next dev

   ▲ Next.js 14.0.4
   - Local:        http://localhost:3000
   - Environments: .env

 ✓ Ready in 1900ms
 ```
现在你可以在浏览器中输入`http://localhost:3000`，前往InfoFusion
>在第一次访问页面时，可能需要加载一段时间，这只会在启动后第一次访问时出现


# 安装和连接RWKV-Runner
> [!NOTE] 
> 在继续这一步之前，请确保你已经安装和运行RWKV Runner
>
> 你可以在 [RWKV Runner文档](https://rwkv.cn/RWKV-Runner/Introduction)中查看教程 

### 1. 查看/配置RWKV Runner API 端口
 在RWKV-Runner应用中，点击左侧的`配置`按钮，前往配置页面
 
 复制`API 端口` 右侧的端口号
> 一般默认为`8000`

### 2. 设置InfoFusion API 端口
前往InfoFusion页面，并点击页面左侧的`设置`按钮

在`Runner端口`的输入框中，填写你刚刚复制的RWKV Runner API端口号
> 格式为`http://127.0.0.1:8000`
> 其中8000替换为你刚刚复制的API端口号

点击`更新/测试`按钮

如果有右上角弹出`✅Runner API connected`,则证明InfoFusion已经连接至你的RWKV Runner

# 安装和连接PyWxDump
> [!WARNING]  
> 当前版本，请使用 [release](https://github.com/LeoLin4258/Infofusion/releases/tag/v1.0.0)中的rwkvchat 而不是 PyWxDump.
> 
> 下载并双击启动`rwkvchat`

### 1. 启动PyWxDump
双击启动`rwkvchat.exe`程序

### 2. 加载你的微信数据
前往InfoFusion页面，并点击页面左侧的`设置`按钮

点击下方的`微信账号`卡片中的`重试`按钮

在初始化加载你的微信数据后，你可以前往`聊天页面`开始使用

# 使用InfoFusion
当你完成以上步骤后，你可以前往InfoFusion开始使用了

### 生成AI回复
1. 前往InfoFusion页面
2. 点击左侧的`聊天`按钮
3. 选择一个聊天室
4. 点击右下角`✨`左侧的数字按钮，选择你需要一次生成几个回复
	> 数量越多，生成的时间也会相应增加
	> 建议选择3以内
5. 点击右下角`✨`按钮，开始生成回复
6. 回复生成完成后，你可以在卡片中点击一个你认为合适的回复
	> 此时该内容将会复制到你的粘贴板，你可以前往微信应用中手动粘贴

### 添加 `✨Ai生成`标签
在复制时自动添加`✨Ai生成`标签
1. 当生成完AI回复后，你可以点击卡片左下角的`[] 添加ai生成标签`
2. 此时当你点击复制时，`✨Ai生成`会添加到内容尾部

### 导出jsonl聊天数据
> 该功能目前不可用，将在下次更新中开放

以jsonl格式导出与某个好友的聊天数据
1. 前往InfoFusion页面
2. 点击左侧的`聊天`按钮
3. 选择一个聊天室
4. 点击右上角的菜单按钮
5. 点击`导出聊天数据`
6. 等待处理你的文件
7. 当文件准备好后，点击`下载`按钮，此时jsonl文件将开始在浏览器下载
