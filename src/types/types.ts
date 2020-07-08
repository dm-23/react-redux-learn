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

