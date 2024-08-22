'use client'

import React, { useEffect } from "react";
import { SearchBar } from "./searchBar";
import { ContactItem } from "./contactItem";
import { ContactSkeleton } from "../msgContainer/Skeleton/contactSkeleton";
import { Contact } from '@/components/type'


interface SideBarContainerProps {
    contacts: Contact[]; // Array of Contact objects
    selectedIndex: number
    isContactLoaded: boolean
    onGetContactList: () => void; // Function to trigger in parent component
    onChangeSelectedIndex: (selectedIndex: number) => void; // Function to trigger in parent component when selectedIndex
}

export const SideBarContainer: React.FC<SideBarContainerProps> = ({ contacts, selectedIndex, isContactLoaded, onGetContactList, onChangeSelectedIndex }) => {

    return (
        <div className="w-full h-full flex flex-col gap-4">
            <SearchBar onGetContactList={onGetContactList} />
            {isContactLoaded ? (
                <div className="w-full h-full overflow-scroll scrollbar-hide flex flex-col gap-2">
                    {contacts.map((contact, index) => (
                        <ContactItem key={index} contact={contact} selectedIndex={selectedIndex} index={index} onChangeSelectedIndex={onChangeSelectedIndex} />
                    ))}
                </div>
            ) : (
                <ContactSkeleton />
            )}
        </div>
    );
};
