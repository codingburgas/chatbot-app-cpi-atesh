import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import ChatEntry from "@/components/ChatEntry";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { MessageType, ChatType, ChatHystoryType } from "@/types/chat.type";
import ResponseMessage from "@/components/ResponseMessage";
import { chatAPI } from "@/apis/chatAPI";
import { messagesAPI, Message } from "@/apis/messagesAPI";
import { UserType } from "@/types/user.type";
import { userAPI } from "@/apis/userAPI";
import Profile from "@/components/Profile";
import { Skeleton } from "@/components/ui/skeleton"

export default function Chat() {
    const [user, setUser] = useState<UserType>();
    const [chatHistory, setChatHistory] = useState<ChatHystoryType[]>([]);
    const [newChatName, setNewChatName] = useState<string>("");
    const [isNewChatOpened, setIsNewChatOpened] = useState<boolean>(false);
    const [chatIdSelected, setChatIdSelected] = useState<number>();

    let [message, setMessage] = useState<string>("");

    const [isNavHidden, setIsNavHidden] = useState<boolean>(true)

    const [selectedChat, setSelectedChat] = useState<ChatType>()
    const formRef = useRef<HTMLFormElement>(null);

    const [isWaiting, setIsWaiting] = useState<boolean>(false)

    useEffect(() => {
        userAPI.getUser().then((data) => {
            setUser(data);
        });

        chatAPI.getChatHystory().then((data) => {
            setChatHistory(data.data.reverse());
        });

    }, []);

    useEffect(() => {
        if(!isNavHidden)
        {
            window.scroll(0, 0)
            document.body.className = "overflow-hidden"
            return
        }

        window.scroll(0, window.innerHeight)
        document.body.classList.remove("overflow-hidden")

    }, [isNavHidden])

    useEffect(() => {
        if (!chatIdSelected) return

        chatAPI.getChat(chatIdSelected).then((data) => {
            setSelectedChat(data.data)
        })
    }, [chatIdSelected])
    
    const handleNewChat = () => {
        chatAPI.createNewChat(newChatName).then(() => {
            chatAPI.getChatHystory().then((data) => {
                setChatHistory(data.data.reverse());
            });
        });

        setNewChatName("");
        setIsNewChatOpened(false);
    }

    const handleNewMessage = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        
        if (!message || message === "") {
            return;
        }

        
        
        if(!chatIdSelected) {
            
            chatAPI.createNewChat(message.substring(0, 20)).then((data) => {
                chatAPI.getChatHystory().then((data) => {
                    setChatHistory(data.data.reverse());
                });

                setChatIdSelected(data.data.id)
                
                const newMessage: Message = {
                    "chat_id": data.data.id,
                    "content": message,
                    "author": "USER",
                }
                
                setSelectedChat({
                        "name": data.data.name,
                        "messages": [{author: "USER", content: message}]
                    })

                setIsWaiting(true)
                messagesAPI.createMessage(newMessage).then(() => {
                    chatAPI.getChat(data.data.id).then((data) => {
                        setIsWaiting(false)
                        setSelectedChat(data.data)
                    })
                });

                return
            });
        }
        
        const newMessage: Message = {
            "chat_id": chatIdSelected,
            "content": message,
            "author": "USER",
        }

        if(selectedChat) {
            setSelectedChat({
                    "name": selectedChat["name"],
                    "messages": [...selectedChat["messages"], {author: "USER", content: message}]
                })
        }

        setIsWaiting(true)
        messagesAPI.createMessage(newMessage).then(() => {
            if( !chatIdSelected ) return

            chatAPI.getChat(chatIdSelected).then((data) => {
                setIsWaiting(false)
                setSelectedChat(data.data)
            })
        });

        setMessage("");
    }

    const handleClearChats = () => {
        chatAPI.deleteAllChats().then(() => {
            chatAPI.getChatHystory().then((data) => {
                setChatHistory(data.data.reverse());
                setSelectedChat(undefined)
                setChatIdSelected(undefined)
            });
        });
    }

    const handleDeleteChat = (id: number) => {
        chatAPI.deleteChat(id).then(() => {
            chatAPI.getChatHystory().then((data) => {
                setChatHistory(data.data.reverse());

                if (chatIdSelected === id)
                {
                    setChatIdSelected(undefined)
                    setSelectedChat(undefined)
                }
            });
        });
    };

    return (
        <>
            <div onClick={() => {setIsNavHidden(false)}} className="fixed top-5 flex flex-col gap-1 left-3 z-10 w-10 lg:hidden cursor-pointer transition-transform duration-75 hover:scale-105 active:scale-100">
                <div className="w-full bg-black h-1 rounded-2xl"></div>
                <div className="w-full bg-black h-1 rounded-2xl"></div>
                <div className="w-full bg-black h-1 rounded-2xl"></div>
            </div>           
            <div
            className={`min-w-screen overflow-x-hidden min-h-screen bg-gradient-to-b bg-gray-300 flex`}
            >
                <div
                    className={`w-1/5 bg-gray-900 text-white min-h-[80%] items-center flex flex-col my-5 ml-5 z-20 rounded-2xl max-lg:absolute max-lg:h-screen max-lg:w-screen max-lg:m-0 max-lg:rounded-none ${isNavHidden? 'max-lg:hidden': 'block'} `}
                >
                    <div className={`w-[90%] mt-12 flex flex-col items-center `}>
                        <div onClick={() => {setIsNavHidden(true)}} className="absolute top-5 right-3 w-10 lg:hidden cursor-pointer transition-transform duration-75 hover:scale-105 active:scale-100 h-8">
                            <div className="w-full bg-white h-1 rotate-45 translate-y-2 rounded-2xl"></div>
                            <div className="w-full bg-white h-1 -rotate-45 translate-y-1 rounded-2xl"></div>
                        </div>

                        <Profile username={user?.username} />

                        <div className="flex items-center w-full gap-2 mt-[36px]">
                            <Dialog open={isNewChatOpened}>
                                <DialogTrigger asChild>
                                    <Button onClick={() => {setIsNewChatOpened(true)}} className={`bg-[#6218DC] text-white p-6 w-full rounded-[36px]'} font-black hover:bg-[#d1d5db] hover:text-[#6218DC] duration-200`}>
                                        + New chat
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px] bg-black text-white">
                                    <DialogHeader>
                                        <DialogTitle>New Chat</DialogTitle>
                                    </DialogHeader>
                                    <div>
                                        <Input
                                            placeholder="Enter chat name"
                                            className="p-6"
                                            onChange={(e) =>
                                                setNewChatName(e.target.value)
                                            }
                                            value={newChatName}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Button onClick={handleNewChat}>New Chat</Button>
                                        <Button onClick={() => {setIsNewChatOpened(false)}} variant="destructive">Close</Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>

                        <div className="flex gap-8 items-center my-[24px] py-[20px] relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-[1px] before:bg-zinc-600 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-zinc-600">
                            <p>Your conversations</p>
                            <Button
                                variant="link"
                                className={`text-purple-500`}
                                onClick={handleClearChats}
                            >
                                Clear All
                            </Button>
                        </div>
                        <ScrollArea className="h-full flex flex-col overflow-auto w-full">
                            {chatHistory.map((chat: ChatHystoryType) => {
                                return <ChatEntry ondelete={() => {handleDeleteChat(chat.id)}} key={chat.id} onclick={() => setChatIdSelected(chat.id)} chatTitle={chat.name} selected={chat.id == chatIdSelected} />;
                            })}
                        </ScrollArea>
                    </div>
                </div>
                
                <div className="w-4/5 max-lg:w-full min-h-[80%] items-center flex flex-col m-5 relative rounded-2xl text-white">

                    <div className={`text-white mb-[25%] w-full min-h-full flex flex-col p-4 pt-10 lg:p-16 gap-6`}>
                        {
                            selectedChat?.messages.map((item: MessageType) => {
                                return <ResponseMessage author={item.author} username={user?.username} content={item.content} />
                            })
                        }

                        {isWaiting && <div className="flex gap-2 ml-[3px]">
                            <Skeleton className="w-12 h-12 rounded-full" />

                            <div className="flex flex-col w-full gap-3">
                                <Skeleton className="w-1/2 h-4 rounded-full" />
                                <Skeleton className="w-2/3 h-4 rounded-full" />
                            </div>
                        </div>}
                    </div>

                    <form
                        onSubmit={handleNewMessage}
                        ref={formRef}
                        className={`bg-gray-900 fixed bottom-5 text-black w-[50%] z-10 h-[100px] rounded-xl max-lg:w-[90%] flex gap-5 p-6 items-center`}
                    >
                        <Textarea
                            onKeyDown={(e) => {if(e.key === "Enter") {formRef.current?.requestSubmit()}}}
                            onChange={(e) => {if(e.target.value === "\n") {return}; setMessage(e.target.value);}}
                            className="resize-none border-none outline-none h-full focus:outline-none text-white"
                            value={message}
                        />
                        <Button
                            size="icon"
                            className={`bg-[#5661F6] hover:bg-[#5331F3] rounded-full w-14 h-14`}
                        >
                            <Send />
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
}
