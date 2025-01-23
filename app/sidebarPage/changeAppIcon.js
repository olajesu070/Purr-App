import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';  // Import for navigation

const SCREEN_WIDTH = Dimensions.get('window').width;

const icons = [
  { id: 1, name: 'Classic', source: require('../../assets/images/appIcon1.png') },
  { id: 2, name: 'Dark Elegance', source: require('../../assets/images/appIcon2.png') },
  { id: 3, name: 'Minimalist White', source: require('../../assets/images/appIcon3.png') },
  { id: 4, name: 'Retro Vibes', source: require('../../assets/images/appIcon4.png') },
  { id: 5, name: 'Midnight Mode', source: require('../../assets/images/appIcon5.png') },
  { id: 6, name: 'Ultra Minimal', source: require('../../assets/images/appIcon6.png') },
  { id: 7, name: 'Futuristic', source: require('../../assets/images/appIcon1.png') },
  { id: 8, name: 'Neon Glow', source: require('../../assets/images/appIcon2.png') },
];

export default function ChangeAppIcon() {
  const [selectedIcon, setSelectedIcon] = useState(icons[0]);
   const navigation = useNavigation();  // Initialize the navigation object


  const handleContinue = () => {
  // Close the current page (go back to the previous screen)
  navigation.goBack();
};

  const handleIconChange = (icon) => {
    setSelectedIcon(icon);
    // Logic to update app icon (if supported by platform)
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.iconWrapper,
        selectedIcon.id === item.id && styles.selectedIcon,
      ]}
      onPress={() => handleIconChange(item)}
    >
      <Image source={item.source} style={styles.icon} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Choose Your App Icon</Text>

      {/* Large Box for Icons */}
      <View style={styles.iconBox}>
        <FlatList
          data={icons}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          numColumns={4} // Display 4 icons per row
          contentContainerStyle={styles.iconContainer}
        />
      </View>

      <Text style={styles.selectedText}>Selected: {selectedIcon.name}</Text>

      {/* Continue Button */}
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
    backgroundColor: 'black',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  iconBox: {
    width: '80%',
    height: 300,
    backgroundColor: '#202325',
    alignItems: 'center',
  },
  iconContainer: {
    width: '100%', 
    justifyContent: 'center',
    // backgroundColor: 'blue',

  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  icon: {
    width: 30,
    height: 30,
  },
  selectedIcon: {
    borderWidth: 1,
    borderColor: '#FA8F21',
    borderRadius: 5,
  },
  selectedText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#fff',
  },
  continueButton: {
    position: 'absolute',
    bottom: 20,
    width: '80%',
    padding: 15,
    backgroundColor: '#B976FF',
    borderRadius: 8,
    alignItems: 'center',
  },
  continueText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
