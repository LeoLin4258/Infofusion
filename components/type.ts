
export type Contact = {
    LastReadedCreateTime: string;
    LastReadedSvrId: number;
    account: string;
    describe: string;
    headImgUrl: string;
    nickname: string;
    remark: string;
    wxid: string;
};

export type UserDetail = {
    account: string;
    describe: string;
    headImgUrl: string;
    nickname: string;
    remark: string;
    username: string;
};

export type UserInfo = {
    [key: string]: UserDetail;
};
