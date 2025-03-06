import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function GroupsPanel() {
  const groups = [
    { name: "Sales", icon: "S", count: 22, color: "bg-pink-100" },
    { name: "Tech", icon: "T", count: 12, color: "bg-gray-100" },
    { name: "Design", icon: "D", count: 12, color: "bg-gray-100" }
  ];

  return (
    <div className="border border-foreground p-4 rounded-xl">
      <h2 className="text-2xl font-semibold mb-4">Groups</h2>
      <div className="space-y-2 h-[200px] overflow-auto">
        {groups.map((group, index) => (
          <div key={index} className={`p-2 rounded-lg ${group.name === 'Sales' ? 'bg-pink-100' : 'bg-white'}`}>
            <div className="flex items-center">
              <Avatar className="mr-2">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>{group.icon}</AvatarFallback>
              </Avatar>
              <span>{group.name}</span>
              <span className="ml-auto border border-gray bg-white rounded-full text-xs w-6 h-6 py-1 text-center">{group.count}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
