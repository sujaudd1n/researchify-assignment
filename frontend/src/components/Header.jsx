"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react";
import { useAuth } from "./AuthContext";

export default function Header({ }) {
    const [user, setUser] = useAuth();
    const [mentions, setMentions] = useState([]);
    const [messageCount, setMessageCount] = useState(0);

    const name = "Researchify.io";

    return (
        <header className=" border border-foreground p-5 rounded-xl shadow-sm flex flex-col justify-between gap-5 md:flex-row">
            <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                    <AvatarImage src={user ? user.photoURL : "https://framerusercontent.com/images/iIu5JwY5wZBHEA8YVg5dkHd8HS4.png"} />
                    <AvatarFallback>{user ? user.displayName.slice(0, 2).toUpperCase() : "RF"}</AvatarFallback>
                </Avatar>

                <div>
                    <h2 className="text-2xl font-semibold">Good Morning, {user ? user.displayName : name}</h2>
                    <p className="text-gray-500 text-sm">Hope your day goes organised!</p>
                </div>
            </div>

            <div className="flex flex-col text-sm max-w-[300px]">
                <div className="flex">
                    <ProfileGroup size={10} profiles={mentions} />
                    {Boolean(mentions.length) && <p className="self-end">...</p>}
                    <span className="ml-auto text-xs p-1 py-1 self-center border rounded">@ {mentions.length}</span>
                </div>
                <span>You have received <span className="text-red-400">{messageCount}</span> messages since you last logged in</span>
            </div>
        </header>
    );
}

export function ProfileGroup({ size, profiles }) {
    return (
        <div className="flex -space-x-2 mr-2">
            {profiles.map((profile, idx) => (
                <Avatar key={idx} className={`w-${size}10 h-${size}`} title={profile.name}>
                    <AvatarImage src={profile.url} />
                    <AvatarFallback>{profile.alt}</AvatarFallback>
                </Avatar>
            ))}

        </div>
    )
}