import React, { useState } from 'react';
import Checkbox from 'expo-checkbox';
import {
  View,
  Text,
  CheckBox,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';
import ThemedInput from '../../components/ThemedInput ';
import { ThemedText } from '@/components/ThemedText';
import ThemedButton from '../../components/ThemedButton';
import { router } from 'expo-router';
import CatHeadOtpInput from '../../components/ui/CatHeadOtpInput';

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [promotional, setPromotional] = useState(false);

  const handleOtpComplete = (otp) => {
    console.log('Complete OTP:', otp);
  };

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity
        onPress={() => router.push('/')}
        style={styles.backIcon}
      >
        <Ionicons name="chevron-back" size={24} color="white" />
      </TouchableOpacity>
      <ThemedText style={styles.header}>
        Join <Text style={styles.purr}>Purr</Text>
      </ThemedText>
      <ThemedText style={styles.subtitle}>
        Complete below to continue
      </ThemedText>

      <ThemedInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        required
        errorText="Email is mandatory!"
        theme="primary"
      />
      <ThemedInput
        value={phone}
        onChangeText={setPhone}
        placeholder="Phone Number"
        required
        errorText="Phone is mandatory!"
      />

      <View style={styles.checkboxContainer}>
        <Checkbox
          style={{
            backgroundColor: 'transparent',
          }}
          value={agreeTerms}
          onValueChange={setAgreeTerms}
          color={agreeTerms ? '#B976FF' : '#E71E1E'}
        />
        <ThemedText style={styles.label}>
          By signing up you agree to our{' '}
          <ThemedText type="link">Terms of Service</ThemedText> and{' '}
          <ThemedText type="link">Community Guidelines.</ThemedText>{' '}
        </ThemedText>
      </View>
      <View style={styles.checkboxContainer}>
        <Checkbox
          style={{
            backgroundColor: 'transparent',
          }}
          value={promotional}
          onValueChange={setPromotional}
          color={promotional ? '#B976FF' : 'red'}
        />
        <ThemedText style={styles.label}>
          I agree to receive promotional and marketing messages, notifications,
          and customer service messages from Purr Inc. Message and data rates
          may apply. <ThemedText type="link">See terms</ThemedText>
        </ThemedText>
      </View>
      <View style={styles.buttonContainer}>
        <ThemedText style={styles.note}>
          Please check all required boxes to continue signing up.
        </ThemedText>
        <ThemedButton
          title="Send SMS Code"
          href={{ pathname: '/otpVerification', params: { option: 'Sign Up' } }}
        />
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backIcon: {
    alignSelf: 'flex-start',
    // marginBottom: 16,
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  purr: {
    color: '#B976FF',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 60,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    marginLeft: 8,
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 16,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
  },
  note: {
    marginBottom: 10,
    fontSize: 12,
    color: '#E71E1E',
    textAlign: 'center',
    fontWeight: '400',
  },
});

export default SignUp;
