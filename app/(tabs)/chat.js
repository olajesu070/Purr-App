import React, {useState} from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity,} from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import SponsoredAdsCard from '@/components/tabsComponents/sponsoredAdsCard';
import { StatusBar } from 'expo-status-bar';

const ChatPage = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);


  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#202325" barStyle="light-content" />
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Messages</Text>
      </View>
      <ScrollView style={styles.messageContainer}>
        <View style={styles.sponsoredMessageContainer}>
           {/* Sponsored Message container*/}
          <Text style={styles.sponsoredText}>Sponsored Messages</Text>
          {/* Sponsored Message content */}
          <TouchableOpacity onPress={openModal}>
          <View style={styles.sponsoredMessage}>
            
              <Image source={require('../../assets/images/adsImage1.png')} style={styles.profilePicture} />
              <View style={styles.messageContent}>
                <View style={styles.adNameRow}>
                  {/* Verified Icon */}
                
                  {/* Ad Name */}
                      <Text style={styles.adName}>Dorothy’s Bar</Text>
                      {/* <Image source={require('../../assets/images/verifiedTick.png')} style={styles.verifiedTick} /> */}
                      <View style={styles.verifiedIcon}>
                        <Text style={styles.verifiedTickIcon}>✔</Text>
                      </View>
                </View>
                {/* Short Message */}
                <Text style={styles.shortMessage}>Purr Partner | Local LGBTQIA+ Bar</Text>
              </View>
              {/* Yellow Badge */}
              <View style={styles.badge}>
                <Text style={styles.badgeText}>NEW</Text>
              </View>
            
            
            </View>
          </TouchableOpacity>
          
          {/* Sponsored Message content */}
            <View style={styles.sponsoredMessage}>
              <Image source={require('../../assets/images/purrAdsImage.png')} style={styles.purrAdsImage} />
              <View style={styles.messageContent}>
                <View style={styles.adNameRow}>
                  {/* Verified Icon */}
                
                  {/* Ad Name */}
                      <Text style={styles.adName}>Purr Administrators</Text>
                      {/* <Image source={require('../../assets/images/verifiedTick.png')} style={styles.verifiedTick} /> */}
                      <View style={styles.verifiedIcon}>
                        <Text style={styles.verifiedTickIcon}>✔</Text>
                      </View>
                </View>
                {/* Short Message */}
                <Text style={styles.shortMessage}>
                  7-DAY <Text style={styles.purpleText}>PURR+</Text> ACCESS ONLY <Text style={styles.orangeText}>$6.99</Text>
                </Text>

              </View>
              {/* Yellow Badge */}
              <View style={styles.purrBadge}>
                <Text style={styles.badgeText}>NEW</Text>
              </View>
          </View>
          
          {/* Sponsored Message content */}
            <View style={styles.sponsoredMessage}>
              <Image source={require('../../assets/images/blankAdsImage.png')} style={styles.profilePicture} />
              <View style={styles.messageContent}>
                <View style={styles.adNameRow}>
                  {/* Verified Icon */}
                
                  {/* Ad Name */}
                      <Text style={styles.adName}>Ad Name</Text>
                      {/* <Image source={require('../../assets/images/verifiedTick.png')} style={styles.verifiedTick} /> */}
                      {/* <View style={styles.verifiedIcon}>
                        <Text style={styles.verifiedTickIcon}>✔</Text>
                      </View> */}
                </View>
                {/* Short Message */}
                <Text style={styles.shortMessage}>Short message.</Text>
              </View>
              {/* Yellow Badge */}
              <View style={styles.badge}>
                <Text style={styles.badgeText}>NEW</Text>
              </View>
          </View>
          
           {/* Sponsored Message content */}
            <View style={styles.sponsoredMessage}>
              <Image source={require('../../assets/images/blankAdsImage.png')} style={styles.profilePicture} />
              <View style={styles.messageContent}>
                <View style={styles.adNameRow}>
                  {/* Verified Icon */}
                
                  {/* Ad Name */}
                      <Text style={styles.adName}>Ad Name</Text>
                      {/* <Image source={require('../../assets/images/verifiedTick.png')} style={styles.verifiedTick} /> */}
                      {/* <View style={styles.verifiedIcon}>
                        <Text style={styles.verifiedTickIcon}>✔</Text>
                      </View> */}
                </View>
                {/* Short Message */}
                <Text style={styles.shortMessage}>Short message.</Text>
              </View>
              {/* Yellow Badge */}
              <View style={styles.badge}>
                <Text style={styles.badgeText}>NEW</Text>
              </View>
            </View>
        </View>
       

         {/* My Message */}
        <View style={styles.myMessagesContainer}>
          <Text style={styles.myMessagesHeader}>My Messages</Text>
         {/*online user different user Message */}
          <View style={styles.myMessage}>
            <Image source={require('../../assets/images/user1Dp.png')} style={styles.mymessagesProfilePicture} />
            <View style={styles.mymessagesContent}>
              <View style={styles.mymessagesNameRow}>
                <View style={styles.mymessagesOnlineBadge}></View>
                <Text style={styles.mymessagesSenderName}>Inique</Text>
                <View style={styles.mymessagesVerifiedBadge}>
                  <Text style={styles.mymessagesVerifiedTick}>✔</Text>
                </View>
              </View>
              <Text style={styles.mymessagesText}>Hey, you coming out tonight??! I wa...</Text>
            </View>
            <View style={styles.mymessagesBadgeContainer}>
              <Text style={styles.mymessagesDate}>Yesterday</Text>
              <View style={styles.mymessagesUnreadCounter}>
                <Text style={styles.mymessagesUnreadText}>3</Text>
              </View>
            </View>
          </View>
          {/* offline userdifferent user Message */}
          <View style={styles.myMessage}>
            <Image source={require('../../assets/images/user1Dp.png')} style={styles.mymessagesProfilePicture} />
            <View style={styles.mymessagesContent}>
              <View style={styles.mymessagesNameRow}>
                <View style={styles.mymessagesOnlineBadgeOffline}></View>
                <Text style={styles.mymessagesSenderNameOffline}>Cheryl</Text>
                <View style={styles.mymessagesVerifiedBadge}>
                  <Text style={styles.mymessagesVerifiedTick}>✔</Text>
                </View>
              </View>
              <Text style={styles.mymessagesTextOffline}>Hey, you coming out tonight??!</Text>
            </View>
            <View style={styles.mymessagesBadgeContainer}>
              <Text style={styles.mymessagesDate}>Yesterday</Text>
              {/* <View style={styles.mymessagesUnreadCounter}>
                <Text style={styles.mymessagesUnreadText}>1</Text>
              </View> */}
            </View>
          </View>
           {/*online user different user Message */}
          <View style={styles.myMessage}>
            <Image source={require('../../assets/images/user1Dp.png')} style={styles.mymessagesProfilePicture} />
            <View style={styles.mymessagesContent}>
              <View style={styles.mymessagesNameRow}>
                <View style={styles.mymessagesOnlineBadge}></View>
                <Text style={styles.mymessagesSenderName}>Stacey</Text>
                <View style={styles.mymessagesVerifiedBadge}>
                  <Text style={styles.mymessagesVerifiedTick}>✔</Text>
                </View>
              </View>
              <Text style={styles.mymessagesText}>Hey, how’s it going?</Text>
            </View>
            <View style={styles.mymessagesBadgeContainer}>
              <Text style={styles.mymessagesDate}>2 days Ago</Text>
              <View style={styles.mymessagesUnreadCounter}>
                <Text style={styles.mymessagesUnreadText}>3</Text>
              </View>
            </View>
          </View>
            {/* offline userdifferent user Message */}
          <View style={styles.myMessage}>
            <Image source={require('../../assets/images/user1Dp.png')} style={styles.mymessagesProfilePicture} />
            <View style={styles.mymessagesContent}>
              <View style={styles.mymessagesNameRow}>
                <View style={styles.mymessagesOnlineBadge}></View>
                <Text style={styles.mymessagesSenderNameOffline}>Hit my Line</Text>
                <View style={styles.mymessagesVerifiedBadge}>
                  <Text style={styles.mymessagesVerifiedTick}>✔</Text>
                </View>
              </View>
              <Text style={styles.mymessagesTextOffline}>What’s going on?</Text>
            </View>
            <View style={styles.mymessagesBadgeContainer}>
              <Text style={styles.mymessagesDate}>2 Days Ago</Text>
              {/* <View style={styles.mymessagesUnreadCounter}>
                <Text style={styles.mymessagesUnreadText}>1</Text>
              </View> */}
            </View>
          </View>
           {/*online user different user Message */}
          <View style={styles.myMessage}>
            <Image source={require('../../assets/images/user1Dp.png')} style={styles.mymessagesProfilePicture} />
            <View style={styles.mymessagesContent}>
              <View style={styles.mymessagesNameRow}>
                <View style={styles.mymessagesOnlineBadgeOffline}></View>
                <Text style={styles.mymessagesSenderName}>Business Couple</Text>
                {/* <View style={styles.mymessagesVerifiedBadge}>
                  <Text style={styles.mymessagesVerifiedTick}>✔</Text>
                </View> */}
              </View>
              <Text style={styles.mymessagesText}>Hey, how’s it going?</Text>
            </View>
            <View style={styles.mymessagesBadgeContainer}>
              <Text style={styles.mymessagesDate}>2 days Ago</Text>
              <View style={styles.mymessagesUnreadCounter}>
                <Text style={styles.mymessagesUnreadText}>3</Text>
              </View>
            </View>
          </View>
          {/* offline userdifferent user Message */}
          <View style={styles.myMessage}>
            <Image source={require('../../assets/images/user1Dp.png')} style={styles.mymessagesProfilePicture} />
            <View style={styles.mymessagesContent}>
              <View style={styles.mymessagesNameRow}>
                <View style={styles.mymessagesOnlineBadgeOffline}></View>
                <Text style={styles.mymessagesSenderNameOffline}>Cheryl</Text>
                <View style={styles.mymessagesVerifiedBadge}>
                  <Text style={styles.mymessagesVerifiedTick}>✔</Text>
                </View>
              </View>
              <Text style={styles.mymessagesTextOffline}>Hey, you coming out tonight??!</Text>
            </View>
            <View style={styles.mymessagesBadgeContainer}>
              <Text style={styles.mymessagesDate}>Yesterday</Text>
              {/* <View style={styles.mymessagesUnreadCounter}>
                <Text style={styles.mymessagesUnreadText}>1</Text>
              </View> */}
            </View>
          </View>
</View>



      </ScrollView>

       {/* Modal */}
                {isModalVisible && (
              <SponsoredAdsCard
                    imageSource={require('../../assets/images/adsBanner1.png')}
                    url="https://www.google.com"
                    onClose={closeModal}
                  />
                )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    position: 'absolute', // Ensures it stays at the top
    top: 40,
    left: 0,
    right: 0,
    padding: 16, // Padding for spacing
    backgroundColor: '#202325', // Optional: background color for the header
    zIndex: 10, // Keeps it above other elements
  },
  headerText: {
    color: '#fff', // White text color
    fontSize: 32, // Font size for the header
    fontWeight: '700', // Bold font for emphasis
  },
  sponsoredMessageContainer: {
    // marginBottom: 10, 
    marginTop: 5
    
  },
  messageContainer: {
    // marginVertical: 110,
    display: 'row',
    marginTop: 110,
    flexGrow: 1,
  },
  myMessagesContainer: {
    // marginVertical: 110,
    display: 'row',
    marginTop:10
  },
  sponsoredText: {
  fontSize: 12,
  fontWeight: '700',
  color: '#fff', 
  paddingLeft: 10
  },
  myMessagesText: {
  fontSize: 12,
  fontWeight: '700',
  color: '#fff', 
  paddingLeft: 10
},

sponsoredMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    // backgroundColor: '#f9f9f9',
    borderRadius: 8,
    // marginBottom: 10,
  },
  
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 5,
    marginRight: 10,
  },
  verifiedTick: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },

  purrAdsImage: {
     width: 43,
    height: 32,
    // borderRadius: 5,
    marginRight: 10,
  },
  messageContent: {
    flex: 1,
  },
  adNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  verifiedIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#9b59b6', // Purple color
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
  },
  verifiedTickIcon: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  adName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#fff',
    paddingRight: 5
  },
  shortMessage: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '800',
    fontStyle:'italic'
  },
  purpleText: {
  color: '#B976FF', 
    fontWeight: '800', 
  fontSize:14
},
orangeText: {
  color: '#FA8F21', 
  fontWeight: '800', 
  fontSize: 14
},

  badge: {
    backgroundColor: '#FA8F21', 
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },
  purrBadge: {
   backgroundColor: '#B976FF', 
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
},
  badgeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
    myMessagesContainer: {
    padding: 10,
    // backgroundColor: '#fff',
  },
  myMessagesHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 7,
    color: '#fff',
  },
  myMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    // padding: 10
    marginBottom: 15
  },
  mymessagesProfilePicture: {
    width: 47,
    height: 45,
    borderRadius: 5,
    marginRight: 10,
  },
  mymessagesContent: {
    flex: 1,
    justifyContent: 'center',
  },
  mymessagesNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  mymessagesOnlineBadge: {
    width: 10,
    height: 10,
    backgroundColor: '#00FF00', // Green for online
    borderRadius: 5,
    marginRight: 7,
  },
  mymessagesOnlineBadgeOffline: {
    width: 10,
    height: 10,
    backgroundColor: '#6C7072',
    borderRadius: 5,
    marginRight: 7,
  },
  mymessagesSenderName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 7, // Space before the verified badge
  },
   mymessagesSenderNameOffline: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6C7072',
    marginRight: 7, // Space before the verified badge
  },
  mymessagesVerifiedBadge: {
    width: 16,
    height: 16,
    backgroundColor: '#8A2BE2', // Purple
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  mymessagesVerifiedTick: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  mymessagesText: {
    fontSize: 14,
    color: '#fff',
    marginTop: 2,
    fontWeight: 'bold',
  },
   mymessagesTextOffline: {
    fontSize: 14,
    color: '#6C7072',
    marginTop: 2,
    fontWeight: 'bold',
  },
  mymessagesBadgeContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  mymessagesDate: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5,
  },
  mymessagesUnreadCounter: {
    width: 15,
    height: 15,
    backgroundColor: '#8A2BE2', // Purple
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mymessagesUnreadText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default ChatPage;
