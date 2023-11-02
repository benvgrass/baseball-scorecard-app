'use client';
import TeamInput from "@/components/teamInput";
import {useState} from "react";

export interface Player {
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

    return (
        <div className="space-y-12 items-stretch gap-10 lg:columns-2">
            <div>
                <TeamInput home={false}
                           teamName={awayName}
                           setTeamName={setAwayName}
                           lineup={awayLineup}
                           setLineup={setAwayLineup}
                           startingPitcher={awayPitcher}
                           setStartingPitcher={setAwayPitcher}
                />
            </div>
            <div>
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
    )
}
