"use client";

import React, { useEffect, useState } from "react";

import { NoneMsgHint } from "./noneMsgHint";
import getMsg from "@/apis/getMsg";
import { MsgItem } from "./msgItem";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Input, Pagination, Progress, Tooltip } from "@nextui-org/react";
import moment from "moment";
import { MsgBanner } from "./msgBanner";
import getMsgChatCount from '@/apis/getMsgChatCount';
import { Contact, UserInfo, UserDetail } from '@/components/type';
import getAiRes from "@/apis/getAiRes";
import newMsgStream from "@/apis/newMsgStream";
import Snackbar from "@mui/material/Snackbar";
import localRes from "@/apis/localRes";
import { useMyContext } from "@/components/context/myContext";
import type { Selection } from "@nextui-org/react";
import getAiSummary from "@/apis/getAiSummary";

interface MsgContainerProps {
    contact: Contact;
}

type Message = {
    CreateTime: string;
    MsgSvrID: string;
    content: {
        msg: string;
        src: string;
        aiRes?: string[];
        promote?: string;
    };
    id: number;
    is_sender: number;
    room_name: string;
    talker: string;
    type_name: string;
};

export const MsgContainer: React.FC<MsgContainerProps> = ({ contact }) => {

    const [msgList, setMsgList] = useState<Message[]>([]);
    const [senderInfo, setSenderInfo] = useState<UserDetail | undefined>();
    const [userInfo, setUserInfo] = useState<UserInfo | undefined>();

    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [isChatMsgLoaded, setIsChatMsgLoaded] = useState<boolean>(false);
    const [msgCount, setMsgCount] = useState(0);
    const [currentUserID, setCurrentUserID] = useState<string>("");
    const pageSizeOpt = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
    const [pageSize, setPageSize] = useState(50);

    const [isGettingAiRes, setIsGettingAiRes] = useState<boolean>(false);
    const [aiRes, setAiRes] = useState<string[]>([]);

    const [open, setOpen] = useState(false);

    const { runnerApiUrl } = useMyContext();

    const [batchCount, setBatchCount] = useState("1");

    const isMoreThanAnHourApart = (date1: string, date2: string) => {
        const momentDate1 = moment(date1, "YYYY-MM-DD HH:mm:ss");
        const momentDate2 = moment(date2, "YYYY-MM-DD HH:mm:ss");
        return momentDate1.diff(momentDate2, 'hours', true) > 1;
    };

    useEffect(() => {
        setCurrentUserID(localStorage.getItem('currentUserID') as string);
        handleGetMsg(1);
        // handleStartNewMsgStream()
    }, [contact]);

    async function handleGetMsg(page: number) {
        const resMsgCount = await handleGetMsgCount();
        const thisUserId = localStorage.getItem('wxid')

        setIsChatMsgLoaded(false);
        if (contact && resMsgCount) {
            setCurrentPage(page);
            const start = resMsgCount - pageSize * page;
            const res = await getMsg({ start: start, limit: pageSize, wxid: contact.wxid });
            if (res.statusCode === 200 && res.data) {
                setMsgList(res.data.msg_list);
                const myInfo = res.data.user_list[thisUserId ? thisUserId : '0'];
                setSenderInfo(myInfo);
                setUserInfo(res.data.user_list);
                setTotalPages(Math.ceil(resMsgCount / pageSize));

                // if(page === 1) {
                //     setTimeout(() => {
                //         handleScrollToBottom();
                //     }, 100); // 延迟 100 毫秒执行滚动
                // }
            }
        }
        setIsChatMsgLoaded(true);
    }

    async function handleGetMsgCount() {
        if (!contact?.wxid) {
            console.error('Contact is undefined or wxid is missing');
            return 0;
        }
        const res = await getMsgChatCount({ wxid: contact.wxid });
        if (res.statusCode === 200 && res.count) {
            setMsgCount(res.count);
            return res.count;
        }
        setMsgCount(0);
        return 0;
    }

    function handleChangePage(page: number) {
        handleGetMsg(page);
    }
    // Handle scroll to bottom with smooth scroll
    function handleScrollToBottom() {
        const container = document.getElementById('scrollable-container');
        if (container) {
            container.scrollTo({
                top: container.scrollHeight - container.clientHeight,
                behavior: 'smooth'
            });
        }
    }

    // Handle scroll to top with smooth scroll
    function handleScrollToTop() {
        const container = document.getElementById('scrollable-container');
        if (container) {
            container.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }

    //Handle get AI reply
    async function handleGetAiRes() {
        setIsGettingAiRes(true);
        // =================================
        // prompt 处理
        // 注意格式，换行符，空格等
        // =================================
        let prompt = `以下是一段对话：`
        msgList.forEach((msg: Message) => {
            if (msg.content.msg && msg.content.msg !== '' && msg.type_name === '文本') {
                const cleanedMsg = msg.content.msg.replace(/\n+/g, '\n');
                if (msg.talker === '我') {
                    prompt += '\n\n' + senderInfo?.nickname + ': ' + cleanedMsg
                } else if (userInfo) {
                    prompt += '\n\n' + userInfo[msg.talker].nickname + ': ' + cleanedMsg
                }
            }
        });
        prompt += '\n\n' + senderInfo?.nickname + ':';
        console.log('prompt👇')
        console.log(JSON.stringify(prompt))
        const prama = {
            "frequency_penalty": 1,
            "max_tokens": 100,
            "model": "rwkv",
            "presence_penalty": 0,
            "prompt": prompt,
            "stream": false,
            "temperature": 1,
            "top_p": 0.3,
            "stop": ["\n\n", "✨AI生成"]
        }
        const res = await localRes({ prompt: prama, runnerUrl: runnerApiUrl, batchCount: batchCount });
        if (res) {
            const newMsgList = [...msgList];
            newMsgList.push({
                CreateTime: moment().format('YYYY-MM-DD HH:mm:ss'),
                MsgSvrID: '0',
                content: {
                    msg: '',
                    aiRes: res,
                    src: '',
                    promote: prompt
                },
                id: 0,
                is_sender: 1,
                room_name: '',
                talker: contact.wxid,
                type_name: 'AiRes'
            });
            setMsgList(newMsgList);
            setAiRes(res);
        } else {
            setOpen(true);
        }
        setIsGettingAiRes(false);
    }

    useEffect(() => {
        if (aiRes) {
            setTimeout(() => {
                handleScrollToBottom();
            }, 100); // 延迟 100 毫秒执行滚动
        }
    }, [aiRes]);

    //Handle start register new msg stream
    async function handleStartNewMsgStream() {
        const res = await newMsgStream()
        console.log(res)
    }

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    const renderMessages = () => {
        const messageElements: React.ReactNode[] = [];
        msgList.forEach((msg, index) => {
            if (index > 0 && isMoreThanAnHourApart(msg.CreateTime, msgList[index - 1].CreateTime)) {
                messageElements.push(<div className="w-full items-center justify-center flex dark:text-zinc-500 text-zinc-400 text-sm " key={`time-divider-${index}`}><div className="py-2 px-4 rounded-lg">{moment(msg.CreateTime).format('LLL')}</div></div>);
            }
            messageElements.push(<MsgItem aiRes={aiRes} msg={msg} senderInfo={senderInfo} receiverInfo={userInfo ? userInfo[msg.talker] : undefined} key={index} />);
        });
        return messageElements;
    };

    const handleGetAiSummary = async () => {
        setIsGettingAiRes(true);
        let rawMessages = ''
        msgList.forEach((msg: Message) => {
            if (msg.type_name === "文本") {
                const talkerInfo = userInfo ? userInfo[msg.talker] : undefined;
                const talkerName = talkerInfo ? talkerInfo.nickname : msg.talker;
                rawMessages += '\n\n' + talkerName + ': ' + msg.content.msg
            }
        });

        console.log('rawMessages👇')
        console.log(rawMessages)

        const res = await getAiSummary({ messages: rawMessages, runnerUrl: runnerApiUrl });
        console.log(111, res)
        if (res) {
            const newMsgList = [...msgList];
            newMsgList.push({
                CreateTime: moment().format('YYYY-MM-DD HH:mm:ss'),
                MsgSvrID: '0',
                content: {
                    msg: JSON.stringify(res),
                    src: '',
                    aiRes: [],
                    promote: rawMessages
                },
                id: 0,
                is_sender: 1,
                room_name: '',
                talker: contact.wxid,
                type_name: 'AiSummary'
            })
            setMsgList(newMsgList);
            setTimeout(() => {
                handleScrollToBottom();
            }, 100);
        }
        setIsGettingAiRes(false);
    }

    return (
        <>
            {contact ? (
                <div className="flex flex-col w-full h-full">
                    <MsgBanner contact={contact} msgCount={msgCount} />
                    <div className="flex flex-col flex-1">
                        <div id="scrollable-container" className="flex flex-col overflow-scroll scrollbar-hide" style={{ height: 'calc(100vh - 190px)' }}>
                            {isChatMsgLoaded ? (
                                <>
                                    {renderMessages()}
                                    <div className="op opacity-0" id="msgBottom"></div>
                                </>
                            ) : (
                                <div className="w-full h-full items-center justify-center flex flex-col gap-2">
                                    <Progress size="sm" isIndeterminate aria-label="Loading..." className="max-w-md" />
                                </div>
                            )}
                        </div>
                        <div className="flex items-center justify-between py-2 bg-transparent px-4 ">
                            <div className=" flex space-x-2 ">
                                <Tooltip content="滚动到底部" >
                                    <Button size="sm" isIconOnly onPress={() => handleScrollToBottom()}>👇</Button>
                                </Tooltip>
                                <Tooltip content="滚动到顶部" >
                                    <Button size="sm" isIconOnly onPress={() => handleScrollToTop()}>👆</Button>
                                </Tooltip>
                            </div>
                            <div className="flex-grow flex justify-center ">
                                <Pagination total={totalPages} page={currentPage} onChange={(page) => handleChangePage(page)} />
                            </div>

                            {/* AI总结 */}
                            <div className="flex  px-2 py-1 rounded-lg hover:dark:bg-zinc-900 transition-background duration-200">
                                {isGettingAiRes ? (
                                    <Tooltip content="正在AI总结..." >
                                        <Button isLoading size="sm" color="success">总结中</Button>
                                    </Tooltip>
                                ) : (
                                    <Tooltip content="AI总结" >
                                        <Button  size="sm" color="success" onPress={() => handleGetAiSummary()}>总结</Button>
                                    </Tooltip>
                                )}
                            </div>


                            <div className="h-8 border-l dark:border-zinc-800"> </div>

                            {/* AI续写 */}
                            <div className="flex  px-2 py-1 rounded-lg hover:dark:bg-zinc-900 transition-background duration-200">
                                <Dropdown>
                                    <DropdownTrigger>
                                        <Button isIconOnly variant="flat" size="sm" className="mr-2">
                                            {batchCount}
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu
                                        aria-label="AI生成次数"
                                        variant="flat"
                                        disallowEmptySelection
                                        selectionMode="single"
                                        selectedKeys={batchCount}
                                        onAction={(key) => setBatchCount(key.toString())}
                                    >
                                        <DropdownSection title="AI生成次数">
                                            <DropdownItem key="1">1</DropdownItem>
                                            <DropdownItem key="2">2</DropdownItem>
                                            <DropdownItem key="3">3</DropdownItem>
                                            <DropdownItem key="4">4</DropdownItem>
                                            <DropdownItem key="5">5</DropdownItem>
                                        </DropdownSection>
                                    </DropdownMenu>
                                </Dropdown>
                                <div>
                                    {isGettingAiRes ? (
                                        <Tooltip content="正在AI续写..." >
                                            <Button isIconOnly isLoading size="sm" color="primary"></Button>
                                        </Tooltip>
                                    ) : (
                                        <Tooltip content="AI续写" >
                                            <Button isIconOnly size="sm" color="primary" onPress={() => handleGetAiRes()}>✨</Button>
                                        </Tooltip>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            ) : (
                <NoneMsgHint />
            )}

            <Snackbar
                open={open}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                autoHideDuration={10000}
                onClose={handleClose}
                message={"⚠️获取AI续写失败，请检查你的Runner"}
            />
        </>
    );
};
