"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { get_groups } from "@/lib/utils";

export default function GroupsPanel() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    async function f() {
      const groups = await get_groups();
      console.log(groups)
      setGroups(groups);
    }
    f();
  }, [])

  return (
    <div className="border border-foreground p-4 rounded-xl">
      <h2 className="text-2xl font-semibold mb-4">Groups</h2>
      <div className="space-y-2 h-[200px] overflow-auto">
        {groups.map((group, index) => (
          <div key={index} className={`p-2 rounded-lg ${group.name === 'Sales' ? 'bg-pink-100' : 'bg-white'}`}>
            <div className="flex items-center">
              <Avatar className="mr-2">
                <AvatarImage src={group.icon} />
                <AvatarFallback>{group.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span>{group.name}</span>
              <span className="ml-auto border border-gray bg-white rounded-full text-xs w-6 h-6 py-1 text-center">{group.user_count}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
