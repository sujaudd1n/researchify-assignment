"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronsLeft,
  HelpingHand,
  MoveUpRight,
  ChevronsRight,
  LayoutDashboard,
  TrendingUp,
  Pencil
} from "lucide-react";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

function handle_sign_in() {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then(result => { console.log("SignIn succeeded.") })
    .catch(err => { console.log("SignIn Failed.") })
}

function handle_sign_out() {
  signOut(auth);
}

export default function Sidebar({ user, setUser, collapsed, toggleSidebar }) {
  // onAuthStateChanged(auth, (authUser) => {
  //   console.log(authUser)
  //   setUser(authUser)
  // })
  const pathname = usePathname();
  const urls = [
    { name: "Dashboard", path: "/", icon: <LayoutDashboard className="mr-2" />, notificationCount: 2, disabled: false },
    { name: "Insights", path: "/insights", icon: <TrendingUp className="mr-2" />, notificationCount: 0, disabled: false },
    { name: "Tasks", path: "/tasks", icon: <Pencil className="mr-2" />, notificationCount: 0, disabled: false },
    { name: "Sales", path: "/sales", icon: <HelpingHand className="mr-2" />, notificationCount: 0, disabled: true }
  ];

  return (
    <aside className={`p-5 border border-foreground rounded-xl ${collapsed ? 'w-32' : 'w-[300px]'} transition-all duration-300`}>
      <span className="w-28 w-68 w-[400px]"></span>
      <div className="flex p-2 justify-between items-center">
        <h2 className={`${collapsed ? 'hidden' : 'block'} text-2xl font-semibold`}>Menu</h2>
        <button onClick={toggleSidebar}>
          <span className="text-lg">{collapsed ? <ChevronsRight /> : <ChevronsLeft />}</span>
        </button>
      </div>

      <nav className="mt-8">
        <ul className="space-y-2">
          {urls.map(url => (
            <Link href={url.disabled ? '#' : url.path} key={url.name} >
              <li className={`flex items-center p-2 hover:bg-gray-100 ${pathname === url.path ? 'bg-lime-100' : ''} rounded-lg cursor-pointer`}>
                {url.icon}
                {!collapsed && <span>{url.name}</span>}
                {Boolean(url.notificationCount) && !collapsed && <span className="ml-auto border border-gray bg-white rounded-full text-xs w-6 h-6 py-1 text-center">{url.notificationCount}</span>}
              </li>
            </Link>
          ))}
        </ul>
      </nav>
      <div className={`my-12 p-4 ${collapsed ? "bg-white" : "bg-lime-100"}  rounded-xl`}>
        <div className="flex justify-between items-center">
          <h3 className={`${collapsed ? "hidden" : "block"} font-medium flex items-center gap-2 mb-2`}><span className="font-semibold">Upgrade Plan</span></h3>
          <Link href="#" className="border border-gray-400 bg-white text-gray-400 rounded-full p-2 -ml-2"><MoveUpRight /></Link>
        </div>

        {!collapsed && (
          <p className="text-xs text-gray-600 mt-4">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s.
          </p>
        )}

      </div>

      <div className="mt-auto p-4 whitespace-nowrap">
        <a href="#" className="block py-2 text-gray-700 hover:text-gray-900">FAQs</a>
        {!user &&
          <button onClick={handle_sign_in} href="#" className="block py-2 text-red-600 hover:text-red-800">SignIn</button>
        }
        {user &&
          <button onClick={handle_sign_out} className="block py-2 text-red-600 hover:text-red-800">SignOut</button>
        }
      </div>
    </aside >
  );
}