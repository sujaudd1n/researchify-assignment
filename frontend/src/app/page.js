import InsightsPanel from "@/components/InsightsPanel"
import GroupsPanel from "@/components/GroupsPanel"
import TasksPanel from "@/components/TasksPanel"
import EscalationsPanel from "@/components/EscalationsPanel"

export default function Page() {
    return (
        <div className='w-full flex flex-col'>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 justify-between">
                <GroupsPanel />
                <TasksPanel />
                <EscalationsPanel />
            </div>
            <InsightsPanel />
        </div>
    )
}