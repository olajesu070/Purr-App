import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StatusBadge = ({ status }) => {
  const getStatusStyle = () => {
    switch (status) {
      case 'verification_pending':
        return styles.verificationPending;
      case 'verification_error':
        return styles.verificationError;
      case 'photo_in_review':
        return styles.photoInReview;
      case 'photo_denied':
        return styles.photoDenied;
      default:
        return styles.defaultStatus;
    }
  };

  return (
    <View style={styles.statusBadgeContainer}>
      <View style={[styles.statusBadge, getStatusStyle()]}>
        <Text style={styles.statusText}>{status.replace(/_/g, ' ')}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statusBadgeContainer: {},
  statusBadge: {
    borderRadius: 32, // Rounded corners
    alignSelf: 'flex-end', // Ensures it wraps content
    marginBottom: 11,
    paddingVertical: 5,
    paddingHorizontal: 16,
  },
  statusText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 10,
    textTransform: 'capitalize',
  },
  verificationPending: {
    backgroundColor: '#0A84FF',
  },
  verificationError: {
    backgroundColor: '#E71E1E',
  },
  photoInReview: {
    backgroundColor: '#FA8F21',
  },
  photoDenied: {
    backgroundColor: '#F60000',
  },
  defaultStatus: {
    backgroundColor: 'gray',
  },
});

export default StatusBadge;
