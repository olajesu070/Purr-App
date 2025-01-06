import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MapPage = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Map Page</Text>
            <Text>This is the map page.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default MapPage;