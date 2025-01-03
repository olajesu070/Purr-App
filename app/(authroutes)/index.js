import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemedView } from '@/components/ThemedView';
import ThemedButton from '../../components/ThemedButton';

const WelcomeScreen = () => {
    const navigation = useNavigation();

    return (
        <ThemedView style={styles.container}>
            <View style={styles.img_container}>
                <Image source={require('@/assets/images/logo-text.png')} style={styles.image_logo} />
                <Image source={require('@/assets/images/slogan.png')} style={styles.image_slogan} />
            </View>
            <View style={styles.buttonContainer}>
                <ThemedButton
                    title="Sign Up"
                    href={{ pathname: '/startOptions', params: { option: 'Sign Up' } }}
                />
                <ThemedButton
                    title="Login"
                    outline
                    href={{ pathname: '/startOptions', params: { option: 'Login In' } }}
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

export default WelcomeScreen;