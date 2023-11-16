// import {useState} from "react";
import LineupCard from "@/components/lineupCard";
import React from "react";
import {Player} from "@/app/game/page";

export default function TeamInput({
                                      home,
                                      teamName,
                                      setTeamName,
                                      lineup,
                                      setLineup,
                                      startingPitcher,
                                      setStartingPitcher
                                  }: {
    home: boolean,
    teamName: string,
    setTeamName: (teamName: string) => void,
    lineup: Player[],
    setLineup: (lineup: Player[]) => void,
    startingPitcher: string,
    setStartingPitcher: (startingPitcher: string) => void
}) {
    return (
        <div className="relative space-y-8 h-full sm:shadow-md rounded-lg p-6 border-0 ring-1 ring-inset ring-gray-300">
            <span className="absolute -top-3.5 inline-block sm:left-3  bg-white px-1 text-2xl font-semibold leading-7 text-gray-900">{home ? "Home" : "Away"}</span>

            <div
                className="relative flex rounded-md sm:shadow-md ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <label
                    htmlFor={home ? "home-team-name" : "away-team-name"}
                    className="absolute -top-2.5 left-2 inline-block bg-white px-1 text-sm font-medium leading-5 text-gray-900"
                >
                    Team Name
                </label>
                <input
                    type="text"
                    name="teamname"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    id={home ? "home-team-name" : "away-team-name"}
                    placeholder={home ? "Home Team" : "Away Team"}
                    className="block flex-1 border-0 bg-transparent py-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-md sm:leading-6"
                    required
                />
            </div>
            <LineupCard
                lineup={lineup}
                setLineup={setLineup}
                startingPitcher={startingPitcher}
                setStartingPitcher={setStartingPitcher}
            />
        </div>

    )
}
