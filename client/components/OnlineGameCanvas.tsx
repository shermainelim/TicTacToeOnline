import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import { firestore } from '../lib/firebaseUtils';
import { getFieldType, checkGame, getPlayerName, getOppositePlayer, getPlayerFieldType } from '../lib/gameCanvasUtils';
import { handleError } from '../lib/handleError';
import { Winner, WinnerColumns, GameState } from '../lib/types';
import Column from './Column';

interface WinnerState {
    winner: Winner;
    tied: boolean;
    winnerColumns: WinnerColumns;
}

interface Props {
    gameState: GameState;
}

const initialState = {
    winner: null,
    tied: false,
    winnerColumns: [],
};

const OnlineGameCanvas: React.FC<Props> = ({ gameState }) => {
    const [winnerDetails, setWinnerDetails] = useState<WinnerState>(initialState);

    const canvasFrozen = gameState.playerId !== gameState.turn;

    const handleFieldPress = async (num: number) => {
        try {
            if (canvasFrozen) return;
            const docRef = firestore.collection('lobbies').doc(gameState.lobbyId);

            const newFieldTypes = [...gameState.fieldTypes];

            if (gameState.playerId !== undefined) {
                newFieldTypes[num] = getPlayerFieldType(gameState.playerId, gameState.players);
            }

            await docRef.set(
                {
                    gameStarted: true,
                    turn: getOppositePlayer(gameState.playerId, gameState.players).id,
                    fieldTypes: newFieldTypes,
                    resetable: false,
                },
                { merge: true }
            );
        } catch (err) {
            handleError(err);
        }
    };

    const resetLobby = async () => {
        try {
            const docRef = firestore.collection('lobbies').doc(gameState.lobbyId);

            await docRef.set(
                {
                    fieldTypes: [null, null, null, null, null, null, null, null, null],
                    turn: gameState.players[0].id,
                    resetable: true,
                },
                { merge: true }
            );
        } catch (err) {
            handleError(err);
        }
    };

    useEffect(() => {
        gameState.resetable && setWinnerDetails(initialState);
    }, [gameState.resetable]);

    useEffect(() => {
        const result = checkGame(gameState.fieldTypes);
        if (result?.winner && result.winnerColumns.length) {
            setWinnerDetails({
                ...winnerDetails,
                winner: result.winner,
                winnerColumns: result.winnerColumns,
            });
        } else if (winnerDetails.winner) {
            setWinnerDetails(initialState);
        } else if (result?.tied) {
            setWinnerDetails({ ...initialState, tied: true });
        }
    }, [gameState.fieldTypes]);

    return (
        <View style={styles.container}>
            {!(Boolean(winnerDetails.winner) || winnerDetails.tied) ? (
                <Text style={styles.text}>
                    {gameState.playerId === gameState.turn
                        ? 'Your turn'
                        : `Player ${getPlayerName(gameState.turn, gameState.players)} picking`}
                </Text>
            ) : null}
            {Boolean(winnerDetails.winner) || winnerDetails.tied ? (
                <View>
                    <Text style={styles.gameOverText}>
                        {Boolean(winnerDetails.winner) && gameState.playerId !== undefined
                            ? winnerDetails.winner === getPlayerFieldType(gameState.playerId, gameState.players)
                                ? 'You won'
                                : 'You lost'
                            : `It's a tie`}
                    </Text>

                    <View style={{ margin: 10, backgroundColor: 'teal' }}>
                        <Button title="New Game" color="#2A2D34" onPress={resetLobby} />
                    </View>
                </View>
            ) : null}
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <Column
                        action={() => handleFieldPress(0)}
                        num={0}
                        fieldTypes={gameState.fieldTypes}
                        tied={winnerDetails.tied}
                        winner={winnerDetails.winner}
                        winnerColumns={winnerDetails.winnerColumns}
                        disableFields={
                            canvasFrozen || Boolean(winnerDetails.winnerColumns.length) || winnerDetails.tied
                        }
                    />
                    <Column
                        action={() => handleFieldPress(1)}
                        num={1}
                        fieldTypes={gameState.fieldTypes}
                        tied={winnerDetails.tied}
                        winner={winnerDetails.winner}
                        winnerColumns={winnerDetails.winnerColumns}
                        disableFields={
                            canvasFrozen || Boolean(winnerDetails.winnerColumns.length) || winnerDetails.tied
                        }
                    />
                    <Column
                        action={() => handleFieldPress(2)}
                        num={2}
                        fieldTypes={gameState.fieldTypes}
                        tied={winnerDetails.tied}
                        winner={winnerDetails.winner}
                        winnerColumns={winnerDetails.winnerColumns}
                        disableFields={
                            canvasFrozen || Boolean(winnerDetails.winnerColumns.length) || winnerDetails.tied
                        }
                    />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Column
                        action={() => handleFieldPress(3)}
                        num={3}
                        fieldTypes={gameState.fieldTypes}
                        tied={winnerDetails.tied}
                        winner={winnerDetails.winner}
                        winnerColumns={winnerDetails.winnerColumns}
                        disableFields={
                            canvasFrozen || Boolean(winnerDetails.winnerColumns.length) || winnerDetails.tied
                        }
                    />
                    <Column
                        action={() => handleFieldPress(4)}
                        num={4}
                        fieldTypes={gameState.fieldTypes}
                        tied={winnerDetails.tied}
                        winner={winnerDetails.winner}
                        winnerColumns={winnerDetails.winnerColumns}
                        disableFields={
                            canvasFrozen || Boolean(winnerDetails.winnerColumns.length) || winnerDetails.tied
                        }
                    />
                    <Column
                        action={() => handleFieldPress(5)}
                        num={5}
                        fieldTypes={gameState.fieldTypes}
                        tied={winnerDetails.tied}
                        winner={winnerDetails.winner}
                        winnerColumns={winnerDetails.winnerColumns}
                        disableFields={
                            canvasFrozen || Boolean(winnerDetails.winnerColumns.length) || winnerDetails.tied
                        }
                    />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Column
                        action={() => handleFieldPress(6)}
                        num={6}
                        fieldTypes={gameState.fieldTypes}
                        tied={winnerDetails.tied}
                        winner={winnerDetails.winner}
                        winnerColumns={winnerDetails.winnerColumns}
                        disableFields={
                            canvasFrozen || Boolean(winnerDetails.winnerColumns.length) || winnerDetails.tied
                        }
                    />
                    <Column
                        action={() => handleFieldPress(7)}
                        num={7}
                        fieldTypes={gameState.fieldTypes}
                        tied={winnerDetails.tied}
                        winner={winnerDetails.winner}
                        winnerColumns={winnerDetails.winnerColumns}
                        disableFields={
                            canvasFrozen || Boolean(winnerDetails.winnerColumns.length) || winnerDetails.tied
                        }
                    />
                    <Column
                        action={() => handleFieldPress(8)}
                        num={8}
                        fieldTypes={gameState.fieldTypes}
                        tied={winnerDetails.tied}
                        winner={winnerDetails.winner}
                        winnerColumns={winnerDetails.winnerColumns}
                        disableFields={
                            canvasFrozen || Boolean(winnerDetails.winnerColumns.length) || winnerDetails.tied
                        }
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gameOverText: {
        color: '#2A2D34',
        margin: 10,
        fontSize: 30,
        textAlign: 'center',
        fontWeight: '500',
    },
    text: {
        color: '#2A2D34',
        marginTop: 10,
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '500',
        marginBottom: 10,
    },
});

export default OnlineGameCanvas;
