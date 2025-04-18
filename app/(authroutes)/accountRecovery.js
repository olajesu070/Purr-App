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

const AccountRecovery = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleSendRecoveryEmail = () => {
    console.log('email address:', email);
    // Proceed to OTP verification
    router.push({
      pathname: '/',
      params: { email },
    });
  };

  const handleIssueFormPage = () => {
    router.push({
      pathname: '/loginIssueForm',
    });
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/')}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <ThemedText style={styles.title}>
        Having&nbsp;
        <Text style={styles.welcomeText}>Trouble?</Text>
      </ThemedText>
      <ThemedText style={styles.subtitle}>
        Complete below to continue
      </ThemedText>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#AAB3BB"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <ThemedText style={styles.subtext} onPress={handleIssueFormPage}>
        Still having troubles? <Text style={styles.spanText}>Click Here</Text>{' '}
      </ThemedText>
      <ThemedButton
        title="Send Email Code"
        onPress={handleSendRecoveryEmail}
        style={styles.button}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    marginBottom: 40,
    alignSelf: 'center',
    maxWidth: 300,
    textAlign: 'center',
    position: 'absolute',
    bottom: 40, // Distance from the bottom
    left: 16,
    right: 16,
    alignSelf: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: '800',
    // marginBottom: 10,
    marginLeft: 10,
  },
  subtitle: {
    fontSize: 20,
    color: '#FFFFFF',
    marginLeft: 10,
  },
  input: {
    borderColor: '#303437',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
    color: '#ffffff',
    marginTop: 50,
    height: 48,
  },
  button: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    alignSelf: 'center',
  },
  welcomeText: {
    color: '#B976FF',
  },
});

export default AccountRecovery;
