export interface UserData {
    email: string;
    password: string;
}

export interface UserPasswordData extends UserData{
    newPassword:string
}

export interface QueryData {
    search: string;
    user: string;
}


export interface NewsData {
    source: {
        id: string,
        name: string
    },
    author: string,
    title: string,
    description: string,
    url: string,
    urlToImage: string,
    publishedAt: string,
    content: string
}