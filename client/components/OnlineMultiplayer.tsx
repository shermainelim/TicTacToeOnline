import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { View, StyleSheet, Text } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { firestore, getConnectedPlayers, SERVER_URL } from '../lib/firebaseUtils';
import PlayerMenu from './PlayerMenu';
import GameLoader from './GameLoader';

import { handleError } from '../lib/handleError';
import Spinner from './Spinner';
import { GameState, Player } from '../lib/types';
import { showToast } from '../lib/toast';

export const initialGameState = {
    lobbyId: undefined,
    playerId: undefined,
    turn: undefined,
    fieldTypes: [],
    players: [],
    gameLoaded: false,
    resetable: true,
};

const OnlineMultiplayer: React.FC = () => {
    const [gameState, setGameState] = useState<GameState>(initialGameState);

    const [lobbyIdInput, setLobbyIdInput] = useState('');
    const [newGameNameInput, setNewGameNameInput] = useState('');
    const [joinGameNameInput, setJoinGameNameInput] = useState('');

    const [connected, setConnected] = useState(false);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => setConnected(state.isConnected));
        return () => unsubscribe();
    }, []);

    const handleNewGame = async () => {
        setLoading(true);
        try {
            const response = await Axios({
                method: 'POST',
                url: `${SERVER_URL}/new`,
                data: { playerName: newGameNameInput },
            });

            setGameState({ ...gameState, playerId: response.data.playerId, lobbyId: response.data.lobbyId });
        } catch (err) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const handleJoinGame = async () => {
        try {
            // Fetching lobby from text input
            const lobbyRef = firestore.collection('lobbies').doc(lobbyIdInput);
            const snapshot = await lobbyRef.get();

            // Showing error to the user if the lobby doesn't exist
            if (!snapshot.exists) {
                return showToast(`Lobby doesn't exist`);
            }

            const joinRequest = await Axios({
                method: 'POST',
                url: `${SERVER_URL}/join`,
                data: { playerName: joinGameNameInput, lobbyId: lobbyIdInput },
            });

            const latestLobbyData = await lobbyRef.get();

            const players = latestLobbyData?.data()?.players as Player[] | undefined;

            if (!players) return showToast('Failed to connect');

            const connected = getConnectedPlayers(players);

            const playerId: string = joinRequest.data.playerId;

            if (connected.length >= 2) {
                return showToast('Lobby is full...');
            }

            setGameState({ ...gameState, playerId: playerId, lobbyId: lobbyIdInput });
        } catch (err) {
            showToast('Failed to connect');
            handleError(err);
        }
    };

    if (connected === true) {
        if (loading === true && gameState.playerId === undefined) {
            return (
                <View style={styles.container}>
                    <Spinner msg="Connecting to game server" />
                </View>
            );
        }
        if (gameState.lobbyId) {
            return (
                <View style={styles.container}>
                    <GameLoader gameState={gameState} setGameState={setGameState} />
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <PlayerMenu
                    newGameNameInput={newGameNameInput}
                    setNewGameNameInput={setNewGameNameInput}
                    joinGameNameInput={joinGameNameInput}
                    setJoinGameNameInput={setJoinGameNameInput}
                    lobbyIdInput={lobbyIdInput}
                    setLobbyIdInput={setLobbyIdInput}
                    handleNewGame={handleNewGame}
                    handleJoinGame={handleJoinGame}
                />
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <MaterialCommunityIcons color="#2A2D34" name="wifi-strength-alert-outline" size={30} />
                <Text style={styles.text}>Please check your{'\n'}network connection!</Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E6EAEB',
    },
    text: {
        color: '#2A2D34',
        margin: 5,
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '500',
    },
});

export default OnlineMultiplayer;
