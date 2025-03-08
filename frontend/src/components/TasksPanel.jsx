"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ProfileGroup } from "./Header";
import { usePathname } from "next/navigation";
import { get_tasks } from "@/lib/utils";

export default function TasksPanel() {
  const pathname = usePathname();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function f() {
      const tasks = await get_tasks();
      console.log(tasks)
      setTasks(tasks);
    }
    f();
  }, [])

  return (
    <div className="border grow border-foreground p-4 rounded-xl">
      <h2 className="text-2xl font-semibold mb-4">Tasks</h2>
      <div className={`space-y-2 ${pathname === '/tasks' ? '' : 'h-[200px]'} overflow-auto`}>
        {tasks.map((task, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg ${task.is_important ? 'bg-amber-100' : 'bg-gray-100'}`}
          >
            <div className="flex justify-between">
              <div>
                <p>{task.title}</p>
                <Link href="#" className="text-xs underline text-gray-500 mt-1">View conversation</Link>
              </div>

              {task.assigned_to.length > 0 && (
                <div className="flex mt-2">
                  <ProfileGroup size={6} profiles={task.assigned_to.map(contributor => { contributor.url = contributor.photo; return contributor; })} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}