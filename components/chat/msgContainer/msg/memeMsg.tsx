"use client";

import { MemeFailIcon } from "@/components/icons/chat/memeFail";
import React, { useEffect } from "react";
import { Image } from "@nextui-org/react";


interface MsgItemProps {
    memeSrc: string
    isSender: number
}

export const MemeMsg: React.FC<MsgItemProps> = ({ memeSrc, isSender }) => {


    return (
        <>
            {isSender === 1 ? (
                <>
                    {memeSrc ? (
                        <Image src={memeSrc} width={100} isBlurred loading="lazy"></Image>
                    ) : (
                        <div className="shadow-md items-center justify-center gap-2 max-w-[500px] cursor-pointer overflow-hidden bg-amber-400 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-950 rounded-xl  break-all transition whitespace-pre-wrap">
                            <div className="flex p-2  w-full gap-2 items-center justify-center">
                                <div className="">表情加载失败</div>
                                <MemeFailIcon />
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <>
                    {memeSrc ? (
                        <Image src={memeSrc} width={100} isBlurred loading="lazy"></Image>
                    ) : (
                        <div className="shadow-md items-center justify-center gap-2 max-w-[500px] cursor-pointer overflow-hidden bg-amber-400 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-950 rounded-xl  break-all transition whitespace-pre-wrap">
                            <div className="flex p-2  w-full gap-2 items-center justify-center">
                                <div className="">表情加载失败</div>
                                <MemeFailIcon />
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

