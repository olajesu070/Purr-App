import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import ProfileImage from '../../assets/images/mainUserProfilePicture.png';
import EditIcon from '../../assets/images/editIcon.png';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

const MyProfile = () => {
  const [activeTab, setActiveTab] = useState('about');
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPhotos, setIsEditingPhotos] = useState(false);
  const [photos, setPhotos] = useState([
    require('../../assets/images/profilePhoto1.png'),
    require('../../assets/images/profilePhoto3.png'),
    require('../../assets/images/profilePhoto2.png'),
    require('../../assets/images/profilePhoto3.png'),
  ]);
  const [editedName, setEditedName] = useState('Screen Name'); // Initial name
  const [tags, setTags] = useState([
    { label: 'Pronouns', values: ['She/Her'] },
    { label: 'Height', values: ['5’5”'] },
    { label: 'Gender Identity', values: ['Queer', 'Woman'] },
    {
      label: 'Zodiac',
      values: ['Capricorn', 'Libra', 'Leo', 'Virgo'],
    },
    {
      label: 'Interest',
      values: ['Music', 'Movies', 'History', 'Politics', 'Reading', 'Law'],
    },
    {
      label: 'Activities',
      values: ['Concert', 'Hunting', 'Camping', 'Dancing', 'Clubbing'],
    },
  ]);
  const [aboutMeText, setAboutMeText] =
    useState(`Hi, I’m John! I love adventure, tech, and making friends.
I’m a software engineer who enjoys exploring new technologies, solving complex problems, and creating meaningful digital experiences.
Outside of coding, you’ll find me traveling to new places, hiking in nature, and capturing moments through photography.
I have a deep passion for gaming, music, and meeting like-minded individuals who inspire me.
I believe in continuous growth, embracing challenges, and making an impact wherever I go.
Let's connect and create something amazing together!`);

  const updateTagValue = (tagIndex, valueIndex, newValue) => {
    setTags((prevTags) => {
      const updatedTags = [...prevTags];
      updatedTags[tagIndex] = {
        ...updatedTags[tagIndex],
        values: updatedTags[tagIndex].values.map((val, idx) =>
          idx === valueIndex ? newValue : val
        ),
      };
      return updatedTags;
    });
  };

  const handlePhotoChange = (index) => {
    // Implement logic to update the photo (e.g., open image picker)
    console.log(`Editing photo at index ${index}`);
  };

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

      {isEditing ? (
        <ScrollView style={styles.editProfileContainer}>
          {/* Header */}
          <View style={styles.editHeader}>
            <TouchableOpacity onPress={() => setIsEditing(false)}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Edit Profile</Text>
            <TouchableOpacity>
              <Image source={EditIcon} />
            </TouchableOpacity>
          </View>

          {/* Editable Username */}
          <View style={styles.inputContainer}>
            {/* <Text style={styles.label}>Username</Text> */}
            <TextInput
              style={styles.textInput}
              value={editedName}
              onChangeText={setEditedName}
            />
          </View>

          {/* My Photos Section */}
          <View style={styles.photosSection}>
            <Text style={styles.label}>My Photos</Text>
            <TouchableOpacity
              style={styles.editPhotosButton}
              onPress={() => setIsEditingPhotos(true)}
            >
              <Text style={styles.editPhotosText}>Edit</Text>
            </TouchableOpacity>
          </View>

          {/* Reusing Tabs */}
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

          {/* Editable About Me Section */}
          {activeTab === 'about' && (
            <View style={styles.aboutContainer}>
              <Text style={styles.sectionLabel}>About Me</Text>
              <TextInput
                style={styles.aboutInput}
                multiline
                value={aboutMeText}
                onChangeText={setAboutMeText}
              />
            </View>
          )}

          {/* Editable Tag Sections */}
          <View style={styles.tagsSection}>
            {tags.map((item, tagIndex) => (
              <View key={tagIndex} style={styles.tagWrapper}>
                <Text style={styles.tagLabel}>{item.label}</Text>
                <View style={styles.tagValuesContainer}>
                  {item.values.map((value, valueIndex) => (
                    <TextInput
                      key={valueIndex}
                      style={styles.tagInput}
                      value={value}
                      onChangeText={(text) =>
                        updateTagValue(tagIndex, valueIndex, text)
                      }
                    />
                  ))}
                </View>
              </View>
            ))}
          </View>

          {/* Save Button */}
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => setIsEditing(false)}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        // Original Profile View
        <ScrollView style={styles.profileDetailsContainer}>
          <View style={styles.contentBox}>
            {/* Profile Info */}
            <View style={styles.profileRow}>
              <View style={styles.profileInfo}>
                <View style={styles.onlineBadge} />
                <View style={styles.nameAndAge}>
                  <Text style={styles.screenName}>Screen Name,</Text>
                  <Text style={styles.age}>25</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => setIsEditing(true)}
              >
                <Image source={EditIcon} />
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
                <View style={styles.aboutContainer}>
                  <Text style={styles.sectionLabel}>About Me</Text>
                  <View style={styles.aboutBox}>
                    <Text style={styles.aboutText}>
                      Hi, I’m John! I love adventure, tech, and making friends.
                      I’m a software engineer who enjoys exploring new
                      technologies, solving complex problems, and creating
                      meaningful digital experiences. Outside of coding, you’ll
                      find me traveling to new places, hiking in nature, and
                      capturing moments through photography. I have a deep
                      passion for gaming, music, and meeting like-minded
                      individuals who inspire me. I believe in continuous
                      growth, embracing challenges, and making an impact
                      wherever I go. Let's connect and create something amazing
                      together! 🚀
                    </Text>
                  </View>
                </View>
              </View>
            )}
            {/* Tag Sections */}
            <View style={styles.tagsSection}>
              {tags.map((item, index) => (
                <View key={index} style={styles.tagWrapper}>
                  <Text style={styles.tagLabel}>{item.label}</Text>
                  <View style={styles.tagValuesContainer}>
                    {item.values.map((value, idx) => (
                      <View key={idx} style={styles.tagContainer}>
                        <Text style={styles.tagText}>{value}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      )}
      {isEditingPhotos ? (
        <ScrollView style={styles.editPhotosContainer}>
          {/* Header */}
          <View style={styles.editHeader}>
            <TouchableOpacity onPress={() => setIsEditingPhotos(false)}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Edit Photos</Text>
            <TouchableOpacity>
              <Image source={EditIcon} />
            </TouchableOpacity>
          </View>

          {/* Photo Grid */}
          <View style={styles.photoGrid}>
            {photos.map((photo, index) => (
              <View key={index} style={styles.photoContainer}>
                <Image source={photo} style={styles.photo} />
                <TouchableOpacity
                  style={styles.editVaultButton}
                  onPress={() => handlePhotoChange(index)}
                >
                  <Text style={styles.buttonText}>Edit Vault</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.savePhotoButton}>
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      ) : null}
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
    height: '80%',
    top: 0,
  },
  lineContainer: {
    flexDirection: 'row', // Makes the line horizontal
    width: '100%',
    height: 4, // Adjust thickness as needed
  },
  purpleLine: {
    width: '30%',
    backgroundColor: 'purple',
  },
  blackLine: {
    width: '70%',
    backgroundColor: 'black',
  },
  profileDetailsContainer: {
    flex: 1,
  },
  contentBox: {
    marginTop: 450, // Push content to start overlapping the background
    backgroundColor: '#000000',
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
  nameAndAge: {
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
    fontSize: 25,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  age: {
    fontSize: 25,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  editButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },

  tagContainer: {
    backgroundColor: '#303437',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    paddingHorizontal: 15,
    padding: 8,
    borderRadius: 32,
    // marginVertical: 5,
  },
  tagValuesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Ensures tags wrap to the next line if needed
    gap: 6, // Adds spacing between tags (use marginRight if gap doesn't work)
    marginTop: 10,
  },
  tagText: {
    color: '#fff',
    fontWeight: '500',
  },
  tabsContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    backgroundColor: '#202325',
    borderRadius: 8,
    padding: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
  },
  activeTab: {
    borderRadius: 6,
    backgroundColor: '#303437',
  },
  tabText: {
    fontWeight: 'bold',
    color: '#fff',
  },
  aboutContainer: {
    marginVertical: 10,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#fff',
  },
  aboutBox: {
    backgroundColor: '#303437', // Light gray background
    padding: 12,
    borderRadius: 13, // Rounded corners
  },
  aboutText: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'justify',
    lineHeight: 30,
  },

  tagsSection: {
    marginTop: 10,
  },
  tagWrapper: {
    marginBottom: 10,
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
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  tagValue: {
    fontSize: 16,
    fontWeight: '400',
    color: '#fff',
  },

  editProfileContainer: {
    flex: 1,
    backgroundColor: '#000',
    // backgroundColor: '#fff',
    padding: 20,
  },

  editHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 20,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },

  backArrow: {
    width: 24,
    height: 24,
  },

  inputContainer: {
    marginBottom: 15,
  },

  label: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 5,
    color: '#fff',
    paddingLeft: 5,
  },

  textInput: {
    borderWidth: 1,
    borderColor: '#303437',
    padding: 10,
    borderRadius: 8,
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
  },

  photosSection: {
    flexDirection: 'column',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    marginBottom: 20,
  },

  editPhotosButton: {
    backgroundColor: '#B976FF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 48,
    alignItems: 'center', // Centers text horizontally
    justifyContent: 'center', // Centers text vertically
    flexDirection: 'row', // Ensures alignment
    width: '100%',
    height: 48,
  },

  editPhotosText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },

  aboutInput: {
    borderWidth: 1,
    backgroundColor: '#202325',
    padding: 10,
    borderRadius: 8,
    minHeight: 100,
    color: '#fff',
  },

  tagInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 6,
    borderRadius: 8,
    marginTop: 5,
    color: '#fff',
  },
  saveButton: {
    backgroundColor: '#B976FF',
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 40,
    borderRadius: 48,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  editPhotosContainer: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
    height: '100%',
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  photoContainer: {
    width: '48%',
    marginBottom: 15,
    position: 'relative',
  },
  photo: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  editVaultButton: {
    position: 'absolute',
    bottom: 40,
    left: '10%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 8,
    borderRadius: 5,
  },
  savePhotoButton: {
    position: 'absolute',
    bottom: 10,
    left: '10%',
    backgroundColor: '#ff7f50',
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default MyProfile;
