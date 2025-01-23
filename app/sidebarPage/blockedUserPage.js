import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const initialBlockedUsers = [
  { id: '1', name: 'John Doe', image: require('../../assets/images/blockedUserImage.png') },
  { id: '2', name: 'Jane Smith', image: require('../../assets/images/blockedUserImage.png') },
  { id: '3', name: 'Alice Brown', image: require('../../assets/images/blockedUserImage.png') },
  { id: '4', name: 'Michael Johnson', image: require('../../assets/images/blockedUserImage.png') },
  { id: '5', name: 'Emily Davis', image: require('../../assets/images/blockedUserImage.png') },
  { id: '6', name: 'David Wilson', image: require('../../assets/images/blockedUserImage.png') },
  { id: '7', name: 'Sophia Martinez', image: require('../../assets/images/blockedUserImage.png') },
  { id: '8', name: 'Daniel Anderson', image: require('../../assets/images/blockedUserImage.png') },
  { id: '9', name: 'Olivia Thomas', image: require('../../assets/images/blockedUserImage.png') },
  { id: '10', name: 'Matthew White', image: require('../../assets/images/blockedUserImage.png') },
  { id: '11', name: 'Ava Harris', image: require('../../assets/images/blockedUserImage.png') },
  { id: '12', name: 'James Clark', image: require('../../assets/images/blockedUserImage.png') },
  { id: '13', name: 'Charlotte Lewis', image: require('../../assets/images/blockedUserImage.png') },
  { id: '14', name: 'Benjamin Walker', image: require('../../assets/images/blockedUserImage.png') },
  { id: '15', name: 'Mia Hall', image: require('../../assets/images/blockedUserImage.png') },
  { id: '16', name: 'Ethan Young', image: require('../../assets/images/blockedUserImage.png') },
  { id: '17', name: 'Harper Allen', image: require('../../assets/images/blockedUserImage.png') },
  { id: '18', name: 'Alexander King', image: require('../../assets/images/blockedUserImage.png') },
  { id: '19', name: 'Amelia Scott', image: require('../../assets/images/blockedUserImage.png') },
  { id: '20', name: 'William Green', image: require('../../assets/images/blockedUserImage.png') },
  { id: '21', name: 'Ella Adams', image: require('../../assets/images/blockedUserImage.png') },
  { id: '22', name: 'Logan Baker', image: require('../../assets/images/blockedUserImage.png') },
  { id: '23', name: 'Isabella Nelson', image: require('../../assets/images/blockedUserImage.png') },
  { id: '24', name: 'Henry Carter', image: require('../../assets/images/blockedUserImage.png') },
  { id: '25', name: 'Grace Mitchell', image: require('../../assets/images/blockedUserImage.png') },
];


export default function BlockedUserPage() {
  const [blockedUsers, setBlockedUsers] = useState(initialBlockedUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  // Open modal when attempting to unblock a user
  const openUnblockModal = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  // Unblock user and close modal
  const handleUnblock = () => {
    setBlockedUsers(blockedUsers.filter(user => user.id !== selectedUser.id));
    setModalVisible(false);
  };

  // Render each blocked user row
  const renderUser = ({ item }) => (
    <View style={styles.userRow}>
      <View style={styles.userInfo}>
        <Image source={item.image} style={styles.userImage} />
        <Text style={styles.userName}>{item.name}</Text>
      </View>
      <TouchableOpacity onPress={() => openUnblockModal(item)}>
        <Text style={styles.unblockText}>Unblock</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Blocked Users</Text>
      </View>

      {/* Blocked Users List */}
      <FlatList 
        data={blockedUsers}
        renderItem={renderUser}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      {/* Bottom Modal */}
      <Modal 
        visible={modalVisible} 
        transparent={true} 
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Unblock {selectedUser?.name}?
            </Text>
            <TouchableOpacity style={styles.neverMindButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.neverMindButtonText}>Never Mind</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.unblockButton} onPress={handleUnblock}>
              <Text style={styles.unblockButtonText}>Unblock</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 10,
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
  listContainer: {
    paddingBottom: 20,
    gap: 25,
  },
  userRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  userName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  unblockText: {
    color: '#B976FF',
    fontSize: 12,
    fontWeight: '500',
  },

  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    backgroundColor: '#202325',
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  unblockButton: {
    width: '100%',
    backgroundColor: '#B976FF',
    paddingVertical: 12,
    borderRadius: 48,
    alignItems: 'center',
    marginBottom: 10,
  },
  unblockButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  neverMindButton: {
    width: '100%',
    backgroundColor: 'transparent',
    paddingVertical: 12,
    borderRadius: 48,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#6C7072',
    marginBottom: 10,
    
  },
  neverMindButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

