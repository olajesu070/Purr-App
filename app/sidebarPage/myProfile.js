import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import ProfileImage from '../../assets/images/mainUserProfilePicture.png';
import { StatusBar } from 'expo-status-bar';

const MyProfile = () => {
  const [activeTab, setActiveTab] = useState('about');

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {/* Background Profile Image */}
      <ImageBackground
        source={ProfileImage}
        style={styles.profileBackground}
        resizeMode="cover"
      />

      {/* <ImageBackground source={ProfileImage} style={styles.profileBackground} /> */}

      {/* Scrollable Content Box */}
      <ScrollView style={styles.profileDetailsContainer}>
        <View style={styles.contentBox}>
          {/* Profile Info */}
          <View style={styles.profileRow}>
            <View style={styles.profileInfo}>
              <View style={styles.onlineBadge} />
              <View>
                <Text style={styles.screenName}>John Doe</Text>
                <Text style={styles.age}>25</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>

          {/* Gender Tag */}
          <View style={styles.tagContainer}>
            <Text style={styles.tagText}>She/Her</Text>
          </View>

          {/* Tabs: About Me & Stats */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'about' && styles.activeTab]}
              onPress={() => setActiveTab('about')}
            >
              <Text style={styles.tabText}>About Me</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'stats' && styles.activeTab]}
              onPress={() => setActiveTab('stats')}
            >
              <Text style={styles.tabText}>Stats</Text>
            </TouchableOpacity>
          </View>

          {/* About Me Section */}
          {activeTab === 'about' && (
            <View style={styles.aboutContainer}>
              <Text style={styles.sectionLabel}>About</Text>
              <View style={styles.aboutBox}>
                <Text style={styles.aboutText}>
                  Hi, I’m John! I love adventure, tech, and making friends.
                </Text>
              </View>
            </View>
          )}

          {/* Tag Sections */}
          <View style={styles.tagsSection}>
            <View style={styles.tagRow}>
              <Text style={styles.tagLabel}>Pronouns:</Text>
              <Text style={styles.tagValue}>She/Her</Text>
            </View>
            <View style={styles.tagRow}>
              <Text style={styles.tagLabel}>Industry:</Text>
              <Text style={styles.tagValue}>Software Engineering</Text>
            </View>
            <View style={styles.tagRow}>
              <Text style={styles.tagLabel}>Zodiac Sign:</Text>
              <Text style={styles.tagValue}>Leo</Text>
            </View>
            <View style={styles.tagRow}>
              <Text style={styles.tagLabel}>Interests:</Text>
              <Text style={styles.tagValue}>Gaming, Coding, Travel</Text>
            </View>
            <View style={styles.tagRow}>
              <Text style={styles.tagLabel}>My Activities:</Text>
              <Text style={styles.tagValue}>Hiking, Running</Text>
            </View>
          </View>

          <View style={styles.tagsSection}>
            <View style={styles.tagRow}>
              <Text style={styles.tagLabel}>Pronouns:</Text>
              <Text style={styles.tagValue}>She/Her</Text>
            </View>
            <View style={styles.tagRow}>
              <Text style={styles.tagLabel}>Industry:</Text>
              <Text style={styles.tagValue}>Software Engineering</Text>
            </View>
            <View style={styles.tagRow}>
              <Text style={styles.tagLabel}>Zodiac Sign:</Text>
              <Text style={styles.tagValue}>Leo</Text>
            </View>
            <View style={styles.tagRow}>
              <Text style={styles.tagLabel}>Interests:</Text>
              <Text style={styles.tagValue}>Gaming, Coding, Travel</Text>
            </View>
            <View style={styles.tagRow}>
              <Text style={styles.tagLabel}>My Activities:</Text>
              <Text style={styles.tagValue}>Hiking, Running</Text>
            </View>
          </View>

          <View style={styles.tagsSection}>
            <View style={styles.tagRow}>
              <Text style={styles.tagLabel}>Pronouns:</Text>
              <Text style={styles.tagValue}>She/Her</Text>
            </View>
            <View style={styles.tagRow}>
              <Text style={styles.tagLabel}>Industry:</Text>
              <Text style={styles.tagValue}>Software Engineering</Text>
            </View>
            <View style={styles.tagRow}>
              <Text style={styles.tagLabel}>Zodiac Sign:</Text>
              <Text style={styles.tagValue}>Leo</Text>
            </View>
            <View style={styles.tagRow}>
              <Text style={styles.tagLabel}>Interests:</Text>
              <Text style={styles.tagValue}>Gaming, Coding, Travel</Text>
            </View>
            <View style={styles.tagRow}>
              <Text style={styles.tagLabel}>My Activities:</Text>
              <Text style={styles.tagValue}>Hiking, Running</Text>
            </View>
          </View>

          <View style={styles.tagsSection}>
            <View style={styles.tagRow}>
              <Text style={styles.tagLabel}>Pronouns:</Text>
              <Text style={styles.tagValue}>She/Her</Text>
            </View>
            <View style={styles.tagRow}>
              <Text style={styles.tagLabel}>Industry:</Text>
              <Text style={styles.tagValue}>Software Engineering</Text>
            </View>
            <View style={styles.tagRow}>
              <Text style={styles.tagLabel}>Zodiac Sign:</Text>
              <Text style={styles.tagValue}>Leo</Text>
            </View>
            <View style={styles.tagRow}>
              <Text style={styles.tagLabel}>Interests:</Text>
              <Text style={styles.tagValue}>Gaming, Coding, Travel</Text>
            </View>
            <View style={styles.tagRow}>
              <Text style={styles.tagLabel}>My Activities:</Text>
              <Text style={styles.tagValue}>Hiking, Running</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  profileBackground: {
    position: 'absolute',
    width: '100%',
    height: '80%', // Covers 70% of the screen
    // marginTop: 5,
    top: 0,
  },
  profileDetailsContainer: {
    flex: 1,
  },
  contentBox: {
    marginTop: 450, // Push content to start overlapping the background
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 16,
    // minHeight: '100%', // Ensures content scrolls properly
  },
  profileRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineBadge: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'green',
    marginRight: 10,
  },
  screenName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  age: {
    fontSize: 16,
    color: '#666',
  },
  editButton: {
    borderWidth: 1,
    borderColor: 'purple',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  editButtonText: {
    color: 'purple',
    fontWeight: 'bold',
  },
  tagContainer: {
    backgroundColor: '#E0E0E0',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginVertical: 10,
  },
  tagText: {
    color: '#333',
    fontWeight: 'bold',
  },
  tabsContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: 'purple',
  },
  tabText: {
    fontWeight: 'bold',
    color: '#333',
  },
  aboutContainer: {
    marginTop: 10,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  aboutBox: {
    backgroundColor: '#E0E0E0',
    padding: 12,
    borderRadius: 10,
  },
  aboutText: {
    fontSize: 14,
    color: '#444',
  },
  tagsSection: {
    marginTop: 10,
  },
  tagRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 4,
  },
  tagLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  tagValue: {
    fontSize: 14,
    color: '#555',
  },
});

export default MyProfile;
