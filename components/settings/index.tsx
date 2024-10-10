"use client";

import getWeChatInfo from "@/apis/getWeChatInfo";
import initWeChat from "@/apis/initWeChat";
import ServerWeChatLogin from "@/apis/serverWeChatLogin";
import testRunner from "@/apis/textRunner";
import { RocketIcon } from "@/components/icons/chat/rocket-icon";
import { SuccessIcon } from "@/components/icons/chat/success-icon";
import Snackbar from "@mui/material/Snackbar";
import {
    Avatar,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Chip,
    CircularProgress,
    Divider,
    Input,
    Link,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Progress,
    RadioGroup,
    RadioProps,
    Skeleton,
    Spinner,
    Tab,
    Tabs,
    VisuallyHidden,
    cn,
    useDisclosure,
    useRadio,
} from "@nextui-org/react";
import React, { useCallback, useEffect, useState } from "react";
import { useMyContext } from "../context/myContext";

export const CustomRadio = (props: RadioProps) => {
    const {
        Component,
        children,
        isSelected,
        description,
        getBaseProps,
        getWrapperProps,
        getInputProps,
        getLabelProps,
        getLabelWrapperProps,
        getControlProps,
    } = useRadio(props);

    return (
        <Component
            {...getBaseProps()}
            className={cn(
                "group inline-flex items-center justify-between hover:bg-content2 flex-row-reverse",
                "max-w-[300px] cursor-pointer border-2 border-default rounded-lg gap-4 p-4",
                "data-[selected=true]:border-primary",
                "w-80"
            )}
        >
            <VisuallyHidden>
                <input {...getInputProps()} />
            </VisuallyHidden>
            <span {...getWrapperProps()}>
                <span {...getControlProps()} />
            </span>
            <div {...getLabelWrapperProps()}>
                {children && <span {...getLabelProps()}>{children}</span>}
                {description && (
                    <span className="text-small text-foreground opacity-70">
                        {description}
                    </span>
                )}
            </div>
        </Component>
    );
};

export const Settings = () => {
    const [wxId, setWxId] = React.useState<string>("");
    const [weChatVersion, setWeChatVersion] = React.useState<string>("");
    const [weChatDbPath, setWeChatDbPath] = React.useState<string>("");
    const [weChatKey, setWeChatKey] = React.useState<string>("");
    const [wxName, setWxName] = React.useState<string>("");

    const [isWeChatInfoLoaded, setIsWeChatInfoLoaded] =
        React.useState<boolean>(false);
    const [isWeChatDBLoaded, setIsWeChatDBLoaded] =
        React.useState<boolean>(false);
    const [selected, setSelected] = React.useState("");
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [isGetWeChatInfoFailed, setIsGetWeChatInfoFailed] =
        React.useState<boolean>(false);
    const [getWeChatInfoFailedMsg, setGetWeChatInfoFailedMsg] =
        React.useState<string>("");

    const [optionSelected, setOptionSelected] = React.useState("local");
    const [isVerified, setIsVerified] = React.useState<boolean>(false);

    const [inputUserName, setInputUserName] = useState("");
    const [inputPassword, setInputPassword] = useState("");

    const [open, setOpen] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");

    const [tempRunnerUrl, setTempRunnerUrl] = useState("");
    const [isTestingRunner, setIsTestingRunner] = useState(false);
    const [isRunnerConnected, setIsRunnerConnected] = useState(false);
    const { runnerApiUrl, setRunnerApiUrl } = useMyContext();

    async function handleGetWeChatInfo() {
        setIsGetWeChatInfoFailed(false);
        setIsWeChatInfoLoaded(false);
        const res = await getWeChatInfo();
        if (res.statusCode === 200 && res.data) {
            if (typeof res.data === "string") {
                // Handle the string case
                if (res.data === "[-] WeChat No Run") {
                    setIsGetWeChatInfoFailed(true);
                    setGetWeChatInfoFailedMsg(
                        "Please check if you have logged in to WeChat"
                    );
                }
            } else {
                // Handle the Info[] case
                // Now TypeScript knows res.data is an array of Info

                if (res.data[0].wxid === "None") {
                    setIsGetWeChatInfoFailed(true);
                    setGetWeChatInfoFailedMsg(
                        "Please check if you have logged in to WeChat"
                    );
                } else {
                    setWxId(res.data[0].wxid);
                    setWeChatVersion(res.data[0].version);
                    setWeChatDbPath(res.data[0].filePath);
                    setWeChatKey(res.data[0].key);
                    setWxName(res.data[0].name);

                    localStorage.setItem("wxid", res.data[0].wxid);
                }
            }
        } else {
            setIsGetWeChatInfoFailed(true);
            setGetWeChatInfoFailedMsg("请检查微信逆向是否在运行");
        }
        // console.log(res)
        setIsWeChatInfoLoaded(true);
    }

    async function handleInitWeChat() {
        onOpen();
        setIsWeChatDBLoaded(false);
        const reqBody = {
            init_type: "auto",
            key: weChatKey,
            media_path: "",
            micro_path: "",
            msg_path: "",
            my_wxid: wxId,
            wx_path: weChatDbPath,
        };
        const res = await initWeChat(reqBody);
        if (res.statusCode === 200 && res.data) {
            setIsWeChatDBLoaded(true);
            //set my_wxid into local storage
            localStorage.setItem("wxid", wxId);
            // console.log(res)
        } else {
            console.log(res);
        }
        setIsWeChatDBLoaded(true);
    }

    function handleGotoChat() {
        window.location.href = "/chat";
    }

    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    function handleOptionChange() {
        if (optionSelected === "local") {
            localStorage.setItem("useServerApi", "true");
            setOptionSelected("server");
        } else {
            localStorage.setItem("useServerApi", "false");
            setOptionSelected("local");
            handleGetWeChatInfo();
        }
    }

    async function handleVerifyPassword() {
        const reqBody = {
            userName: inputUserName,
            password: inputPassword,
        };
        const res = await ServerWeChatLogin(reqBody);
        if (res.statusCode === 200) {
            setAlertMsg("✅Verified");
            setOpen(true);
            setIsVerified(true);
            handleGetWeChatInfo();
        } else {
            setAlertMsg(`❌Verification failed, ${JSON.stringify(res)}`);
            setOpen(true);
            setIsVerified(false);
        }
    }

    const handleTestRunnerApi = useCallback(async () => {
        if (tempRunnerUrl === "") {
            setAlertMsg("❌Runner API URL cannot be empty");
            setOpen(true);
            return;
        }
        setIsTestingRunner(true);
        const res = await testRunner(tempRunnerUrl);
        if (res.statusCode === 200) {
            setAlertMsg("✅Runner API connected");
            setIsRunnerConnected(true);
        } else {
            setAlertMsg(`❌Runner API connection failed, ${JSON.stringify(res)}`);
            setIsRunnerConnected(false);
        }
        setOpen(true);
        setIsTestingRunner(false);
    }, [tempRunnerUrl]);

    const handleSaveRunnerApi = async () => {
        await handleTestRunnerApi();
        setRunnerApiUrl(tempRunnerUrl);
    };

    useEffect(() => {
        setTempRunnerUrl(runnerApiUrl);
        localStorage.setItem("useServerApi", "false");
        handleGetWeChatInfo();
        handleTestRunnerApi();
    }, []);

    return (
        <>
            <div
                className="w-full min-h-[90vh] flex flex-col items-center justify-center gap-10"

            >
                <div className="flex flex-col justify-center items-center gap-4">
                    <div className="text-2xl font-semibold">设置RWKV Runner 端口🌐</div>
                    <div className="text-sm font-thin">
                        确保在这里正确填写你的Runner端口
                    </div>
                    <div className="p-2 flex gap-2 dark:bg-blue-700/40 bg-blue-400/40 rounded-lg">
                        <div className="flex items-center justify-center">💡</div>
                        <div className="text-sm">
                            <div>如果你使用的是AI00, 请在URL尾部添加 /api/oai</div>
                            <div>例如：http://localhost:65530/api/oai</div>
                        </div>

                    </div>
                    <div className="bg-white border border-zinc-200 dark:border-none shadow-xl dark:bg-zinc-800 p-4 rounded-lg gap-4 w-[400px]  flex">
                        <div className="flex flex-1 flex-col">
                            <div className="font-semibold">当前端口：</div>
                            <div>{runnerApiUrl}</div>
                        </div>
                        <div
                            className="flex justify-center items-center cursor-pointer"
                            onClick={handleTestRunnerApi}
                        >
                            {isTestingRunner ? (
                                <Spinner size="sm" />
                            ) : (
                                <>
                                    {isRunnerConnected && (
                                        <Chip variant="flat" color="success" size="sm">
                                            已连接
                                        </Chip>
                                    )}
                                    {!isRunnerConnected && (
                                        <Chip variant="flat" color="warning" size="sm">
                                            连接失败
                                        </Chip>
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    <Input
                        variant="bordered"
                        label="Runner端口"
                        type="text"
                        value={tempRunnerUrl}
                        onValueChange={setTempRunnerUrl}
                    ></Input>
                    <Button fullWidth color="primary" onPress={handleSaveRunnerApi}>
                        更新/测试
                    </Button>
                </div>

                <div className="flex flex-col justify-end mt-4 ">
                    <div className="text-2xl font-semibold flex items-center justify-center gap-2">
                        设置你的微信账号
                        <RocketIcon />
                    </div>
                </div>
                {!isVerified && optionSelected === "server" && (
                    <div className=" w-80 flex flex-col gap-4">
                        <Input
                            variant="flat"
                            label="用户名"
                            type="text"
                            value={inputUserName}
                            onValueChange={setInputUserName}
                        ></Input>
                        <Input
                            variant="flat"
                            label="密码"
                            type="password"
                            value={inputPassword}
                            onValueChange={setInputPassword}
                        ></Input>
                        <Button color="primary" onPress={() => handleVerifyPassword()}>
                            验证
                        </Button>
                    </div>
                )}

                {(optionSelected === "local" ||
                    (isVerified && optionSelected === "server")) && (
                        <Card className="w-[400px]">
                            <CardHeader>
                                <div className="flex flex-col gap-2">
                                    <div>微信账号</div>
                                    <div className="text-center text-sm dark:text-zinc-600 text-zinc-500">
                                        选择一个微信账号进行导入
                                    </div>
                                </div>
                            </CardHeader>
                            <Divider />
                            <CardBody>
                                {isWeChatInfoLoaded ? (
                                    <>
                                        {isGetWeChatInfoFailed ? (
                                            <div className="w-full flex items-center justify-center flex-col gap-4">
                                                <Chip color="warning">获取微信信息失败</Chip>
                                                <div>{getWeChatInfoFailedMsg}</div>
                                                <Button
                                                    color="primary"
                                                    size="sm"
                                                    onPress={() => handleGetWeChatInfo()}
                                                >
                                                    重试
                                                </Button>
                                            </div>
                                        ) : (
                                            <RadioGroup
                                                value={selected}
                                                onValueChange={setSelected}
                                                className="w-full flex justify-center items-center"
                                            >
                                                <CustomRadio description={wxId} value="one">
                                                    {wxName}
                                                </CustomRadio>
                                            </RadioGroup>
                                        )}
                                    </>
                                ) : (
                                    <Skeleton className="rounded-lg w-full h-20"></Skeleton>
                                )}
                            </CardBody>
                            <Divider />
                            <CardFooter className="justify-end">
                                {selected === "one" ? (
                                    <Button color="primary" onPress={() => handleInitWeChat()}>
                                        选择
                                    </Button>
                                ) : (
                                    <Button color="default" disabled={true}>
                                        选择
                                    </Button>
                                )}
                            </CardFooter>
                        </Card>
                    )}
            </div>

            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                isDismissable={false}
                backdrop={"blur"}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                正在初始化微信
                            </ModalHeader>
                            <ModalBody>
                                {isWeChatDBLoaded ? (
                                    <div className="flex flex-col w-full items-center justify-center gap-4">
                                        <SuccessIcon />
                                        <div>初始化成功</div>
                                        <Button color="primary" onPress={() => handleGotoChat()}>
                                            前往聊天页
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="w-full flex flex-col items-center justify-center gap-4">
                                        <div className="flex flex-col items-center">
                                            <div className="font-semibold text-blue-600 text-lg">
                                                正在初始化
                                            </div>
                                            <div className="text-sm dark:text-zinc-500 text-zinc-600">
                                                这可能会花费一段时间
                                            </div>
                                        </div>
                                        <Progress
                                            size="sm"
                                            isIndeterminate
                                            aria-label="Loading..."
                                            className="max-w-md"
                                        />
                                    </div>
                                )}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    取消
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <Snackbar
                open={open}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                autoHideDuration={3000}
                onClose={handleClose}
                message={alertMsg}
            />

            <a href="/">
                <Button
                    className="fix bottom-4 right-4 fixed"
                    variant="light"
                    color="primary"
                >
                    ❔
                </Button>
            </a>
        </>
    );
};
