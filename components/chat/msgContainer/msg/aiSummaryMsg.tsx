"use client";

import React, { useEffect } from "react";

interface MsgItemProps {
    msg: string
    prompt: string
}

export const AiSummaryMsg: React.FC<MsgItemProps> = ({ msg, prompt }) => {
    const processedMsg = msg
        .replace(/\\n/g, '\n')
        .replace(/^"|"$/g, '');

    const formattedMsg = processedMsg.split('\n').map((line, index) => (
        <React.Fragment key={index}>
            {line}
            <br />
        </React.Fragment>
    ));

    return (
        <>
            <div className="rounded-lg shadow-lg  p-4 flex flex-col w-full gap-4 mx-12
                        bg-gradient-to-tr from-blue-500/30 via-blue-200/30 to-zinc-300/30
                        dark:from-blue-800/30 dark:via-blue-700/30 dark:to-zinc-500/30"
            >
                <div className="text-sm">{formattedMsg}</div>
            </div>
        </>
    );
};