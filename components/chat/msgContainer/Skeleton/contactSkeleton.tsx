"use client";

import { Skeleton } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

export const ContactSkeleton: React.FC = () => {


    return (
        <div className=" w-full flex flex-col gap-2">
            <div className="w-full h-14 rounded-lg flex gap-2 dark:bg-zinc-900 bg-zinc-100 items-center p-2">
                <Skeleton className="w-10 h-10 rounded-full" />
                <Skeleton className="w-16 h-5 rounded-md" />
            </div>
            <div className="w-full h-14 rounded-lg flex gap-2 dark:bg-zinc-900 bg-zinc-100 items-center p-2">
                <Skeleton className="w-10 h-10 rounded-full" />
                <Skeleton className="w-16 h-5 rounded-md" />
            </div>
            <div className="w-full h-14 rounded-lg flex gap-2 dark:bg-zinc-900 bg-zinc-100 items-center p-2">
                <Skeleton className="w-10 h-10 rounded-full" />
                <Skeleton className="w-16 h-5 rounded-md" />
            </div>
            <div className="w-full h-14 rounded-lg flex gap-2 dark:bg-zinc-900 bg-zinc-100 items-center p-2">
                <Skeleton className="w-10 h-10 rounded-full" />
                <Skeleton className="w-16 h-5 rounded-md" />
            </div>
            <div className="w-full h-14 rounded-lg flex gap-2 dark:bg-zinc-900 bg-zinc-100 items-center p-2">
                <Skeleton className="w-10 h-10 rounded-full" />
                <Skeleton className="w-16 h-5 rounded-md" />
            </div>
            <div className="w-full h-14 rounded-lg flex gap-2 dark:bg-zinc-900 bg-zinc-100 items-center p-2">
                <Skeleton className="w-10 h-10 rounded-full" />
                <Skeleton className="w-16 h-5 rounded-md" />
            </div>
        </div>
    );
};