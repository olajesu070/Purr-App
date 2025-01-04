import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import ThemedButton from '../../components/ThemedButton';
import { router } from 'expo-router';

const LoginIssueForm = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');

    const handleShowFormSubmittedSuccess = () => {
        router.push({
            pathname: '/loginIssueFormSuccess',
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
            <ThemedText style={styles.subtitle}>Complete below to continue</ThemedText>

            <TextInput
                style={styles.input}
                placeholder="Email Address"
                placeholderTextColor="#AAB3BB"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />


            <TextInput
                style={styles.input}
                placeholder="Subject"
                placeholderTextColor="#AAB3BB"
                value={subject}
                onChangeText={setSubject}
            />

            {/* Description Input */}
            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Description"
                placeholderTextColor="#AAB3BB"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
            />

           
         
            <ThemedButton
                title="Submit"
                onPress={handleShowFormSubmittedSuccess}
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    spanText: {
        color: '#B976FF',
        textDecorationLine: 'underline',
        textDecorationColor: '#B976FF',
    },
    subtext: {
        fontSize: 16,
        color: 'rgba(151, 156, 158, 1)',
        marginBottom: 40,
        alignSelf: 'center',
        maxWidth: 300,
        textAlign: 'center',
        position: 'absolute',
        bottom: 40,
        left: 16,
        right: 16,
        alignSelf: 'center',
    },
    title: {
        fontSize: 40,
        fontWeight: '800',
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
        marginBottom: 10,
        color: '#ffffff',
        marginTop: 10,
    },
    textArea: {
        height: 200, // Adjust the height for the text area
        textAlignVertical: 'top', // Ensure the text starts at the top
        
    },
    button: {
        position: 'absolute',
        bottom: 20,
        left: 16,
        right: 16,
        alignSelf: 'center',
    },
    welcomeText: {
        color: '#B976FF',
    },
});

export default LoginIssueForm;
