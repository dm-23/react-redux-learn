export type PropertiesType<T>=T extends {[key:string]:infer U}? U:never

export type ActionTypes<T extends {[key:string]:(...args:any[])=>any}>=ReturnType<PropertiesType<T>>

export type PostType={
    message: string
    id: number
    likeCount: number
}
export type ContactType={
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type ProfileType={
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactType,
    photos:PhotoType
}
export type PhotoType={
    small: string | null
    large: string | null
}

export type FriendType={
    id:string,
    name:string
}

export type  UserType={

}

export type DialogType={
    id?:number
    dialog?:string
    userName:string
    userId:number
}

export type MessageType={
    id:number
    message:string
}


