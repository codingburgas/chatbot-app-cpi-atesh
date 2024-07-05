import { Button } from "./ui/button";
import { MessageCircle, Trash2 } from "lucide-react";

export default function ChatEntry ({ chatTitle, onclick, ondelete, selected }: any) {

    return (
        <>
            <div onClick={onclick} className={`flex items-center gap-4 p-4 hover:bg-[#999] relative cursor-pointer rounded-lg ${selected? "bg-[#999]": ""}`}>
                <MessageCircle />
                <h2>{chatTitle}</h2>
                <Button onClick={ondelete} size="icon" variant="destructive" className="z-20 [&>*]:hover:text-[#e74c4c] transition-colors hover:bg-[#d1d5db] duration-150 absolute right-5">
                    <Trash2  className="duration-150 transition-colors"/>
                </Button>
            </div>
        </>
    )
}
