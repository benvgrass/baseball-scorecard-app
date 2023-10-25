'use client';
import React, { useState } from 'react';

interface Player {
    battingOrder: number;
    name: string;
    position: string;
}

export default function BaseballLineup() {
    const battingOrderNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const initialPositions = ['C', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF', 'DH', 'P'];
    const [lineup, setLineup] = useState<Player[]>(battingOrderNumbers.map((battingOrder) => ({ battingOrder, name: '', position: '' })));
    const [availablePositions, setAvailablePositions] = useState<string[]>(initialPositions);

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
            setAvailablePositions([...availablePositions, assignedPosition]);
        }

        // Remove the newly assigned position from available positions
        setAvailablePositions(availablePositions.filter((position) => position !== newPosition));

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
            setAvailablePositions([...availablePositions, player.position]);

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
                                    {availablePositions.map((position) => (
                                        <option key={position} value={position}>
                                            {position}
                                        </option>
                                    ))}
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