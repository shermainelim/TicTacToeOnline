import { Request, Response } from 'express';
import { firestore } from '../firebase';

/**
 * Common:
 *
 * res.status(401).send() sends back a 401 BAD REQUEST status code
 * Lets any client that requests with bad data know the request failed.
 */

const JoinGame = async (req: Request, res: Response) => {
    const playerName = req.body.playerName;
    const lobbyId = req.body.lobbyId;

    if (!lobbyId || !playerName) return res.status(401).send();

    // Creating a reference to a lobby regardless if it exists or not.
    const lobbyRef = firestore.collection('lobbies').doc(lobbyId);
    try {
        // Pulling the lobby from firebase
        const joinLobby = await lobbyRef.get();

        // Checking if the lobby we pulled from Firebase exists.
        // If it doesnt exists the lobbyId provides is wrong do nothing.
        if (!joinLobby.exists) {
            return res.status(401).send();
        }
        // Checking if lobby data exists as this can still be undefined.
        // If the lobby data is undefined do nothing
        const lobbyData = joinLobby.data();
        if (!lobbyData) return res.status(401).send();

        // Adding new information to the lobby as it exists. Using the "merge" flag set to true
        // This makes firebase shallowly merge the current lobby data with the new data.
        // Checking if player 1 is connected
        const players: Player[] = [...lobbyData.players];

        // Finding any disconnected player.
        const disconnectedPlayerIndex = players.findIndex((player: Player) => player.connected === false);
        if (!disconnectedPlayerIndex) return res.status(401).send(); // If player doesnt exists do nothing.

        // Setting playername to the specified name.
        // Connection status will be set by client once they join.
        players[disconnectedPlayerIndex].name = playerName;

        await lobbyRef.set(
            {
                players: players,
            },
            { merge: true } // Shallowly merges the current data with the new data.
        );

        return res.send({
            lobbyId: lobbyRef.id,
            playerIndex: disconnectedPlayerIndex,
            playerId: players[disconnectedPlayerIndex].id,
        });
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
};

export default JoinGame;

export interface Player {
    connected: boolean;
    id: string;
    name: string;
}
