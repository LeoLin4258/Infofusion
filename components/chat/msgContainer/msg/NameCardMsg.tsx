"use client";

import { FileIcon } from "@/components/icons/chat/file-icon";
import { Avatar, LinkIcon } from "@nextui-org/react";
import React, { useEffect } from "react";

interface MsgItemProps {
    msg: string
    isSender: number
}

export const NameCardMsg: React.FC<MsgItemProps> = ({ msg, isSender }) => {

    const smallHeadImgUrlMatch = msg.match(/smallheadimgurl="([^"]+)"/);
    const nicknameMatch = msg.match(/nickname="([^"]+)"/);

    const smallHeadImgUrl = smallHeadImgUrlMatch ? smallHeadImgUrlMatch[1] : '';
    const nickname = nicknameMatch ? nicknameMatch[1] : '';

    return (
        <>
            {isSender === 1 ? (
                <div className="gap-2 shadow-md  h-20 items-center justify-center flex w-60 bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-950 rounded-xl py-2 px-4 break-all transition whitespace-pre-wrap">
                    <Avatar className="flex-shrink-0" size="md" radius="md" src={smallHeadImgUrl}></Avatar>
                    <div>{nickname}</div>
                </div>
            ) : (

                <div className="gap-2 shadow-md h-20 items-center justify-center flex   w-60 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-950 rounded-xl py-2 px-4 break-all transition whitespace-pre-wrap">

                    <Avatar className="flex-shrink-0" size="md" radius="md" src={smallHeadImgUrl}></Avatar>
                    <div>{nickname}</div>


                </div>
            )}
        </>
    );
};