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
        const assignedPosition = lineup.find((player) => player.battingOrder === battingOrder)?.position;

        if (assignedPosition) {
            // Add the previously assigned position back to available positions
            let remove = {...availablePositions};
            remove[assignedPosition] = true;
            if (assignedPosition === "P") {
                remove["DH"] = true;
                setPitcherHitting(false);
            } else if (assignedPosition === "DH") {
                remove["P"] = true;
            }
            setAvailablePositions(remove);
        }

        // Remove the newly assigned position from available positions
        let add = {...availablePositions};
        add[newPosition] = false;
        if (newPosition === "P") {
            add["DH"] = false;
            setPitcherHitting(true);
        } else if (newPosition === "DH") {
            add["P"] = false;
        }
        setAvailablePositions(add);

        const updatedLineup = lineup.map((player) => {
            if (player.battingOrder === battingOrder) {
                return { ...player, position: newPosition };
            }
            return player;
        });

        setLineup(updatedLineup);
    };

    const handleUnassignPosition = (battingOrder: number) => {
        const player = lineup.find((p) => p.battingOrder === battingOrder);
        if (player) {
            // Add the unassigned position back to available positions
            let remove = {...availablePositions};
            remove[player.position] = true;
            if (player.position === "P") {
                remove["DH"] = true;
                setPitcherHitting(false);
            } else if (player.position === "DH") {
                remove["P"] = true;
            }
            setAvailablePositions(remove);

            // Remove the position from the player
            const updatedPlayer = { ...player, position: '' };
            const updatedLineup = lineup.map((p) => (p.battingOrder === battingOrder ? updatedPlayer : p));

            setLineup(updatedLineup);
        }
    };

    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>Batting Order</th>
                    <th>Player Name</th>
                    <th>Position</th>
                </tr>
                </thead>
                <tbody>
                {lineup.map((player) => (
                    <tr key={player.battingOrder}>
                        <td>{player.battingOrder}</td>
                        <td>
                            <input
                                type="text"
                                value={player.name}
                                onChange={(e) => handleNameChange(player.battingOrder, e.target.value)}
                            />
                        </td>
                        <td>
                            {player.position && (
                                <>
                                    {player.position}{' '}
                                    <button onClick={() => handleUnassignPosition(player.battingOrder)}>Unassign</button>
                                </>
                            )}
                            {!player.position && (
                                <Listbox
                                    value={player.position}
                                    onChange={(e) => handlePositionChange(player.battingOrder, e)}
                                >
                                    {({ open }) => (
                                        <>
                                            <div className="relative mt-2">
                                                <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
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
                                                        {positions.reduce((acc, position) => {
                                                                if (availablePositions[position]) {
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
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};