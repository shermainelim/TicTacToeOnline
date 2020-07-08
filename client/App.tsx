import React from 'react';
import { View, StatusBar, YellowBox } from 'react-native';
import { decode, encode } from 'base-64';
import OnlineMultiplayer from './components/OnlineMultiplayer';
import Header from './components/Header';

// ignoring warning we can't fix
YellowBox.ignoreWarnings(['Require cycle:', 'Remote debugger']);

declare const global: {
    btoa: typeof encode;
    atob: typeof decode;
};
// Polyfill for Firebase missing base-64 decoder/encoder
if (!global.btoa) global.btoa = encode;
if (!global.atob) global.atob = decode;

const App: React.FC = () => {
    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" />
            <Header title="Tic Tac Toe Online" />
            <OnlineMultiplayer />
        </View>
    );
};

export default App;
