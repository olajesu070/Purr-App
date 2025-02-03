import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { StatusBar } from 'expo-status-bar';
import HeaderLogo from '../../assets/images/addHeaderLogo.png';
import AddBgImage from '../../assets/images/addBgImage.png';
import EyeSlash from '../../assets/images/eyeSlash.png';
import ThemedButton from '../../components/ThemedButton';

const AddUserPage = () => {
  const features = [
    {
      image: require('../../assets/images/eyeSlash.png'),
      title: 'No Ads',
      subtitle: 'Get rid of annoying 3rd party ads',
    },
    {
      image: require('../../assets/images/userIcon.png'),
      title: '3X Profiles',
      subtitle: 'So many profiles, so many connections',
    },
    {
      image: require('../../assets/images/filter.png'),
      title: 'Purr+ Filters',
      subtitle: 'Get full access to Purr+ Filters',
    },
    {
      image: require('../../assets/images/userIcon.png'),
      title: '2X Profile Pictures',
      subtitle: 'Add up to 4 additional profile pictures',
    },
    {
      image: require('../../assets/images/mapIcon.png'),
      title: 'Full Travel Mode',
      subtitle: 'Unlimited Travel Mode',
    },
    {
      image: require('../../assets/images/openEye.png'),
      title: 'Full Viewed Me',
      subtitle: 'Unlimited Viewed Access',
    },
    {
      image: require('../../assets/images/verifiedIcon.png'),
      title: 'Verify Me',
      subtitle: 'Explore confidently with the blue check',
    },
    {
      image: require('../../assets/images/purrFoot.png'),
      title: 'Full Purred Me',
      subtitle: 'Unlimited Purred Me',
    },
    {
      image: require('../../assets/images/iconCancell.png'),
      title: 'Unlimited Blocks',
      subtitle: 'Who doesn`t love a blocking spree?',
    },
    {
      image: require('../../assets/images/crossedUser.png'),
      title: 'Unlimited Disappearing Photos',
      subtitle: 'Screenshot protected disappearing photos',
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % features.length);
    }, 1500); // Change every 1 second

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#202325" barStyle="light-content" />
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <View style={styles.headerLogoContainer}>
          <Image source={HeaderLogo} style={styles.headerImage} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.trialText}>7-Day Free Trial</Text>
          <TouchableOpacity style={styles.offerButton}>
            <Text style={styles.offerButtonText}>SEE OFFER</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ImageBackground source={AddBgImage} style={styles.backgroundImage}>
        {/* Center Rectangle Box */}
        <View style={styles.featuresBox}>
          <Image source={features[index].image} style={styles.featuresImage} />
          <Text style={styles.boxTitle}>{features[index].title}</Text>
          <Text style={styles.boxSubtitle}>{features[index].subtitle}</Text>
        </View>

        {/* Row with Tiles */}
        <View style={styles.tilesRow}>
          <View style={styles.firstTile}>
            <Text style={styles.numberTileText}>1</Text>
            <Text style={styles.monthTileText}>Month</Text>
            <Text style={styles.priceTileText}>$12.99</Text>
            <Text style={styles.planTileText}>/Month</Text>
          </View>
          <View style={styles.middleTile}>
            <Text style={styles.middleTileText}>MOST POPULAR</Text>
            <View style={styles.middleTileContentContainer}>
              <Text style={styles.middleNumberTileText}>3</Text>
              <Text style={styles.middleMonthTileText}>Months</Text>
              <Text style={styles.middlePriceTileText}>$6.99</Text>
              <Text style={styles.middlePlanTileText}>/Month</Text>
            </View>
          </View>
          <View style={styles.firstTile}>
            <Text style={styles.numberTileText}>12</Text>
            <Text style={styles.monthTileText}>Months</Text>
            <Text style={styles.priceTileText}>$6.99</Text>
            <Text style={styles.planTileText}>/Month</Text>
          </View>
        </View>

        {/* Instruction Row */}
        <View style={styles.instructionRow}>
          <Text style={styles.instructionText}>
            <Text style={styles.redText}>Terms of Service</Text>{' '}
            <Text style={styles.whiteText}>and</Text>{' '}
            <Text style={styles.redText}>Community Guidelines</Text>{' '}
            <Text style={styles.whiteText}>apply</Text>
          </Text>
        </View>

        <View style={styles.instructionDetailsRow}>
          <Text style={styles.instructionTextDetails}>
            If you subscribe to Purr Plus with your Apple or Google account, you
            can only manage your subscription from your device.
          </Text>
        </View>

        {/* Continue Button Row */}

        <ThemedButton title="Continue" style={styles.continueButton} />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202325',
  },
  headerContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    zIndex: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  headerLogoContainer: {
    // backgroundColor: 'red',
  },
  headerImage: {
    // width: 143,
    // height: 30,
  },
  textContainer: {
    // color:'white'
    // gap: 5
    // backgroundColor:'blue'
  },
  trialText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  offerButton: {
    backgroundColor: '#B976FF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#303437',
  },
  offerButtonText: {
    color: '#fff', // Button text color
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 100, // Adjust padding to avoid overlap with header
    paddingHorizontal: 20,
    marginTop: 130,
    marginBottom: -150,
  },
  featuresBox: {
    backgroundColor: '#202325',
    alignItems: 'center',
    padding: 9,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#303437',
    justifyContent: 'center',
    alignContent: 'center',
    marginHorizontal: 30,
    // flexDirection: 'column',
    // marginBottom:20
  },
  boxImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  featuresImage: {
    width: 30,
    height: 30,
    // backgroundColor: 'red',
  },
  boxTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 3,
  },
  boxSubtitle: {
    fontSize: 14,
    color: '#979C9E',
    textAlign: 'center',
  },
  tilesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  firstTile: {
    flex: 1,
    backgroundColor: '#202325',
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#303437',
    padding: 10,
    marginTop: 10,
  },
  thirdTile: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    borderRadius: 10,
  },

  middleTile: {
    flex: 1,
    backgroundColor: '#B976FF',
    // marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#B976FF',
    // marginVertical: -10
    // padding: 15,
    // height: 120, // Tallest tile
  },
  middleTileText: {
    fontWeight: '900',
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 25,
    marginBottom: 5,
  },
  middleTileContentContainer: {
    backgroundColor: '#ffffff',
    width: '100%',
    alignItems: 'center',
    // gap: 5
  },
  numberTileText: {
    fontSize: 50,
    fontWeight: '500',
    color: '#979C9E',
  },
  monthTileText: {
    fontSize: 15,
    fontWeight: '400',
    color: '#979C9E',
  },
  priceTileText: {
    fontSize: 25,
    fontWeight: '800',
    color: '#ffffff',
  },

  planTileText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#979C9E',
  },

  middleNumberTileText: {
    fontSize: 50,
    fontWeight: '500',
    color: '#202325',
  },
  middleMonthTileText: {
    fontSize: 15,
    fontWeight: '400',
    color: '#1D1525',
  },
  middlePriceTileText: {
    fontSize: 25,
    fontWeight: '800',
    color: '#B976FF',
  },

  middlePlanTileText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#000000',
    lineHeight: 20,
  },
  instructionRow: {
    // marginBottom: 20,
    marginTop: 10,
  },
  instructionDetailsRow: {
    // marginBottom: 20,
    // marginTop: 10
  },
  instructionText: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 5,
    fontWeight: '700',
  },
  redText: {
    color: '#FA8F21',
  },
  whiteText: {
    color: 'white',
  },
  instructionTextDetails: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '400',
    color: '#fff',
  },
  buttonRow: {
    alignItems: 'center',
  },
  continueButton: {
    // borderRadius: 10,
    marginTop: 20,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddUserPage;
