import {Player} from "@/app/game/page";

export default function BoxScore() {
    return (
        <>
        </>
    );
}

function TeamBox({lineup, name}: {lineup: Player[], name: string}) {
    return (
        <>
            <div className="grid grid-cols-2">
            <div>
                <h2>Away: {name}</h2>
                <ul>
                    {lineup.map((player: Player, i: number) => (
                        <li key={`away${i}`}>
                            <h3>{player.name}</h3>
                            <p>{player.position}</p>
                        </li>
                    ))}
                </ul>
            </div>
            </div>
            </>
    );
}