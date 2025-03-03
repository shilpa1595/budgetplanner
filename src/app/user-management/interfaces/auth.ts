export interface RegisterPostData {
    uname:string,
    email:string,
    password:string
}

export interface User extends RegisterPostData{
    id:number
}
