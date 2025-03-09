"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { get_escalations } from "@/lib/utils";
import Link from "next/link";

export default function EscalationsPanel() {
  const [escalations, setEscalations] = useState([]);

  useEffect(() => {
    async function f() {
      const escalations = await get_escalations();
      console.log(escalations)
      setEscalations(escalations);
    }
    f();
  }, [])

  const e = [
    {
      title: "Channel the playground is",
      user: {
        id: 1,
        name: "Sagar Sk",
        profilePic: "https://github.com/sujaudd1n.png",
        alt: 'su'
      },
      highlight: true
    },
    {
      title: "There is an issue with this",
      user: {
        id: 1,
        name: "Alex",
        profilePic: "https://github.com/sujaudd1n.png",
        alt: 'su'
      },
      highlight: false
    }
  ];

  return (
    <div className="border border-foreground p-4 rounded-xl">
      <h2 className="text-2xl font-semibold mb-4">
        Escalations
        <span className="ml-2 text-sm text-yellow-500">⚠️</span>
      </h2>
      <div className="flex flex-col gap-2 h-[200px] overflow-auto">
        {escalations.map((escalation, index) => (
          <Link
            key={index}
            href="#"
            className={`p-2 rounded-lg ${escalation.is_important ? 'bg-red-100 ' : 'bg-gray-100'} hover:bg-gray-200`}
          >
            <div>
              <p className="text-[10px] text-gray-500 underline">{escalation.subtitle}</p>
              <p>{escalation.title}</p>
              <div className="flex items-center mt-2">
                <Avatar className="w-4 h-4 mr-1" title={escalation.created_by.name}>
                  <AvatarImage src={escalation.created_by.photoURL} />
                  <AvatarFallback>{escalation.created_by.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <span className="text-xs text-gray-500">{escalation.created_by.name}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div >
  );
}
