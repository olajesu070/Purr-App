import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import ThemedButton from '@/components/ThemedButton';
import { router } from 'expo-router';


const RegistrationPage = () => {
    const [currentView, setCurrentView] = useState(1);
    const [formData, setFormData] = useState({
        displayName: '',
        firstName: '',
        lastName: '',
        dateOfBirth: '',
    });

    const handleNext = () => {
        setCurrentView(2);
    };

    const handleInputChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value,
        });
    };

    const handleSubmit = () => { 
        alert('Form submitted!');
        router.push({
            pathname: '/profileTagPage',
        });
       
    };

    return (
        <ThemedView style={styles.container}>
           {currentView === 1 && (
        <View style={styles.formContainer}>
        <View>
            <ThemedText style={styles.title}>
                What’s your <Text style={styles.spanText}>Name</Text>?
            </ThemedText>
            <Text style={styles.label}>Complete below to continue</Text>
            <TextInput
                style={styles.input}
                placeholder="Chosen Name (Optional)"
                placeholderTextColor="#AAB3BB"
                value={formData.displayName}
                onChangeText={(text) => handleInputChange('displayName', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter your legal first name"
                placeholderTextColor="#AAB3BB"
                value={formData.firstName}
                onChangeText={(text) => handleInputChange('firstName', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter your last name"
                placeholderTextColor="#AAB3BB"
                value={formData.lastName}
                onChangeText={(text) => handleInputChange('lastName', text)}
            />
            <ThemedText style={styles.subtext}>
                This information will not be shared on your profile.
            </ThemedText>
        </View>
        <ThemedButton
            title="Next"
            onPress={handleNext}
            style={styles.button}
        />
    </View>
            )}

            {currentView === 2 && (
                <View style={styles.formContainer}>
                <ThemedText style={styles.title}>
                What’s your {'\n'}<Text style={styles.spanText}>Date of Birth?</Text>?
                </ThemedText>
                    <Text style={styles.label}>Complete below to continue</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your date of birth (YYYY-MM-DD)"
                        placeholderTextColor="#AAB3BB"
                        keyboardType="numbers-and-punctuation"
                        value={formData.dateOfBirth}
                        onChangeText={(text) => handleInputChange('dateOfBirth', text)}
                    />

                    <ThemedText style={styles.subtext}>
                    By continuing, I hereby certify that I am 18 years or older.
                    </ThemedText>

                    <ThemedButton
                        title="Submit"
                        onPress={handleSubmit}
                        style={styles.button}
                    />
                </View>
            )}
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    formContainer: {
        flex:1,
        marginTop: 10,
    },
    title: {
        fontSize: 40,
        fontWeight: '800',
        marginBottom: 10,
        color: '#FFFFFF',
    },
    subtitle: {
        fontSize: 20,
        color: '#FFFFFF',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: '#FFFFFF',
        marginBottom: 25,
    },
    input: {
        borderColor: '#FFFFFF',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        marginBottom: 20,
        color: '#FFFFFF',
    },
    button: {
        position: 'absolute',
        bottom: 0,
        left: 1,
        right: 1,
        alignSelf: 'center',
        
    },
    spanText: {
        color: '#B976FF',
        textDecorationLine: 'underline',
    },
    subtext: {
        fontSize: 14,
        color: 'rgba(151, 156, 158, 1)',
       alignSelf: 'center',
        textAlign: 'center',
        alignSelf: 'center',
    },
});

export default RegistrationPage;
