"use client";

import { MemeFailIcon } from "@/components/icons/chat/memeFail";
import React, { useEffect } from "react";

interface MsgItemProps {
    memeSrc: string
    isSender: number
}

export const GifMsg: React.FC<MsgItemProps> = ({ memeSrc, isSender }) => {


    return (
        <>
            {isSender === 1 ? (
                <div className="shadow-md items-center justify-center gap-2 max-w-[500px] cursor-pointer overflow-hidden bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-950 rounded-xl  break-all transition whitespace-pre-wrap">
                    <div className="flex p-2  w-full gap-2 items-center justify-center">
                        <MemeFailIcon />
                        <div className="">表情加载失败</div>
                    </div>
                </div>
            ) : (
                <div className="shadow-md items-center justify-center gap-2 max-w-[500px] cursor-pointer overflow-hidden bg-amber-400 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-950 rounded-xl  break-all transition whitespace-pre-wrap">
                    <div className="flex p-2  w-full gap-2 items-center justify-center">
                        <div className="">表情加载失败</div>
                        <MemeFailIcon />
                    </div>
                </div>
            )}
        </>
    );
};

