import Link from "next/link";
import { ChevronsLeft, HelpingHand, MoveUpRight } from "lucide-react";
import { ChevronsRight } from "lucide-react";
import { LayoutDashboard } from "lucide-react";
import { TrendingUp } from "lucide-react";
import { Pencil } from "lucide-react";
import { HandHelping } from "lucide-react";

export default function Sidebar({ collapsed, toggleSidebar }) {
  return (
    <aside className={`p-5 border border-foreground rounded-xl ${collapsed ? 'w-32' : 'w-[400px]'} transition-all duration-300`}>
      <span className="w-28 w-68"></span>
      <div className="flex p-2 justify-between items-center">
        <h2 className={`${collapsed ? 'hidden' : 'block'} text-2xl font-semibold`}>Menu</h2>
        <button onClick={toggleSidebar}>
          <span className="text-lg">{collapsed ? <ChevronsRight /> : <ChevronsLeft />}</span>
        </button>
      </div>

      <nav className="mt-8">
        <ul className="space-y-2">
          <li className="flex items-center p-2 hover:bg-gray-100 bg-lime-100 rounded-lg cursor-pointer">
            <LayoutDashboard className="mr-3" />
            {!collapsed && <span>Dashboard</span>}
            {!collapsed && <span className="ml-auto border border-gray bg-white rounded-full text-xs w-6 h-6 py-1 text-center">2</span>}
          </li>
          <li className="flex items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
            <TrendingUp className="mr-3" />
            {!collapsed && <span>Insights</span>}
          </li>
          <li className="flex items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
            <Pencil className="mr-3" />
            {!collapsed && <span>Tasks</span>}
          </li>
          <li className="flex items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
            <HelpingHand className="mr-3" />
            {!collapsed && <span>Sales</span>}
          </li>
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
        <a href="#" className="block py-2 text-red-600 hover:text-red-800">Log Out</a>
      </div>
    </aside>
  );
}