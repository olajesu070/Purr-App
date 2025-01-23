import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function MyAccountPage() {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showEmailChange, setShowEmailChange] = useState(false);
  const [showPhoneChange, setShowPhoneChange] = useState(false);
  const [step, setStep] = useState(1); // Step 1 = Account Info, Step 2 = Account Deletion, Step 3 = Confirm Deletion, Step 4 = Success

  const navigation = useNavigation(); // Initialize navigation

  const handleDeleteAccountConfirm = () => {
    setStep(3); // Move to Account Deletion view
    };
    
     const handleDeleteAccount = () => {
    setStep(2); // Move to Account Deletion view
  };

  const handleCancel = () => {
    setStep(1); // Go back to Account Info view
  };

  const handleConfirmDeletion = () => {
    setStep(4); // Move to Confirm Account Deletion view
  };

  const handleDone = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };

  const renderAccountInfo = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>My Account</Text>
      </View>

      {/* Email Section */}
      <View style={styles.inputContainer}>
        <View style={styles.row}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.verifiedText}>Verified</Text>
        </View>
        <TextInput
          style={[styles.input, styles.emailInput]}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          placeholderTextColor="#fff"
        />
        <TouchableOpacity onPress={() => setShowEmailChange(!showEmailChange)}>
          <Text style={styles.changeText}>Change</Text>
        </TouchableOpacity>
      </View>

      {/* Phone Number Section */}
      <View style={styles.inputContainer}>
        <View style={styles.row}>
          <Text style={styles.label}>Phone Number</Text>
          <Text style={styles.verifiedText}>Verified</Text>
        </View>
        <TextInput
          style={[styles.input, styles.phoneInput]}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="Enter your phone number"
          placeholderTextColor="#fff"
        />
        <TouchableOpacity onPress={() => setShowPhoneChange(!showPhoneChange)}>
          <Text style={styles.changeText}>Change</Text>
        </TouchableOpacity>
      </View>

      {/* Account Deletion Button */}
      <TouchableOpacity onPress={handleDeleteAccount} style={styles.deleteAccount}>
        <Text style={styles.deleteText}>Delete My Account</Text>
      </TouchableOpacity>
    </View>
  );

  const renderAccountDeletion = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Delete My Account</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.confirmationText}>Are you sure you want to delete your account?</Text>
        {/* <Text style={styles.deleteText}>Delete My Account</Text> */}
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
            <Text style={styles.buttonText}>Never mind</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDeleteAccountConfirm} style={styles.deleteButton}>
            <Text style={styles.buttonText}>Delete My Account</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Right Image */}
      <Image source={require('../../assets/images/bottomRightImage.png')} style={styles.bottomRightImage} />
    </View>
  );

  const renderConfirmDeletion = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Delete My Account</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.confirmationText}>Are you sure?</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleConfirmDeletion} style={styles.deleteButton}>
            <Text style={styles.buttonText}>Delete My Account</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
            <Text style={styles.buttonText}>I changed my mind</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Right Image */}
      <Image source={require('../../assets/images/bottomRightImage.png')} style={styles.bottomRightImage} />
    </View>
  );

  const renderSuccess = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Account Deleted</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.successText}>Your account has been successfully deleted.</Text>
        <TouchableOpacity onPress={handleDone} style={styles.doneButton}>
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
          </View>
      <Image source={require('../../assets/images/bottomRightImage.png')} style={styles.bottomRightImage} />
          
    </View>
  );

  // Render based on the current step
  return step === 1
    ? renderAccountInfo()
    : step === 2
    ? renderAccountDeletion()
    : step === 3
    ? renderConfirmDeletion()
    : renderSuccess();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000',
    },
content: {
  flex: 1, // Makes the container take up the full height
  justifyContent: 'center', // Centers content vertically
  alignItems: 'center', // Centers content horizontally
},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 50,
  },
  backButton: {
    position: 'absolute',
    left: 10,
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 40,
    width: SCREEN_WIDTH - 40,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginRight: 20,
    fontWeight: '700',
  },
  verifiedText: {
    fontSize: 10,
    color: '#1C720F',
  },
  input: {
    height: 48,
    borderColor: '#6C7072',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    paddingRight: 40, // Extra padding for the "Change" text inside the input box
    marginBottom: 10,
    color: 'white',
    marginTop: 10,
  },
  emailInput: {
    width: '100%',
  },
  phoneInput: {
    width: '100%',
    color: 'white',
  },
  changeText: {
    position: 'absolute',
    right: 10,
    top: -40,
    fontSize: 10,
    color: '#B976FF',
    opacity: 0.7,
  },
  deleteAccount: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
      alignItems: 'center',
  },
//   deleteText: {
//     fontSize: 16,
//     color: '#979C9E',
//     fontWeight: 'bold',
//   },
  confirmationText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
      marginBottom: 20,
    fontWeight:'700'
  },
  deleteText: {
    fontSize: 18,
    color: '#979C9E', // Purple color for delete text
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
 buttonContainer: {
  flexDirection: 'column', // Stack buttons vertically
  justifyContent: 'center', // Center them
  alignItems: 'center', // Align to center
  marginTop: 20,
  width: '100%',
  gap: 15, // Adds spacing between buttons (Works in React Native 0.71+)
},

cancelButton: {
  backgroundColor: '#B976FF',
  paddingVertical: 10,
  borderRadius: 48,
  width: '80%',
  alignItems: 'center', // Centers content horizontally
  justifyContent: 'center', // Centers content vertically
  marginBottom: 10, // Adds space between buttons
},
deleteButton: {
  backgroundColor: 'transparent',
  paddingVertical: 10,
  borderRadius: 48,
  width: '80%',
  alignItems: 'center', // Centers content horizontally
  justifyContent: 'center', // Centers content vertically
    marginBottom: 10, // Adds space between buttons
    borderWidth: 2,
  borderColor:'#303437'
},

  buttonText: {
  color: '#fff',
  fontSize: 16,
  textAlign: 'center', // Centers text horizontally
      alignSelf: 'center', 
  fontWeight:'500'
},

  successText: {
    fontSize: 18,
    color: '#B976FF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  doneButton: {
    backgroundColor: '#B976FF',
    paddingVertical: 10,
    paddingHorizontal: 30,
      borderRadius: 48,
  width: '80%',
    
  },
  bottomRightImage: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 100,
      height: 100,
  },
});
