import { UploadIcon } from "@/components/icons/chat/upload-icon";
import { Rating } from "@mui/material";
import { Accordion, AccordionItem, Button, Checkbox, ModalContent, Modal, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import PostMsg from '@/apis/postMsg';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface MsgItemProps {
    msg: string;
    currentUserName: string;
    prompt: string;
    aiRes?: string[]
}

type MsgItem = {
    userName: string;
    msg: string;
};

export const AiResMsg: React.FC<MsgItemProps> = ({
    msg,
    currentUserName,
    prompt,
    aiRes
}) => {
    const [copied, setCopied] = useState(false);
    const [addLabel, setAddLabel] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

    const [msgList, setMsgList] = useState<MsgItem[]>([]);

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const [value, setValue] = React.useState<number | null>(2);

    function msgToArray(msg: string) {
        const msgArr = msg.split("\n\n");
        const res = msgArr.map((item) => {
            const arr = item.split(": ");
            return {
                userName: arr[0],
                msg: arr[1],
            };
        });
        return res;
    }

    useEffect(() => {
        const savedAddLabel = localStorage.getItem("addLabel");
        if (savedAddLabel !== null) {
            setAddLabel(savedAddLabel === "true");
        }
        const modifiedMsg = currentUserName + ": " + msg;
        const res = msgToArray(modifiedMsg);
        setMsgList(res);
    }, [msg]);

    const copyToClipboard = async (content: string) => {
        try {
            await navigator.clipboard.writeText(content);
            setCopied(true);

            // Automatically hide "✅ Copied" after 2 seconds
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (error) {
            console.error("Failed to copy to clipboard:", error);
        }
    };

    const renderMsgWithLabel = (content: string) => {
        return addLabel ? `${content} ✨AI生成` : content;
    };

    const handleAddLabelChange = (checked: boolean) => {
        setAddLabel(checked);
        localStorage.setItem("addLabel", String(checked));
    };

    async function handlePostMsg() {
        const result = await PostMsg({
            prompt: prompt,
            ai_res: msg,
            ratting: value || -1
        });

        if (result.statusCode === 201) {
            console.log(result.msg);
            onClose(); // Close the modal
            setSnackbarMessage("成功上传数据");
            setSnackbarSeverity("success");
        } else {
            console.error(result.msg);
            setSnackbarMessage("上传失败，请稍后重试");
            setSnackbarSeverity("error");
        }
        setSnackbarOpen(true);
    }

    const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    return (
        <div className="rounded-lg shadow-lg  p-4 flex flex-col w-full gap-4 mx-12
                        bg-gradient-to-tr from-blue-500/30 via-blue-200/30 to-zinc-300/30
                        dark:from-blue-800/30 dark:via-blue-700/30 dark:to-zinc-500/30"
        >
            <div className="w-full flex items-center">
                <div className="flex flex-1 text-sm text-zinc-950 dark:text-zinc-50">
                    ✨ power by RWKV
                </div>
                {copied && <div className="text-sm mr-2">✅ 已复制</div>}
                <Button onPress={onOpen} size="sm" variant="light" color="success" className="rounded-full"><UploadIcon></UploadIcon></Button>
            </div>

            <div className="flex flex-col gap-2">
                {aiRes && aiRes.map((content, index) => (
                    <div
                        key={index}
                        className="mt-2"
                        onClick={() => copyToClipboard(renderMsgWithLabel(content))}
                    >
                        <div className="p-4 shadow-md rounded-lg bg-zinc-50/30 dark:bg-zinc-600/30 dark:hover:bg-blue-600/30 hover:bg-blue-300/30 transition-all cursor-pointer">
                            {renderMsgWithLabel(content)}
                        </div>
                    </div>
                ))}

            </div>
            <div className="mt-4">
                <Checkbox
                    size="sm"
                    checked={addLabel}
                    onChange={(e) => handleAddLabelChange(e.target.checked)}
                >
                    添加 “✨AI生成” 标签
                </Checkbox>
            </div>

            <Accordion isCompact>
                <AccordionItem key="1" aria-label="Prompt:" title="Prompt:">
                    <div className="p-2 shadow-md rounded-lg bg-zinc-50/30 dark:bg-zinc-600/30  transition-all">
                        {JSON.stringify(prompt)}
                    </div>
                </AccordionItem>
            </Accordion>

            <Modal size="xl" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">贡献这次生成</ModalHeader>
                            <ModalBody>
                                <div className="flex flex-col">
                                    Prompt:
                                    <div className="w-full text-xs p-2 rounded-lg bg-stone-50 dark:bg-stone-900 text-zinc-950/70 dark:text-zinc-50/70 border dark:border-0 shadow-lg border-stone-100  mb-2">
                                        {prompt}
                                    </div>
                                    AI生成:
                                    <div className="w-full text-xs p-2 rounded-lg bg-stone-50 dark:bg-stone-900 text-zinc-950/70 dark:text-zinc-50/70 border dark:border-0 shadow-lg border-stone-100  mb-2">
                                        {msg}
                                    </div>
                                </div>
                                <div className="flex justify-between mt-4">
                                    评分：
                                    <Rating
                                        value={value}
                                        onChange={(e) => setValue(Number((e.target as HTMLInputElement).value))}
                                    />
                                    {value}
                                </div>
                                <div className="flex gap-2 bg-green-600/10 p-2 rounded-lg mt-4">
                                    <div className="text-xl flex items-center">❤️</div>
                                    <div className="flex flex-col text-sm dark:text-zinc-50/70 text-zinc-950/70">
                                        <div >感谢你为我们提供宝贵的真实聊天数据</div>
                                        <div>聊天数据将会已完全匿名的方式上传，并且只有该项目的开发人员可见</div>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    取消
                                </Button>
                                <Button color="primary" onPress={handlePostMsg}>
                                    上传
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};
