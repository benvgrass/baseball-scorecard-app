// import {useState} from "react";
import LineupCard from "@/components/lineupCard";
import React from "react";
import {Player} from "@/components/newGame";

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
        <div className="relative h-full sm:shadow-md rounded-lg p-6 border-0 ring-1 ring-inset ring-gray-300">
            <h1 className="absolute -top-3.5 sm:left-3 inline-block bg-white px-1 text-2xl font-semibold leading-7 text-gray-900">{home ? "Home" : "Away"}</h1>

            <div
                className="relative flex mt-1.5 rounded-md sm:shadow-md ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
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
