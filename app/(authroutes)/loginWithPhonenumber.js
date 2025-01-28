import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import ThemedButton from '../../components/ThemedButton';
import { router } from 'expo-router';
import ThemedInput from '../../components/ThemedInput ';

const LoginWithPhonenumber = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSendOtp = () => {
    console.log('Phone Number:', phoneNumber);
    // Proceed to OTP verification
    router.push({
      pathname: '/otpVerification',
      params: { phoneNumber, option: 'phonenumber' },
    });
  };

  const handleAccountRecovery = () => {
    router.push({
      pathname: '/accountRecovery',
    });
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/startOptions')}>
          <Ionicons name="chevron-back" size={20} color="white" />
        </TouchableOpacity>
      </View>
      <ThemedText style={styles.title}>
        <Text style={styles.welcomeText}>Welcome</Text> Back
      </ThemedText>
      <ThemedText style={styles.subtitle}>
        Complete below to continue
      </ThemedText>

      <ThemedInput
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Phone Number"
        placeholderColor="white"
        required
        errorText="Phone is mandatory!"
        keyboardType="phone-pad"
      />

      <View style={styles.buttonContainer}>
        <ThemedText style={styles.subtext} onPress={handleAccountRecovery}>
          Don’t have access to your{' '}
          <Text style={styles.spanText}>phone number?</Text>{' '}
        </ThemedText>
        <ThemedButton
          title="Send SMS Code"
          onPress={handleSendOtp}
          style={styles.button}
        />
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -20,
  },
  spanText: {
    color: '#B976FF',
    textDecorationLine: 'underline', // This adds the underline
    textDecorationColor: '#B976FF', // This sets the underline color
  },
  changePhoneNumber: {
    color: '#B976FF',
    fontSize: 18,
    fontWeight: '500',
  },
  subtext: {
    fontSize: 16,
    color: 'rgba(151, 156, 158, 1)',
    marginBottom: 10,
    textAlign: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 60,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  welcomeText: {
    color: '#B976FF',
  },
});

export default LoginWithPhonenumber;
