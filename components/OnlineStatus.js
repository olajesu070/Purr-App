import React from 'react';
import { View, StyleSheet } from 'react-native';

const OnlineStatus = ({ isOnline }) => {
  return (
    <View
      style={[
        styles.statusIndicator,
        { backgroundColor: isOnline ? '#2CF334' : '#6C7072' },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});

export default OnlineStatus;
