import Link from "next/link";
import { ProfileGroup } from "./Header";

export default function TasksPanel() {
  const tasks = [
    {
      title: "Finish the UI and ask Animesh",
      subtitle: "View conversation",
      highlight: false,
      icon: null,
      contributors: []
    },
    {
      title: "Fix bugs",
      subtitle: "View conversation",
      important: true,
      icon: "🔥",
      contributors: [
        {
          id: 1,
          name: "c1",
          profilePic: "https://github.com/sujaudd1n.png",
          alt: 'su'
        },
        {
          id: 1,
          name: "c1",
          profilePic: "https://github.com/sujaudd1n.png",
          alt: 'su'
        }
      ]
    },
    {
      title: "Test the dev release to make",
      subtitle: "View conversation",
      important: false,
      icon: "💧",
      contributors: []
    },
  ];

  return (
    <div className="border border-foreground p-4 rounded-xl">
      <h2 className="text-2xl font-semibold mb-4">Tasks</h2>
      <div className="space-y-2 h-[200px] overflow-auto">
        {tasks.map((task, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg ${task.important ? 'bg-amber-100' : 'bg-gray-100'}`}
          >
            <div className="flex justify-between">
              <div>
                <div className="flex items-center">
                  <span>{task.title}</span>
                  {task.icon && <span className="ml-2">{task.icon}</span>}
                </div>
                <Link href="#" className="text-xs underline text-gray-500 mt-1">{task.subtitle}</Link>
              </div>

              {task.contributors.length > 0 && (
                <div className="flex mt-2">
                  <ProfileGroup profiles={task.contributors.map(contributor => { contributor.url = contributor.profilePic; return contributor; })} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}