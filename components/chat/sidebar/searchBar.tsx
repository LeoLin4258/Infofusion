"use client";

import { RetryIcon } from "@/components/icons/chat/retry-icon";
import { SearchIcon } from "@/components/icons/searchicon";
import { Button, Input, Tooltip } from "@nextui-org/react";
import React from "react";

interface Props {
    // onSearch: (searchText: string) => void;
    onGetContactList: () => void
}
export const SearchBar: React.FC<Props> = ({ onGetContactList }) => {

    return (
        <div className=" w-full gap-2 flex">
            <Input
                startContent={<SearchIcon />}
                isClearable
                className="w-full"
                classNames={{
                    input: "w-full",
                    mainWrapper: "w-full",
                }}
                placeholder="Search..."
            />
            <Tooltip content="Reload">
            <Button isIconOnly color="default" onPress={() => onGetContactList()}><RetryIcon /></Button>
            </Tooltip>
        </div>

    );
};
