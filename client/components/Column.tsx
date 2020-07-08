import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { WinnerColumns, FieldTypes, Winner } from '../lib/types';

interface Props {
    winnerColumns: WinnerColumns;
    num: number;
    disableFields: boolean;
    fieldTypes: FieldTypes;
    action: Function;
    tied: boolean;
    winner: Winner;
}

const Column: React.FC<Props> = ({ winnerColumns, num, disableFields, fieldTypes, action, tied, winner }) => {
    const [isWinnerColumn, setIsWinnerColumn] = useState(false);

    useEffect(() => {
        checkIfWinnerColumn();
    }, [winnerColumns]);

    const checkIfWinnerColumn = () => {
        if (winnerColumns[0] === num || winnerColumns[1] === num || (winnerColumns[2] === num && !isWinnerColumn)) {
            setIsWinnerColumn(true);
        } else if (winnerColumns) setIsWinnerColumn(false);
    };

    let icon;
    const currentFieldTypes = fieldTypes[num];

    if (currentFieldTypes === 'o') icon = 'circle-outline';
    else if (currentFieldTypes === 'x') icon = 'close';

    const size = 75;
    return (
        <TouchableOpacity
            disabled={disableFields || Boolean(currentFieldTypes)}
            style={{
                width: size,
                height: size,
                backgroundColor: disableFields ? '#2A2D34' : 'teal',
                borderRadius: 10,
                margin: 5,
            }}
            onPress={() => {
                if (!currentFieldTypes) action();
            }}
        >
            {currentFieldTypes !== '' ? (
                <View style={styles.container}>
                    <View style={{ width: size, height: size }}>
                        {icon ? (
                            <MaterialCommunityIcons
                                style={{ textAlign: 'center' }}
                                color={
                                    !isWinnerColumn ? ((winner || tied) && disableFields ? 'grey' : 'white') : 'teal'
                                }
                                name={icon}
                                size={size}
                            />
                        ) : null}
                    </View>
                </View>
            ) : null}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Column;
