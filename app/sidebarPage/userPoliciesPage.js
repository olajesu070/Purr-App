import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function UserPoliciesPage() {
  const navigation = useNavigation();

  // List of policy items
  const policies = [
    { id: '1', title: 'Terms of Services' },
    { id: '2', title: 'Community Guidelines' },
    { id: '3', title: 'Privacy Policy' },
    { id: '4', title: 'User End Agreement' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>User Policies</Text>
      </View>

      {/* Policy List */}
      <View style={styles.policyContainer}>
        {policies.map((policy) => (
          <TouchableOpacity key={policy.id} style={styles.policyRow}>
            <Text style={styles.policyText}>{policy.title}</Text>
            <Ionicons name="chevron-forward" size={20} color="#fff" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    marginTop: 70,
  },
  backButton: {
    position: 'absolute',
    left: 0,
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  policyContainer: {
      marginTop: 10,
      gap: 15
  },
  policyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
      paddingVertical: 15,
  },
  policyText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
