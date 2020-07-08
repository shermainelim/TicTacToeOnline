import firebase from 'firebase/app';
import 'firebase/firestore';
import { Player, GameState } from './types';

export const firebaseConfig = {
    apiKey: 'AIzaSyBPq148teo5mPs1g5Hig3jRnXJMjKvaKJI',
    authDomain: 'tic-tac-toe-online-66fbe.firebaseapp.com',
    databaseURL: 'https://tic-tac-toe-online-66fbe.firebaseio.com',
    projectId: 'tic-tac-toe-online-66fbe',
    storageBucket: 'tic-tac-toe-online-66fbe.appspot.com',
    messagingSenderId: '36636769225',
    appId: '1:36636769225:web:9f5f212010639f655b4618',
    measurementId: 'G-57V3LBLPSB',
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

export const modifyPlayer = (playersArr: Player[], id: GameState['playerId'], newState: Partial<Player>) =>
    playersArr.map((player, index) => (player.id === id ? { ...player, ...newState } : player));

export const getConnectedPlayers = (players: Player[]) => {
    return players.filter(player => player.connected);
};

export const SERVER_URL = 'https://us-central1-tic-tac-toe-online-66fbe.cloudfunctions.net/game';
