import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Linking, Dimensions } from 'react-native';

const SponsoredAdsCard = ({ imageSource, url, onClose }) => {
  const openUrl = () => Linking.openURL(url);

  return (
    <View style={styles.modalContainer}>
      {/* Close Button */}
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={styles.closeText}>X</Text>
      </TouchableOpacity>

      {/* Modal Content */}
      <View style={styles.modalContent}>
        {/* Image */}
        <Image source={imageSource} style={styles.image} />

        {/* Learn More Button */}
        <TouchableOpacity onPress={openUrl} style={styles.learnMoreButton}>
          <Text style={styles.learnMoreText}>Learn More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SponsoredAdsCard;

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width, // Full screen width
    height: height, // Full screen height
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  closeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  modalContent: {
    width: '90%', // Content width relative to screen size
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover', // Keep the aspect ratio
    borderRadius: 10,
  },
  learnMoreButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    width: '100%', // Button spans the content width
    alignItems: 'center',
  },
  learnMoreText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
