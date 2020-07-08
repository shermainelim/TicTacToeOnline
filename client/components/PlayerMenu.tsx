import React from 'react';
import { View, Text, TextInput, Clipboard, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { showToast } from '../lib/toast';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { handleError } from '../lib/handleError';

interface Props {
    newGameNameInput: string;
    setNewGameNameInput: any;
    joinGameNameInput: string;
    setJoinGameNameInput: any;
    lobbyIdInput: string;
    setLobbyIdInput: any;
    handleNewGame: () => void;
    handleJoinGame: () => void;
}

const PlayerMenu: React.FC<Props> = ({
    lobbyIdInput,
    setLobbyIdInput,
    handleNewGame,
    handleJoinGame,
    newGameNameInput,
    setNewGameNameInput,
    joinGameNameInput,
    setJoinGameNameInput,
}) => {
    const insertFromClipboard = async () => {
        try {
            const text = await Clipboard.getString();
            if (Boolean(text.length)) {
                showToast('Inserted text from Clipboard');
                setLobbyIdInput(text);
            } else {
                showToast('Clipboard is empty');
            }
        } catch (err) {
            handleError(err);
        }
    };

    const clearInput = () => {
        setLobbyIdInput('');
    };

    return (
        <View>
            <Text style={styles.titleText}>New Game:</Text>

            <TextInput
                style={styles.input}
                value={newGameNameInput}
                onChangeText={text => setNewGameNameInput(text)}
                selectionColor="teal"
                placeholder="Enter your name"
                placeholderTextColor="white"
                autoCapitalize="none"
                underlineColorAndroid="transparent"
            />
            <View style={{ padding: 10, margin: 10, backgroundColor: 'teal' }}>
                <Button
                    disabled={newGameNameInput.length === 0 ? true : false}
                    onPress={handleNewGame}
                    color="#2A2D34"
                    title="Create Game"
                />
            </View>

            <View
                style={{
                    marginLeft: 5,
                    marginRight: 5,
                    marginTop: 5,
                    borderBottomColor: 'lightgrey',
                    borderBottomWidth: 2,
                }}
            />

            <Text style={styles.titleText}>Join Game:</Text>

            <TextInput
                style={styles.input}
                value={joinGameNameInput}
                onChangeText={text => setJoinGameNameInput(text)}
                selectionColor="teal"
                placeholder="Enter your name"
                placeholderTextColor="white"
                autoCapitalize="none"
                underlineColorAndroid="transparent"
            />

            <TextInput
                style={styles.input}
                value={lobbyIdInput}
                onChangeText={text => setLobbyIdInput(text)}
                selectionColor="teal"
                placeholder="Enter lobby id"
                placeholderTextColor="white"
                autoCapitalize="none"
                underlineColorAndroid="transparent"
            />

            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                }}
            >
                <TouchableOpacity onPress={insertFromClipboard}>
                    <MaterialCommunityIcons color="#2A2D34" name="clipboard-text-outline" size={30} />
                </TouchableOpacity>

                <TouchableOpacity onPress={clearInput} disabled={!Boolean(lobbyIdInput.length)}>
                    <MaterialCommunityIcons
                        color={!Boolean(lobbyIdInput.length) ? 'grey' : '#2A2D34'}
                        name="backspace-outline"
                        size={30}
                    />
                </TouchableOpacity>
            </View>

            <View style={{ padding: 10, margin: 10, backgroundColor: 'teal' }}>
                <Button
                    title="Join"
                    disabled={lobbyIdInput.length === 0 || joinGameNameInput.length === 0 ? true : false}
                    onPress={handleJoinGame}
                    color="#2A2D34"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    titleText: {
        color: '#2A2D34',
        margin: 10,
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '500',
    },
    text: {
        color: '#2A2D34',
        margin: 5,
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '500',
    },
    input: {
        color: 'white',
        textAlign: 'center',
        backgroundColor: 'lightgrey',
        height: 40,
        width: 200,
        margin: 5,
        borderRadius: 5,
        borderColor: 'teal',
        fontSize: 20,
    },
});

export default PlayerMenu;
