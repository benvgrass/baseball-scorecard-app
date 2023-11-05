'use server';

import {Player} from "@/components/newGame";

interface Game {
    away: Team;
    home: Team;
}

interface Team {
    name: string;
    lineup:
        {
            batters: Player[];
            pitcher: string;
        };
}

export async function createNewGame(gameData: Game): Promise<string> {
    // TODO: do post request to server
    // TODO: return game_id response
    console.log(gameData);
    
    return 'game_id'
}
