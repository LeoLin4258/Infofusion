"use client";

import { Avatar, Tooltip } from "@nextui-org/react";
import React, { useEffect } from "react";
import { TextMsg } from "./msg/textMsg";
import { SystemMsg } from "./msg/systemMsg";
import { ImgMsg } from "./msg/imgMsg";
import { AudioMsg } from "./msg/audioMsg";
import { VoiceChat } from "./msg/voiceChat";
import { FileMsg } from "./msg/fileMsg";
import { QuoteMsg } from "./msg/quoteMsg";
import { MemeMsg } from "./msg/memeMsg";
import { CardLinkMsg } from "./msg/cardLink";
import { GifMsg } from "./msg/gifMsg";
import { MiniProgramMsg } from "./msg/miniProgramMsg";
import { VideoMsg } from "./msg/videoMsg";
import { NameCardMsg } from "./msg/NameCardMsg";
import { AiResMsg } from "./msg/aiResMsg";
interface ApiResUserInfo {
    account: string;
    describe: string;
    headImgUrl: string;
    nickname: string;
    remark: string;
    username: string;
}
interface Message {
    CreateTime: string;
    MsgSvrID: string;
    content: {
        msg: string;
        aiRes?: string[]
        src: string;
        promote?: string;
    };
    id: number;
    is_sender: number; // 0是发送者 1是接收者
    room_name: string;
    talker: string;
    type_name: string;
}

interface MsgItemProps {
    aiRes?: string[]
    msg: Message; // Array of Contact objects
    senderInfo: ApiResUserInfo | undefined;
    receiverInfo: ApiResUserInfo | undefined;
}

export const MsgItem: React.FC<MsgItemProps> = ({ aiRes, msg, senderInfo, receiverInfo }) => {


    return (
        <div className="w-full flex p-4">
            {(msg.type_name === "系统通知" || msg.type_name === "未知") ? (
                <SystemMsg msg={msg.content.msg} />
            ) : (
                <>
                    {msg.is_sender === 1 ? (
                        <div className=" w-full flex justify-end items-center gap-2" >

                            {msg.type_name === "文本" && (
                                <TextMsg msg={msg.content.msg} isSender={msg.is_sender} />
                            )}
                            {msg.type_name === "图片" && (
                                <ImgMsg imgSrc={msg.content.src} isSender={msg.is_sender} />
                            )}
                            {msg.type_name === "视频" && (
                                <VideoMsg videoUrl={msg.content.src} isSender={msg.is_sender} />
                            )}
                            {msg.type_name === "语音" && (
                                <AudioMsg audioSrc={msg.content.src} isSender={msg.is_sender} />
                            )}
                            {msg.type_name === "语音通话" && (
                                <VoiceChat isSender={msg.is_sender} />
                            )}
                            {msg.type_name === "文件" && (
                                <FileMsg fileSrc={msg.content.src} isSender={msg.is_sender} />
                            )}
                            {msg.type_name === "带有引用的文本消息" && (
                                <QuoteMsg msg={msg.content.msg} isSender={msg.is_sender} />
                            )}
                            {msg.type_name === "动画表情" && (
                                <MemeMsg memeSrc={msg.content.src} isSender={msg.is_sender} />
                            )}
                            {(msg.type_name === "用户上传的GIF表情") && (
                                <GifMsg memeSrc={msg.content.src} isSender={msg.is_sender} />
                            )}
                            {msg.type_name === "卡片式链接" && (
                                <CardLinkMsg linkSrc={msg.content.src} isSender={msg.is_sender} />
                            )}
                            {msg.type_name === "分享的小程序" && (
                                <MiniProgramMsg linkSrc={msg.content.src} isSender={msg.is_sender} />
                            )}
                            {msg.type_name === "推荐公众号" && (
                                <NameCardMsg msg={msg.content.msg} isSender={msg.is_sender} />
                            )}
                            {msg.type_name === "AiRes" && (
                                <AiResMsg currentUserName={senderInfo ? senderInfo.nickname : ''} aiRes={aiRes} msg={msg.content.aiRes ? msg.content.aiRes.toString() : ""} prompt={msg.content.promote ? msg.content.promote : " "} />
                            )}
                            {
                                msg.type_name !== "AiRes" && (
                                    <Avatar src={senderInfo?.headImgUrl} className="flex-shrink-0" />
                                )
                            }
                        </div>
                    ) : (
                        <div className=" w-full flex justify-start items-center gap-2" >
                            <Tooltip content={receiverInfo?.remark ? receiverInfo?.remark : receiverInfo?.nickname}>
                                <Avatar src={receiverInfo?.headImgUrl} className="flex-shrink-0" />
                            </Tooltip>
                            {msg.type_name === "文本" && (
                                <TextMsg msg={msg.content.msg} isSender={msg.is_sender} />
                            )}
                            {msg.type_name === "图片" && (
                                <ImgMsg imgSrc={msg.content.src} isSender={msg.is_sender} />
                            )}
                            {msg.type_name === "视频" && (
                                <VideoMsg videoUrl={msg.content.src} isSender={msg.is_sender} />
                            )}
                            {msg.type_name === "语音" && (
                                <AudioMsg audioSrc={msg.content.src} isSender={msg.is_sender} />
                            )}
                            {msg.type_name === "语音通话" && (
                                <VoiceChat isSender={msg.is_sender} />
                            )}
                            {msg.type_name === "文件" && (
                                <FileMsg fileSrc={msg.content.src} isSender={msg.is_sender} />
                            )}
                            {msg.type_name === "带有引用的文本消息" && (
                                <QuoteMsg msg={msg.content.msg} isSender={msg.is_sender} />
                            )}
                            {(msg.type_name === "动画表情") && (
                                <MemeMsg memeSrc={msg.content.src} isSender={msg.is_sender} />
                            )}
                            {(msg.type_name === "用户上传的GIF表情") && (
                                <GifMsg memeSrc={msg.content.src} isSender={msg.is_sender} />
                            )}
                            {msg.type_name === "卡片式链接" && (
                                <CardLinkMsg linkSrc={msg.content.src} isSender={msg.is_sender} />
                            )}
                            {msg.type_name === "分享的小程序" && (
                                <MiniProgramMsg linkSrc={msg.content.src} isSender={msg.is_sender} />
                            )}
                            {msg.type_name === "推荐公众号" && (
                                <NameCardMsg msg={msg.content.msg} isSender={msg.is_sender} />
                            )}
                        </div>
                    )}</>
            )}
        </div>
    );
};