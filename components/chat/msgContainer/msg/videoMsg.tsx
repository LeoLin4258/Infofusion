"use client";

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import React, { useEffect } from "react";

interface MsgItemProps {
    videoUrl: string
    isSender: number
}

export const VideoMsg: React.FC<MsgItemProps> = ({ videoUrl, isSender }) => {


    return (
        <>
            {isSender === 1 ? (
                <div className="shadow-md max-w-[500px] cursor-pointer overflow-hidden bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-950 rounded-xl  break-all transition whitespace-pre-wrap">
                    <video controls src={`http://127.0.0.1:5000/api/video/${videoUrl}`} className="max-w-full max-h-[400px] h-auto"></video>
                </div>
            ) : (

                <div  className="shadow-md max-w-[500px] cursor-pointer overflow-hidden bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-950 rounded-xl  break-all transition whitespace-pre-wrap">
                    <video controls src={`http://127.0.0.1:5000/api/video/${videoUrl}`} className="max-w-full max-h-[400px] h-auto"></video>
                </div>
            )}


        </>
    );
};
