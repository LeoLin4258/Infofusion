import React from "react";
interface CopyIconProps {
    className?: string;
}

export const NikeIcon: React.FC<CopyIconProps> = ({ className = "" }) => {

    return (
        <svg
            className={`icon ${className}`}
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1644"
            width="16"
            height="16"
        >
            <path
                d="M910.7 302.7L408.4 805c-23.1 23.1-60.6 23.1-83.7 0l-41.9-41.9L826.9 219c23.1-23.1 60.6-23.1 83.7 0 23.2 23.1 23.2 60.6 0.1 83.7z"
                fill="#ffffff"
                p-id="1645"
            ></path>
            <path
                d="M324.6 805L115.3 595.7c-23.1-23.1-23.1-60.6 0-83.7s60.6-23.1 83.7 0l251.2 251.2-41.8 41.8c-23.2 23.1-60.6 23.1-83.8 0z"
                fill="#ffffff"
                p-id="1646"
            ></path>
        </svg>
    );
};

