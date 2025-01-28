import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';

const LoginIssueFormSuccess = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 2000); // Redirect after 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Having Trouble</ThemedText>
      <View style={styles.textContainer}>
        <ThemedText style={styles.headerText}>
          Your ticket has been <Text style={styles.spanText}>submitted</Text>
        </ThemedText>
        <ThemedText style={styles.subtext}>
          Please allow up to 24-48 hours for the Purr team to reply.
        </ThemedText>
      </View>
      {/* Chat Bubble */}
      <View style={styles.chatContainer}>
        <View style={styles.chatBubble}>
          <Text style={styles.chatText}>We’re here to help!</Text>
          <View style={styles.bubbleTail} />
        </View>
      </View>

      {/* Bottom-right image */}
      <Image
        source={require('@/assets/images/bottomRightImage.png')} // Replace with your image path
        style={styles.image}
        resizeMode="contain"
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: '700',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  spanText: {
    color: '#B976FF',
    textDecorationLine: 'underline',
    textDecorationColor: '#B976FF',
  },
  headerText: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 5,
    textAlign: 'center',
    fontWeight: '700',
  },
  subtext: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  image: {
    position: 'absolute',
    bottom: -50,
    right: 10,
    width: '50%', // Adjust width as needed
    height: '50%', // Adjust height as needed
  },
  chatContainer: {
    position: 'absolute',
    bottom: 130, // Position it towards the bottom
    left: 20, // Align it to the left side
  },
  chatBubble: {
    backgroundColor: '#303437',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    maxWidth: 250, // Set a max width for readability
    position: 'relative',
    borderBottomRightRadius: 0,
  },
  chatText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  bubbleTail: {
    position: 'absolute',
    bottom: -1, // Moves it slightly below the chat bubble
    right: -7, // Positions it on the bottom right of the chat bubble
    width: 0,
    height: 0,
    // top: 28,
    // left: 10,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderStyle: 'solid',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#303437', // Matches the chat bubble color
    transform: [{ rotate: '227deg' }], // Rotates it to point bottom-right
  },
});

export default LoginIssueFormSuccess;
