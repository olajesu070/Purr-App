import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Button,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// import * as ImagePicker from 'expo-image-picker';
// import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as Camera from 'expo-camera';
import Logo from '../../assets/images/pledgeLogo.png';
import Tick from '../../assets/images/tick.png';
import { useNavigation } from '@react-navigation/native';
import { router, useLocalSearchParams } from 'expo-router';

const ProfileAndPledgePage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [isPledgePage, setIsPledgePage] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const navigation = useNavigation();

  const gotoHome = () => {
    router.replace('(tabs)');
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
      console.log('Camera permission status:', status);
    })();
  }, []);

  const openCamera = async () => {
    console.log('Opening camera...');

    // Request camera permissions
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      console.log('Camera permission denied');
      return;
    }

    // Launch camera to take a photo
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true, // Allow editing the image
      aspect: [4, 3], // Aspect ratio
    });

    if (!result.cancelled) {
      setCapturedImage(result.uri);
      console.log('Image captured: ', result.uri);
    }
  };

  const openGallery = async () => {
    console.log('Opening gallery...');

    // Request gallery permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      console.log('Gallery permission denied');
      return;
    }

    // Launch image picker to choose a photo from gallery
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true, // Allow editing the image
      aspect: [4, 3], // Aspect ratio
    });

    if (!result.cancelled) {
      setCapturedImage(result.uri);
      console.log('Image selected from gallery: ', result.uri);
    }
  };

  // Function to handle Camera click
  const handleUpload = (source) => {
    if (source === 'camera') {
      launchCamera(
        {
          mediaType: 'photo', // Select photo (you can also use 'video' if needed)
          cameraType: 'back', // or 'front' for front camera
          saveToPhotos: true, // Optionally save the photo to the gallery
          quality: 0.8, // Quality of the image (0 to 1)
        },
        (response) => {
          if (response.didCancel) {
            console.log('User cancelled camera picker');
          } else if (response.errorCode) {
            console.log('Camera Error: ', response.errorMessage);
          } else {
            setImageUri(response.assets[0].uri); // Save the image URI to state
            console.log('Camera image URI:', response.assets[0].uri);
          }
        }
      );
    } else if (source === 'gallery') {
      launchImageLibrary(
        {
          mediaType: 'photo',
          quality: 0.8,
        },
        (response) => {
          if (response.didCancel) {
            console.log('User cancelled gallery picker');
          } else if (response.errorCode) {
            console.log('Gallery Error: ', response.errorMessage);
          } else {
            setImageUri(response.assets[0].uri); // Save the image URI to state
            console.log('Gallery image URI:', response.assets[0].uri);
          }
        }
      );
    }
  };
  const circleColors = [
    '#E71E1E',
    '#FA8F21',
    '#FFFA8D',
    '#438346',
    '#0A84FF',
    '#B976FF',
    '#FFFFFF',
    '#2BBBE3',
    '#FFADD0',
  ];
  const pledgeTexts = [
    'Treat others as they want to be treated',
    'Respect our differences',
    'Embrace our similiarities',
    'Prioritize your safety',
    'Do not solicitate',
    'Make connections, friends, and more',
    'Get involved with your community',
    'Follow community guidelines',
    'Have fun!',
  ];

  const handleSkip = () => {
    setIsPledgePage(true); // Switch to the Pledge Page
  };

  const handleBack = () => {
    setIsPledgePage(false); // Go back to Profile Picture Page
  };

  return (
    <ScrollView style={styles.container}>
      {!isPledgePage ? (
        // Profile Picture Page View
        <View>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.profileText}>Profile Picture</Text>
            <TouchableOpacity onPress={handleSkip}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.profileImageContainer}>
            <Image
              style={styles.profileImage}
              source={
                imageUri
                  ? { uri: imageUri }
                  : require('../../assets/images/profilePhoto3.png')
              }
            />
          </View>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={() => {
                setModalVisible(true);
              }}
            >
              <Text style={styles.buttonText}>Upload</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.continueButton}
              onPress={handleSkip}
            >
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
              <Text style={styles.buttonText}>Skip</Text>
            </TouchableOpacity>
          </View>

          <Modal visible={modalVisible} transparent={true}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalButtonCamera]}
                  onPress={() => openCamera()}
                >
                  <Text style={styles.modalButtonText}>Camera</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.modalButton, styles.modalButtonGallery]}
                  onPress={() => openGallery()}
                >
                  <Text style={styles.modalButtonText}>Gallery</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.modalButton, styles.modalButtonCancel]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalCancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      ) : (
        // Pledge Page View
        <View>
          <View style={styles.pledgeHeader}>
            <TouchableOpacity onPress={handleBack}>
              <Ionicons name="chevron-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.profileText}>Community Pledge</Text>
          </View>
          <View style={styles.logPurrContainer}>
            <Image source={Logo} />
            <Text style={styles.purrText}>Purr</Text>
          </View>
          <View style={styles.lineContainer}>
            <View style={styles.line}>
              <View style={styles.darkLine}></View>
              <View style={styles.transparentLine}></View>
              <View style={styles.darkLine}></View>
            </View>
          </View>
          <Text style={styles.headerText}>
            Help make our community
            <Text style={[styles.inclusiveText, { color: '#E71E1E' }]}>
              &nbsp;i
            </Text>
            <Text style={[styles.inclusiveText, { color: '#FA8F21' }]}>n</Text>
            <Text style={[styles.inclusiveText, { color: '#FFFA8D' }]}>c</Text>
            <Text style={[styles.inclusiveText, { color: '#438346' }]}>l</Text>
            <Text style={[styles.inclusiveText, { color: '#0A84FF' }]}>u</Text>
            <Text style={[styles.inclusiveText, { color: '#B976FF' }]}>s</Text>
            <Text style={[styles.inclusiveText, { color: '#FFFFFF' }]}>i</Text>
            <Text style={[styles.inclusiveText, { color: '#2BBBE3' }]}>v</Text>
            <Text style={[styles.inclusiveText, { color: '#FFADD0' }]}>e</Text>
          </Text>
          <View style={styles.circlesContainer}>
            {pledgeTexts.map((text, index) => (
              <View key={index} style={styles.circleRow}>
                <View
                  style={[
                    styles.circle,
                    {
                      backgroundColor:
                        circleColors[index % circleColors.length],
                    }, // Use predefined colors
                  ]}
                >
                  <Image source={Tick} style={styles.tick} />
                </View>
                {index === 7 ? (
                  <Text style={styles.circleText}>
                    Follow{' '}
                    <Text
                      style={{
                        color: '#B976FF',
                        textDecorationLine: 'underline',
                        fontWeight: '400',
                      }}
                    >
                      Community Guidelines
                    </Text>
                  </Text>
                ) : (
                  <Text style={styles.circleText}>{text}</Text>
                )}
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.pledgeButton} onPress={gotoHome}>
            <Text style={styles.pledgeButtonText}>I Pledge</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#040406',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start', // Center horizontally
    alignItems: 'center', // Center vertically
    marginBottom: 60,
    gap: 70,
  },
  pledgeHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start', // Center horizontally
    alignItems: 'center', // Center vertically
    marginBottom: 30,
    gap: 70,
  },

  profileText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
    fontWeight: '700',
  },
  skipText: {
    fontSize: 18,
    color: '#B976FF',
    fontWeight: '500',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 256,
    height: 400,
  },
  buttonsContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  uploadButton: {
    backgroundColor: 'transparent',
    padding: 10,
    marginBottom: 10,
    borderRadius: 48,
    height: 48,
    borderWidth: 1,
    borderColor: '#B976FF',
    justifyContent: 'center',
  },
  continueButton: {
    backgroundColor: '#B976FF',
    padding: 10,
    marginBottom: 10,
    borderRadius: 48,
    height: 48,
    justifyContent: 'center',
    marginTop: 10,
  },
  skipButton: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 48,
    height: 48,
    borderWidth: 1,
    borderColor: '#6C7072',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  pledgeButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  modalContainer: {
    position: 'absolute', // Position it relative to the screen
    bottom: 0, // Align the modal at the bottom of the page
    width: '100%', // Make the modal occupy the full width of the page
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#000',
    padding: 20,
    borderRadius: 10,
    width: '100%',
  },
  modalButton: {
    paddingVertical: 11,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  modalButtonCamera: {
    backgroundColor: '#1C1C1E',
  },
  modalButtonGallery: {
    backgroundColor: '#1C1C1E',
  },
  modalButtonCancel: {
    backgroundColor: '#1C1C1E',
    color: 'white',
  },
  modalButtonText: {
    color: '#B976FF',
    fontSize: 16,
  },
  modalCancelButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  logPurrContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Center vertically
    alignSelf: 'center', // Ensure the container itself is centered
    marginBottom: 30,
  },

  logText: {
    fontSize: 18,
    color: '#fff',
  },
  purrText: {
    fontSize: 50,
    color: '#fff',
    fontWeight: '800',
    marginLeft: 8,
  },
  lineContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  darkLine: {
    width: '40%',
    height: 2,
    backgroundColor: '#B976FF',
  },
  transparentLine: {
    width: '20%',
    height: 2,
    backgroundColor: 'transparent',
  },
  headerText: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 30,
    color: 'white',
    fontWeight: 600,
  },
  inclusiveText: {
    fontSize: 18,
    fontWeight: 600,
    fontSize: 30,
    color: 'white',
  },
  circlesContainer: {
    marginBottom: 20,
  },
  circleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 21,
  },
  tick: {
    color: '#fff',
  },
  circleText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
  },
  pledgeButton: {
    backgroundColor: '#B976FF',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 48,
    height: 48,
    marginTop: 40,
  },
});

export default ProfileAndPledgePage;
