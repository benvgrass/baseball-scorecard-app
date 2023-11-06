'use server';

import {Player} from "@/app/game/page";
import { redirect } from "next/navigation";

type Game = {
    away: Team;
    home: Team;
}

type Team = {
    name: string;
    lineup:
        {
            batters: Player[];
            pitcher: string;
        };
}

type CreateGameResponse = {
    game_id: string
}

export async function createNewGame(gameData: Game) {
    // TODO: do post request to server
    try {
        const response = await fetch("", {
           method: "POST",
           headers: {
               "Content-Type": "application/json",
           },
            body: JSON.stringify(gameData),
        });

        const result: CreateGameResponse = await response.json();
        const game_id = result.game_id;

        // TODO: do something on response
        console.log(`Game ID received: ${game_id}`);
        redirect(`/game/${game_id}`);
    } catch (e) {
        // TODO: do something on error
        console.log(`Error: ${e}`);
    }
    console.log(gameData);
    
}
