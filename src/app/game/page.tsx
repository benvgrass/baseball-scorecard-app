'use client';
import TeamInput from "@/components/teamInput";
import { useState } from "react";
import { createNewGame } from "@/utils/newGameActions";

export type Player = {
    battingOrder: number;
    name: string;
    position: string;
}



export default function NewGame() {
    const battingOrderNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const [awayName, setAwayName] = useState<string>('');
    const [homeName, setHomeName] = useState<string>('');
    const [awayLineup, setAwayLineup] = useState<Player[]>(battingOrderNumbers.map((battingOrder) => ({
        battingOrder,
        name: '',
        position: ''
    })));
    const [homeLineup, setHomeLineup] = useState<Player[]>(battingOrderNumbers.map((battingOrder) => ({
        battingOrder,
        name: '',
        position: ''
    })));
    const [awayPitcher, setAwayPitcher] = useState<string>('');
    const [homePitcher, setHomePitcher] = useState<string>('');


    const handleSubmit = createNewGame.bind(null, {
        away: {
            name: awayName,
            lineup: {
                batters: awayLineup,
                pitcher: awayPitcher
            }
        },
        home: {
            name: homeName,
            lineup: {
                batters: homeLineup,
                pitcher: homePitcher
            }

        },
    });

    return (
        <form action={handleSubmit}>
            <div className="flex-col space-y-8 m-4">
                <div className="grid items-stretch   gap-10 lg:grid-columns-2 lg:grid-flow-col">
                    <TeamInput home={false}
                               teamName={awayName}
                               setTeamName={setAwayName}
                               lineup={awayLineup}
                               setLineup={setAwayLineup}
                               startingPitcher={awayPitcher}
                               setStartingPitcher={setAwayPitcher}
                    />
                    <TeamInput home={true}
                               teamName={homeName}
                               setTeamName={setHomeName}
                               lineup={homeLineup}
                               setLineup={setHomeLineup}
                               startingPitcher={homePitcher}
                               setStartingPitcher={setHomePitcher}
                    />
                </div>
            </div>
            <div className="flex justify-center h-full">

                <button
                    type="submit"
                    className="flex-initial md:basis-1/6 align-middle rounded-md bg-indigo-600 px-3.5 py-2.5 text-md font-semibold text-white
                            shadow-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2
                            focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Submit
                </button>
            </div>
        </form>
    )
}
