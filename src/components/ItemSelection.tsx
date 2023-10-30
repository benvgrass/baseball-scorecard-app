'use client';
import React, {Fragment, ReactNode, useState} from 'react';
import {Listbox, Transition} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

interface Player {
    battingOrder: number;
    name: string;
    position: string;
}

export default function BaseballLineup() {
    const battingOrderNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const positions = ['C', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF', 'DH', 'P'];
    const initialPositions = {"C": true, '1B': true, '2B': true, '3B': true, 'SS': true, 'LF': true, 'CF': true, 'RF': true, 'DH': true, "P": true};
    const [lineup, setLineup] = useState<Player[]>(battingOrderNumbers.map((battingOrder) => ({ battingOrder, name: '', position: '' })));
    const [availablePositions, setAvailablePositions] = useState<Record<string, boolean>>(initialPositions);
    const [pitcherHitting, setPitcherHitting] = useState<boolean>(false);

    function classNames(...classes: string[]): string {
        return classes.filter(Boolean).join(' ')
    }

    const handleNameChange = (battingOrder: number, playerName: string) => {
        const updatedLineup = lineup.map((player) => {
            if (player.battingOrder === battingOrder) {
                return { ...player, name: playerName };
            }
            return player;
        });

        setLineup(updatedLineup);
    };

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
                    setPitcherHitting(false);
                } else if (assignedPosition === "DH") {
                    nowAvailable["P"] = true;
                }
            }
            // Remove the newly assigned position from available positions
            if (newPosition) {
                nowAvailable[newPosition] = false;
                if (newPosition === "P") {
                    nowAvailable["DH"] = false;
                    setPitcherHitting(true);
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

    // const handleUnassignPosition = (battingOrder: number) => {
    //     const player = lineup.find((p) => p.battingOrder === battingOrder);
    //     if (player) {
    //         // Add the unassigned position back to available positions
    //         let remove = {...availablePositions};
    //         remove[player.position] = true;
    //         if (player.position === "P") {
    //             remove["DH"] = true;
    //             setPitcherHitting(false);
    //         } else if (player.position === "DH") {
    //             remove["P"] = true;
    //         }
    //         setAvailablePositions(remove);
    //
    //         // Remove the position from the player
    //         const updatedPlayer = { ...player, position: '' };
    //         const updatedLineup = lineup.map((p) => (p.battingOrder === battingOrder ? updatedPlayer : p));
    //
    //         setLineup(updatedLineup);
    //     }
    // };

    return (
        <div className="px-4 sm:px-6 lg:px-8 -mx-4 mt-10 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
                <thead>
                <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Batting Order</th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Player Name</th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Position</th>
                </tr>
                </thead>
                <tbody>
                {lineup.map((player, i) => (
                    <tr key={player.battingOrder}>
                        <td className={classNames(
                            i === 0 ? '' : 'border-t border-gray-200',
                            'relative px-3 py-3.5 text-sm text-gray-500 lg:table-cell'
                        )}>
                            <div className="py-3.5 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-6">
                                {player.battingOrder}
                            </div>
                            </td>
                        <td className={classNames(
                            i === 0 ? '' : 'border-t border-gray-200',
                            'relative mt-auto px-3 py-3.5 text-sm text-gray-500 lg:table-cell'
                        )}>
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
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
                                            <Listbox.Button className="relative px-1 w-full cursor-default rounded-md bg-white py-1.5 pl-3 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                                <span className="block truncate">{player.position || '--'}</span>
                                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                </span>
                                            </Listbox.Button>
                                            <Transition
                                                show={open}
                                                as={Fragment}
                                                leave="transition ease-in duration-100"
                                                leaveFrom="opacity-100"
                                                leaveTo="opacity-0"
                                            >
                                                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                    <Listbox.Option value={""} className={({ active }) =>
                                                        classNames(
                                                            active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                            'relative cursor-default select-none py-2 pl-3 pr-9'
                                                        )
                                                    }>
                                                        {({ selected, active }) => (
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
                                                                                            'relative cursor-default select-none py-2 pl-3 pr-9'
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
    );
};