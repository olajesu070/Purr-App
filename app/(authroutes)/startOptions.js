import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import ThemedButton from '../../components/ThemedButton';
import { router, useLocalSearchParams } from 'expo-router';

import AppleIcon from '../../assets/images/apples.png';
import GoogleIcon from '../../assets/images/google.png';
import PhoneIcon from '../../assets/images/phone.png';

const StartOptions = ({ navigation }) => {
  const option = useLocalSearchParams().option;
  const isPhoneLogin = option !== 'Sign Up'; // Check if login involves phone

  return (
    <ThemedView style={styles.container}>
      <View style={styles.img_container}>
        <Image
          source={require('@/assets/images/logo-text.png')}
          style={styles.image_logo}
        />
        <Image
          source={require('@/assets/images/slogan.png')}
          style={styles.image_slogan}
        />
      </View>

      <View style={styles.buttonContainer}>
        <ThemedButton
          title={isPhoneLogin ? `${option} with Phone` : `${option}`}
          href={{
            pathname: isPhoneLogin ? '/loginWithPhonenumber' : '/signUp',
            params: { option },
          }}
          icon={isPhoneLogin ? PhoneIcon : undefined} // Show phone icon only for login with phone
          iconType="image"
        />

        {/* Apple Sign-In Button */}
        <ThemedButton
          title={`${option} with Apple`}
          outline
          icon={AppleIcon}
          iconType="image"
        />

        {/* Google Sign-In Button */}
        <ThemedButton
          title={`${option} with Google`}
          outline
          icon={GoogleIcon}
          iconType="image"
        />

        <View style={styles.divider} />

        <ThemedButton
          title="Go Back"
          outline
          theme="secondary"
          onPress={() => {
            router.push('/');
          }}
        />
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img_container: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
  },
  image_logo: {
    width: 150,
    height: 40.68,
  },
  image_slogan: {
    width: 217,
    height: 20,
  },
  buttonContainer: {
    gap: 10,
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 5,
  },
});

export default StartOptions;
