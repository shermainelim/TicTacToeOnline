import React, { useEffect, useMemo, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { firestore, modifyPlayer, getConnectedPlayers } from '../lib/firebaseUtils';
import { getPlayerName } from '../lib/gameCanvasUtils';
import { View, Text, Clipboard, TouchableOpacity, Button, StyleSheet } from 'react-native';
import OnlineGameCanvas from './OnlineGameCanvas';
import { showToast } from '../lib/toast';

import { handleError } from '../lib/handleError';
import { GameState, Player } from '../lib/types';
import Spinner from './Spinner';
import { initialGameState } from './OnlineMultiplayer';

interface Props {
    gameState: GameState;
    setGameState: any;
}

const GameLoader: React.FC<Props> = ({ gameState, setGameState }) => {
    const disconnectPlayer = async () => {
        try {
            const docRef = firestore.collection('lobbies').doc(gameState.lobbyId);
            const getGameState = await docRef.get();

            const gamePlayers = getGameState.data()?.players as Player[] | undefined;
            if (!gamePlayers) return;

            if (gameState.playerId !== undefined) {
                const players = modifyPlayer(gamePlayers, gameState.playerId, { connected: false });
                await docRef.set({ players: players }, { merge: true });
            } else {
                showError();
            }

            setGameState(initialGameState);
        } catch (err) {
            showError();
            handleError(err);
        }
    };

    const connectPlayer = async () => {
        try {
            const docRef = firestore.collection('lobbies').doc(gameState.lobbyId);

            if (gameState.playerId !== undefined) {
                const players = modifyPlayer(gameState.players, gameState.playerId, { connected: true });
                await docRef.set({ players: players }, { merge: true });
            } else {
                showError();
            }
        } catch (err) {
            showError();
            handleError(err);
        }
    };

    const showError = (message: string = 'Could not connect to game server') => {
        showToast(message);
        setGameState(initialGameState);
    };

    useEffect(() => {
        if (gameState.gameLoaded && gameState.playerId !== undefined) {
            connectPlayer();
        }
    }, [gameState.gameLoaded, gameState.playerId]);

    useEffect(() => {
        const docRef = firestore.collection('lobbies').doc(gameState.lobbyId);
        let initial = true;

        const channel = docRef.onSnapshot(
            snapshot => {
                if (!snapshot.exists) return showError();
                if (initial) {
                    setGameState({ ...gameState, gameLoaded: true, lobbyId: gameState.lobbyId, ...snapshot.data() });
                    initial = false;
                    return;
                }
                setGameState({ ...gameState, lobbyId: gameState.lobbyId, ...snapshot.data() });
            },
            err => {
                showError();
            }
        );

        return () => {
            disconnectPlayer();
            channel();
        };
    }, [gameState.lobbyId]);

    const connectedPlayers = useMemo(() => {
        const result = gameState.players ? getConnectedPlayers(gameState.players) : [];

        return result;
    }, [gameState.players]);

    const copyLobbyId = () => {
        if (gameState.lobbyId) {
            showToast('Copied Lobby ID to Clipboard');
            Clipboard.setString(gameState.lobbyId);
        } else {
            showToast('Lobby does not exist');
        }
    };
    return (
        <>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Text style={styles.joinText}>Lobby ID:</Text>
                <TouchableOpacity onPress={copyLobbyId}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.lobbyId}> {gameState.lobbyId}</Text>
                        <MaterialCommunityIcons
                            color="#2A2D34"
                            name="clipboard-text-outline"
                            style={{
                                marginLeft: 2,
                                marginTop: 5,
                            }}
                            size={30}
                        />
                    </View>
                </TouchableOpacity>
            </View>

            <Text style={styles.text}>
                You are player:{' '}
                {gameState.playerId !== undefined ? getPlayerName(gameState.playerId, gameState.players) : ''}
            </Text>

            {connectedPlayers.length < 2 ? (
                <Spinner msg="Waiting for other player..." />
            ) : (
                <OnlineGameCanvas gameState={gameState} />
            )}

            <View style={{ margin: 10, backgroundColor: 'teal' }}>
                <Button
                    title="Quit Game"
                    color="#2A2D34"
                    onPress={() => {
                        disconnectPlayer();
                    }}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    text: {
        color: '#2A2D34',
        margin: 5,
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '500',
    },
    joinText: {
        color: '#2A2D34',
        marginTop: 10,
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '500',
    },
    lobbyId: {
        color: '#2A2D34',
        marginTop: 10,
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default GameLoader;
