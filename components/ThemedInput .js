import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

export default function ThemedInput({
  value,
  onChangeText,
  placeholder,
  required = false,
  theme = 'primary',
  style,
  validateOnBlur = true,
  errorText = 'This field is required.',
  placeholderColor = '#303437', // 🎨 Dynamic placeholder color
  keyboardType = 'default', // ⌨️ Default keyboard type
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const handleBlur = () => {
    setIsFocused(false);
    if (required && validateOnBlur) {
      setIsValid(!!value?.trim());
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const borderColor = isFocused
    ? styles[`borderFocus_${theme}`].borderColor
    : !isValid
    ? styles[`borderError_${theme}`].borderColor
    : styles[`borderNormal_${theme}`].borderColor;

  return (
    <View style={[styles.container, style]}>
      <TextInput
        value={value}
        onChangeText={(text) => {
          setIsValid(true);
          onChangeText(text);
        }}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor} // 🔥 Dynamic placeholder color
        onFocus={handleFocus}
        onBlur={handleBlur}
        keyboardType={keyboardType} // ⌨️ Dynamic keyboard type
        style={[styles.input, { borderColor }]}
      />
      {!isValid && <Text style={styles.errorText}>{errorText}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: 'white',
  },
  errorText: {
    color: '#ff4d4f',
    marginTop: 4,
    fontSize: 12,
  },
  borderNormal_primary: {
    borderColor: '#303437',
  },
  borderFocus_primary: {
    borderColor: '#303437',
  },
  borderError_primary: {
    borderColor: '#ff4d4f',
  },
});
