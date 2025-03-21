"use client";
import { usePathname } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import ChatInterface from "./ChatInterface";
import { Maximize2 } from "lucide-react";
import Link from "next/link";
import { useAuth } from "./AuthContext";
import { useRef } from "react";

export default function InsightsPanel() {
  const [user, setUser] = useAuth();
  const pathname = usePathname();
  const chatRef = useRef(null);

  return (
    <div className="flex flex-col overflow-auto border grow border-foreground rounded-xl relative" ref={chatRef}>

      <div className="sticky top-0 z-10 bg-white p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold mb-4 ">
            Insights<sup className="ml-1 text-yellow-500">✨</sup>
          </h2>
          <button className="border border-foreground rounded-lg p-2 hover:bg-gray-100">
            <Link href={pathname === '/' ? '/insights' : '/'}><span><Maximize2 /></span></Link>
          </button>
        </div>

        <div className="mb-4">
          <Select>
            <SelectTrigger className="border-foreground w-[150px]">
              <SelectValue placeholder="All Groups" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="tech">Tech</SelectItem>
              <SelectItem value="design">Design</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <ChatInterface user={user} chatRef={chatRef} />
    </div>
  );
}