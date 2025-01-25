import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import AcceptInput from '../../assets/images/acceptInput.png';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';

const VerifyMe = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIdType, setSelectedIdType] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [cameraVisible, setCameraVisible] = useState(false);
  const [filePickerVisible, setFilePickerVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [photo, setPhoto] = useState(null); // To store captured photo
  const [camera, setCamera] = useState(null);
  const [cameraModalVisible, setCameraModalVisible] = useState(false);
  const [bottomModalVisible, setBottomModalVisible] = useState(false);
  const navigation = useNavigation();
  const router = useRouter();

  const idTypes = ['State ID', 'State Driver’s License', 'US Passport'];

  // Open Camera Modal
  const openCameraModal = () => setCameraModalVisible(true);
  const closeCameraModal = () => setCameraModalVisible(false);

  // Open Bottom Modal
  const openBottomModal = () => setBottomModalVisible(true);
  const closeBottomModal = () => setBottomModalVisible(false);

  // Open Camera
  const openCamera = async () => {
    console.log('Opening camera...');

    // Request camera permissions
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    closeCameraModal();
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

  // Open Gallery
  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log('Image selected:', result.assets[0].uri);
    }
    closeCameraModal();
    closeBottomModal();
  };

  // Handle Capture
  const handleCapture = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync();
      console.log('Captured Image:', photo.uri);
      setCameraVisible(false);
    }
  };

  // Close Camera
  const handleCancelCamera = () => setCameraVisible(false);

  const handleSubmit = () => {
    setSubmitted(true);
    // setTimeout(() => setSubmitted(false), 3000);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(status === 'granted');
    })();
  }, []);

  const openFilePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      console.log(result.uri);
    }
  };

  console.log('Camera component:', Camera);
  console.log('Camera visible:', cameraVisible);
  console.log('Camera permission:', cameraPermission);

  const handleOptionClick = (label) => {
    setSelectedOption(label);
    if (label === 'Take a Selfie') {
      openCamera(); // Open the camera for "Take a Selfie"
    } else if (label === 'Front of ID' || label === 'Back of ID') {
      openFilePicker(); // Open file picker for "Front of ID" and "Back of ID"
    }
  };

  const handleCaptured = async () => {
    if (camera) {
      // Ensure the camera is properly set
      const photo = await camera.takePictureAsync();
      setPhoto(photo.uri); // Store the captured photo URI
      console.log(photo.uri); // Process the captured photo here
      setCameraVisible(false); // Hide the camera
      openCamera();
    }
  };

  const handleCancelCamerad = () => {
    setCameraVisible(false); // Hide the camera without taking a photo
  };

  return (
    <ScrollView style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={20} color="white" />
      </TouchableOpacity>

      {/* Verify Me Text */}
      <View style={styles.verifyContainer}>
        <Text style={styles.verifyText}>
          <Text style={styles.blueText}>Verify </Text>
          <Text style={styles.whiteText}>Me</Text>
        </Text>
        {/* Instruction Text */}
        <Text style={styles.instructionText}>Complete all fields</Text>
      </View>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="First Name"
        placeholderTextColor="#fff"
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        placeholderTextColor="#fff"
      />
      <TextInput
        style={styles.input}
        placeholder="Date of Birth"
        placeholderTextColor="#fff"
      />

      {/* ID Type Selection */}
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setModalVisible(true)}
        // onPress={openModal}
      >
        <Text style={styles.dropdownText}>{selectedIdType || 'ID Type'}</Text>
        <Ionicons name="chevron-down" size={20} color="gray" />
      </TouchableOpacity>

      {/* File Upload Section */}
      <View style={styles.uploadContainer}>
        {['Take a Selfie', 'Front of ID', 'Back of ID'].map((label, index) => (
          <TouchableOpacity
            key={index}
            style={styles.uploadBox}
            onPress={openCameraModal}
          >
            {/* Image and Text side by side */}
            <View style={styles.imageTextContainer}>
              <Image source={AcceptInput} style={styles.uploadImage} />
              <Text style={styles.uploadText}>{label}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Camera View */}
      {cameraVisible && cameraPermission === true && (
        <View style={styles.cameraContainer}>
          <Camera style={styles.camera} ref={(ref) => setCamera(ref)}>
            <TouchableOpacity
              style={styles.captureButton}
              onPress={handleCapture}
            >
              <Text style={styles.captureText}>Capture</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancelCamera}
            >
              <Text style={styles.captureText}>Cancel</Text>
            </TouchableOpacity>
          </Camera>
        </View>
      )}

      {/* Camera Modal */}
      <Modal visible={cameraModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.modalButton} onPress={openCamera}>
                <Text style={styles.modalButtonText}>Take Picture</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={openGallery}
              >
                <Text style={styles.modalButtonText}>Choose from Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalCancel}
                onPress={closeCameraModal}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Bottom Modal */}
      <Modal visible={bottomModalVisible} animationType="slide" transparent>
        <View style={[styles.modalContainer, { zIndex: 1 }]}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={openCameraModal}
            >
              <Text style={styles.modalButtonText}>Take Pictures</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={openGallery}>
              <Text style={styles.modalButtonText}>Choose from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalCancel}
              onPress={closeBottomModal}
            >
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Small Text */}
      <Text style={styles.validIdText}>
        Valid forms of identification: State ID, State Drivers License, US
        Passport
        {/* Valid form of identification: {selectedIdType || 'Select ID Type'} */}
      </Text>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      {/* Success Modal */}
      {submitted && (
        <View style={styles.fullScreenContainer}>
          <View style={styles.successContainer}>
            <Ionicons name="checkmark-circle" size={50} color="#0A84FF" />
            <Text style={styles.successText}>
              Your information has been{' '}
              <Text style={styles.purpleText}>submitted</Text>. Please allow
              24-48 hours for the Verify Me process to complete.
            </Text>
            <TouchableOpacity
              style={styles.goHomeButton}
              onPress={() => {
                router.push('/chat');
              }}
              // onPress={() => navigation.navigate('/add')}
              // onPress={() => navigation.navigate('chat')}
            >
              <Text style={styles.buttonText}>Go Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Bottom Modal for ID Type Selection */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {idTypes.map((type, index) => (
              <TouchableOpacity
                key={index}
                style={styles.modalItem}
                onPress={() => {
                  setSelectedIdType(type);
                  setModalVisible(false);
                }}
              >
                <Text style={styles.modalItemText}>{type}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.modalCancel}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};
export default VerifyMe;
// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000000',
    marginTop: 40,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    // left: 20,
    zIndex: 10,
  },
  verifyContainer: {
    alignItems: 'flex-start',
    textAlign: 'left', // This works for direct text inside the container
    justifyContent: 'flex-start',
    paddingHorizontal: 5, // Optional: Adds some spacing from the edges
    marginVertical: 15,
  },
  verifyText: {
    fontSize: 40,
    fontWeight: '800',
    marginTop: 15,
  },
  blueText: {
    color: '#0A84FF',
  },
  whiteText: {
    color: 'white',
  },

  instructionText: {
    textAlign: 'center',
    color: '#ccc',
    fontSize: 20,
    // marginVertical: 20,
  },
  input: {
    backgroundColor: 'transparent',
    color: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: '#303437',
    borderWidth: 1,
    fontSize: 16,
  },

  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#303437',
  },
  dropdownText: {
    color: 'white',
  },
  uploadContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadBox: {
    flexDirection: 'column',
    width: '90%',
    padding: 40,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#0A84FF',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 10,
  },
  imageTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadImage: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  uploadText: {
    color: '#fff',
    fontSize: 17,
  },
  validIdText: {
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 50,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
  },
  fullScreenContainer: {
    position: 'absolute', // Absolute positioning to cover the entire screen
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000', // Optional: to add a semi-transparent background overlay
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000, // Ensures the modal appears above other content
  },

  successContainer: {
    backgroundColor: '#000',
    padding: 20,
    borderRadius: 10,
    width: '100%', // Optional: adjust width as needed
    alignItems: 'center',
    justifyContent: 'center',
  },

  // successContainer: {
  //   position: 'absolute',
  //   top: '40%',
  //   left: '10%',
  //   right: '10%',
  //   backgroundColor: 'white',
  //   padding: 20,
  //   borderRadius: 10,
  //   alignItems: 'center',
  // },
  successText: {
    textAlign: 'center',
    marginVertical: 10,
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  purpleText: {
    color: 'purple',
    fontWeight: 'bold',
  },
  goHomeButton: {
    backgroundColor: '#0A84FF',
    paddingVertical: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: 'transparent',
    width: '100%',
  },
  modalContent: {
    backgroundColor: '#000',
    alignItems: 'center',
    width: '100%',
  },
  modalButton: {
    width: '100%',
    padding: 15,
    alignItems: 'center',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: '#1C1C1E',
  },
  modalButtonText: {
    fontSize: 17,
    fontWeight: '400',
    color: '#0A84FF',
  },
  modalCancelText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalItem: {
    padding: 15,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderRadius: 10,
    backgroundColor: '#1C1C1E',
  },
  modalItemText: {
    fontSize: 17,
    fontWeight: '500',
    textAlign: 'center',
    color: '#0A84FF',
  },
  modalCancel: {
    // marginTop: 10,
    backgroundColor: '#1C1C1E',
    padding: 15,
    alignItems: 'center',
    width: '100%',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },

  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  captureButton: {
    backgroundColor: 'blue',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
  },
  captureText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: 'red',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
});
