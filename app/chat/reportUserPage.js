import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView, Platform 
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StatusBar } from "expo-status-bar";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";


const ReportUserPage = ({ navigation }) => {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [reportSubmitted, setReportSubmitted] = useState(false);  // State to track report submission
  const [userBlocked, setUserBlocked] = useState(false);  // State to track temporary block status
    const router = useRouter();

  const nav = navigation || useNavigation();

  const handleReport = () => {
    console.log('Report submitted:', { subject, description });
    // Simulate API call and then update the state
    setReportSubmitted(true);  // Update the state when the report is submitted
  };

  const handleBlockUser = () => {
    setUserBlocked(true);  // Update the state when the user is temporarily blocked
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 20} 
    >
      <StatusBar backgroundColor="#000" barStyle="light-content" />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => nav.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Report a User</Text>
        </View>

        {!reportSubmitted && !userBlocked ? (
          <>
            {/* Subject Picker */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Subject</Text>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={subject}
                  style={styles.picker}
                  onValueChange={(itemValue) => setSubject(itemValue)}
                  dropdownIconColor={'#fff'}
                >
                  <Picker.Item label="Please choose from the list" value="" />
                  <Picker.Item label="Threat of Violence" value="Threat of Violence" />
                  <Picker.Item label="Solicitation" value="Solicitation" />
                  <Picker.Item label="Offensive Language/Hate Speech" value="Offensive Language/Hate Speech" />
                </Picker>
              </View>
            </View>

            {/* Description Input */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={styles.textBox}
                placeholder="Enter your description"
                placeholderTextColor="#979C9E"
                multiline
                numberOfLines={5}
                value={description}
                onChangeText={setDescription}
                color={'#fff'}
              />
            </View>

            {/* Report Button */}
            <TouchableOpacity style={styles.reportButton} onPress={handleReport}>
              <Text style={styles.reportButtonText}>Report</Text>
            </TouchableOpacity>
          </>
        ) : reportSubmitted && !userBlocked ? (
          <View style={styles.reportSubmitted}>
            <Text style={styles.reportTitle}>
            Your report has been <Text style={{ color: '#B976FF' }}>submitted</Text>
            </Text>
            <Text style={styles.reportMessage}>Please allow up to 48 hours for the Purr team to respond.</Text>

            <Text style={styles.blockQuestion}>While your ticket is under review, would you like to temporarily block?</Text>
            
            <TouchableOpacity style={styles.blockButton} onPress={handleBlockUser}>
              <Text style={styles.blockButtonText}>Temporarily Block</Text>
            </TouchableOpacity>

           <Text style={styles.termsMessage}>
            Text or false reporting of users is against our 
            <Text style={{ color: '#800080', textDecorationLine: 'underline' }}> Terms of Service</Text>
             &nbsp; and may result in a warning or permanent ban from Purr.
            </Text>
            {/* Continue Button */}
            <TouchableOpacity style={styles.continueButton} onPress={() => {
                    router.push('/chat')
                    }}>
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        ) : userBlocked ? (
          <View style={styles.blockConfirmation}>
            <Text style={styles.userBlockedReportSubmitted}>
                Your report has been <Text style={styles.purpleText}>submitted</Text>
            </Text>

            <Text style={styles.responseTime}>
                Please allow up to 48 hours for the Purr team to respond.
            </Text>

            <Text style={styles.temporaryBlock}>
                This user has been <Text style={styles.purpleText}>temporarily</Text> blocked from your feed.
            </Text>

            {/* Continue Button */}
            <View style={styles.buttonWrapper}>
                <TouchableOpacity 
                style={styles.continueButton}  
                onPress={() => router.push('/chat')}
                >
                <Text style={styles.continueButtonText}>Continue</Text>
                </TouchableOpacity>
            </View>
         </View>

        ) : null}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 40,
  },
  backButton: {},
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    color: '#fff',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#fff',
  },
  pickerWrapper: {
    backgroundColor: '#303437',
    borderRadius: 10,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    color: '#fff'
  },
  textBox: {
    height: 400,
    backgroundColor: '#303437',
    borderRadius: 10,
    padding: 10,
    textAlignVertical: 'top',
    color: '#fff',
  },
  reportButton: {
    backgroundColor: '#B976FF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  reportButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  reportSubmitted: {
      marginTop: 30,
      alignItems:'center'
  },
  reportTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop:50
    },
  
  reportMessage: {
    fontSize: 12,
      color: '#fff',
    fontWeight:'200',
    marginBottom: 20,
  },
  blockQuestion: {
    fontSize: 16,
    color: '#fff',
      marginBottom: 10,
      textAlign: 'center',
    marginTop: 120
  },
  blockButton: {
    // backgroundColor: '#B976FF',
    padding: 15,
    borderRadius: 45,
    alignItems: 'center',
      marginBottom: 20,
      borderWidth: 1,
      borderColor: 'gray',
      width: '80%',
    marginTop:20
  },
  blockButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  termsMessage: {
    fontSize: 14,
    color: 'gray',
      marginBottom: 20,
      textAlign: 'center',
      paddingHorizontal: 35
    
  },
  continueButton: {
    backgroundColor: '#B976FF',
    padding: 15,
    borderRadius: 45,
      alignItems: 'center',
      width: '80%',
    marginTop: 100
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  blockConfirmation: {
    marginTop: 30,
    alignItems: 'center',
  },
  blockTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    },
  
  
  
   blockConfirmation: {
    flex: 1,
    justifyContent: 'center',  // Centers content vertically
    alignItems: 'center',       // Centers content horizontally
    paddingHorizontal: 10,
  },
  userBlockedReportSubmitted: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    // marginBottom: 10,
  },
  responseTime: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 10,
  },
  temporaryBlock: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
      marginBottom: 20,
    marginTop:40
  },
  purpleText: {
    color: '#B976FF',  // Purple color for "submitted" and "temporarily"
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  continueButton: {
    backgroundColor: '#B976FF',
    padding: 15,
    borderRadius: 45,
    alignItems: 'center',
    width: '100%',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ReportUserPage;
