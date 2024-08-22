"use client";

import { FileIcon } from "@/components/icons/chat/file-icon";
import { LinkIcon } from "@nextui-org/react";
import React, { useEffect } from "react";

interface MsgItemProps {
    linkSrc: string
    isSender: number
}

export const MiniProgramMsg: React.FC<MsgItemProps> = ({ linkSrc, isSender }) => {



    return (
        <>
            {isSender === 1 ? (
                <div className="gap-2 shadow-md h-20 items-center justify-center flex w-60 bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-950 rounded-xl py-2 px-4 break-all transition whitespace-pre-wrap">
                    <LinkIcon />
                    小程序卡片
                </div>
            ) : (

                <div className="gap-2 shadow-md h-20 items-center justify-center flex  w-60 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-950 rounded-xl py-2 px-4 break-all transition whitespace-pre-wrap">
                    小程序卡片
                    <LinkIcon />
                </div>
            )}
        </>
    );
};