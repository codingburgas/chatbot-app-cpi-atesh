import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";

export default function Profile({ username, className }: { username: string | undefined, className?: string}) {
    return (
        <div className={`flex gap-4 items-center border border-pink-50 w-full p-2 px-4 rounded-[36px] max-lg:mt-5 relative ${className}`}>
            <Avatar className="text-black">
                <AvatarImage src="" />
                <AvatarFallback><img src={`https://ui-avatars.com/api/?name=${username}&size=128`} alt="" /></AvatarFallback>
            </Avatar>
            <h1>{username}</h1>
            <Button onClick={() => {localStorage.clear(); window.location.reload()}} variant="destructive" size="icon" className="right-6 [&>*]:hover:text-[#e74c4c] hover:bg-[#d1d5db] absolute">
                <LogOut className="duration-100"/>
            </Button>
        </div>
    )
}