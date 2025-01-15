import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import ThemedButton from '../../components/ThemedButton';

const SponsoredAdsCard = ({ imageSource, url, onClose }) => {
  const [isWebViewVisible, setIsWebViewVisible] = useState(false);

  const openUrlInApp = () => {
    setIsWebViewVisible(true);
  };

  const closeWebView = () => {
    setIsWebViewVisible(false);
    onClose();
  };

  return (
    <View style={styles.modalContainer}>
      {/* Close Button */}
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={styles.closeText}>X</Text>
      </TouchableOpacity>

      {/* WebView Modal */}
      {isWebViewVisible ? (
        <View style={styles.webViewContainer}>
          <WebView
            source={{ uri: url }}
            style={styles.webView}
            startInLoadingState={true}  // Show a loading state while the page is loading
            renderLoading={() => <Text style={styles.loadingText}>Loading...</Text>} // Customize loading text
          />
          <TouchableOpacity onPress={closeWebView} style={styles.closeWebViewButton}>
            <Text style={styles.closeWebviewText}>Close</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // Modal Content
        <View style={styles.modalContent}>
          <Image source={imageSource} style={styles.image} />
          <ThemedButton
            title="Learn More"
            onPress={openUrlInApp}
            style={styles.learnMoreButton}
          />
        </View>
      )}
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
    backgroundColor: '#000', // Semi-transparent background
    justifyContent: 'center',
    // alignItems: 'center',
    zIndex: 1000, // Ensure it's above the header and other content
    marginTop: 30,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  closeText: {
    fontSize: 25,
    fontWeight: '500',
    color: '#fff',
  },
   closeWebviewText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#fff',
  },
  modalContent: {
    width: width, // Full screen width
    height: height, // Full screen height
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 90,
  },
  image: {
    width: '100%',
    height: "80%",
    resizeMode: 'cover',
  },
  learnMoreButton: {
    marginTop: 10,
    padding: 15,
    width: '100%',
    alignItems: 'center',
  },
  webViewContainer: {
    flex: 1,
    width: '100%',
    height: "50%",
    justifyContent: 'center',
    marginTop: 50,
    backgroundColor: '#000',
    marginBottom: 20,
    // paddingHorizontal:10
  },
  webView: {
    width: '100%',
    height: '80%',
    //  backgroundColor: '#000',
    marginBottom: 50,
    // paddingHorizontal:10

  },
  closeWebViewButton: {
    position: 'absolute',
    top: -32,
    right: 10,
    zIndex: 100,
    backgroundColor: '#B976FF',
    padding: 2,
    borderRadius:5
  },
  loadingText: {
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
  },
});
