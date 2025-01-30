import React, { useState, useEffect } from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  Animated,
  ScrollView,
  ImageBackground,
  Modal,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Filter from '../../assets/images/headerFilter.png';
import Logo from '../../assets/images/headerLogo.png';
import Avatar from '../../assets/images/headerAvatar.png';
import ProLogo from '../../assets/images/leftSideBarProLogo.png';
import VerifyMe from '../../assets/images/VerifyMe.png';

import BackArrow from '../../assets/images/backArrow.png';
import AppIcon from '../../assets/images/appIcon.png';
import * as Progress from 'react-native-progress';
import ThemedButton from '../../components/ThemedButton';
import { Ionicons } from '@expo/vector-icons';

import SubmitTicketImage from '../../assets/images/submitTicketImage.png';
import MyprofileImage from '../../assets/images/myprofileImage.png';
import SettingsImage from '../../assets/images/settingsImage.png';
import { useRouter } from 'expo-router';

// Simulate a function to generate random user data
const generateRandomUserData = (id, imageArray) => {
  const names = [
    'John Doe',
    'Jane Smith',
    'Olajesu Benjamin',
    'Mary Ann',
    'Peter King',
    'Grace Johnson',
  ];
  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomImage = imageArray[Math.floor(Math.random() * imageArray.length)];
  const randomCreatedAt = new Date(
    new Date() - Math.floor(Math.random() * 72 * 24 * 60 * 60 * 1000) // Random date within the last 72 hours
  ).toISOString();

  return {
    id,
    name: randomName,
    image: randomImage,
    createdAt: randomCreatedAt,
  };
};

export default function HomeScreen() {
  const defaultImages = [
    require('../../assets/images/user4.png'), // Replace with actual image paths
    require('../../assets/images/user3.png'),
    require('../../assets/images/user2.png'),
    require('../../assets/images/user1.png'),
  ];
  const [activeTab, setActiveTab] = useState('Feed'); // Manage active tab state
  const [modalVisible, setModalVisible] = useState(true); // First modal visibility
  const [adModalVisible, setAdModalVisible] = useState(false); // Second modal visibility
  const [progress, setProgress] = useState(0);
  const [blurred, setBlurred] = useState(true);
  const [adCompleted, setAdCompleted] = useState(false); // Track ad completion
  const [leftSidebarVisible, setLeftSidebarVisible] = useState(false);
  const [rightSidebarVisible, setRightSidebarVisible] = useState(false);
  const leftSidebarAnimation = useState(new Animated.Value(0))[0];
  const rightSidebarAnimation = useState(new Animated.Value(0))[0];

  const [unlockedProfiles, setUnlockedProfiles] = useState(20);
  const [isAdWatched, setIsAdWatched] = useState(false);
  const [watchingAdText, setWatchingAdText] = useState(''); // Text to show during ad watching
  const [lastRefreshTime, setLastRefreshTime] = useState(Date.now());
  const [isAdInProgress, setIsAdInProgress] = useState(false);

  // Generate user data with random images from the defaultImages array
  const users = Array.from({ length: 100 }, (_, index) =>
    generateRandomUserData(index + 1, defaultImages)
  );

  const handleAdButtonClick = () => {
    console.log('Button clicked');
    console.log('Current state:', {
      unlockedProfiles,
      isAdInProgress,
      watchingAdText,
    });

    // Proceed with logic if no issues with state
  };

  // Check if 5 minutes have passed since last refresh
  const canRefresh = Date.now() - lastRefreshTime >= 5 * 60 * 1000;

  // Layout for the grid (two items per row)
  const gridLayout = {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  };

  const router = useRouter();

  const [toggleStates, setToggleStates] = useState({
    age: true,
    pride: false,
    relationshipStatus: false,
    verified: false,
    profilePicture: false,
    prowlingFor: false,
    position: false,
    activities: false,
    interest: false,
    zodiacSign: false,
    industry: false,
    ethnicity: false,
  });
  const handleToggle = (key) => {
    setToggleStates((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const resetBasicToggles = () => {
    setToggleStates((prevState) => ({
      ...prevState, // Preserve the current state
      age: true, // Reset only the basic toggles
      pride: false,
      relationshipStatus: false,
    }));
  };

  const resetProToggles = () => {
    setToggleStates((prevState) => ({
      ...prevState, // Preserve the current state
      verified: false, // Reset only the pro toggles
      profilePicture: false,
      prowlingFor: false,
      position: false,
      activities: false,
      interest: false,
      zodiacSign: false,
      industry: false,
      ethnicity: false,
    }));
  };

  // Function to handle closing the first modal and opening the ad modal
  const openAdModal = () => {
    setModalVisible(false);
    setAdModalVisible(true);
    startProgressBar();
  };

  // Function to handle the ad completion
  const completeAd = () => {
    setAdModalVisible(false);
    setAdCompleted(true); // Mark the ad as completed
  };

  // Simulate a 30-second progress bar
  const startProgressBar = () => {
    let interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 1) {
          clearInterval(interval); // Stop updating when progress is 100%
          // completeAd(); // Complete the ad
          return 1;
        }
        return prev + 0.0333; // Increment for ~30 updates over 30 seconds
      });
    }, 1000);
  };

  const images = [
    require('../../assets/images/user1.png'),
    require('../../assets/images/user2.png'),
    require('../../assets/images/user3.png'),
    require('../../assets/images/user4.png'),
  ];

  const data = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
    image: images[Math.floor(Math.random() * images.length)], // Randomly select an image
  }));

  const toggleLeftSidebar = () => {
    if (!leftSidebarVisible) {
      setLeftSidebarVisible(true);
      Animated.timing(leftSidebarAnimation, {
        toValue: 0,
        duration: 0,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(leftSidebarAnimation, {
        toValue: -0,
        duration: 0,
        useNativeDriver: false,
      }).start(() => setLeftSidebarVisible(false));
    }
  };

  const toggleRightSidebar = () => {
    if (!rightSidebarVisible) {
      setRightSidebarVisible(true);
      Animated.timing(rightSidebarAnimation, {
        toValue: 0,
        duration: 0,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(rightSidebarAnimation, {
        toValue: 0,
        duration: 0,
        useNativeDriver: false,
      }).start(() => setRightSidebarVisible(false));
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#202325" barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={toggleLeftSidebar}
        >
          <Image source={Filter} style={styles.filterIcon} />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Image source={Logo} style={styles.logo} />
          <Text style={styles.logoText}>Purr</Text>
        </View>
        <TouchableOpacity onPress={toggleRightSidebar}>
          <Image source={Avatar} style={styles.avatar} />
        </TouchableOpacity>
      </View>

      {/* Left Sidebar */}
      {leftSidebarVisible && (
        <Animated.View
          style={[styles.leftSidebarContainer, { left: leftSidebarAnimation }]}
        >
          {/* Top Row */}
          <View style={styles.leftSidebarTopRow}>
            <TouchableOpacity onPress={toggleLeftSidebar}>
              <Text style={styles.leftSidebarBackButtonText}>
                <Image source={BackArrow} width={24} height={24} />
              </Text>
            </TouchableOpacity>
            <Text style={styles.leftSidebarFiltersText}>Filters</Text>
            <TouchableOpacity onPress={resetBasicToggles}>
              <Text style={styles.leftSidebarResetText}>Reset</Text>
            </TouchableOpacity>
          </View>

          {/* Content Row */}

          <View style={styles.leftSidebarContentRowContainer}>
            <ScrollView style={styles.scrollView}>
              {/* Basic Toggles Section */}
              <View style={styles.leftSidebarContentRow}>
                <Text style={styles.leftSidebarContentText}>Age</Text>
                <TouchableOpacity
                  style={[
                    styles.leftSidebarToggleButton,
                    toggleStates.age
                      ? styles.leftSidebarToggleOn
                      : styles.leftSidebarToggleOff,
                  ]}
                  onPress={() => handleToggle('age')}
                >
                  <Animated.View
                    style={[
                      styles.leftSidebarToggleCircle,
                      toggleStates.age
                        ? styles.leftSidebarToggleCircleOn
                        : styles.leftSidebarToggleCircleOff,
                    ]}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.leftSidebarContentRow}>
                <Text style={styles.leftSidebarContentText}>Pride</Text>
                <TouchableOpacity
                  style={[
                    styles.leftSidebarToggleButton,
                    toggleStates.pride
                      ? styles.leftSidebarToggleOn
                      : styles.leftSidebarToggleOff,
                  ]}
                  onPress={() => handleToggle('pride')}
                >
                  <Animated.View
                    style={[
                      styles.leftSidebarToggleCircle,
                      toggleStates.pride
                        ? styles.leftSidebarToggleCircleOn
                        : styles.leftSidebarToggleCircleOff,
                    ]}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.leftSidebarContentRow}>
                <Text style={styles.leftSidebarContentText}>
                  Relationship Status
                </Text>
                <TouchableOpacity
                  style={[
                    styles.leftSidebarToggleButton,
                    toggleStates.relationshipStatus
                      ? styles.leftSidebarToggleOn
                      : styles.leftSidebarToggleOff,
                  ]}
                  onPress={() => handleToggle('relationshipStatus')}
                >
                  <Animated.View
                    style={[
                      styles.leftSidebarToggleCircle,
                      toggleStates.relationshipStatus
                        ? styles.leftSidebarToggleCircleOn
                        : styles.leftSidebarToggleCircleOff,
                    ]}
                  />
                </TouchableOpacity>
              </View>

              {/* pro Reset Button */}
              <View style={styles.proToggleRowContainer}>
                <Image source={ProLogo} style={styles.proToggleLogo} />
                <TouchableOpacity
                  onPress={resetProToggles}
                  style={styles.proToggleResetButton}
                >
                  <Text style={styles.proToggleResetText}>Reset</Text>
                </TouchableOpacity>
              </View>

              {/* Pro/Paid Toggles Section */}
              <View style={styles.leftSidebarContentRow}>
                <Text style={styles.leftSidebarContentText}>Verified</Text>
                <TouchableOpacity
                  style={[
                    styles.leftSidebarToggleButton,
                    toggleStates.verified
                      ? styles.leftSidebarToggleOn
                      : styles.leftSidebarToggleOff,
                  ]}
                  onPress={() => handleToggle('verified')}
                >
                  <Animated.View
                    style={[
                      styles.leftSidebarToggleCircle,
                      toggleStates.verified
                        ? styles.leftSidebarToggleCircleOn
                        : styles.leftSidebarToggleCircleOff,
                    ]}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.leftSidebarContentRow}>
                <Text style={styles.leftSidebarContentText}>
                  Profile Picture
                </Text>
                <TouchableOpacity
                  style={[
                    styles.leftSidebarToggleButton,
                    toggleStates.profilePicture
                      ? styles.leftSidebarToggleOn
                      : styles.leftSidebarToggleOff,
                  ]}
                  onPress={() => handleToggle('profilePicture')}
                >
                  <Animated.View
                    style={[
                      styles.leftSidebarToggleCircle,
                      toggleStates.profilePicture
                        ? styles.leftSidebarToggleCircleOn
                        : styles.leftSidebarToggleCircleOff,
                    ]}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.leftSidebarContentRow}>
                <Text style={styles.leftSidebarContentText}>Prowling For</Text>
                <TouchableOpacity
                  style={[
                    styles.leftSidebarToggleButton,
                    toggleStates.prowlingFor
                      ? styles.leftSidebarToggleOn
                      : styles.leftSidebarToggleOff,
                  ]}
                  onPress={() => handleToggle('prowlingFor')}
                >
                  <Animated.View
                    style={[
                      styles.leftSidebarToggleCircle,
                      toggleStates.prowlingFor
                        ? styles.leftSidebarToggleCircleOn
                        : styles.leftSidebarToggleCircleOff,
                    ]}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.leftSidebarContentRow}>
                <Text style={styles.leftSidebarContentText}>Position</Text>
                <TouchableOpacity
                  style={[
                    styles.leftSidebarToggleButton,
                    toggleStates.position
                      ? styles.leftSidebarToggleOn
                      : styles.leftSidebarToggleOff,
                  ]}
                  onPress={() => handleToggle('position')}
                >
                  <Animated.View
                    style={[
                      styles.leftSidebarToggleCircle,
                      toggleStates.position
                        ? styles.leftSidebarToggleCircleOn
                        : styles.leftSidebarToggleCircleOff,
                    ]}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.leftSidebarContentRow}>
                <Text style={styles.leftSidebarContentText}>Activities</Text>
                <TouchableOpacity
                  style={[
                    styles.leftSidebarToggleButton,
                    toggleStates.activities
                      ? styles.leftSidebarToggleOn
                      : styles.leftSidebarToggleOff,
                  ]}
                  onPress={() => handleToggle('activities')}
                >
                  <Animated.View
                    style={[
                      styles.leftSidebarToggleCircle,
                      toggleStates.activities
                        ? styles.leftSidebarToggleCircleOn
                        : styles.leftSidebarToggleCircleOff,
                    ]}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.leftSidebarContentRow}>
                <Text style={styles.leftSidebarContentText}>Interest</Text>
                <TouchableOpacity
                  style={[
                    styles.leftSidebarToggleButton,
                    toggleStates.interest
                      ? styles.leftSidebarToggleOn
                      : styles.leftSidebarToggleOff,
                  ]}
                  onPress={() => handleToggle('interest')}
                >
                  <Animated.View
                    style={[
                      styles.leftSidebarToggleCircle,
                      toggleStates.interest
                        ? styles.leftSidebarToggleCircleOn
                        : styles.leftSidebarToggleCircleOff,
                    ]}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.leftSidebarContentRow}>
                <Text style={styles.leftSidebarContentText}>Zodiac Sign</Text>
                <TouchableOpacity
                  style={[
                    styles.leftSidebarToggleButton,
                    toggleStates.zodiacSign
                      ? styles.leftSidebarToggleOn
                      : styles.leftSidebarToggleOff,
                  ]}
                  onPress={() => handleToggle('zodiacSign')}
                >
                  <Animated.View
                    style={[
                      styles.leftSidebarToggleCircle,
                      toggleStates.zodiacSign
                        ? styles.leftSidebarToggleCircleOn
                        : styles.leftSidebarToggleCircleOff,
                    ]}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.leftSidebarContentRow}>
                <Text style={styles.leftSidebarContentText}>Industry</Text>
                <TouchableOpacity
                  style={[
                    styles.leftSidebarToggleButton,
                    toggleStates.industry
                      ? styles.leftSidebarToggleOn
                      : styles.leftSidebarToggleOff,
                  ]}
                  onPress={() => handleToggle('industry')}
                >
                  <Animated.View
                    style={[
                      styles.leftSidebarToggleCircle,
                      toggleStates.industry
                        ? styles.leftSidebarToggleCircleOn
                        : styles.leftSidebarToggleCircleOff,
                    ]}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.leftSidebarContentRow}>
                <Text style={styles.leftSidebarContentText}>Ethnicity</Text>
                <TouchableOpacity
                  style={[
                    styles.leftSidebarToggleButton,
                    toggleStates.ethnicity
                      ? styles.leftSidebarToggleOn
                      : styles.leftSidebarToggleOff,
                  ]}
                  onPress={() => handleToggle('ethnicity')}
                >
                  <Animated.View
                    style={[
                      styles.leftSidebarToggleCircle,
                      toggleStates.ethnicity
                        ? styles.leftSidebarToggleCircleOn
                        : styles.leftSidebarToggleCircleOff,
                    ]}
                  />
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </Animated.View>
      )}
      {/* Right Sidebar */}
      {rightSidebarVisible && (
        <Animated.View
          style={[styles.rightSidebar, { right: rightSidebarAnimation }]}
        >
          {/* Header Row */}
          <View style={styles.rightSidebarHeaderRow}>
            <TouchableOpacity
              style={styles.rightSidebarBackButton}
              onPress={toggleRightSidebar}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.rightSidebarUsername}>StrapMaster69</Text>
          </View>
          <View style={styles.rightSidebarDivider} />

          {/* Menu Items */}
          <View style={styles.rightSidebarMenu}>
            <TouchableOpacity
              style={styles.rightSidebarMenuItem}
              onPress={() => router.push('sidebarPage/myProfile')}
            >
              <Image
                source={MyprofileImage}
                width={25}
                height={25}
                style={styles.rightSidebarMenuIcon}
              />
              <Text style={styles.rightSidebarMenuText}>My Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.rightSidebarMenuItem}
              onPress={() => router.push('sidebarPage/settings')}
            >
              <Image
                source={SettingsImage}
                width={25}
                height={25}
                style={styles.rightSidebarMenuIcon}
              />
              <Text style={styles.rightSidebarMenuText}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.rightSidebarMenuItem}
              onPress={() => router.push('sidebarPage/submitTicket')}
            >
              <Image
                source={SubmitTicketImage}
                width={25}
                height={25}
                style={styles.rightSidebarMenuIcon}
              />
              <Text style={styles.rightSidebarMenuText}>Submit Ticket</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.rightSidebarMenuItem}
              onPress={() => router.push('sidebarPage/changeAppIcon')}
            >
              <Image
                source={AppIcon}
                width={25}
                height={25}
                style={styles.rightSidebarMenuIcon}
              />
              <Text style={styles.rightSidebarMenuText}>Change App Icon</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.rightSidebarMenuItem}
              onPress={() => router.push('sidebarPage/verifyMe')}
            >
              <Image
                source={VerifyMe}
                width={25}
                height={25}
                style={styles.rightSidebarMenuIcon}
              />
              <Text style={styles.rightSidebarMenuText}>
                Verify Me (ONLY IF BOUGHT)
              </Text>
            </TouchableOpacity>
          </View>

          {/* Close Button */}
          <View style={styles.rightSidebarTextAdsContainer}>
            {/* Image */}
            <Image source={ProLogo} style={styles.rightSidebarTextAdsProLogo} />

            {/* Text */}
            <Text style={styles.rightSidebarTrialText}>7 Days Trial</Text>

            {/* Button */}
            <ThemedButton
              title="Use Offer"
              style={styles.rightSidebarTextAdsButton}
            />
          </View>

          {/* <TouchableOpacity onPress={toggleRightSidebar} style={styles.rightSidebarCloseButton}>
            <Text style={styles.rightSidebarCloseButtonText}>Close</Text>
          </TouchableOpacity> */}
        </Animated.View>
      )}

      {/* Tab Menu */}
      <View style={styles.tabMenu}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Feed' && styles.activeTab]}
          onPress={() => setActiveTab('Feed')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'Feed' && styles.activeTabText,
            ]}
          >
            Feed
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Purred Me' && styles.activeTab]}
          onPress={() => setActiveTab('Purred Me')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'Purred Me' && styles.activeTabText,
            ]}
          >
            Purred Me{' '}
            {activeTab !== 'Purred Me' && (
              <View style={styles.smallBadge}>
                <Text style={styles.badgeText}>new</Text>
              </View>
            )}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Viewed Me' && styles.activeTab]}
          onPress={() => setActiveTab('Viewed Me')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'Viewed Me' && styles.activeTabText,
            ]}
          >
            Viewed Me{' '}
            {activeTab !== 'Viewed Me' && (
              <View style={styles.smallBadge}>
                <Text style={styles.badgeText}>new</Text>
              </View>
            )}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content Display */}
      <View style={styles.contentContainer}>
        {activeTab === 'Feed' && (
          <ScrollView contentContainerStyle={gridLayout}>
            {users.slice(0, unlockedProfiles).map((user, index) => (
              <View
                key={user.id}
                style={[
                  styles.box,
                  index % 2 === 0 ? { marginRight: 10 } : null,
                ]} // Two items per row
              >
                <ImageBackground
                  source={user.image}
                  style={styles.imageBackground}
                  imageStyle={styles.imageBackgroundStyle}
                >
                  {/* New Badge Visible only for users within 72 hours */}
                  {new Date() - new Date(user.createdAt) <=
                    72 * 60 * 60 * 1000 && (
                    <View style={styles.badgeTopLeft}>
                      <Text style={styles.badgeText}>New</Text>
                    </View>
                  )}

                  {/* Bottom Text and Dot */}
                  <View style={styles.bottomContainer}>
                    <View
                      style={[styles.bottomDot, { backgroundColor: 'green' }]}
                    />
                    <Text style={styles.bottomText}>{user.name}</Text>
                    <View style={styles.blueTick} />
                  </View>
                </ImageBackground>
              </View>
            ))}

            {unlockedProfiles < 100 && (
              <View style={styles.adButtonContainer}>
                <TouchableOpacity
                  onPress={() => {
                    alert('Button clicked!'); // Simple alert to test button press
                    console.log('Button clicked'); // Log for debug
                  }}
                  style={styles.adButton}
                  disabled={isAdWatched || !canRefresh}
                >
                  <Text style={styles.adButtonText}>
                    {watchingAdText || 'Watch Ad to Unlock More'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {unlockedProfiles < 100 && (
              <View style={styles.unlockContainer}>
                <Text style={styles.unlockText}>
                  Unlock more profiles by watching ads.
                </Text>
              </View>
            )}
          </ScrollView>
        )}
        {activeTab === 'Purred Me' && (
          <ScrollView contentContainerStyle={styles.grid}>
            {data.map((item, index) => (
              <View
                key={item.id}
                style={[
                  styles.box,
                  // Apply blur only if the ad is not completed and for boxes after the first two
                  !adCompleted && index > 1 && styles.blurredBox,
                ]}
              >
                <ImageBackground
                  source={item.image}
                  style={styles.imageBackground}
                  imageStyle={styles.imageBackgroundStyle}
                >
                  <View style={styles.badgeTopLeft}>
                    <Text style={styles.badgeText}>New</Text>
                  </View>

                  <View style={styles.badgeTopRight}>
                    <Text style={styles.counterText}>{item.id}</Text>
                  </View>

                  <View style={styles.bottomContainer}>
                    <View style={styles.bottomDot} />
                    <Text style={styles.bottomText}>Olajesu Benjamin</Text>
                    <View style={styles.blueTick} />
                  </View>
                </ImageBackground>
              </View>
            ))}

            {/* First Modal */}
            <Modal
              visible={modalVisible}
              animationType="slide"
              transparent={true}
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  <View style={styles.modalContainer}>
                    <Text style={styles.advertModalTitle}>
                      WATCH A SHORT AD TO VIEW PURRED ME
                    </Text>
                    <TouchableOpacity
                      style={styles.modalButton}
                      onPress={openAdModal}
                    >
                      <Text style={styles.buttonText}>Watch Ad</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>

            {/* Second Modal */}
            <Modal
              visible={adModalVisible}
              animationType="fade"
              transparent={false}
              onRequestClose={() => setAdModalVisible(false)}
            >
              <View style={styles.adContainer}>
                {/* Close Button */}
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => {
                    if (progress < 1) {
                      Alert.alert(
                        'Notice',
                        'You cannot close until the ads finishes.'
                      );
                    } else {
                      setAdModalVisible(false); // Close the modal only if progress is complete
                    }
                  }}
                >
                  <Text style={styles.closeButtonText}>X</Text>
                </TouchableOpacity>

                {/* Progress Bar */}
                <Progress.Bar
                  progress={progress}
                  width={300}
                  height={3}
                  color="#B976FF"
                  unfilledColor="#e0e0e0"
                  borderWidth={0}
                  style={styles.progressBar}
                />

                {/* Ad Rectangle */}
                <View style={styles.adRectangle}>
                  <Text style={styles.adText}>Ads Here</Text>
                </View>

                {/* Call to Action Button */}
                {progress >= 1 && (
                  <ThemedButton
                    title="Call to Action"
                    style={styles.callToActionButton}
                    onPress={() => {
                      setAdModalVisible(false); // Close the ad modal
                      setAdCompleted(true); // Mark the ad as completed
                    }}
                  />
                )}
              </View>
            </Modal>
          </ScrollView>
        )}

        {activeTab === 'Viewed Me' && (
          <ScrollView contentContainerStyle={styles.grid}>
            {data.map((item, index) => (
              <View
                key={item.id}
                style={[
                  styles.box,
                  // Apply blur only if the ad is not completed and for boxes after the first two
                  !adCompleted && index > 1 && styles.blurredBox,
                ]}
              >
                <ImageBackground
                  source={item.image}
                  style={styles.imageBackground}
                  imageStyle={styles.imageBackgroundStyle}
                >
                  <View style={styles.badgeTopLeft}>
                    <Text style={styles.badgeText}>New</Text>
                  </View>

                  <View style={styles.badgeTopRight}>
                    <Text style={styles.counterText}>{item.id}</Text>
                  </View>

                  <View style={styles.bottomContainer}>
                    <View style={styles.bottomDot} />
                    <Text style={styles.bottomText}>Olajesu Benjamin</Text>
                    <View style={styles.blueTick} />
                  </View>
                </ImageBackground>
              </View>
            ))}

            {/* First Modal */}
            <Modal
              visible={modalVisible}
              animationType="slide"
              transparent={true}
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  <View style={styles.modalContainer}>
                    <Text style={styles.advertModalTitle}>
                      WATCH A SHORT AD TO VIEW PURRED ME
                    </Text>
                    <TouchableOpacity
                      style={styles.modalButton}
                      onPress={openAdModal}
                    >
                      <Text style={styles.buttonText}>Watch Ad</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>

            {/* Second Modal */}
            <Modal
              visible={adModalVisible}
              animationType="fade"
              transparent={false}
              onRequestClose={() => setAdModalVisible(false)}
            >
              <View style={styles.adContainer}>
                {/* Close Button */}
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => {
                    if (progress < 1) {
                      Alert.alert(
                        'Notice',
                        'You cannot close until the ads finishes.'
                      );
                    } else {
                      setAdModalVisible(false); // Close the modal only if progress is complete
                    }
                  }}
                >
                  <Text style={styles.closeButtonText}>X</Text>
                </TouchableOpacity>

                {/* Progress Bar */}
                <Progress.Bar
                  progress={progress}
                  width={300}
                  height={3}
                  color="#B976FF"
                  unfilledColor="#e0e0e0"
                  borderWidth={0}
                  style={styles.progressBar}
                />

                {/* Ad Rectangle */}
                <View style={styles.adRectangle}>
                  <Text style={styles.adText}>Ads Here</Text>
                </View>

                {/* Call to Action Button */}
                {progress >= 1 && (
                  <ThemedButton
                    title="Call to Action"
                    style={styles.callToActionButton}
                    onPress={() => {
                      setAdModalVisible(false); // Close the ad modal
                      setAdCompleted(true); // Mark the ad as completed
                    }}
                  />
                )}
              </View>
            </Modal>
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  button: {
    position: 'absolute',
    bottom: 0,
    left: 1,
    right: 1,
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#202325',
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 15,
  },
  filterButton: {
    padding: 8,
  },
  filterIcon: {
    width: 20,
    height: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  logoText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    fontWeight: '700',
  },
  avatar: {
    width: 30,
    height: 30,
  },
  tabMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#202325',
    marginTop: 10,
    borderRadius: 5,
    padding: 3,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 3,
    borderRadius: 5,
  },

  activeTab: {
    backgroundColor: '#303437',
  },
  tabText: {
    fontSize: 16,
    color: '#555',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#fff',
  },
  smallBadge: {
    position: 'absolute',
    top: -5,
    right: -15,
    backgroundColor: '#B976FF',
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  badgeText: {
    fontSize: 10,
    color: '#fff',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 13,
  },

  box: {
    width: '48%',
    marginBottom: 10,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 2, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    position: 'relative',
    borderWidth: 5,
  },
  imageBackground: {
    width: '100%',
    height: 170,
    justifyContent: 'space-between',
  },
  imageBackgroundStyle: {
    // borderRadius: 5,
    resizeMode: 'cover',
  },
  badgeTopLeft: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#FA8F21',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    zIndex: 1,
  },
  badgeText: {
    color: '#fff',
    fontSize: 8,
    fontWeight: 'bold',
  },
  badgeTopRight: {
    position: 'absolute',
    top: 10,
    right: 25,
    backgroundColor: '#B976FF',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    zIndex: 1,
  },
  counterText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  bottomContainer: {
    position: 'absolute',
    flexDirection: 'row',
    gap: 5,
    bottom: 10,
    left: 10,
  },
  bottomText: {
    fontSize: 12,
    color: '#fff', // White text for visibility
    fontWeight: 'bold',
  },
  bottomDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2CF334', // Green dot at the bottom
    marginTop: 5,
  },

  blueTick: {
    width: 12,
    height: 12,
    borderRadius: 10,
    backgroundColor: '#0A84FF', // Green dot at the bottom
    marginTop: 1,
  },
  contentContainer: {
    marginBottom: 100,
  },
  pageContentText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#202325',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  blurredBox: {
    opacity: 0.2,
    backgroundColor: '#000',
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#303437',
    padding: 10,
    alignItems: 'center',
    borderTopColor: '#B976FF',
    borderTopWidth: 5,
  },

  modalContainer: {
    backgroundColor: '#202325',
    padding: 0,
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
  },

  advertModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    backgroundColor: '#B976FF',
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: '#fff',
  },
  modalButton: {
    backgroundColor: '#B976FF',
    padding: 10,
    borderRadius: 48,
    width: '90%',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  adContainer: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 20,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 25,
  },
  progressBar: {
    width: '80%',
    marginTop: 50,
  },
  adRectangle: {
    flex: 1,
    width: '73%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#01A4E5',
    marginVertical: 20,
  },
  adText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  callToActionButton: {
    marginBottom: 30,
    width: '80%',
  },
  disabledButton: {
    backgroundColor: '#d3d3d3', // Gray color for disabled state
  },

  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#555',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  leftSidebarContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '80%',
    backgroundColor: '#000000',
    padding: 20,
    zIndex: 1001,
  },
  leftSidebarTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  leftSidebarBackButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  leftSidebarFiltersText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  leftSidebarResetText: {
    color: '#B976FF',
    fontSize: 12,
    fontWeight: '500',
  },

  leftSidebarContentRowContainer: {
    flexDirection: 'column',
    padding: 10,
    marginBottom: 20,
  },
  leftSidebarContentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  leftSidebarContentText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
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

  proToggleRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    width: '100%',
    marginVertical: 20,
  },
  proToggleLogo: {
    flex: 1,
    resizeMode: 'contain',
    justifyContent: 'center',
  },
  proToggleResetButton: {
    padding: 10,
    justifyContent: 'center',
  },
  proToggleResetText: {
    color: '#B976FF', // or your desired reset text color
    fontSize: 12,
    fontWeight: '500',
  },
  proToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  proToggleText: {
    fontSize: 16,
    marginRight: 10,
  },
  proToggleButton: {
    width: 40,
    height: 20,
    borderRadius: 20,
    backgroundColor: '#6C7072',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },

  proToggleCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  proToggleCircleOn: {
    transform: [{ translateX: 20 }],
  },
  proToggleCircleOff: {
    transform: [{ translateX: 0 }],
  },

  rightSidebar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '80%',
    height: '100%',
    backgroundColor: '#000000',
    padding: 20,
    zIndex: 1001,
  },
  rightSidebarHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  rightSidebarBackButton: {
    padding: 10,
  },
  rightSidebarUsername: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    flex: 1,
    fontWeight: '700',
  },
  rightSidebarDivider: {
    height: 2,
    backgroundColor: '#202325',
    marginVertical: 10,
  },
  rightSidebarMenu: {
    // marginTop: 20,
  },
  rightSidebarMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  rightSidebarMenuIcon: {
    fontSize: 20,
    color: 'white',
    marginRight: 30,
  },
  rightSidebarMenuText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  rightSidebarSidebar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 300,
    backgroundColor: '#1e1e1e',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  rightSidebarSidebarText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20,
  },
  rightSidebarCloseButton: {
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginBottom: 90,
  },
  rightSidebarCloseButtonText: {
    color: 'white',
    fontSize: 14,
  },
  rightSidebarToggleButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#1e88e5',
    padding: 10,
    borderRadius: 5,
  },
  rightSidebarToggleButtonText: {
    color: 'white',
    fontSize: 14,
  },
  rightSidebarTextAds: {
    marginTop: 40,
  },
  rightSidebarTextAdsContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
    padding: 20,
  },
  rightSidebarTextAdsProLogo: {
    marginBottom: 10,
  },
  rightSidebarTrialText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
    fontWeight: '800',
  },
  rightSidebarTextAdsButton: {
    width: '100%',
  },

  // other stles starts
  box: {
    width: '48%',
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  imageBackground: {
    height: 200,
    justifyContent: 'flex-end',
  },
  imageBackgroundStyle: {
    borderRadius: 10,
  },
  badgeTopLeft: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  bottomDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'green',
  },
  bottomText: {
    marginLeft: 10,
    fontWeight: 'bold',
    color: 'black',
  },
  blueTick: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: 'blue',
    marginLeft: 5,
  },
  adButtonContainer: {
    width: '100%',
    marginTop: 10,
    marginBottom: 20,
  },
  adButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  adButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  unlockContainer: {
    padding: 10,
    backgroundColor: 'yellow',
    borderRadius: 5,
    marginTop: 10,
  },
  unlockText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
