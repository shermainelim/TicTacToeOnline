import { generate } from 'shortid';
import { Request, Response } from 'express';
import { firestore } from '../firebase';

/**
 * @function NewGame() creates a new lobby.
 * The DB rules states that a client cannot create a lobby as this could open our DB to DOS attacks and cap daily max writes.
 * A lobby can only be created on the server, but can be modified on the client.
 * This endpoint therefore creates a new lobby and sends back its ID & the first playerId for the client to access.
 */

const NewGame = async (req: Request, res: Response) => {
    const newLobby = firestore.collection('lobbies').doc(generate());

    const playerName = req.body.playerName;

    if (!playerName) {
        return;
    }

    const players = [
        {
            id: generate(),
            name: req.body.playerName,
            connected: false,
        },
        {
            id: generate(),
            connected: false,
        },
    ];

    const startingPlayer = players[0];
    await newLobby.set({
        fieldTypes: [null, null, null, null, null, null, null, null, null],
        startingPlayer: startingPlayer.id,
        turn: startingPlayer.id,
        players: players,
        createdAt: new Date(),
    });

    return res.send({ lobbyId: newLobby.id, playerId: startingPlayer.id });
};

export default NewGame;
