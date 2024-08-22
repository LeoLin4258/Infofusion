import React from "react";

interface CopyIconProps {
    className?: string;
}


export const CopyIcon: React.FC<CopyIconProps> = ({ className = "" }) => {
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
                d="M878.250667 981.333333H375.338667a104.661333 104.661333 0 0 1-104.661334-104.661333V375.338667a104.661333 104.661333 0 0 1 104.661334-104.661334h502.912a104.661333 104.661333 0 0 1 104.661333 104.661334v502.912C981.333333 934.485333 934.485333 981.333333 878.250667 981.333333zM375.338667 364.373333a10.666667 10.666667 0 0 0-10.922667 10.965334v502.912c0 6.229333 4.693333 10.922667 10.922667 10.922666h502.912a10.666667 10.666667 0 0 0 10.922666-10.922666V375.338667a10.666667 10.666667 0 0 0-10.922666-10.922667H375.338667z"
                fill="#ffffff"
                p-id="1645"
            ></path>
            <path
                d="M192.597333 753.322667H147.328A104.661333 104.661333 0 0 1 42.666667 648.661333V147.328A104.661333 104.661333 0 0 1 147.328 42.666667H650.24a104.661333 104.661333 0 0 1 104.618667 104.661333v49.962667c0 26.538667-20.309333 46.848-46.848 46.848a46.037333 46.037333 0 0 1-46.848-46.848V147.328a10.666667 10.666667 0 0 0-10.922667-10.965333H147.328a10.666667 10.666667 0 0 0-10.965333 10.965333V650.24c0 6.229333 4.693333 10.922667 10.965333 10.922667h45.269333c26.538667 0 46.848 20.309333 46.848 46.848 0 26.538667-21.845333 45.312-46.848 45.312z"
                fill="#ffffff"
                p-id="1646"
            ></path>
        </svg>
    );
};
