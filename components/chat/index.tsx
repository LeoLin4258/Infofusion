"use client";

import React, { useCallback, useEffect } from "react";
import { SideBarContainer } from "./sidebar/sidebarContainer";
import getContactList from "@/apis/getContactList";
import { MsgContainer } from "./msgContainer/msgContainer";
import { ContactSkeleton } from "./msgContainer/Skeleton/contactSkeleton";
import { Contact } from '../type';


export const Chat = () => {
    const [contactList, setContactList] = React.useState<Contact[]>([]);
    const [selectedIndex, setSelectedIndex] = React.useState<number>(-1);

    const [isContactLoaded, setIsContactLoaded] = React.useState<boolean>(false);

    // Get contact list with debounce
    const handleGetContactList = useCallback(immediateDebounce(async () => {
        setIsContactLoaded(false);
        const res = await getContactList({ start: 0, limit: 999, word: '', filterZeroCount: false });
        if (res.statusCode === 200 && res.data) {
            setContactList(res.data);
            handleChangeSelectedIndex(0);
        }
        setIsContactLoaded(true);
        // console.log(res);
    }, 500), []); // 500ms delay

    // Debounce
    function immediateDebounce(func: (...args: any[]) => void, delay: number): (...args: any[]) => void {
        let timer: NodeJS.Timeout | null = null;
        let isFirstCall = true; // Check if the function is called for the first time

        return function (...args: any[]) {
            if (isFirstCall) {
                func(...args);
                isFirstCall = false;
                return;
            }

            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                func(...args);
                isFirstCall = true;
            }, delay);
        };
    }
    function handleChangeSelectedIndex(index: number) {
        setSelectedIndex(index);
    }

    useEffect(() => {
        setIsContactLoaded(false);
        handleGetContactList()
    }, [])

    return (
        <div className=" w-full flex " style={{ height: 'calc(100vh - 65px)' }}>
            <div className="w-80 px-6 pt-6 border-r-1 border-zinc-200 dark:border-zinc-800">
                <SideBarContainer isContactLoaded={isContactLoaded} contacts={contactList} selectedIndex={selectedIndex} onGetContactList={handleGetContactList} onChangeSelectedIndex={handleChangeSelectedIndex} />
            </div>

            <div className=" flex-1">
                <MsgContainer contact={contactList[selectedIndex]} />
            </div>
        </div>
    );
};
