import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import ThemedButton from '../../components/ThemedButton';
import { router } from 'expo-router';

const LoginIssueFormSuccess = ({ navigation }) => {
    const [email, setEmail] = useState('');

    const handleFormSubmitted = () => {
        router.push({
            pathname: '/',
        });
    };

    const handleIssueFormPage = () => {
        router.push({
            pathname: '/',
        });
    };

    return (
        <ThemedView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push('/')}>
                    <Ionicons name="chevron-back" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <ThemedText style={styles.title}>
            Having&nbsp;
                <Text style={styles.welcomeText}>Trouble?</Text>
            </ThemedText>

            <View style={styles.textContainer}>
                <ThemedText style={styles.subtext}>
                    Your ticket has been <Text style={styles.spanText}>submitted</Text>
                </ThemedText>
                {/* <View style={styles.break} /> */}
                <ThemedText style={styles.subtext}>
                    Please allow up to 24-48 hours for the Purr team to reply.
                </ThemedText>
            </View>


            <ThemedButton
                title="Ok"
                onPress={handleFormSubmitted}
                style={styles.button}
            />
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },

    textContainer: {
    flex: 1, // Ensures the container takes full height
    justifyContent: 'center', // Vertically centers the content
    alignItems: 'center', // Horizontally centers the content
    padding: 20, // Adds some spacing around the text
    },
   
    spanText: {
        color: '#B976FF',
        textDecorationLine: 'underline',
        textDecorationColor: '#B976FF',
    },


    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        
    },
   spanText: {
    color: '#B976FF',
    textDecorationLine: 'underline', // This adds the underline
    textDecorationColor: '#B976FF',  // This sets the underline color
    },
    changePhoneNumber: {
        color: '#B976FF',
        fontSize: 18,
        fontWeight: '500',
    },
    subtext: {
        fontSize: 18,
        color: '#ffffff',
        marginBottom: 5,
       alignSelf: 'center',
        maxWidth: 300,
        textAlign: 'center',
        bottom: 40, // Distance from the bottom
        left: 16,
        right: 16,
        alignSelf: 'center',
        fontWeight:'700'
    },
    title: {
        fontSize: 40,
        fontWeight: '800',
        // marginBottom: 10,
        marginLeft: 10,
    },
    subtitle: {
        fontSize: 20,
        color: '#FFFFFF',
        marginLeft: 10,

    },
    input: {
        borderColor: '#ffffff',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        marginBottom: 20,
        color: '#ffffff',
        marginTop: 50
    },
    button: {
        position: 'absolute',
        bottom: 20, // Distance from the bottom
        left: 16,
        right: 16,
        alignSelf: 'center',
    },
    welcomeText:{
        color: '#B976FF',
    }
});

export default LoginIssueFormSuccess;
