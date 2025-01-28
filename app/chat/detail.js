import React, { useRef, useState, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // For icons
import FilledFootStamp from '../../assets/images/filledFootStamp.png';
import OutlineFootStamp from '../../assets/images/outlineFootStamp.png';
import VaultImage from '../../assets/images/vaultImage.png';
import GifImage from '../../assets/images/gifImage.png';
import * as ImagePicker from 'expo-image-picker';
import { launchCamera } from 'react-native-image-picker';
import { Camera } from 'expo-camera';
import ModalWrapper from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';

const ChatDetailScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState('Vault');
  const [vaultImages, setVaultImages] = useState([
    'photo1.jpg',
    'photo2.jpg',
    'photo3.jpg',
    'photo4.jpg',
    'photo5.jpg',
  ]);
  const [disappearingPhotosCount, setDisappearingPhotosCount] = useState(5);
  const [capturedImage, setCapturedImage] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [flagModalVisible, setFlagModalVisible] = useState(false); // State to manage modal visibility
  const [blockUserModalVisible, setBlockUserModalVisible] = useState(false);

  const router = useRouter();

  const handleOpenFlagModal = () => {
    setFlagModalVisible(true);
  };

  const handleCloseFlagModal = () => {
    setFlagModalVisible(false); // Close modal
  };

  const navigation = useNavigation();

  const scrollViewRef = useRef();

  const handleImagePress = (index) => {
    setSelectedImage(index); // Set the selected image index
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

  const images = [
    require('../../assets/images/gifImage.png'),
    require('../../assets/images/gifImage.png'),
    require('../../assets/images/gifImage.png'),
    require('../../assets/images/gifImage.png'),
    require('../../assets/images/gifImage.png'),
    require('../../assets/images/gifImage.png'),
    require('../../assets/images/gifImage.png'),
    require('../../assets/images/gifImage.png'),
    require('../../assets/images/gifImage.png'),
    require('../../assets/images/gifImage.png'),
    require('../../assets/images/gifImage.png'),
    require('../../assets/images/gifImage.png'),
    require('../../assets/images/gifImage.png'),
    require('../../assets/images/gifImage.png'),
    require('../../assets/images/gifImage.png'),
    require('../../assets/images/gifImage.png'),
  ];

  // Opens modal
  const openAttachmentModal = () => {
    setModalVisible(true);
  };

  // Closes modal properly
  const handleGoBack = () => {
    setModalVisible(false);
  };

  const handleImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
      setModalVisible(true);
    }
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  //   const handleGoBack = () => {
  //     setModalVisible(false);
  //   };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#202325" barStyle="light-content" />

      {/* Header Section */}
      <View style={styles.header}>
        {/* Back Button */}
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        {/* Profile Section (Centered) */}
        <View style={styles.profileContainer}>
          {/* Online Status Dot */}
          <View style={styles.onlineDot} />

          {/* Clickable Profile Image */}
          <TouchableOpacity
            onPress={() => {
              router.push('/chat/userProfilePage');
            }}
          >
            <Image
              source={require('../../assets/images/user1Dp.png')}
              style={styles.profilePicture}
            />
          </TouchableOpacity>

          {/* Username & Verified Badge */}
          <View style={styles.usernameContainer}>
            <Text style={styles.username}>John Doe</Text>
            <Text style={styles.verifiedBadge}>✔</Text>
          </View>
        </View>

        {/* White Flag */}
        <TouchableOpacity onPress={handleOpenFlagModal}>
          <Ionicons name="flag" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Chat Messages */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.chatContainer}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: true })
          }
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Sender Message (Right) */}
          <View style={styles.senderWrapper}>
            <View style={styles.senderMessage}>
              <Text style={styles.messageText}>
                Yes! I’ll be there at 8 PM.
              </Text>
              <View style={styles.senderTail} />
            </View>
            <Text style={styles.sendertTmestamp}>12:35 PM</Text>
          </View>
          {/* Receiver Message (Left) */}
          <View style={styles.receiverWrapper}>
            <View style={styles.receiverMessage}>
              <Text style={styles.messageText}>
                Hey! Are you coming tonight?
              </Text>
              <View style={styles.receiverTail} />
            </View>
            <Text style={styles.recieverTimestamp}>12:30 PM</Text>
          </View>
          {/* Failed to Send Sender Message (Right) */}
          <View style={styles.failedSenderWrapper}>
            <View style={styles.failedSenderMessage}>
              <Text style={styles.messageText}>
                Oops! Looks like my message didn't go through.
              </Text>
              <View style={styles.failedSenderTail} />
            </View>
            <Text style={styles.failedSenderTimestamp}>Error</Text>
          </View>

          {/* Receiver Message (Left) */}
          <View style={styles.receiverWrapper}>
            <View style={styles.receiverMessage}>
              <Text style={styles.messageText}>
                Hey! Are you coming tonight?
              </Text>
              <View style={styles.receiverTail} />
            </View>
            <Text style={styles.recieverTimestamp}>12:30 PM</Text>
          </View>
          {/* Failed to Send Sender Message (Right) */}
          <View style={styles.failedSenderWrapper}>
            <View style={styles.failedSenderMessage}>
              <Text style={styles.messageText}>
                Oops! Looks like my message didn't go through.ss
              </Text>
              <View style={styles.failedSenderTail} />
            </View>
            <Text style={styles.failedSenderTimestamp}>Error</Text>
          </View>

          {/* Receiver Message (Left) */}
          <View style={styles.receiverWrapper}>
            <View style={styles.receiverMessage}>
              <Text style={styles.messageText}>
                Hey! Are you coming tonight?
              </Text>
              <View style={styles.receiverTail} />
            </View>
            <Text style={styles.recieverTimestamp}>12:30 PM</Text>
          </View>
          {/* Failed to Send Sender Message (Right) */}
          <View style={styles.failedSenderWrapper}>
            <View style={styles.failedSenderMessage}>
              <Text style={styles.messageText}>
                Oops! Looks like my message didn't go through.
              </Text>
              <View style={styles.failedSenderTail} />
            </View>
            <Text style={styles.failedSenderTimestamp}>Error</Text>
          </View>
          {/* Failed to Send Receiver Message (Left) */}
          <View style={styles.failedReceiverWrapper}>
            <View style={styles.failedReceiverMessage}>
              <Text style={styles.failedRecieverMessageText}>
                I didn't get your message, could you resend?
              </Text>
              <Ionicons
                name="warning"
                size={16}
                color="red"
                style={styles.failedIcon}
              />
            </View>
            <Text style={styles.failedRecieverTimestamp}>12:55 PM</Text>
          </View>

          {/* Receiver Message (Left) */}
          <View style={styles.receiverWrapper}>
            <View style={styles.receiverMessage}>
              <Text style={styles.messageText}>
                Hey! Are you coming tonight?
              </Text>
              <View style={styles.receiverTail} />
            </View>
            <Text style={styles.recieverTimestamp}>12:30 PM</Text>
          </View>
          {/* Failed to Send Sender Message (Right) */}
          <View style={styles.failedSenderWrapper}>
            <View style={styles.failedSenderMessage}>
              <Text style={styles.messageText}>
                Oops! Looks like my message didn't go through.
              </Text>
              <View style={styles.failedSenderTail} />
            </View>
            <Text style={styles.failedSenderTimestamp}>Error</Text>
          </View>
          {/* Sender Message with Filled Foot Stamp */}
          <View style={styles.filledFootSenderContainer}>
            <View style={styles.filledFootSenderWrapper}>
              {/* Foot Stamp Image on the Extreme Left */}
              <View>
                <Image
                  source={FilledFootStamp}
                  style={styles.filledFootStamp}
                />
              </View>

              {/* Sender Message Box on the Right */}
              <View style={styles.filledFootSenderMessage}>
                <Text style={styles.filledMessageText}>
                  I’ll sesssssssssnd you the details shortly.
                </Text>
              </View>
            </View>

            {/* Timestamp Below Everything */}
            <Text style={styles.filledTimestamp}>12:4S0 PM</Text>
          </View>
          {/* Receiver Message with Outline Foot Stamp */}
          <View style={styles.outlineFootReceiverWrapper}>
            <View style={styles.outlineFootReceiverMessage}>
              <Text style={styles.messageText}>Alright, I’ll be waiting.</Text>
              <Image
                source={OutlineFootStamp}
                style={styles.outlineFootStamp}
              />
              {/* <Ionicons name="checkmark-circle-outline" size={16} color="white" style={styles.outlineFootStamp} /> */}
            </View>
            <Text style={styles.timestamp}>12:42 PM</Text>
          </View>
        </ScrollView>
        <View style={styles.inputContainer}>
          {/* Clickable Icon on the Left */}
          <TouchableOpacity onPress={openAttachmentModal}>
            <Image
              source={require('../../assets/images/attach.png')}
              style={styles.icon}
            />
          </TouchableOpacity>

          {/* Text Input */}
          <TextInput
            style={styles.textInput}
            placeholder="Type something here..."
            placeholderTextColor="#999"
            multiline={true}
          />
          {/* Send Button on the Right */}
          <TouchableOpacity>
            <Ionicons
              name="send"
              size={25}
              color="white"
              style={styles.sendIcon}
            />
          </TouchableOpacity>

          {/* Modal for Attachments */}
          <ModalWrapper
            isVisible={isModalVisible}
            onBackdropPress={() => setModalVisible(false)}
            style={styles.modal}
          >
            <View style={styles.modalContent}>
              {/* Tabs */}
              <View style={styles.tabsContainer}>
                {['Vault', 'Camera Roll', 'GIF'].map((tab) => (
                  <TouchableOpacity
                    key={tab}
                    style={[
                      styles.tab,
                      selectedTab === tab && styles.activeTab,
                    ]}
                    onPress={() => setSelectedTab(tab)}
                  >
                    <Text style={styles.tabText}>{tab}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {selectedTab === 'Vault' && (
                <ScrollView style={styles.vaultContainer}>
                  {/* Display only the default VaultImage */}
                  <Image source={VaultImage} style={styles.vaultImage} />

                  {/* Disappearing Photo Count Box */}
                  <View style={styles.disappearingPhotoBox}>
                    <Text style={styles.disappearingPhotoText}>
                      Disappearing Photo {'\n'} 0/5 Available - Watch Ad to
                      Refresh
                    </Text>
                  </View>

                  {/* Send Button */}
                  <TouchableOpacity style={styles.sendButton}>
                    <Text style={styles.sendButtonText}>Send</Text>
                  </TouchableOpacity>
                </ScrollView>
              )}

              {/* Content for Camera Roll */}
              {selectedTab === 'Camera Roll' && (
                <ScrollView style={styles.cameraRollContainer}>
                  <View style={styles.imageContainer}>
                    {/* Empty Box or Captured Image */}
                    <TouchableOpacity
                      style={styles.emptyBox}
                      onPress={() => {
                        console.log('Empty box clicked');
                        openCamera();
                      }}
                    >
                      {capturedImage ? (
                        <Image
                          source={capturedImage}
                          style={styles.capturedImage}
                        />
                      ) : (
                        <Text style={styles.emptyBoxText}>+</Text>
                      )}
                    </TouchableOpacity>

                    {/* Default Vault Image */}
                    <Image source={VaultImage} style={styles.vaultImage} />
                  </View>

                  {/* Disappearing Photo Text */}
                  {/* <View style={styles.disappearingPhotoBox}>
        <Text style={styles.disappearingPhotoText}>
          Disappearing Photo {"\n"} 0/5 Available - Watch Ad to Refresh
        </Text>
      </View> */}

                  {/* Send Button */}
                  <TouchableOpacity style={styles.sendButton}>
                    <Text style={styles.sendButtonText}>Send</Text>
                  </TouchableOpacity>
                </ScrollView>
              )}

              {/* Content for GIFs */}
              {selectedTab === 'GIF' && (
                <View style={styles.gifContainer}>
                  {/* Display only the default VaultImage */}
                  <View style={styles.searchContainer}>
                    {/* Search Icon */}
                    <Ionicons
                      name="search"
                      size={15}
                      color="white"
                      style={styles.searchIcon}
                    />
                    <TextInput
                      style={styles.searchInput}
                      placeholder="Search GIFY"
                      placeholderTextColor="#979C9E"
                    />
                  </View>
                  <ScrollView style={styles.scrollContainer}>
                    <FlatList
                      data={images}
                      renderItem={({ item, index }) => (
                        <TouchableOpacity
                          onPress={() => handleImagePress(index)}
                        >
                          <Image
                            source={item}
                            style={[
                              styles.gifImages,
                              selectedImage === index && styles.selectedImage, // Apply red border if selected
                            ]}
                          />
                        </TouchableOpacity>
                      )}
                      keyExtractor={(item, index) => index.toString()}
                      numColumns={4} // Ensures 4 images per row
                      contentContainerStyle={styles.gridContainer}
                    />
                  </ScrollView>

                  <Text style={styles.poweredbyGif}>Powered by GIFY</Text>
                  {/* Send Button */}
                  <TouchableOpacity style={styles.gifSendButton}>
                    <Text style={styles.sendButtonText}>Send</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </ModalWrapper>
        </View>
      </KeyboardAvoidingView>

      {/* Flag Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={flagModalVisible}
        onRequestClose={handleCloseFlagModal}
      >
        <View style={styles.flagModalOverlay}>
          <View style={styles.flagModalContent}>
            {/* Flag Buttons */}
            <View style={styles.flagModalButtonRow}>
              <TouchableOpacity
                style={styles.flagModalButton}
                onPress={() => {
                  router.push('/chat/reportUserPage');
                  setFlagModalVisible(false);
                }}
              >
                <Text style={styles.flagModalButtonText}>Report</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.flagModalButtonRow}>
              <TouchableOpacity
                style={styles.flagModalButton}
                onPress={() => {
                  setBlockUserModalVisible(true);
                  setFlagModalVisible(false);
                }}
              >
                <Text style={styles.flagModalButtonText}>Block</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.flagModalButtonRow}>
              <TouchableOpacity
                style={styles.flagModalButton}
                onPress={handleCloseFlagModal}
              >
                <Text style={styles.flagModalCloseButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
            {/* Close Modal Button */}
            {/* <TouchableOpacity onPress={handleCloseFlagModal} style={styles.flagModalCloseButton}>
              <Text style={styles.flagModalCloseButtonText}>Close</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </Modal>

      {/* bottom block modal Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={blockUserModalVisible}
        onRequestClose={() => setBlockUserModalVisible(false)}
      >
        <TouchableWithoutFeedback
          onPress={() => setBlockUserModalVisible(false)}
        >
          <View style={styles.blockUserModalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.blockUserModalContainer}>
                {/* Header */}
                <Text style={styles.blockUserModalHeader}>Are you sure?</Text>

                {/* Instructions */}
                <Text style={styles.blockUserModalText}>
                  Blocking this user will count as{' '}
                  <Text style={styles.blockUserModalHighlight}>7</Text> of the{' '}
                  <Text style={styles.blockUserModalHighlight}>10</Text> Free
                  users receive. To get unlimited blocks, upgrade to{' '}
                  <Text style={styles.blockUserModalHighlight}>Purr+</Text>.
                </Text>

                {/* Continue Button */}
                <TouchableOpacity
                  onPress={() => {
                    router.push('/chat');
                    setBlockUserModalVisible(false);
                  }}
                  style={styles.blockUserModalContinueButton}
                >
                  <Text style={styles.blockUserModalContinueButtonText}>
                    Continue
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default ChatDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  /*** HEADER STYLES ***/
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#202325',
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginTop: 40,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineDot: {
    width: 10,
    height: 10,
    backgroundColor: 'green',
    borderRadius: 5,
    marginRight: 5,
  },
  profilePicture: {
    width: 35,
    height: 35,
    borderRadius: 5,
    marginRight: 8,
  },
  usernameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  verifiedBadge: {
    color: '#00BFFF',
    fontSize: 14,
    marginLeft: 3,
  },

  /*** CHAT MESSAGES ***/
  chatContainer: {
    flexGrow: 1,
    padding: 15,
    paddingBottom: 80,
  },

  /*** RECEIVER MESSAGE (LEFT) ***/
  receiverWrapper: {
    flexDirection: 'column', // Stack items vertically
    alignSelf: 'flex-start',
    // marginBottom: 2,
  },
  receiverMessage: {
    backgroundColor: '#303437',
    padding: 10,
    borderRadius: 8,
    borderBottomLeftRadius: 0, // Sharp top-left corner
    maxWidth: '70%',
    position: 'relative',
  },
  receiverTail: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderLeftColor: 'transparent',
    borderRightWidth: 10,
    borderRightColor: '#303437', // Same as receiver bubble color
    borderTopWidth: 10,
    borderTopColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    left: -20, // Ensures tail is at the bottom-left
  },

  /*** SENDER MESSAGE (RIGHT) ***/
  senderWrapper: {
    flexDirection: 'column', // Stack message and timestamp vertically
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  senderMessage: {
    backgroundColor: '#B976FF',
    padding: 10,
    borderRadius: 8,
    borderBottomRightRadius: 0, // Sharp top-right corner
    maxWidth: '70%',
    position: 'relative',
  },

  senderTail: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderLeftColor: '#B976FF', // Same as sender bubble color
    borderRightWidth: 10,
    borderRightColor: 'transparent',
    borderTopWidth: 10,
    borderTopColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    right: -20, // Ensures tail is at the bottom-right
  },

  /*** COMMON MESSAGE TEXT & TIMESTAMP ***/
  messageText: {
    color: 'white',
    fontSize: 16,
  },
  failedRecieverMessageText: {
    color: '#6d6f70',
    fontSize: 16,
  },
  recieverTimestamp: {
    fontSize: 12,
    color: '#979C9E',
    alignSelf: 'flex-start',
  },
  sendertTmestamp: {
    fontSize: 12,
    color: '#979C9E',
    alignSelf: 'flex-end',
  },

  /*** FAILED RECEIVER MESSAGE (LEFT) ***/
  failedReceiverWrapper: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  failedReceiverMessage: {
    backgroundColor: '#202325',
    padding: 10,
    borderRadius: 8,
    borderBottomLeftRadius: 0,
    maxWidth: '70%',
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  failedIcon: {
    marginLeft: 100, // Adds spacing between text and error icon
  },

  /*** FAILED SENDER MESSAGE (RIGHT) ***/
  failedSenderWrapper: {
    flexDirection: 'column',
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  failedSenderMessage: {
    backgroundColor: '#2F1947',
    padding: 10,
    borderRadius: 8,
    borderBottomRightRadius: 0,
    maxWidth: '70%',
    position: 'relative',
  },
  failedSenderTail: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderLeftColor: '#2F1947', // Same as sender bubble color
    borderRightWidth: 10,
    borderRightColor: 'transparent',
    borderTopWidth: 10,
    borderTopColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    right: -20, // Ensures tail is at the bottom-right
  },

  /*** COMMON FAILED TIMESTAMP ***/
  failedSenderTimestamp: {
    fontSize: 12,
    color: '#979C9E',
    alignSelf: 'flex-end',
  },
  failedRecieverTimestamp: {
    fontSize: 12,
    color: '#979C9E',
    alignSelf: 'flex-start',
  },

  /*** Container to keep timestamp below the row ***/
  filledFootSenderContainer: {
    // alignSelf: "flex-end",
    marginBottom: 10,
  },

  /*** Wrapper to align image and message in a row ***/
  filledFootSenderWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },

  /*** Foot Stamp Image on the Left ***/
  filledFootStamp: {
    // width: 20, // Adjust image size as needed
    // height: 20,
    alignSelf: 'center',
    marginRight: 70,
  },

  /*** Message Box on the Right ***/
  filledFootSenderMessage: {
    backgroundColor: '#B976FF',
    padding: 10,
    borderRadius: 8,
    borderBottomRightRadius: 0,
    maxWidth: '70%',
    flex: 1,
    alignSelf: 'flex-end',
  },

  /*** Message Text ***/
  filledMessageText: {
    color: 'white',
    fontSize: 16,
  },

  /*** Timestamp Below Everything ***/
  filledTimestamp: {
    fontSize: 12,
    color: '#979C9E',
    alignSelf: 'flex-end',
    marginTop: 2,
  },

  /*** RECEIVER MESSAGE WITH OUTLINE FOOT STAMP (LEFT) ***/
  outlineFootReceiverWrapper: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  outlineFootReceiverMessage: {
    backgroundColor: '#303437',
    padding: 10,
    borderRadius: 8,
    borderBottomLeftRadius: 0,
    maxWidth: '70%',
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  outlineFootStamp: {
    marginLeft: 150,
  },

  /*** Input row stays at the bottom ***/
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000',
    padding: 10,
  },

  /*** Icon/Image on the Left ***/
  icon: {
    width: 24, // Adjust size as needed
    height: 24,
    marginRight: 10, // Space between icon and text input
  },

  /*** Text Input ***/
  textInput: {
    flex: 1, // Ensures it expands to take available space
    fontSize: 16,
    paddingVertical: 8,
    backgroundColor: '#202325',
    borderRadius: 10,
    height: 46,
    color: '#fff',
    padding: 15,
    multiline: true, // Allows multiple lines
    textAlignVertical: 'center', // Aligns text properly when multiline
  },
  sendIcon: {
    marginLeft: 8,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#000000',
    padding: 5,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
    backgroundColor: '#202325',
    textAlign: 'center',
    borderRadius: 8,
  },
  tab: {
    padding: 10,
    width: '33.333%',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  activeTab: {
    backgroundColor: '#303437',
    borderRadius: 6,
    margin: 2,
  },
  tabText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '500',
  },
  vaultContainer: {
    marginBottom: 20,
  },
  vaultImage: {
    // width: 100,
    // height: 100,
    margin: 5,
    // resizeMode: "cover",
  },
  vaultInfo: {
    marginTop: 10,
    alignItems: 'center',
  },
  vaultText: {
    fontSize: 14,
    color: 'red',
  },
  cameraRollContainer: {
    marginBottom: 20,
  },
  selectedImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  gifContainer: {
    marginBottom: 20,
  },
  gifText: {
    fontSize: 16,
    color: '#000',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  goBackButton: {
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  goBackText: {
    color: '#fff',
    fontSize: 16,
  },
  disappearingPhotoBox: {
    borderWidth: 2,
    borderColor: '#B976FF',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    alignSelf: 'center', // Centers the box horizontally
  },
  disappearingPhotoText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  sendButton: {
    backgroundColor: '#B976FF', // Filled button color
    paddingVertical: 10,
    marginHorizontal: 30,
    borderRadius: 48,
    marginTop: 10,
  },
  gifSendButton: {
    backgroundColor: '#B976FF', // Filled button color
    paddingVertical: 10,
    marginHorizontal: 30,
    borderRadius: 48,
    marginTop: 1,
  },

  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  poweredbyGif: {
    color: '#979C9E',
    fontSize: 8,
    fontWeight: '500',
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#202325', // Gray background
    borderRadius: 8,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    height: 36,
    marginVertical: 10,
  },

  searchIcon: {
    marginRight: 10, // Space between icon and text input
  },

  searchInput: {
    flex: 1, // Makes input take remaining space
    fontSize: 16,
    color: '#979C9E', // White text color
  },
  scrollContainer: {
    maxHeight: 150,
    //   margin: 20
  },
  gridContainer: {
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  gifImages: {
    width: 75, // Adjust width based on available space
    height: 75, // Keep images square
    margin: 5, // Space between images
    borderRadius: 8,
  },
  selectedImage: {
    borderColor: '#B976FF', // Red border when selected
    borderWidth: 3,
  },
  imageContainer: {
    flexDirection: 'row', // Places items in a row
    alignItems: 'center', // Aligns items vertically
    // justifyContent: "space-between", // Adds space between items
    gap: 10, // Space between items
  },
  cameraRollContainer: {
    padding: 10,
  },
  emptyBox: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  emptyBoxText: {
    fontSize: 24,
    color: '#888',
  },
  capturedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  flagModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flagModalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay color
  },
  flagModalContent: {
    width: '100%',
    backgroundColor: '#202325',
    // padding: 20,
  },
  flagModalButtonRow: {
    flexDirection: 'row',
    //   marginBottom: 1,
    width: '100%',
    height: 50,
  },
  flagModalButton: {
    backgroundColor: '#1C1C1E',
    padding: 10,
    // borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  flagModalButtonText: {
    color: '#E71E1E',
    fontSize: 17,
  },
  flagModalCloseButton: {
    marginTop: 20,
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  flagModalCloseButtonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '900',
  },

  blockUserModalButtonRow: {
    marginTop: 20,
  },
  blockUserModalButton: {
    backgroundColor: '#B976FF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  blockUserModalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  blockUserModalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  blockUserModalContainer: {
    backgroundColor: '#202325',
    padding: 10,
    alignItems: 'center',
    paddingBottom: 40,
  },
  blockUserModalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  blockUserModalText: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  blockUserModalContinueButton: {
    backgroundColor: '#B976FF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  blockUserModalContinueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  blockUserModalHighlight: {
    color: '#B976FF', // Purple color
    fontWeight: 'bold',
  },
});
