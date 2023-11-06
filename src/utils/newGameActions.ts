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
    try {
        const response = await fetch("http://127.0.0.1:8000/game", {
           method: "POST",
           headers: {
               "Content-Type": "application/json",
           },
            body: JSON.stringify(gameData),
        });

        const result: CreateGameResponse = await response.json();
        const game_id = result.game_id;

        console.log(`Game ID received: ${game_id}`);
        redirect(`/game/${game_id}`);
    } catch (e) {
        // TODO: do something on error
        console.log(`Error: ${e}`);
        alert(`Error: ${e}`);
    }
    console.log(gameData);
    
}
