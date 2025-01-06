import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import ThemedButton from '@/components/ThemedButton';


const ProfileTagPage = () => {
    const [currentView, setCurrentView] = useState(1);
    const [selectedTags, setSelectedTags] = useState({
        industry: [],
        zodiac: [],
        interests: [],
        activities: [],
        sexuality: [],
        gender: [],
        pronouns: [],
        positionPreference: [],
        pride: [],
        prowlingFor: [],
        ethnicity: [],
        relationshipStatus: [],
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
        setCurrentView((prev) => prev + 1);
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
                    <ThemedText style={styles.tagSelectionInstruction}>Choose one, some, or none...your choice!</ThemedText>

                    {/* Interest Tags */}
                    <View style={styles.categoryContainer}>
                        <ThemedText style={styles.categoryTitle}>Your <Text style={styles.spanText}>Interests</Text></ThemedText>
                        <View style={styles.tagsContainer}>
                            {['Sports', 'Music', 'Traveling', 'Reading', 'Movies', 'Gaming', 'Fitness', 'Cooking', 'Photography'].map((tag) => (
                                <TouchableOpacity
                                    key={tag}
                                    style={[styles.tag, selectedTags.interests.includes(tag) && styles.selectedTag]}
                                    onPress={() => handleTagSelect('interests', tag)}
                                >
                                    <Text style={[styles.tagText, selectedTags.interests.includes(tag) && styles.selectedTagText]}>{tag}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Activities Tags */}
                    <View style={styles.categoryContainer}>
                        <ThemedText style={styles.categoryTitle}>Your <Text style={styles.spanText}>Activities</Text></ThemedText>
                        <View style={styles.tagsContainer}>
                            {['Hiking', 'Dancing', 'Painting', 'Volunteering', 'Blogging', 'Shopping', 'Gardening'].map((tag) => (
                                <TouchableOpacity
                                    key={tag}
                                    style={[styles.tag, selectedTags.activities.includes(tag) && styles.selectedTag]}
                                    onPress={() => handleTagSelect('activities', tag)}
                                >
                                    <Text style={[styles.tagText, selectedTags.activities.includes(tag) && styles.selectedTagText]}>{tag}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <ThemedButton
                        title="Next"
                        onPress={handleNext}
                        style={styles.button}
                    />

                </ScrollView>
            )}

            {currentView === 2 && (
                <ScrollView contentContainerStyle={styles.formContainer}>
                    <ThemedText style={styles.tagSelectionInstruction}>Choose one, some, or none...your choice!</ThemedText>

                    {/* Additional Categories */}
                    {[
                        { title: 'Sexuality', category: 'sexuality', tags: ['Heterosexual', 'Homosexual', 'Bisexual', 'Pansexual', 'Asexual'] },
                        { title: 'Gender', category: 'gender', tags: ['Male', 'Female', 'Non-Binary', 'Genderqueer'] },
                        { title: 'Pronouns', category: 'pronouns', tags: ['He/Him', 'She/Her', 'They/Them'] },
                        { title: 'Position Preference', category: 'positionPreference', tags: ['Top', 'Bottom', 'Versatile'] },
                        { title: 'Pride', category: 'pride', tags: ['LGBTQ+', 'Ally', 'Advocate', 'Activist'] },
                        { title: 'Prowling For', category: 'prowlingFor', tags: ['Friendship', 'Networking', 'Dating', 'Long-term Relationship'] },
                        { title: 'Ethnicity', category: 'ethnicity', tags: ['Asian', 'Black', 'Caucasian', 'Hispanic', 'Mixed Race', 'Other'] },
                        { title: 'Relationship Status', category: 'relationshipStatus', tags: ['Single', 'In a Relationship', 'Married', 'Open Relationship'] },
                    ].map(({ title, category, tags }) => (
                        <View style={styles.categoryContainer} key={category}>
                            <ThemedText style={styles.categoryTitle}>Your <Text style={styles.spanText}>{title}</Text></ThemedText>
                            <View style={styles.tagsContainer}>
                                {tags.map((tag) => (
                                    <TouchableOpacity
                                        key={tag}
                                        style={[styles.tag, selectedTags[category].includes(tag) && styles.selectedTag]}
                                        onPress={() => handleTagSelect(category, tag)}
                                    >
                                        <Text style={[styles.tagText, selectedTags[category].includes(tag) && styles.selectedTagText]}>{tag}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    ))}

                    <ThemedButton
                        title="Submit"
                        onPress={() => alert('Profile Updated!')}
                        style={styles.button}
                    />
                </ScrollView>
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
        marginBottom: 5,
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
    tagSelectionInstruction: {
        fontSize: 14,
        fontWeight: '500',
        color: '#fff',
        fontStyle: 'italic',
        textAlign: 'center',
        alignSelf: 'center',
        marginBottom: 20,
    },
    categoryContainer: {
        marginBottom: 30,
    },
    categoryTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#fff',
    },
    spanText: {
        color: '#B976FF',
        textDecorationLine: 'underline',
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tag: {
        padding: 10,
        margin: 5,
        borderRadius: 20,
        backgroundColor: '#303437',
    },
    selectedTag: {
        backgroundColor: '#B976FF',
    },
    tagText: {
        color: '#fff',
        fontSize: 14,
    },
    selectedTagText: {
        color: '#fff',
    },
    button: {
        // marginTop: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default ProfileTagPage;
