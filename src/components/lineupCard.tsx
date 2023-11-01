'use client';
import React, {Fragment, ReactNode, useState} from 'react';
import {Listbox, Transition} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

interface Player {
    battingOrder: number;
    name: string;
    position: string;
}

export default function LineupCard() {
    const battingOrderNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const positions = ['C', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF', 'DH', 'P'];
    const initialPositions = {"C": true, '1B': true, '2B': true, '3B': true, 'SS': true, 'LF': true, 'CF': true, 'RF': true, 'DH': true, "P": true};
    const [lineup, setLineup] = useState<Player[]>(battingOrderNumbers.map((battingOrder) => ({ battingOrder, name: '', position: '' })));
    const [availablePositions, setAvailablePositions] = useState<Record<string, boolean>>(initialPositions);
    const [pitcherHitting, setPitcherHitting] = useState<number>(-1);
    const [startingPitcher, setStartingPitcher] = useState<string>('');
    function classNames(...classes: string[]): string {
        return classes.filter(Boolean).join(' ')
    }

    const handleNameChange = (battingOrder: number, playerName: string) => {

        const updatedLineup = lineup.map((player) => {
            if (player.battingOrder === battingOrder) {
                if (battingOrder === pitcherHitting) {
                    setStartingPitcher(playerName);
                }
                return { ...player, name: playerName };
            }
            return player;
        });

        setLineup(updatedLineup);
    };

    const handlePitcherChange = (pitcherName: string) => {
        setStartingPitcher(pitcherName);
    }

    const handlePositionChange = (battingOrder: number, newPosition: string) => {
        const player = lineup.find((p) => p.battingOrder === battingOrder);
        if (player) {
            const assignedPosition = player.position;
            console.log(`Old position: ${assignedPosition}, new position: ${newPosition}`);
            let nowAvailable = {...availablePositions};
            if (assignedPosition) {
                nowAvailable[assignedPosition] = true;
                if (assignedPosition === "P") {
                    nowAvailable["DH"] = true;
                    setPitcherHitting(-1);
                    setStartingPitcher("");
                } else if (assignedPosition === "DH") {
                    nowAvailable["P"] = true;
                }
            }
            // Remove the newly assigned position from available positions
            if (newPosition) {
                nowAvailable[newPosition] = false;
                if (newPosition === "P") {
                    nowAvailable["DH"] = false;
                    setPitcherHitting(battingOrder);
                    if (player.name) {
                        setStartingPitcher(player.name);
                    } else if (startingPitcher) {
                        player.name = startingPitcher;
                    }
                } else if (newPosition === "DH") {
                    nowAvailable["P"] = false;
                }
            }

            setAvailablePositions(nowAvailable);
            const updatedPlayer = { ...player, position: newPosition };
            const updatedLineup = lineup.map((p) => (p.battingOrder === battingOrder ? updatedPlayer : p));

            setLineup(updatedLineup);

        }

    };


    return (
        <>

            <div className="relative sm:shadow-md px-4 sm:px-6 lg:px-8 -mx-4 mt-10 ring-1 ring-gray-300 sm:mx-0 rounded-sm sm:rounded-lg">
                <label
                    htmlFor="lineup"
                    className="absolute -top-3.5 sm:left-2 inline-block bg-white px-1 text-md font-medium text-gray-900"
                >
                    Batting Lineup
                </label>
                <table id="lineup" className="min-w-full divide-y divide-gray-300">
                    <thead>
                    <tr>
                        <th scope="col" className="pb-0.5 pt-3.5 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-6">Batters</th>
                        <th scope="col" className="pb-0.5 pt-3.5 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-6">Position</th>
                    </tr>
                    </thead>
                    <tbody>
                    {lineup.map((player, i) => (
                        <tr key={player.battingOrder}>
                            <td className={classNames(
                                i === 0 ? '' : 'border-t border-gray-200',
                                'relative mt-auto px-3 py-3.5 text-sm text-gray-500 lg:table-cell'
                            )}>
                                <div className="group flex rounded-md sm:shadow-sm ring-1 ring-inset ring-gray-200 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <span className="inline-flex items-center rounded-l-md border-0 bg-gray-200 group-focus-within:bg-indigo-600 group-focus-within:text-white px-3 font-semibold  text-gray-700 sm:text-sm">
                                        {player.battingOrder + '.'}
                                    </span>
                                    <input
                                        type="text"
                                        value={player.name}
                                        onChange={(e) => handleNameChange(player.battingOrder, e.target.value)}
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </td>
                            <td className={classNames(
                                i === 0 ? '' : 'border-t border-gray-200',
                                'w-full mt-auto px-3 py-3.5 text-sm text-gray-500 lg:table-cell'
                            )}>

                                <Listbox
                                    value={player.position}
                                    onChange={(e) => handlePositionChange(player.battingOrder, e)}
                                >
                                    {({ open }) => (
                                        <>
                                            <div className="flex space-x-2.5 divide-y-2 divide-x mx-2">
                                                <Listbox.Button className="group focus-within:font-semibold relative w-full cursor-default rounded-md bg-white py-1.5 pl-1 sm:pl-2 text-left text-gray-900 sm:shadow-sm ring-1 ring-inset ring-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm leading-6">
                                                    <span className="block">{player.position || '--'}</span>
                                                    <span className="flex pointer-events-none absolute inset-y-0 right-0 pr-0.5 sm:pr-1 items-center">
                                                            <ChevronUpDownIcon className="h-5 w-5 text-gray-700 group-focus-within:text-indigo-600" aria-hidden="true" />
                                                    </span>
                                                </Listbox.Button>
                                                <Transition
                                                    show={open}
                                                    as={Fragment}
                                                    leave="transition ease-in duration-100"
                                                    leaveFrom="opacity-100"
                                                    leaveTo="opacity-0"
                                                >
                                                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 sm:shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm sm:leading-6">
                                                        <Listbox.Option value={""} className={({ active }) =>
                                                            classNames(
                                                                active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                                'relative flex cursor-default select-none py-2 pl-3 pr-9'
                                                            )
                                                        }>
                                                            {/*{({ selected, active }) => (*/}
                                                            {({ selected }) => (
                                                                <>
                                                                    <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                                        --
                                                                    </span>
                                                                </>
                                                            )}
                                                        </Listbox.Option>
                                                        {positions.reduce((acc, position) => {
                                                                if (availablePositions[position] || player.position === position) {
                                                                    acc.push(
                                                                        <Listbox.Option key={position}
                                                                                        className={({ active }) =>
                                                                                            classNames(
                                                                                                active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                                                                'relative flex cursor-default select-none py-2 pl-3 pr-9'
                                                                                            )
                                                                                        }
                                                                                        value={position}>
                                                                            {({ selected, active }) => (
                                                                                <>
                                                                                    <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                                                        {position}
                                                                                    </span>
                                                                                    {selected ? (
                                                                                        <span
                                                                                            className={classNames(
                                                                                                active ? 'text-white' : 'text-indigo-600',
                                                                                                'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                                            )}
                                                                                        >
                                                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                                        </span>) : null}
                                                                                </>
                                                                            )}

                                                                        </Listbox.Option>);
                                                                }
                                                                return acc;
                                                            }, new Array<ReactNode>())
                                                        }
                                                    </Listbox.Options>
                                                </Transition>
                                            </div>
                                        </>
                                    )}
                                </Listbox>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="relative px-4 sm:shadow-md sm:px-6 lg:px-8 py-4 -mx-4 mt-10 ring-1 ring-gray-300 sm:mx-0 rounded-sm sm:rounded-lg" >
                <label
                    htmlFor="pitcher"
                    className="absolute -top-3.5 sm:left-2 inline-block bg-white px-1 text-md font-medium text-gray-900"
                >
                    Starting Pitcher
                </label>
                <div className={`group flex sm:shadow-sm ring-1 ring-inset ring-gray-200 rounded-md
                    focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600
                    ${pitcherHitting > 0? 'bg-gray-200 cursor-none': ''}`}>

                    <span className="inline-flex items-center rounded-l-md border-0 bg-gray-200
                        group-focus-within:bg-indigo-600 group-focus-within:text-white
                        px-3 font-semibold text-gray-700 sm:text-sm"
                    >
                        SP
                    </span>
                    <input
                        type="text"
                        id="pitcher"
                        disabled={pitcherHitting > 0}
                        value={startingPitcher}
                        onChange={(e) => handlePitcherChange(e.target.value)}
                        className="block flex-1 bg-transparent border-0 py-1.5 pl-1 text-gray-900 focus:ring-0
                            placeholder:text-gray-400 sm:text-sm sm:leading-6 disabled:text-gray-700 disabled:cursor-none"
                    />
                {/*247 marshall avenue los angeles*/}
                </div>
            </div>
        </>
    );
};