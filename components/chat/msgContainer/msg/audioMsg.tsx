"use client";

import React, { useEffect } from "react";

interface MsgItemProps {
    audioSrc: string
    isSender: number
}

export const AudioMsg: React.FC<MsgItemProps> = ({ audioSrc, isSender }) => {



    return (
        <>
            {isSender === 1 ? (
                <audio className="shadow-md rounded-full" controls src={`http://127.0.0.1:5000/api/${audioSrc}`} ></audio>
            ) : (
                <audio className="shadow-md rounded-full" controls src={`http://127.0.0.1:5000/api/${audioSrc}`} ></audio>
            )}

        </>
    );
};