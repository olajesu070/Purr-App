import React , { useState, useEffect }from 'react';
import { View, Text, StyleSheet,Image, TouchableOpacity,Modal,Animated, Switch, } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { StatusBar } from 'expo-status-bar';
import MapLogo from '../../assets/images/mapLogo.png';
import MapMarker from '../../assets/images/mapMarker.png';
import MapImage from '../../assets/images/mapImage.png';
import PurrTextLogo from '../../assets/images/purTextLogo.png';
import { useNavigation, useIsFocused } from '@react-navigation/native'; // Import the navigation hook
import ThemedButton from '../../components/ThemedButton';


const Map = () => {
    const [isCatheadModalVisible, setCatheadModalVisible] = useState(false);
    const [isQuestionMarkModalVisible, setQuestionMarkModalVisible] = useState(false);
    const [isToggleOn, setToggleOn] = useState(false);
    const navigation = useNavigation();
    const toggleCatheadModal = () => setCatheadModalVisible(!isCatheadModalVisible);
    const isFocused = useIsFocused();
    const [catNapMode, setCatNapMode] = useState(true);
    const [isBlurred, setIsBlurred] = useState(false);
    const [isOverlayVisible, setOverlayVisible] = useState(false); // Tracks overlay visibility
  const [isTravelModeModalVisible, setTravelModeModalVisible] = useState(false);


  const toggleTravelModeModal = () => {
    setTravelModeModalVisible(!isTravelModeModalVisible);
  };


  const handleUpgrade = () => {
    setQuestionMarkModalVisible(!isQuestionMarkModalVisible);
    navigation.navigate('add');
  };


    
    const handleCatNapToggle = () => {
    setCatNapMode((prevState) => !prevState); // Toggle between true and false
    };
    
  const toggleQuestionMarkModal = () =>
    setQuestionMarkModalVisible((prev) => !prev);
  

  const handleToggleChange = () => setToggleOn((prev) => !prev);

    const handleNavigate = () => {
    navigation.navigate('add');
    };

    
     useEffect(() => {
        if (isFocused) {
      // Reset modal visibility when the screen is focused again
      setCatheadModalVisible(false); // Optionally set this if you want to hide modal on focus
      setQuestionMarkModalVisible(false); // Optionally set this if you want to hide modal on focus
    }
    }, [isFocused]); // Only runs when screen is focused or refocused

     const handleApply = () => {
    if (catNapMode) {
        setOverlayVisible(true); // Show overlay only if Cat Nap Mode is ON
        setCatheadModalVisible(false);
         } else
    {
        setCatheadModalVisible(false);
        }
  };

  const handleCloseOverlay = () => {
    setOverlayVisible(false); // Close overlay
  };

    
  return (
      <View style={styles.container}>
      <StatusBar backgroundColor="#202325" barStyle="light-content" />
          {isOverlayVisible && (
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>Travel Mode is not active. Users cannot find your profile if they search in your area.</Text>
                      <View style={styles.overlayButtonContainer}>
                        <ThemedButton
                        title="Turn off Cat Nap Mode"
                        style={styles.overlayButton}
                        onPress={handleCloseOverlay}
                        />
                    </View>
        </View>
      )}
      <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Travel</Text>
                  <View style={styles.headerRight}>
                       <TouchableOpacity onPress={toggleCatheadModal}>
                            <Image
                                source={MapLogo} 
                                style={styles.logo}
                            />
                      </TouchableOpacity>
                      
                {/* Question Mark Button */}
                    <TouchableOpacity onPress={toggleQuestionMarkModal}>
                    <View style={styles.questionMarkContainer}>
                            <Text style={styles.questionMark}>?</Text>
                        </View>
                    </TouchableOpacity>

                      

        {/* Cathead Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isCatheadModalVisible}
        onRequestClose={toggleCatheadModal}
      >
        <View style={styles.catheadModalContainer}>
                              <View style={styles.catheadModalContent}>
                                  <View style={styles.titleAndToggle}>
                                       <Text style={styles.catheadModalHeader}>Cat Nap Mode</Text>
                                      <TouchableOpacity
                                            style={[
                                                styles.catheadToggleButton,
                                                catNapMode ? styles.catheadToggleOn : styles.catheadToggleOff,
                                            ]}
                                          // onPress={handleCatNapToggle}
                                                  onPress={() => setCatNapMode(!catNapMode)}

                                            >
                                            <Animated.View
                                                style={[
                                                styles.catheadToggleCircle,
                                                catNapMode ? styles.catheadToggleCircleOn : styles.catheadToggleCircleOff,
                                                ]}
                                            />
                                        </TouchableOpacity>      

                                  </View>
            <Text style={styles.catheadModalInstruction}>Toggle Cat Nap Mode to turn on and off Travel Mode.
                                      {'\n'}
                                      {'\n'}
                                      <Text  style={styles.noteText}>
                                       Note:&nbsp;  
                                      </Text>
                                      If you turn on Cat Nap Mode your profile is NOT visible for other users in a search and you cannot use Travel Mode.</Text>
                  <ThemedButton
                        title="Apply"
                                      // onPress={toggleCatheadModal}
                                      onPress={handleApply}
                        style={[
                        styles.catheadModalButton,
                        { backgroundColor: catNapMode ? '#B976FF' : '#CCC' },
                        ]}
                    />
          </View>
        </View>
      </Modal>

      {/* Travel mode  Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isQuestionMarkModalVisible}
          onRequestClose={toggleQuestionMarkModal}
        >
        <View style={styles.travelModeOverlay}>
          <View style={styles.travelModeBottomContainer}>
            {/* Title */}
            <Text style={styles.travelModeHeader}>What is Travel Mode?</Text>

                  {/* Row with image on the left edge */}
                  

            <View style={styles.travelModeRow}>
             <Image
                source={MapMarker}
                style={styles.travelModeInlineImage}
              />
            </View>

            <View style={styles.travelModeRow}>
              <Text style={styles.travelModeRowText}>
               Use travel mode to go beyond your local area and chat with other queer people in different communities.
               
              </Text>
            </View>

            {/* Another row with image and text */}
            <View style={styles.purrLogoAndText}>
              <Image
                source={PurrTextLogo}
                style={styles.purrTextLogoWithText}
              />
              <Text style={styles.purrLogoText}>
                users receive <Text style={styles.unlimitedText}>unlimited</Text> searches without ads!
              </Text>
            </View>

            {/* Image on the right edge */}
            <View style={styles.travelModeRowRight}>
              <Image
                source={MapMarker}
                style={styles.travelModeRightImage}
              />
            </View>

                  {/* Upgrade Button */}
            <ThemedButton
                title="Upgrade"
                style={styles.travelModeUpgradeButton}
                onPress={handleUpgrade}
            />
          </View>
        </View>
    </Modal>


         
          
        </View>
      </View>

      {/* Map Display Section */}
      <View style={styles.mapContainer}>
                      <Image
                          source={MapImage}
                          resizeMode="cover"
                        />
        {/* Bottom Rectangle */}
        <View style={styles.bottomRectangle}>
          <Text style={styles.searchText}>Search</Text>
          <Text style={styles.availableText}>3/3 available</Text>
        </View>
      </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor:'#202325'
  },
 header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
     alignItems: 'center',
     paddingHorizontal: 16,
     paddingVertical: 10,
    
  },
  headerText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 24,
    height: 28,
    marginRight: 10,
  },
  questionMarkContainer: {
    width: 25,
    height: 25,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 1,
  },
  questionMark: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  mapContainer: {
    flex: 1,
      
  },
  mapPlaceholder: {
    // color: '#888',
      // fontSize: 16,
  },
  bottomRectangle: {
    position: 'absolute',
    bottom: 10,
    width: '60%',
    alignSelf: 'center',
    backgroundColor: '#202325',
    borderRadius: 48,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  searchText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    color: '#fff',
  },
  availableText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    color: '#fff',
    marginTop: 4,
    },
  
  catheadToggleButton: {
  width: 51,
  height: 27,
  borderRadius: 42,
  justifyContent: 'center',
  marginBottom: 15
    },
    catheadToggleOn: { 
    backgroundColor: '#B976FF', // Green when ON
    },
    catheadToggleOff: {
    backgroundColor: '#6C7072', // Gray when OFF
    },
    catheadToggleCircle: {
    width: 28,
    height: 28,
    borderRadius: 50,
    backgroundColor: '#ffffff',
    },
    catheadToggleCircleOn: {
    alignSelf: 'flex-end', // Positioned to the right
    },
    catheadToggleCircleOff: {
    alignSelf: 'flex-start', // Positioned to the left
    },

  
  // Cathead Modal Styles
  catheadModalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  
    titleAndToggle: {
    flexDirection: 'row', // Align items in a row
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Center vertically
    },
    
  catheadModalContent: {
    backgroundColor: '#202325',
    padding: 10,
  },
  catheadModalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
    marginRight: 40,
    },
    
  catheadModalInstruction: {
      fontSize: 16,
      fontWeight: '400',
      color: '#fff',
      textAlign: 'center',
      paddingHorizontal: 10,
      marginBottom: 20
    },
  noteText: {
    color: 'red',  // Red color for the note
    fontWeight: '900',  // Font weight 800 for bold
  },
  catheadModalNote: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
  },
  catheadModalButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  catheadModalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    },
   overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
       backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:10000
  },
  overlayText: {
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 20,
    fontWeight: '700',
    textAlign: 'center',
    padding:30
  },
  
  overlayButtonContainer: {
    position: 'absolute',
    bottom: 20, // Adjust this value to control the vertical placement of the button
    left: 0,
    right: 0,
      alignItems: 'center',
  },
  overlayButton: {
    paddingVertical: 10,
      paddingHorizontal: 20,
    width:'70%'
  },

  // Question Mark Modal Styles
 travelModeOverlay: {
    flex: 1,
    justifyContent: "flex-end", // Align the modal at the bottom
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  travelModeBottomContainer: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  travelModeHeader: {
    fontSize: 25,
    fontWeight: "900",
    color: '#B976FF',
    textAlign:'center'
  },
  purrLogoAndText: {
    flexDirection: "row", 
    alignItems: "center", 
    paddingHorizontal: 10,
  },
  travelModeRow: {
    flexDirection: "row",
    alignItems: "center",
    // marginVertical: 10,
  },
  travelModeLeftImage: {
    width: 40,
    height: 40,
    // marginRight: 10,
  },
  travelModeRowText: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom:10
  },
  purrLogoText: {
     flex: 1,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
    marginTop:15
  },
  unlimitedText: {
    color: "#B976FF",
    fontWeight: "900", 
    fontSize: 16
  },
  travelModeInstruction: {
    fontSize: 14,
    color: "#666",
    marginVertical: 10,
  },
  travelModeInlineImage: {
    width: 40,
    height: 40,
    marginRight: 10,
    transform: [{ rotate: "-30deg" }]
 
  },
   purrTextLogoWithText: {
    width: 72,
    height: 16,
    // marginRight: 10,
  },

  
  travelModeRowRight: {
    alignItems: "flex-end",
    marginVertical: 10,
  },
  travelModeRightImage: {
    width: 40,
    height: 40,
     transform: [{ rotate: "30deg" }]
  },
  travelModeUpgradeButton: {
    // backgroundColor: "#B976FF",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  travelModeUpgradeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },

});

export default Map;
