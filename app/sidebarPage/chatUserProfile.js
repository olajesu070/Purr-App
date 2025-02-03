import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import ProfileImage from '../../assets/images/mainUserProfilePicture.png';
import ChatImage from '../../assets/images/userProfileChat.png';
import { StatusBar } from 'expo-status-bar';
import OnlineStatus from '../../components/OnlineStatus';
import VerifiedBadge from '../../components/VerifiedBadge';
import StatusBadge from '../../components/StatusBadge';
import { useRouter } from 'expo-router';

const ChatUserProfile = () => {
  const [activeTab, setActiveTab] = useState('about');
  const router = useRouter();

  const photos = [
    require('../../assets/images/profilePhoto1.png'),
    require('../../assets/images/profilePhoto3.png'),
    require('../../assets/images/profilePhoto2.png'),
    require('../../assets/images/profilePhoto3.png'),
  ];

  const tags = [
    { label: 'Pronouns', values: ['She/Her'] },
    { label: 'Height', values: ['5’5”'] },
    { label: 'Gender Identity', values: ['Queer', 'Woman'] },
    { label: 'Zodiac', values: ['Capricorn', 'Libra', 'Leo', 'Virgo'] },
    {
      label: 'Interest',
      values: ['Music', 'Movies', 'History', 'Politics', 'Reading', 'Law'],
    },
    {
      label: 'Activities',
      values: ['Concert', 'Hunting', 'Camping', 'Dancing', 'Clubbing'],
    },
  ];
  const aboutMeText = `Hi, I’m John! I love adventure, tech, and making friends.
I’m a software engineer who enjoys exploring new technologies, solving complex problems, and creating meaningful digital experiences.
Outside of coding, you’ll find me traveling to new places, hiking in nature, and capturing moments through photography.
I have a deep passion for gaming, music, and meeting like-minded individuals who inspire me.
I believe in continuous growth, embracing challenges, and making an impact wherever I go.
Let's connect and create something amazing together!`;

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <ImageBackground
        source={ProfileImage}
        style={styles.profileBackground}
        resizeMode="cover"
      />
      {/* <View style={styles.statusContainer}>
        <StatusBadge status="verification_pending" />
        <StatusBadge status="verification_error" />
        <StatusBadge status="photo_in_review" />
        <StatusBadge status="photo_denied" />
      </View> */}
      <ScrollView style={styles.profileDetailsContainer}>
        <View style={styles.contentBox}>
          <View style={styles.profileRow}>
            <View style={styles.profileInfo}>
              <OnlineStatus isOnline={true} />
              <View style={styles.nameAndAge}>
                <Text style={styles.screenName}>Screen Name,</Text>
                <Text style={styles.age}>25</Text>
              </View>
              <VerifiedBadge />
            </View>
            <TouchableOpacity onPress={() => router.push('/chat/detail')}>
              <Image source={ChatImage} style={styles.userProfileChat} />
            </TouchableOpacity>
          </View>
          <View style={styles.tagContainer}>
            <Text style={styles.tagText}>She/Her</Text>
          </View>
          <View style={styles.tabsContainer}>
            <Text
              style={[styles.tab, activeTab === 'about' && styles.activeTab]}
              onPress={() => setActiveTab('about')}
            >
              About Me
            </Text>
            <Text
              style={[styles.tab, activeTab === 'stats' && styles.activeTab]}
              onPress={() => setActiveTab('stats')}
            >
              Stats
            </Text>
          </View>
          {activeTab === 'about' && (
            <View style={styles.aboutContainer}>
              <Text style={styles.sectionLabel}>About Me</Text>
              <Text style={styles.aboutText}>{aboutMeText}</Text>
            </View>
          )}
          <View style={styles.tagsSection}>
            {tags.map((item, index) => (
              <View key={index} style={styles.tagWrapper}>
                <Text style={styles.tagLabel}>{item.label}</Text>
                <View style={styles.tagValuesContainer}>
                  {item.values.map((value, idx) => (
                    <View key={idx} style={styles.tagContainer}>
                      <Text style={styles.tagText}>{value}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  profileBackground: {
    position: 'absolute',
    width: '100%',
    height: '80%',
    top: 0,
  },
  statusContainer: { position: 'absolute', top: 50, right: 10 },
  profileDetailsContainer: { flex: 1 },
  contentBox: {
    marginTop: 450,
    backgroundColor: '#000',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 16,
  },
  profileRow: { flexDirection: 'row', alignItems: 'center' },
  profileInfo: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  nameAndAge: { flexDirection: 'row', alignItems: 'center' },
  screenName: { fontSize: 25, fontWeight: '700', color: '#FFFFFF' },
  userProfileChat: {
    marginLeft: 100,
  },
  age: { fontSize: 25, fontWeight: '700', color: '#FFFFFF' },
  tagContainer: {
    backgroundColor: '#303437',
    alignSelf: 'flex-start',
    padding: 8,
    borderRadius: 32,
    marginTop: 10,
  },
  tagText: { color: '#fff', fontWeight: '500' },
  tabsContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    backgroundColor: '#202325',
    borderRadius: 8,
    padding: 2,
  },
  tab: { flex: 1, paddingVertical: 8, textAlign: 'center', color: '#fff' },
  activeTab: { backgroundColor: '#303437', borderRadius: 6 },
  aboutContainer: { marginVertical: 10 },
  sectionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#fff',
  },
  aboutText: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'justify',
    lineHeight: 24,
  },
  tagsSection: { marginTop: 10 },
  tagWrapper: { marginBottom: 10 },
  tagLabel: { fontSize: 18, fontWeight: '700', color: '#fff' },
  tagValuesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 10,
  },
});

export default ChatUserProfile;
