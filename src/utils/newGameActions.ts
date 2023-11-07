'use server';

import {Player} from "@/app/game/page";
import {redirect} from "next/navigation";

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
    const response = await fetch("http://127.0.0.1:8000/gametest", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(gameData),
    });
    console.log(`Response: ${response}`);
    if (response.ok) {
        const result: CreateGameResponse = await response.json();
        console.log(`Result: ${result}`);
        const game_id = result.game_id;
        console.log(`Game ID received: ${game_id}`);
        redirect(`/game/${game_id}`);
    } else {
        // TODO: handle error
    }
    console.log(gameData);
}

export async function getGameData(game_id: string) {
    const response = await fetch(`http://127.0.0.1:8000/game/${game_id}`);
    return await response.json();
}

