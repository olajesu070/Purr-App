import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChatPage = () => {
    return (
         <ThemedView >
             <View>
               <Text>
                       this is the add new user screen
                   </Text>
                </View>
            </ThemedView>
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