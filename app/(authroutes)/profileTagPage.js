import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import ThemedButton from '@/components/ThemedButton';
import { router } from 'expo-router';

const ProfileTagPage = () => {
    const [currentView, setCurrentView] = useState(1);
    const [selectedTags, setSelectedTags] = useState({
        gender: [],
        industry: [],
    });

    const handleTagSelect = (category, tag) => {
        setSelectedTags((prevState) => {
            const updatedTags = [...prevState[category]];
            if (updatedTags.includes(tag)) {
                updatedTags.splice(updatedTags.indexOf(tag), 1); // Remove tag if already selected
            } else {
                updatedTags.push(tag); // Add tag if not selected
            }
            return { ...prevState, [category]: updatedTags };
        });
    };

    const handleNext = () => {
        setCurrentView(2);
    };

    return (
        <ThemedView style={styles.container}>
            {currentView === 1 && (
                <ScrollView contentContainerStyle={styles.formContainer}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.push('/registrationPage')}>
                            <Ionicons name="chevron-back" size={24} color="white" />
                        </TouchableOpacity>
                        <ThemedText style={styles.buildProfileText}>Build Your Profile</ThemedText>
                        <TouchableOpacity onPress={() => alert('Skipped')}>
                            <ThemedText style={styles.skipText}>Skip</ThemedText>
                        </TouchableOpacity>
                        
                    </View>

                    <View style={styles.categoryContainer}>
                        <Text style={styles.categoryTitle}>Your Industry</Text>
                        <View style={styles.tagsContainer}>
                            {['Advertising',
    'Automotive',
    'Agriculture',
    'Commerce',
    'Construction',
    'Education',
    'Entertainment',
    'Energy',
    'Finance',
    'Hospitality',
    'NSFW',
    'Technology',
    'Tourism',
    'Transportation',
    'Military',
    'Public Services',
    'Law Enforcement'].map((tag) => (
                                <TouchableOpacity
                                    key={tag}
                                    style={[
                                        styles.tag,
                                        selectedTags.gender.includes(tag) && styles.selectedTag,
                                    ]}
                                    onPress={() => handleTagSelect('gender', tag)}
                                >
                                    <Text
                                        style={[
                                            styles.tagText,
                                            selectedTags.gender.includes(tag) && styles.selectedTagText,
                                        ]}
                                    >
                                        {tag}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <View style={styles.categoryContainer}>
                        <Text style={styles.categoryTitle}>Your Industry</Text>
                        <View style={styles.tagsContainer}>
                            {['Tech', 'Finance', 'Education', 'Health', 'Other'].map((tag) => (
                                <TouchableOpacity
                                    key={tag}
                                    style={[
                                        styles.tag,
                                        selectedTags.industry.includes(tag) && styles.selectedTag,
                                    ]}
                                    onPress={() => handleTagSelect('industry', tag)}
                                >
                                    <Text
                                        style={[
                                            styles.tagText,
                                            selectedTags.industry.includes(tag) && styles.selectedTagText,
                                        ]}
                                    >
                                        {tag}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleNext}>
                        <Text style={styles.buttonText}>Next</Text>
                    </TouchableOpacity>
                </ScrollView>
            )}

            {currentView === 2 && (
                <View style={styles.summaryContainer}>
                    <Text style={styles.summaryTitle}>Summary</Text>
                    <Text style={styles.summaryText}>Gender: {selectedTags.gender.join(', ') || 'Not selected'}</Text>
                    <Text style={styles.summaryText}>Industry: {selectedTags.industry.join(', ') || 'Not selected'}</Text>
                    <TouchableOpacity style={styles.button} onPress={() => alert('Profile Updated!')}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    buildProfileText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    skipText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#B976FF',
    },
    categoryContainer: {
        marginBottom: 30,
    },
    categoryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tag: {
        padding: 10,
        margin: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        backgroundColor: '#fff',
    },
    selectedTag: {
        backgroundColor: '#4CAF50',
        borderColor: '#4CAF50',
    },
    tagText: {
        color: '#333',
    },
    selectedTagText: {
        color: '#fff',
    },
    button: {
        marginTop: 20,
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    summaryContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    summaryTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    summaryText: {
        fontSize: 16,
        marginBottom: 10,
    },
});

export default ProfileTagPage;
