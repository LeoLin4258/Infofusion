import { Accordion, AccordionItem, Checkbox } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { json } from "stream/consumers";

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

    const [msgList, setMsgList] = useState<MsgItem[]>([]);

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

    return (
        <div className="rounded-lg shadow-lg  p-4 flex flex-col w-full gap-4 mx-12
                        bg-gradient-to-tr from-blue-500/30 via-blue-200/30 to-zinc-300/30
                        dark:from-blue-800/30 dark:via-blue-700/30 dark:to-zinc-500/30"
        >
            <div className="w-full flex  ">
                <div className="flex flex-1 text-sm text-zinc-950 dark:text-zinc-50">
                    ✨ power by RWKV
                </div>
                {copied && <div className="text-sm">✅ 已复制</div>}
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
        </div>
    );
};
