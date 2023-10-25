
import TeamInput from "@/components/teamInput";

export default function NewGame() {
    return (
        <div className="gap-10 md:columns-2">
            <TeamInput home={false}></TeamInput>
            <TeamInput home={true}></TeamInput>
        </div>
    )
}
