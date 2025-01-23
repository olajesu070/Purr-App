import React from 'react';
import { StyleSheet, View, Image, Dimensions, StatusBar, Text } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

const MyProfile = () => {
  // Simulated user data
  const userProfile = {
    name: 'John Doe',
    avatar: require('../../assets/images/mainUserProfilePicture.png'), // ✅ Correct require
  };

  return (
    <View style={styles.container}>
      {/* Transparent Status Bar */}
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      {/* Image Header */}
      <View style={styles.imageContainer}>
        <Image source={userProfile.avatar} style={styles.image} />
      </View>
      <View>
        <Text>
          this is a text
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  imageContainer: {
    width: SCREEN_WIDTH,
    height: '60%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export default MyProfile;
