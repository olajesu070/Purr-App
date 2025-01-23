import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function VerifyMe() {
  const [verificationCode, setVerificationCode] = useState('');

  const handleVerify = () => {
    // Add verification logic here
    console.log('Verification Code:', verificationCode);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Verify Your Account</Text>
      <Text style={styles.subText}>
        Enter the verification code sent to your registered email or phone.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Verification Code"
        keyboardType="numeric"
        value={verificationCode}
        onChangeText={setVerificationCode}
      />

      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>

      <Text style={styles.resendText}>
        Didn’t receive a code? <Text style={styles.resendLink}>Resend Code</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666666',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 14,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  resendText: {
    fontSize: 14,
    color: '#666666',
    marginTop: 10,
  },
  resendLink: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
});
