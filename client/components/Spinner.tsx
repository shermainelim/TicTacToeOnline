import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

interface Props {
    msg: string;
}

const Spinner: React.FC<Props> = ({ msg }) => {
    return (
        <View style={{ marginTop: 10 }}>
            <ActivityIndicator color="teal" size="large" />
            <Text style={styles.text}>{msg}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        color: '#2A2D34',
        fontWeight: 'bold',
        fontSize: 15,
        margin: 15,
        textAlign: 'center',
    },
});

export default Spinner;
