import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CatHeadOtpInput from '../../components/ui/CatHeadOtpInput';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import ThemedButton from '../../components/ThemedButton';
import { router, useLocalSearchParams } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

const OtpVerification = () => {
  const option = useLocalSearchParams().option;
  const [seconds, setSeconds] = useState(30);
  const navigation = useNavigation();

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer); // Cleanup
    }
  }, [seconds]);
  const formattedTime = `00:${String(seconds).padStart(2, '0')}`;

  const [otp, setOtp] = useState('');

  const handleOtpComplete = (otp) => {
    console.log('Complete OTP:', otp);
  };

  const gotoHome = () => {
    router.replace('(tabs)');
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/signUp')}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          // onPress={() => {
          //   router.push('/ChangePhoneNumber');
          // }}
          // onPress={() => navigation.navigate('/loginWithPhonenumber')}
          onPress={() => navigation.goBack()}
        >
          <ThemedText style={styles.changePhoneNumber}>
            Change phone number
          </ThemedText>
        </TouchableOpacity>
      </View>
      <ThemedText style={styles.title}>Enter authentication code</ThemedText>
      <ThemedText style={styles.subtitle}>
        Enter the 6-digit code that we have sent to +1 [NUMBER]
      </ThemedText>
      <View style={{ flex: 1 }}>
        <View style={styles.catHeadContainer}>
          <CatHeadOtpInput
            length={6}
            onComplete={handleOtpComplete}
            style={{ flex: 1 }}
          />
        </View>
      </View>

      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>
          <Text style={styles.timerText}>{formattedTime}</Text>
        </Text>
      </View>

      <View style={styles.button}>
        <ThemedButton
          title={`Didn't receive code?`}
          theme="secondary"
          onPress={() => {
            if (option === 'phonenumber') {
              gotoHome();
            } else {
              router.push({
                pathname: '/registrationPage',
                params: { option: 'Sign Up' },
              });
            }
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  changePhoneNumber: {
    color: '#B976FF',
    fontSize: 18,
    fontWeight: '500',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 70,
    // marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(151, 156, 158, 1)',
    marginBottom: 10,
    alignSelf: 'center',
    maxWidth: 300,
    textAlign: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
  },
  buttonText: {
    color: '#007BFF',
    fontSize: 16,
  },
  timerContainer: {
    position: 'absolute', // Position it absolutely
    bottom: 105, // 20px from the bottom
    left: 0,
    right: 0,
    justifyContent: 'center', // Center vertically (not needed since it's at the bottom)
    alignItems: 'center', // Center horizontally
  },

  timerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'purple', // Timer in purple color
  },
  catHeadContainer: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OtpVerification;
