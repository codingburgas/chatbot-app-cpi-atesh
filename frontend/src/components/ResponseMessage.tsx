
export default function ResponseMessage({ content, author, username } : {content: string, author: string, username: string | undefined} ) {
    
    return (
        <div className="flex gap-8 items-center">
            <div className="h-full">
                <div className="relative after:content-[''] after:absolute after:right-[-10px] after:bottom-0 after:w-0.5 after:h-full after:z-10 after:bg-gray-900">
                    <img className="w-12 h-12 rounded-full" src={`https://ui-avatars.com/api/?name=${author === 'AI'? author: username}&size=128`} alt="" />
                </div>
            </div>

            <h1 className="text-gray-900 max-w-[80%] max-lg:max-w-[70%]" >{content}</h1>
        </div>
    ) 
}
