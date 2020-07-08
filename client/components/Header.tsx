import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
    title: string;
}

const Header: React.FC<Props> = ({ title }) => {
    return (
        <View style={styles.header}>
            <Text style={styles.text}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'teal',
        padding: 20,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        marginTop: 10,
        fontSize: 18,
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
    },
});

export default Header;
