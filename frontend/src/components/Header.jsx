import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Header({ name, messageCount, notificationCount }) {
    return (
        <header className=" border border-foreground p-5 rounded-xl shadow-sm flex flex-col justify-between gap-5 md:flex-row">
            <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <div>
                    <h2 className="text-2xl font-semibold">Good Morning, {name}</h2>
                    <p className="text-gray-500 text-sm">Hope your day goes organised!</p>
                </div>
            </div>

            <div className="flex flex-col text-sm max-w-[300px]">
                <div className="flex">
                    <ProfileGroup />
                    <p className="self-end">...</p>
                    <span className="ml-auto text-xs p-1 py-1 self-center border rounded">@ {notificationCount}</span>
                </div>
                <span>You have received <span className="text-red-400">{messageCount}</span> messages since you last logged in</span>
            </div>
        </header>
    );
}

function ProfileGroup() {
    const size = 10;
    return (
        <div className="flex -space-x-2 mr-2">
            <Avatar className={`w-${size}10 h-${size}`}>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar className={`w-${size}10 h-${size}`}>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar className={`w-${size}10 h-${size}`}>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar className={`w-${size}10 h-${size}`}>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </div>
    )
}