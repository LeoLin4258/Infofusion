"use client";

import { FileIcon } from "@/components/icons/chat/file-icon";
import { PhoneIcon } from "@/components/icons/chat/phone-icon";
import React, { useEffect } from "react";

interface MsgItemProps {
    fileSrc: string
    isSender: number
}

export const FileMsg: React.FC<MsgItemProps> = ({ fileSrc, isSender }) => {



    return (
        <>
            {isSender === 1 ? (
                <div className="gap-2 shadow-md items-center justify-center flex w-60 bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-950 rounded-xl py-2 px-4 break-all transition whitespace-pre-wrap">
                    <FileIcon />
                    {fileSrc}
                </div>
            ) : (

                <div className="gap-2 shadow-md items-center justify-center flex  w-60 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-950 rounded-xl py-2 px-4 break-all transition whitespace-pre-wrap">
                    {fileSrc}
                    <FileIcon />
                </div>
            )}
        </>
    );
};