import React, { useState, 
  useEffect } from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  ScrollView,
  ImageBackground,
  Modal,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Filter from '../../assets/images/headerFilter.png';
import Logo from '../../assets/images/headerLogo.png';
import Avatar from '../../assets/images/headerAvatar.png';
import * as Progress from 'react-native-progress';
import ThemedButton from '../../components/ThemedButton';



export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState('Feed'); // Manage active tab state
  const [modalVisible, setModalVisible] = useState(true); // First modal visibility
  const [adModalVisible, setAdModalVisible] = useState(false); // Second modal visibility
  const [progress, setProgress] = useState(0);
  const [blurred, setBlurred] = useState(true);
  const [adCompleted, setAdCompleted] = useState(false); // Track ad completion


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

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#202325" barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.filterButton}>
          <Image source={Filter} style={styles.filterIcon} />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Image source={Logo} style={styles.logo} />
          <Text style={styles.logoText}>Purr</Text>
        </View>
        <TouchableOpacity>
          <Image source={Avatar} style={styles.avatar} />
        </TouchableOpacity>
      </View>

      {/* Tab Menu */}
      <View style={styles.tabMenu}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Feed' && styles.activeTab]}
          onPress={() => setActiveTab('Feed')}
        >
          <Text style={[styles.tabText, activeTab === 'Feed' && styles.activeTabText]}>
            Feed
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Purred Me' && styles.activeTab]}
          onPress={() => setActiveTab('Purred Me')}
        >
          <Text style={[styles.tabText, activeTab === 'Purred Me' && styles.activeTabText]}>
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
          <Text style={[styles.tabText, activeTab === 'Viewed Me' && styles.activeTabText]}>
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
          <ScrollView contentContainerStyle={styles.grid}>
        {data.map((item) => (
          <View key={item.id} style={styles.box}>
            {/* Image as Background */}
            <ImageBackground
              source={item.image}
              style={styles.imageBackground}
              imageStyle={styles.imageBackgroundStyle}
            >
              {/* Top Left Badge */}
              <View style={styles.badgeTopLeft}>
                <Text style={styles.badgeText}>New</Text>
              </View>

              {/* Top Right Counter Badge */}
              <View style={styles.badgeTopRight}>
                <Text style={styles.counterText}>{item.id}</Text>
              </View>

              {/* Bottom Text and Dot */}
              <View style={styles.bottomContainer}>
                <View style={styles.bottomDot} />
                <Text style={styles.bottomText}>Olajesu Benjamin</Text>
                <View style={styles.blueTick} />
              </View>
            </ImageBackground>
          </View>
        ))}
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
              <TouchableOpacity style={styles.modalButton} onPress={openAdModal}>
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
            Alert.alert("Notice", "You cannot close until the ads finishes.");
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
          setAdCompleted(true);     // Mark the ad as completed
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
                <TouchableOpacity style={styles.modalButton} onPress={openAdModal}>
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
              Alert.alert("Notice", "You cannot close until the ads finishes.");
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
            setAdCompleted(true);     // Mark the ad as completed
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
    borderWidth:5
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
  // borderTopLeftRadius: 10,
  // borderTopRightRadius: 10,
  alignItems: 'center',
  borderTopColor:'#B976FF',
  borderTopWidth:5
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
    width:'100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    color:'#fff'
  },
  modalButton: {
    backgroundColor: '#B976FF',
    padding: 10,
    borderRadius: 48,
    width:'90%',
    marginBottom:10
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize:16,
    fontWeight: "500"
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
    width:'80%'
  },
  disabledButton: {
    backgroundColor: "#d3d3d3", // Gray color for disabled state
  },
  
});
