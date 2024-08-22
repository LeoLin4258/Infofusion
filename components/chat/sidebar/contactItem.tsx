"use client";

import React from "react";
import { Avatar, User } from "@nextui-org/react";
import { Contact } from '@/components/type'


// Define the props for the SideBarContainer
interface SideBarContainerProps {
    contact: Contact; // Array of Contact objects
    selectedIndex: number
    index: number
    onChangeSelectedIndex: (selectedIndex: number) => void; // Function to trigger in parent component when selectedIndex
}

export const ContactItem: React.FC<SideBarContainerProps> = ({ contact, selectedIndex, index, onChangeSelectedIndex }) => {

    return (
        <div
            onClick={() => { onChangeSelectedIndex(index) }}
            className={selectedIndex === index
                ? "bg-primary-100  flex w-full p-2 gap-2   rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98]"
                : "flex w-full p-2 gap-2 hover:bg-zinc-100 dark:hover:bg-zinc-900  rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98]"
            }>
            <Avatar className="flex-shrink-0" size="md" radius="md" src={contact.headImgUrl ? contact.headImgUrl : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUnMSq8ZlstbcBO3Q02ThCMwd_fE64BVMmDVQ2sJei5FSX1l8zTFTG14TMkq0J0B2DqU4&usqp=CAU'}></Avatar>
            <div className="flex flex-1 items-center font-medium">
                {contact.remark ? contact.remark : contact.nickname}
            </div>
            
        </div>
    );
};