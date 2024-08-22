"use client";

import { FileIcon } from "@/components/icons/chat/file-icon";
import { LinkIcon } from "@nextui-org/react";
import React, { useEffect } from "react";

interface MsgItemProps {
    linkSrc: string
    isSender: number
}

export const CardLinkMsg: React.FC<MsgItemProps> = ({ linkSrc, isSender }) => {



    return (
        <>
            {isSender === 1 ? (
                <div className="gap-2 shadow-md h-20 items-center justify-center flex w-60 bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-950 rounded-xl py-2 px-4 break-all transition whitespace-pre-wrap">
                    <LinkIcon />
                    卡片式链接
                </div>
            ) : (

                <div className="gap-2 shadow-md h-20 items-center justify-center flex  w-60 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-950 rounded-xl py-2 px-4 break-all transition whitespace-pre-wrap">
                    卡片式链接
                    <LinkIcon />
                </div>
            )}
        </>
    );
};