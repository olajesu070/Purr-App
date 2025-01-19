import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const MessageItem = ({ 
  profilePicture, 
  senderName, 
  messageText, 
  date, 
  unreadCount, 
  onlineStatus, 
  verified, 
  onPress 
}) => {
  return (
    <TouchableOpacity style={styles.myMessage} onPress={onPress}>
      <Image source={profilePicture} style={styles.mymessagesProfilePicture} />
      <View style={styles.mymessagesContent}>
        <View style={styles.mymessagesNameRow}>
          <View 
            style={onlineStatus ? styles.mymessagesOnlineBadge : styles.mymessagesOnlineBadgeOffline} 
          />
          <Text style={onlineStatus ? styles.mymessagesSenderName : styles.mymessagesSenderNameOffline}>
            {senderName}
          </Text>
          {verified && (
            <View style={styles.mymessagesVerifiedBadge}>
              <Text style={styles.mymessagesVerifiedTick}>✔</Text>
            </View>
          )}
        </View>
        <Text style={onlineStatus ? styles.mymessagesText : styles.mymessagesTextOffline}>
          {messageText}
        </Text>
      </View>
      <View style={styles.mymessagesBadgeContainer}>
        <Text style={styles.mymessagesDate}>{date}</Text>
        {unreadCount > 0 && (
          <View style={styles.mymessagesUnreadCounter}>
            <Text style={styles.mymessagesUnreadText}>{unreadCount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({

 
  myMessagesText: {
  fontSize: 12,
  fontWeight: '700',
  color: '#fff', 
  paddingLeft: 10
},

  
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 5,
    marginRight: 10,
  },
 
  messageContent: {
    flex: 1,
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

export default MessageItem;
