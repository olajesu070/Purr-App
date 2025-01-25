import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';

export default function SubmitTicketPage() {
  const navigation = useNavigation();

  // State for the tabs, subject dropdown and success modal
  const [selectedTab, setSelectedTab] = useState('Support');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [description, setDescription] = useState('');
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const router = useRouter();

  const handleSubjectSelect = (item) => {
    if (selectedSubjects.includes(item)) {
      // Remove from selection
      setSelectedSubjects(
        selectedSubjects.filter((subject) => subject !== item)
      );
    } else {
      // Add to selection
      setSelectedSubjects([...selectedSubjects, item]);
    }
  };

  // Subject options for the dropdown
  const subjects = [
    'My Profile',
    'Fraud and Safety',
    'App Issues',
    'Purr+',
    'Messaging and Notification',
  ];

  // Handle subject selection from the dropdown
  // const handleSubjectSelect = (subject) => {
  //   setSelectedSubject(subject);
  //   setIsModalVisible(false);
  // };

  // Handle form submission
  const handleSubmit = () => {
    setTicketSubmitted(true);
  };

  return (
    <View style={styles.container}>
      {ticketSubmitted ? (
        // Ticket Submission Success Page
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerText}>Submit A Ticket</Text>
          </View>

          {/* Success Message */}
          <View style={styles.centerContent}>
            <Text style={styles.successText}>
              Your ticket has been{' '}
              <Text style={styles.purpleText}>submitted</Text>
            </Text>

            <Text style={styles.infoText}>
              Please allow up to 48 hours for our Purr Team to respond and
              assess your report.
            </Text>
          </View>

          {/* Button at Bottom */}
          <TouchableOpacity
            style={styles.continueButton}
            // onPress={() => navigation.navigate('add')}
            onPress={() => {
              router.push('/chat');
            }}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // Main Submit Ticket Page
        <View style={styles.mainPage}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Submit A Ticket</Text>
          </View>

          {/* Tabs: Support and Feedback */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[
                styles.tab,
                selectedTab === 'Support' && styles.activeTab,
              ]}
              onPress={() => setSelectedTab('Support')}
            >
              <Text style={styles.tabText}>Support</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                selectedTab === 'Feedback' && styles.activeTab,
              ]}
              onPress={() => setSelectedTab('Feedback')}
            >
              <Text style={styles.tabText}>Feedback</Text>
            </TouchableOpacity>
          </View>

          {/* Conditionally render Subject dropdown for 'Support' tab */}
          {selectedTab === 'Support' && (
            <>
              <Text style={styles.label}>Subject</Text>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setIsModalVisible(true)}
              >
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
            <View style={styles.tagsContainer}>
              {subjects.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.tag,
                    selectedSubjects.includes(item) && styles.selectedTag,
                  ]}
                  onPress={() => handleSubjectSelect(item)}
                >
                  <Text
                    style={[
                      styles.tagText,
                      selectedSubjects.includes(item) && styles.selectedTagText,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.buttonText}>Apply</Text>
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
    justifyContent: 'space-between',
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
    width: '100%',
    alignSelf: 'center',
    marginVertical: 10,
    backgroundColor: '#202325',
    borderRadius: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#303437',
    borderRadius: 8,
    color: 'red',
  },
  tabText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
  },
  label: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginVertical: 10,
  },
  dropdown: {
    padding: 12,
    backgroundColor: '#202325',
    borderRadius: 5,
  },
  dropdownText: {
    color: '#fff',
    fontSize: 16,
  },
  textArea: {
    height: 320,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    color: '#fff',
    fontSize: 16,
    textAlignVertical: 'top',
    marginBottom: 20,
    backgroundColor: '#202325',
    marginTop: '10 ',
  },
  submitButton: {
    paddingVertical: 15,
    backgroundColor: '#B976FF',
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 10,
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
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  purpleText: {
    color: 'purple',
    fontWeight: '700',
  },
  continueButton: {
    paddingVertical: 15,
    backgroundColor: '#B976FF',
    borderRadius: 48,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContainer: {
    backgroundColor: '#202325',
    width: '100%',
    padding: 20,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  selectedTag: {
    backgroundColor: '#B976FF',
  },
  tagText: {
    fontSize: 14,
    color: '#333',
  },
  selectedTagText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tag: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin: 5,
    borderRadius: 20,
  },
  tagText: {
    fontSize: 14,
    color: '#333',
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
