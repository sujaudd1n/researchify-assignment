"use client";

import { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '@/components/Sidebar';

import GroupsPanel from '@/components/GroupsPanel';
import TasksPanel from '@/components/TasksPanel';
import EscalationsPanel from '@/components/EscalationsPanel';
import InsightsPanel from '@/components/InsightsPanel';
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";



export default function Home() {
  const [user, setUser] = useState({});
  // onAuthStateChanged(auth, (user) => {
  //   console.log(user)
  //   user ? setUser(user) : setUser(null);
  // })
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="flex flex-col m-[max(5px,min(3dvw,100px))]">
      <Header />
      <div className="mt-5 flex flex-1 gap-5">
        <Sidebar
          user={user}
          setUser={setUser}
          collapsed={collapsed}
          toggleSidebar={() => { setCollapsed(!collapsed) }}
        />
        <div className='w-full flex flex-col'>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 justify-between">
            <GroupsPanel />
            <TasksPanel />
            <EscalationsPanel />
          </div>
          <InsightsPanel />
        </div>
      </div>
    </div>
  );
}
