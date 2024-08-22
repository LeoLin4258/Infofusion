"use client";

import getMsg from "@/apis/getMsg";
import { MenuIcon } from "@/components/icons/chat/menu-icon";
import { SuccessIcon } from "@/components/icons/chat/success-icon";
import {
    Avatar,
    Button,
    Chip,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Progress,
    useDisclosure,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Contact } from "@/components/type";

// Define the props for the SideBarContainer
interface MsgBannerProps {
    contact: Contact;
    msgCount: number;
}
type Message = {
    CreateTime: string;
    MsgSvrID: string;
    content: {
        msg: string;
        src: string;
    };
    id: number;
    is_sender: number; // 0是发送者 1是接收者
    room_name: string;
    talker: string;
    type_name: string;
};

export const MsgBanner: React.FC<MsgBannerProps> = ({ contact, msgCount }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isChatDataLoaded, setIsChatDataLoaded] = useState(false);

    const [transformedData, setTransformedData] = useState("");

    async function handleGetMsg() {
        if (contact) {
            const res = await getMsg({
                start: 0,
                limit: msgCount,
                wxid: contact.nickname,
            });
            if (res.statusCode === 200 && res.data) {
                setIsChatDataLoaded(true);
                return res.data.msg_list;
            }
        } else {
            return [];
        }
    }

    async function handleExportClick() {
        setIsChatDataLoaded(false);
        onOpen();
        const rawMsgList = await handleGetMsg();

        if (rawMsgList && rawMsgList.length > 0) {
            const transformedMsgListJson = rawMsgList
                .map((message) => {
                    const talkerId = message.is_sender === 1 ? "me" : message.talker;
                    const msgContent = message.content.msg;
                    const time = message.CreateTime;

                    return JSON.stringify({
                        [talkerId]: msgContent,
                        time: time,
                    });
                })
                .join(",\n");

            const jsonData = `[${transformedMsgListJson}]`;
            setTransformedData(jsonData);
        } else {
            console.log("No messages to export");
        }
        setIsChatDataLoaded(true);
    }

    function handleDownLoadClick() {
        if (transformedData) {
            downloadJSONL(
                transformedData,
                `${contact.remark ? contact.remark : contact.nickname}.jsonl`
            );
        } else {
            console.log("No data to download");
        }
    }

    function downloadJSONL(data: BlobPart, filename: string) {
        const blob = new Blob([data], { type: "text/jsonl" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
    }

    return (
        <>
            <div className="w-full border-b-1 dark:border-zinc-800 p-4 flex items-center">
                <div className="flex flex-1">
                    {" "}
                    {contact ? (contact.remark ? contact.remark : contact.nickname) : ""}
                </div>
                <Dropdown>
                    <DropdownTrigger>
                        <Button isIconOnly size="sm" variant="bordered">
                            <MenuIcon />
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                        <DropdownItem key="new" onPress={() => handleExportClick()}>
                            导出聊天数据
                        </DropdownItem>
                        <DropdownItem isDisabled key="copy">
                            置顶
                        </DropdownItem>
                        <DropdownItem isDisabled key="edit">
                            免打扰
                        </DropdownItem>
                        <DropdownItem
                            isDisabled
                            key="delete"
                            className="text-danger"
                            color="danger"
                        >
                            删除
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                导出聊天数据
                            </ModalHeader>
                            <ModalBody>
                                {isChatDataLoaded ? (
                                    <div className="flex flex-col w-full items-center justify-center gap-4">
                                        <SuccessIcon />
                                        <div>准备完成</div>
                                        <div className="shadow-md dark:bg-zinc-950 bg-zinc-100 p-4 rounded-lg flex items-center min-w-80 gap-4">
                                            <Avatar
                                                src={contact.headImgUrl}
                                                className="flex-shrink-0"
                                            />
                                            <div className="flex flex-1 flex-col">
                                                <div className="font-semibold truncate ">
                                                    {contact.remark ? contact.remark : contact.nickname}
                                                </div>
                                                <span className="text-sm">
                                                    聊天数据长度:{" "}
                                                    <span className="text-blue-600">{msgCount}</span>
                                                </span>
                                            </div>
                                            <Chip size="sm" color="default">
                                                jsonl
                                            </Chip>
                                        </div>
                                        <Button
                                            color="primary"
                                            onPress={() => handleDownLoadClick()}
                                        >
                                            下载
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="w-full flex flex-col items-center justify-center gap-4">
                                        <div className="flex flex-col items-center">
                                            <div className="font-semibold text-blue-600 text-lg">
                                                正在准备
                                            </div>
                                            <div className="text-sm dark:text-zinc-500 text-zinc-600">
                                                这可能会花费一段时间
                                            </div>
                                        </div>
                                        <Progress
                                            size="sm"
                                            isIndeterminate
                                            aria-label="Loading..."
                                            className="max-w-md"
                                        />
                                    </div>
                                )}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    取消
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};
