"use client";

import { PhoneIcon } from "@/components/icons/chat/phone-icon";
import React, { useEffect } from "react";

interface MsgItemProps {
    // audioSrc: string
    isSender: number
}

export const VoiceChat: React.FC<MsgItemProps> = ({ isSender }) => {



    return (
        <>
            {isSender === 1 ? (
                <div className="gap-2 shadow-md items-center justify-center flex max-w-[500px] bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-950 rounded-xl py-2 px-4 break-all transition whitespace-pre-wrap">
                    
                    <PhoneIcon />
                    语言通话
                </div>
            ) : (

                <div className="gap-2 shadow-md items-center justify-center flex  max-w-[500px] bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-950 rounded-xl py-2 px-4 break-all transition whitespace-pre-wrap">
                    语言通话
                    <PhoneIcon />
                </div>
            )}
        </>
    );
};