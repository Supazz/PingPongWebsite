export type LoginRequest ={
    username: string;
    password: string;
}

export type CurrentUser = {
    username: string;
    roles: string[];
}