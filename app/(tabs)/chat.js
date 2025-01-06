import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChatPage = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Chat Page</Text>
            <Text>Welcome to the chat page. Start your conversation here!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
});

export default ChatPage;