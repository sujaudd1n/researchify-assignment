"use client";

import { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '@/components/Sidebar';

export default function Home() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="flex flex-col m-[max(5px,min(3dvw,100px))]">
      <Header
        name="John"
        messageCount={132}
        notificationCount={23}
      />
      <div className="mt-5">
        <Sidebar
          collapsed={collapsed}
          toggleSidebar={() => { setCollapsed(!collapsed) }}
        />
      </div>
    </div>
  );
}
