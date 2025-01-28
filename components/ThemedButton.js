import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ThemedButton({
  title,
  onPress,
  outline = false,
  theme = 'primary',
  style,
  href,
  icon, // Supports both Ionicons & image icons
  iconType = 'vector', // Either 'vector' (Ionicons) or 'image' (local images)
}) {
  // Button content with icon and text side by side
  const ButtonContent = (
    <View style={styles.content}>
      {icon &&
        (iconType === 'vector' ? (
          <Ionicons {...icon} style={styles.icon} />
        ) : (
          <Image source={icon} style={styles.imageIcon} />
        ))}

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

  // If the button has a `href`, use `Link` from expo-router
  if (href) {
    return (
      <Link
        href={href}
        asChild
        style={[
          styles.button,
          outline
            ? styles[`buttonOutline_${theme}`]
            : styles[`button_${theme}`],
          style,
        ]}
      >
        <TouchableOpacity activeOpacity={0.8}>{ButtonContent}</TouchableOpacity>
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
    flexDirection: 'row', // Ensure icon and text stay side by side
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 48,
    height: 48,
  },

  // Primary button styles
  button_primary: {
    backgroundColor: '#B976FF',
  },
  buttonOutline_primary: {
    borderWidth: 1,
    borderColor: '#ffffff',
    backgroundColor: 'transparent',
  },

  // Secondary button styles
  button_secondary: {
    backgroundColor: '#303437',
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
    color: '#ffffff',
  },
  textOutline_primary: {
    color: '#ffffff',
  },
  text_secondary: {
    color: '#ffffff',
  },
  textOutline_secondary: {
    color: '#ffffff',
  },

  // Icon styles
  icon: {
    marginRight: 10, // Space between Ionicon and text
  },
  imageIcon: {
    width: 15, // Adjust size as needed
    height: 15,
    marginRight: 5, // Space between image and text
    resizeMode: 'contain',
  },
  content: {
    flexDirection: 'row', // Align items horizontally
    alignItems: 'center', // Center align icon and text
  },
});
