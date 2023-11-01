
import TeamInput from "@/components/teamInput";

export default function NewGame() {
    return (
        <div className="space-y-12 items-stretch gap-10 lg:columns-2">
            <div>
                <TeamInput home={false}/>
            </div>
            <div>
                <TeamInput home={true}/>
            </div>
        </div>
    )
}
