import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const VerifiedBadge = () => {
  return (
    <View style={styles.badge}>
      <Ionicons name="checkmark" size={9} color="white" />
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    width: 15,
    height: 15,
    borderRadius: 90, // Makes it a perfect circle
    backgroundColor: '#0A84FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default VerifiedBadge;
