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

export interface CategoryData{
    id: number,
    name: string,
    type: string,
    abbreviation: string
}

export interface CategorySelectionProps  {
    type:string,
    categories: CategoryData[],
    selected: string[],
    setCategories: React.Dispatch<React.SetStateAction<string[]>>
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

export interface CurrentCategoryProps {
    category: string,
    userCategories?: string[]
}