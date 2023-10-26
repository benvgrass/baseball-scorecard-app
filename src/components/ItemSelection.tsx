'use client';
import React, {ReactNode, useState} from 'react';

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
            setAvailablePositions(remove);
        }

        // Remove the newly assigned position from available positions
        let add = {...availablePositions};
        add[newPosition] = false;
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
            setAvailablePositions(remove);

            // Remove the position from the player
            const updatedPlayer = { ...player, position: '' };
            const updatedLineup = lineup.map((p) => (p.battingOrder === battingOrder ? updatedPlayer : p));

            setLineup(updatedLineup);
        }
    };

    return (
        <div>
            <h2>Baseball Lineup</h2>
            <table>
                <thead>
                <tr>
                    <th>Batting Order</th>
                    <th>Player Name</th>
                    <th>Position</th>
                    <th>Actions</th>
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
                                <select
                                    value={player.position}
                                    onChange={(e) => handlePositionChange(player.battingOrder, e.target.value)}
                                >
                                    <option value="">Select Position</option>
                                    {positions.reduce((acc, position) => {
                                        if (availablePositions[position]) {
                                            acc.push(
                                                <option key={position} value={position}>
                                                    {position}
                                                </option>);
                                        }
                                        return acc;} ,new Array<ReactNode>())
                                        }
                                </select>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};