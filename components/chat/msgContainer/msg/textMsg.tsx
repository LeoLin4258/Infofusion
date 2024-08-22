"use client";

import { CopyIcon } from "@/components/icons/chat/copy-icon";
import { NikeIcon } from "@/components/icons/chat/nike-icon";
import { Button } from "@nextui-org/react";
import React, { useEffect } from "react";
import emojiMap from "./emojiMap";

interface MsgItemProps {
    msg: string
    isSender: number
}

export const TextMsg: React.FC<MsgItemProps> = ({ msg, isSender }) => {

    const [showCopied, setShowCopied] = React.useState(false);

    function handleCopyClick() {
        navigator.clipboard.writeText(msg);
        setShowCopied(true);

        setTimeout(() => {
            setShowCopied(false);
        }, 1000);
    }

    const convertEmojis = (text: string) => {
        return text.replace(/\[([^\]]+)\]/g, (match) => emojiMap[match] || match);
    };

    return (
        <>
            {isSender === 1 ? (
                <div className="flex gap-2 items-center">
                    <Button onPress={() => handleCopyClick()} size="sm" isIconOnly aria-label="Like" className="opacity-0 hover:opacity-100">
                        <div className="transition-opacity duration-300 ease-in-out">
                            {showCopied ? (
                                <NikeIcon className="opacity-100" />
                            ) : (
                                <CopyIcon className="opacity-100" />
                            )}
                        </div>
                    </Button>
                    <div className="max-w-[500px] shadow-md bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-950 rounded-xl py-2 px-4 break-all transition whitespace-pre-wrap">
                        {convertEmojis(msg)}

                    </div>
                </div>
            ) : (
                <div className="flex gap-2 items-center">
                    <div className=" max-w-[500px] shadow-md bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-950 rounded-xl py-2 px-4 break-all transition whitespace-pre-wrap">
                        {convertEmojis(msg)}
                    </div>
                    <Button onPress={() => handleCopyClick()} size="sm" isIconOnly aria-label="Like" className="opacity-0 hover:opacity-100">
                        <div className="transition-opacity duration-300 ease-in-out">
                            {showCopied ? (
                                <NikeIcon className="opacity-100" />
                            ) : (
                                <CopyIcon className="opacity-100" />
                            )}
                        </div>
                    </Button>
                </div>
            )}
        </>
    );
};

