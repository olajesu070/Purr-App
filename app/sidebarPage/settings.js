import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity,  Animated, } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';  // Use this for React Navigation


export default function Settings() {
  const [showMyAge, setShowMyAge] = useState(false);
  const [showMyDistance, setShowMyDistance] = useState(false);
  const [toggleState, setToggleState] = useState(false);

  const navigation = useNavigation();  // Initialize navigation


    const handleToggle = (key) => {
    setToggleStates((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const [toggleStates, setToggleStates] = useState({
    age: true,
    distance: false,
    // relationshipStatus: false,
    // verified: false,
    // profilePicture: false,
    // prowlingFor: false,
    // position: false,
    // activities: false,
    // interest: false,
    // zodiacSign: false,
    // industry: false,
    // ethnicity: false,
  });


   const handleNavigation = (page) => {
    switch(page) {
      case 'My Account':
        navigation.navigate('sidebarPage/myAccountPage');
        break;
      case 'Safety Resources':
        navigation.navigate('sidebarPage/safetyResourcesPage');
        break;
      case 'Blocked Users':
        navigation.navigate('sidebarPage/blockedUserPage');
        break;
      case 'User Policies':
        navigation.navigate('sidebarPage/userPoliciesPage');
        break;
      default:
        break;
    }
  };
  return (
    <View style={styles.container}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Settings</Text>
        <View style={styles.backButton} />
      </View>

      {/* Settings List */}
      <View style={styles.section}>
        {['My Account', 'Safety Resources', 'Blocked Users', 'User Policies'].map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.settingRow} 
            onPress={() => handleNavigation(item)}
          >
            <Text style={styles.settingText}>{item}</Text>
            <Ionicons name="chevron-forward" size={20} color="#fff" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Toggle Buttons */}
      <View style={styles.section}>
        <View style={styles.settingRow}>
          <Text style={styles.settingText}>Show My Age</Text>
        <TouchableOpacity
                  style={[
                    styles.leftSidebarToggleButton,
                    toggleStates.age ? styles.leftSidebarToggleOn : styles.leftSidebarToggleOff,
                  ]}
                  onPress={() => handleToggle('age')}
                >
                  <Animated.View
                    style={[
                      styles.leftSidebarToggleCircle,
                      toggleStates.age ? styles.leftSidebarToggleCircleOn : styles.leftSidebarToggleCircleOff,
                    ]}
                  />
                </TouchableOpacity>
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.settingText}>Show My Distance</Text>
         <TouchableOpacity
                  style={[
                    styles.leftSidebarToggleButton,
                    toggleStates.distance ? styles.leftSidebarToggleOn : styles.leftSidebarToggleOff,
                  ]}
                  onPress={() => handleToggle('distance')}
                >
                  <Animated.View
                    style={[
                      styles.leftSidebarToggleCircle,
                      toggleStates.distance ? styles.leftSidebarToggleCircleOn : styles.leftSidebarToggleCircleOff,
                    ]}
                  />
                </TouchableOpacity>
          

        </View>
      </View>

      {/* Log Out Button */}
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Black background
    padding: 16,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 40
  },
  backButton: {
    padding: 8,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    flex: 1,
  },
  section: {
    // marginBottom: 10,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 15
  },
  settingText: {
    fontSize: 16,
    color: '#fff',
    fontWeight:'700'
  },
  logoutButton: {
    backgroundColor: 'transparent',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 150,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#979C9E',
  },

   leftSidebarToggleButton: {
    width: 56,
    height: 32,
    borderRadius: 32,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  leftSidebarToggleOn: {
    backgroundColor: '#B976FF', // Green when ON
  },
  leftSidebarToggleOff: {
    backgroundColor: '#6C7072', // Gray when OFF
  },
  leftSidebarToggleCircle: {
    width: 28,
    height: 28,
    borderRadius: 50,
    backgroundColor: '#ffffff',
  },
  leftSidebarToggleCircleOn: {
    alignSelf: 'flex-end', // Positioned to the right
  },
  leftSidebarToggleCircleOff: {
    alignSelf: 'flex-start', // Positioned to the left
  },
});
