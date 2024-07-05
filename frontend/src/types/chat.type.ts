export type MessageType = {
    author: string,
    content: string
}

export type ChatType = {
    name: string,
    messages: MessageType[]
} 

export type ChatHystoryType = {
    id: number,
    name: string
}