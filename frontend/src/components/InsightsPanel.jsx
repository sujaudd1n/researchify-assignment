import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Maximize2 } from "lucide-react";

export default function InsightsPanel() {
  return (
    <div className="border grow border-foreground p-4 rounded-xl relative">

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold mb-4 ">
          Insights<sup className="ml-1 text-yellow-500">✨</sup>
        </h2>
        <button className="border border-foreground rounded-lg p-2 hover:bg-gray-100">
          <span><Maximize2 /></span>
        </button>
      </div>

      <div className="mb-4">
        <Select>
          <SelectTrigger className="w-[150px]">
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
  );
}