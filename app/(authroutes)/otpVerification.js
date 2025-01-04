import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CatHeadOtpInput from '../../components/ui/CatHeadOtpInput';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import ThemedButton from '../../components/ThemedButton';
import { router, useLocalSearchParams } from 'expo-router';

const OtpVerification = ({ navigation }) => {
    const option = useLocalSearchParams().option;

    const [otp, setOtp] = useState('');

    const handleOtpComplete = (otp) => {
        console.log("Complete OTP:", otp);
      };

      const gotoHome =()=>{
        router.replace('(tabs)');
      }

    return (
        <ThemedView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() =>  router.push('/signUp')}>
                    <Ionicons name="chevron-back" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('ChangePhoneNumber')}>
                    <ThemedText style={styles.changePhoneNumber}>Change phone number</ThemedText>
                </TouchableOpacity>
            </View>
            <ThemedText style={styles.title}>Enter authentication code</ThemedText>
            <ThemedText style={styles.subtitle}>Enter the 6-digit code that we have sent to  +1 [NUMBER]</ThemedText>
             <View style={{ justifyContent: "center", alignItems: "center" }}>
                <CatHeadOtpInput length={6} onComplete={handleOtpComplete} />
            </View>
            <View  style={styles.button}>
                 <ThemedButton
                    title={`Didn't receive code?`}
                    theme='secondary'
                    onPress={() => {
                        if (option === 'phonenumber') {
                          gotoHome();
                        } else {
                          router.push({ pathname: '/registrationPage', params: { option: 'Sign Up' } });
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
        marginTop:80,
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: 'rgba(151, 156, 158, 1)',
        marginBottom: 40,
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
});

export default OtpVerification;