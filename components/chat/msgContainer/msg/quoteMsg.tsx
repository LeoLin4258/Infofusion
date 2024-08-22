"use client";

import React, { useEffect } from "react";

interface MsgItemProps {
    msg: string
    isSender: number
}

export const QuoteMsg: React.FC<MsgItemProps> = ({ msg, isSender }) => {


    return (
        <>
            {isSender === 1 ? (
                <div className="max-w-[500px] shadow-md bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-950 rounded-xl py-2 px-4 break-all transition whitespace-pre-wrap">
                    {msg}
                </div>
            ) : (

                <div className=" max-w-[500px] shadow-md bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-950 rounded-xl py-2 px-4 break-all transition whitespace-pre-wrap">
                    {msg}
                </div>
            )}
        </>
    );
};

