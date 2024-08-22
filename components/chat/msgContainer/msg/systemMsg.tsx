"use client";

import React, { useEffect } from "react";

interface MsgItemProps {
    msg: string
}

export const SystemMsg: React.FC<MsgItemProps> = ({ msg }) => {


    const stripHtml = (html: string): string => html.replace(/<[^>]*>?/gm, '');

    return (
        <div className="flex items-center justify-center w-full text-sm px-10 text-center dark:text-zinc-500 text-zinc-400">{stripHtml(msg)}</div>
    );
};

