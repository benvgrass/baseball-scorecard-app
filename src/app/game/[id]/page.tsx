import { getGameData } from "@/utils/newGameActions"
import {Player} from "@/app/game/page";

export default async function ScoreGame( {params}: {params: {id: string}}) {
    const data = await getGameData(params.id);

    const date: Date = new Date(data.date); // TODO: parse and format date
    console.log(data);
    return (
        <>
            <h1>id: {data._id.$oid}: {data.away.name} at {data.home.name}</h1>
            <h2>{date.toString()}</h2>
            <div className="grid grid-cols-2">
                <div>
                    <h2>Away: {data.away.name}</h2>
                    <ul>
                    {data.away.lineup.batters.map((player: Player, i: number) => (
                        <li key={`away${i}`}>
                            <h3>{player.name}</h3>
                            <p>{player.position}</p>
                        </li>
                    ))}
                    </ul>
                </div>
                <div>
                    <h2>Home: {data.home.name}</h2>
                    <ul>
                    {data.home.lineup.batters.map((player: Player, i: number) => (
                        <li key={`home${i}`}>
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