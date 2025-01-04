import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import ThemedButton from '../../components/ThemedButton';
import { router, useLocalSearchParams } from 'expo-router';

const StartOptions = ({ navigation }) => {
    const option = useLocalSearchParams().option;
    return (
        <ThemedView style={styles.container}>
            <View style={styles.img_container}>
                <Image source={require('@/assets/images/logo-text.png')} style={styles.image_logo} />
                <Image source={require('@/assets/images/slogan.png')} style={styles.image_slogan} />
            </View>
            <View style={styles.buttonContainer}>
                <ThemedButton
                    title={option === 'Sign Up' ? `${option}` : `${option} with Phone`}
                    href={{ pathname: option === 'Sign Up' ? '/signUp' : '/loginWithPhonenumber', params: { option } }}
                    // href={{ pathname: '/signUp', params: { option } }}
                />
                <ThemedButton
                    title={`${option} with Apple`}
                    outline
                />
                <ThemedButton
                    title={`${option} with Google`}
                    outline
                />
                <View style={{ height: 1, backgroundColor: '#ccc', marginVertical: 10 }} />
                <ThemedButton
                    title="Go Back"
                    outline
                    theme="secondary"
                    onPress={() =>{
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
        top: 150,
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
        gap: 15,
        position: 'absolute',
        bottom: 50,
        left: 0,
        right: 0,
    }
});

export default StartOptions;