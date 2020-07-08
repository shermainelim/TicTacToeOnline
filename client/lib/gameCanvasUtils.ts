import { PlayerId, FieldTypes, Winner, Player, GameState } from './types';

export const getFieldType = (playerId: PlayerId, turn: GameState['turn']) => (playerId === turn ? 'x' : 'o');

// export const getPlayerType = (playerId: PlayerId) => {
//     if (playerId === 0) return 'X';
//     else if (playerId === 1) return 'O';
// };

export const getPlayerName = (playerId: PlayerId, players: Player[]): string => {
    const player = players.find(player => player.id === playerId)?.name;
    return player || '';
};

export const getOppositePlayer = (playerId: PlayerId, players: Player[]) => {
    const playerIndex = players.findIndex(player => player.id === playerId);
    if (playerIndex === -1) throw new Error('PlayerId not found');
    if (playerIndex === 0) return players[1];
    else return players[0];
};

export const getPlayerFieldType = (playerId: PlayerId, players: Player[]) => {
    const playerIndex = players.findIndex(player => player.id === playerId);
    if (playerIndex === -1) throw new Error('PlayerId not found');
    if (playerIndex === 0) return 'x';
    else return 'o';
};

const winnerCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

type FieldType = 'x' | 'o';

export const checkGame = (fieldTypes: FieldTypes) => {
    const users: FieldType[] = ['x', 'o'];
    let tied = false;
    let winner = null as Winner;
    let winnerColumns: number[] = [];

    for (const user of users) {
        for (const combination of winnerCombinations) {
            if (
                fieldTypes[combination[0]] === user &&
                fieldTypes[combination[1]] === user &&
                fieldTypes[combination[2]] === user
            ) {
                winner = user;
                winnerColumns = [combination[0], combination[1], combination[2]];
                break;
            }
        }
    }

    let stringValues = 0;
    fieldTypes.forEach((fieldType: null | string) => {
        if (typeof fieldType === 'string') stringValues++;
    });

    if (!winner && stringValues === fieldTypes.length) tied = true;
    if (!winner && !tied) return undefined;
    return { winner, winnerColumns, tied };
};
