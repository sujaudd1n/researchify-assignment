"use client";

import { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '@/components/Sidebar';

import GroupsPanel from '@/components/GroupsPanel';
import TasksPanel from '@/components/TasksPanel';
import EscalationsPanel from '@/components/EscalationsPanel';

export default function Home() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="flex flex-col m-[max(5px,min(3dvw,100px))]">
      <Header
        name="John"
        messageCount={132}
        notificationCount={23}
      />
      <div className="mt-5 flex flex-1 gap-5">
        <Sidebar
          collapsed={collapsed}
          toggleSidebar={() => { setCollapsed(!collapsed) }}
        />
        <div className='w-full'>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 justify-between">
            <GroupsPanel />
            <TasksPanel />
            <EscalationsPanel />
          </div>

        </div>
      </div>
    </div>
  );
}
