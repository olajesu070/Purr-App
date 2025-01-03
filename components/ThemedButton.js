import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Define reusable ThemedButton component
export default function ThemedButton({ 
  title, 
  onPress, 
  outline = false, 
  theme = 'primary', 
  style,
  href,
  icon
}) {
   // Button content
   const ButtonContent = (
    <View style={styles.content}>
      {icon && <Ionicons {...icon} style={styles.icon} />}
      <ThemedText
        style={[
          styles.text,
          outline ? styles[`textOutline_${theme}`] : styles[`text_${theme}`],
        ]}
      >
        {title}
      </ThemedText>
    </View>
  );

   // Return the appropriate button based on href or onPress
   if (href) {
    return (
      <Link href={href} asChild style={[
        styles.button,
        outline ? styles[`buttonOutline_${theme}`] : styles[`button_${theme}`],
        style,
      ]}>
        <TouchableOpacity
          activeOpacity={0.8}
        >
          {ButtonContent}
        </TouchableOpacity>
      </Link>
    );
  }

  return (
    <TouchableOpacity
      style={[
        styles.button,
        outline ? styles[`buttonOutline_${theme}`] : styles[`button_${theme}`],
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {ButtonContent}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
  },

  // Primary button styles
  button_primary: {
    backgroundColor: '#B976FF', // Change to your primary color
  },
  buttonOutline_primary: {
    borderWidth: 1,
    borderColor: '#ffffff',
    backgroundColor: 'transparent',
  },

  // Secondary button styles
  button_secondary: {
    backgroundColor: '#303437', // Change to your secondary color
  },
  buttonOutline_secondary: {
    borderWidth: 1,
    borderColor: '#E71E1E',
    backgroundColor: 'transparent',
  },

  // Button text styles
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
  text_primary: {
    color: '#ffffff', // Text color for filled primary buttons
  },
  textOutline_primary: {
    color: '#ffffff', // Text color for outlined primary buttons
  },
  text_secondary: {
    color: '#ffffff', // Text color for filled secondary buttons
  },
  textOutline_secondary: {
    color: '#ffffff', // Text color for outlined secondary buttons
  },
  icon: {
    marginRight: 8, // Spacing between the icon and the text
  },
});
