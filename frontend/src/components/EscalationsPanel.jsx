import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function EscalationsPanel() {
  const escalations = [
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
        <span className="ml-2 text-yellow-500">⚠️</span>
      </h2>
      <div className="space-y-2 h-[200px] overflow-auto">
        {escalations.map((escalation, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg ${escalation.highlight ? 'bg-red-100 ' : 'bg-gray-100'}`}
          >
            <div>
              <div>{escalation.title}</div>
              <div className="flex items-center mt-2">
                <Avatar className="w-4 h-4 mr-1">
                  <AvatarImage src={escalation.user.profilePic} />
                  <AvatarFallback>{escalation.user.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <span className="text-xs text-gray-500">{escalation.user.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div >
  );
}
