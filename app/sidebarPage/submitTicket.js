import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Modal, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function SubmitTicketPage() {
  const navigation = useNavigation();
  
  // State for the tabs, subject dropdown and success modal
  const [selectedTab, setSelectedTab] = useState('Support');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [description, setDescription] = useState('');
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  // Subject options for the dropdown
  const subjects = [
    'My Profile',
    'Fraud and Safety',
    'App Issues',
    'Purr+',
    'Messaging and Notification',
  ];

  // Handle subject selection from the dropdown
  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setIsModalVisible(false);
  };

  // Handle form submission
  const handleSubmit = () => {
    setTicketSubmitted(true);
  };

  return (
    <View style={styles.container}>
      {ticketSubmitted ? (
        // Ticket Submission Success Page
        <View style={styles.successPage}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Submit a Ticket</Text>
          </View>
          <Text style={styles.successText}>Your ticket has been submitted</Text>
          <Text style={styles.successText}>
            Please allow up to 48 hours for our Purr team to respond and assess your report.
          </Text>
          <TouchableOpacity style={styles.continueButton} onPress={() => navigation.navigate('Index')}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // Main Submit Ticket Page
        <View style={styles.mainPage}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Submit a Ticket</Text>
          </View>

          {/* Tabs: Support and Feedback */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[styles.tab, selectedTab === 'Support' && styles.activeTab]}
              onPress={() => setSelectedTab('Support')}
            >
              <Text style={styles.tabText}>Support</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, selectedTab === 'Feedback' && styles.activeTab]}
              onPress={() => setSelectedTab('Feedback')}
            >
              <Text style={styles.tabText}>Feedback</Text>
            </TouchableOpacity>
          </View>

          {/* Conditionally render Subject dropdown for 'Support' tab */}
          {selectedTab === 'Support' && (
            <>
              <Text style={styles.label}>Subject</Text>
              <TouchableOpacity style={styles.dropdown} onPress={() => setIsModalVisible(true)}>
                <Text style={styles.dropdownText}>
                  {selectedSubject || 'Select Subject'}
                </Text>
              </TouchableOpacity>
            </>
          )}

          {/* Description Textarea */}
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.textArea}
            multiline
            numberOfLines={4}
            value={description}
            onChangeText={setDescription}
            placeholder="Describe the issue..."
            placeholderTextColor="#aaa"
          />

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Bottom Modal for Dropdown */}
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <FlatList
              data={subjects}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => handleSubjectSelect(item)}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    marginVertical: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderColor: '#333',
    alignItems: 'center',
  },
  activeTab: {
    borderBottomColor: '#B976FF',
    backgroundColor:'red'
  },
  tabText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  label: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginVertical: 10,
  },
  dropdown: {
    padding: 12,
    backgroundColor: '#1A1A1A',
    borderRadius: 5,
  },
  dropdownText: {
    color: '#fff',
    fontSize: 16,
  },
  textArea: {
    height: 120,
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    color: '#fff',
    fontSize: 16,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  submitButton: {
    paddingVertical: 15,
    backgroundColor: '#B976FF',
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  successPage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingHorizontal: 20,
  },
  successText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 20,
    textAlign: 'center',
  },
  continueButton: {
    paddingVertical: 15,
    backgroundColor: '#B976FF',
    borderRadius: 5,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContainer: {
    backgroundColor: '#1A1A1A',
    borderRadius: 10,
    width: '80%',
    padding: 20,
  },
  modalItem: {
    paddingVertical: 10,
  },
  modalItemText: {
    color: '#fff',
    fontSize: 16,
  },
  modalCloseButton: {
    paddingVertical: 15,
    backgroundColor: '#B976FF',
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
});
