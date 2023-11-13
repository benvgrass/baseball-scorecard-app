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

        </>
    );

}