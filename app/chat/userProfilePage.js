import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
    Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import UserProfileImage from '../../assets/images/userProfileImage.png';




const UserProfilePage = ({ navigation }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [activeTab, setActiveTab] = useState("about");
  const [flagModalVisible, setFlagModalVisible] = useState(false);
  const [blockUserModalVisible, setBlockUserModalVisible] = useState(false);
  const router = useRouter();

  const handleOpenFlagModal = () => setFlagModalVisible(true);
  const handleCloseFlagModal = () => setFlagModalVisible(false);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        {/* White Flag */}
       <TouchableOpacity onPress={handleOpenFlagModal}>
        <Ionicons name="flag" size={24} color="white" />
      </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile Image */}
        <TouchableOpacity onPress={() => setIsFullScreen(true)}>
          <Image
            source={UserProfileImage} // Replace with actual user image
            style={styles.profileImage}
          />
        </TouchableOpacity>

        {/* Full-Screen Image Modal */}
        <Modal visible={isFullScreen} transparent>
          <TouchableOpacity style={styles.fullScreenContainer} onPress={() => setIsFullScreen(false)}>
            <Image
              source={{ uri: "https://via.placeholder.com/150" }}
              style={styles.fullScreenImage}
            />
          </TouchableOpacity>
        </Modal>

        {/* Purple Line */}
        <View style={styles.purpleLine} />

        {/* User Info Row */}
        <View style={styles.userInfoRow}>
          <View style={styles.userInfoLeft}>
            <View style={styles.onlineBadge} />
            <Text style={styles.username}>JohnDoe</Text>
            <Text style={styles.age}>25</Text>
          </View>
          <View style={styles.chatIcons}>
            <TouchableOpacity>
              <FontAwesome name="comment" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.chatIconSpacing}>
              <FontAwesome name="comments" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* User Tags */}
        <View style={styles.userTag}>
          <Text style={styles.tagText}>He / 2 miles away</Text>
        </View>

        {/* Tabs (About Me | Stats) */}
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "about" && styles.activeTab]}
            onPress={() => setActiveTab("about")}
          >
            <Text style={styles.tabText}>About Me</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "stats" && styles.activeTab]}
            onPress={() => setActiveTab("stats")}
          >
            <Text style={styles.tabText}>Stats</Text>
          </TouchableOpacity>
        </View>

        {/* About Me Section */}
        {activeTab === "about" && (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>About Me</Text>
            <Text style={styles.sectionContent}>
              I love traveling and meeting new people.
            </Text>
          </View>
        )}

        {/* Stats Section */}
        {activeTab === "stats" && (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Stats</Text>
            <Text style={styles.statLabel}>Height</Text>
            <Text style={styles.statValue}>5'9"</Text>

            <Text style={styles.statLabel}>Gender Identity</Text>
            <Text style={styles.statValue}>Male</Text>

            <Text style={styles.statLabel}>Relationship Status</Text>
            <Text style={styles.statValue}>Single</Text>

            <Text style={styles.statLabel}>Looking For</Text>
            <Text style={styles.statValue}>Friends</Text>
          </View>
        )}
      </ScrollView>

      {/* Flag Modal */}
      {/* Flag Modal */}
                  <Modal
             animationType="slide"
             transparent={true}
             visible={flagModalVisible}
             onRequestClose={handleCloseFlagModal}
           >
             <View style={styles.flagModalOverlay}>
               <View style={styles.flagModalContent}>
                 {/* Flag Buttons */}
                 <View style={styles.flagModalButtonRow}>
                   <TouchableOpacity style={styles.flagModalButton}  onPress={() => {
                         router.push('/chat/reportUserPage');
                         setFlagModalVisible(false);
                         }}>
                     <Text style={styles.flagModalButtonText}>Report</Text>
                   </TouchableOpacity>
                 </View>
                 <View style={styles.flagModalButtonRow}>
                               <TouchableOpacity style={styles.flagModalButton}   onPress={() => { setBlockUserModalVisible(true); setFlagModalVisible(false); }}>
                     <Text style={styles.flagModalButtonText}>Block</Text>
                   </TouchableOpacity>
                 </View>
     
                 <View style={styles.flagModalButtonRow}>
                     <TouchableOpacity style={styles.flagModalButton}  onPress={handleCloseFlagModal}>
                         <Text style={styles.flagModalCloseButtonText}>Cancel</Text>
                     </TouchableOpacity>
                 </View>
                 {/* Close Modal Button */}
                 {/* <TouchableOpacity onPress={handleCloseFlagModal} style={styles.flagModalCloseButton}>
                   <Text style={styles.flagModalCloseButtonText}>Close</Text>
                 </TouchableOpacity> */}
               </View>
             </View>
               </Modal>
              
               {/* bottom block modal Modal */}
               <Modal
                 animationType="slide"
                 transparent={true}
                 visible={blockUserModalVisible}
                 onRequestClose={() => setBlockUserModalVisible(false)}
                 >
                 <TouchableWithoutFeedback onPress={() => setBlockUserModalVisible(false)}>
                 <View style={styles.blockUserModalOverlay}>
                     <TouchableWithoutFeedback>
                     <View style={styles.blockUserModalContainer}>
                         {/* Header */}
                         <Text style={styles.blockUserModalHeader}>Are you sure?</Text>
     
                         {/* Instructions */}
                     <Text style={styles.blockUserModalText}>
                             Blocking this user will count as{' '}
                             <Text style={styles.blockUserModalHighlight}>7</Text> of the{' '}
                             <Text style={styles.blockUserModalHighlight}>10</Text> Free users receive. To get unlimited blocks, upgrade to{' '}
                             <Text style={styles.blockUserModalHighlight}>Purr+</Text>.
                             </Text>
     
     
                         {/* Continue Button */}
                                   <TouchableOpacity 
                                       onPress={() => {
                         router.push('/chat');
                         setBlockUserModalVisible(false);
                         }}
                         style={styles.blockUserModalContinueButton} 
                         >
                         <Text style={styles.blockUserModalContinueButtonText}>Continue</Text>
                         </TouchableOpacity>
                     </View>
                     </TouchableWithoutFeedback>
                 </View>
                 </TouchableWithoutFeedback>
             </Modal>
    </View>
  );
};


// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    marginTop: 40,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    marginVertical: 20,
  },
  fullScreenContainer: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  fullScreenImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  purpleLine: {
    height: 3,
    backgroundColor: "#B976FF",
    width: "50%",
    alignSelf: "center",
    marginVertical: 20,
  },
  userInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  userInfoLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  onlineBadge: {
    width: 10,
    height: 10,
    backgroundColor: "green",
    borderRadius: 5,
    marginRight: 5,
  },
  username: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    marginRight: 5,
  },
  age: {
    fontSize: 16,
    color: "#ccc",
  },
  chatIcons: {
    flexDirection: "row",
  },
  chatIconSpacing: {
    marginLeft: 15,
  },
  userTag: {
    backgroundColor: "#303437",
    padding: 10,
    borderRadius: 20,
    alignSelf: "center",
    marginVertical: 10,
  },
  tagText: {
    color: "white",
    fontSize: 14,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  tab: {
    padding: 10,
    marginHorizontal: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#B976FF",
  },
  tabText: {
    color: "white",
    fontSize: 16,
  },
  section: {
    padding: 20,
  },
  sectionLabel: {
    fontSize: 18,
    color: "#B976FF",
    fontWeight: "bold",
  },
  sectionContent: {
    fontSize: 16,
    color: "white",
    marginTop: 5,
  },
  statLabel: {
    fontSize: 16,
    color: "#B976FF",
    marginTop: 10,
  },
  statValue: {
    fontSize: 16,
    color: "white",
    },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  blockUserModal: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#1c1c1e",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
  },
  blockUserModalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  blockUserModalText: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  purpleText: {
    color: "purple",
    fontWeight: "bold",
  },
  blockUserModalButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  blockUserModalButtonText: {
    color: "white",
    fontSize: 16,
    },
  
  blockUserModalButtonRow: {
    marginTop: 20,
  },
  blockUserModalButton: {
    backgroundColor: '#B976FF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  blockUserModalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  blockUserModalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  blockUserModalContainer: {
    backgroundColor: '#202325',
    padding: 10,
    alignItems: 'center',
    paddingBottom: 40,
  },
  blockUserModalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  blockUserModalText: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
      marginBottom: 20,
    paddingHorizontal:20
  },
  blockUserModalContinueButton: {
    backgroundColor: '#B976FF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  blockUserModalContinueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    },
  blockUserModalHighlight: {
  color: '#B976FF', // Purple color
  fontWeight: 'bold',
    },
  flagModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flagModalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay color
  },
  flagModalContent: {
    width: '100%',
    backgroundColor: '#202325',
    // padding: 20,
  },
  flagModalButtonRow: {
    flexDirection: 'row',
    //   marginBottom: 1,
      width: '100%',
    height:50
  },
  flagModalButton: {
    backgroundColor: '#1C1C1E',
    padding: 10,
    // borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
      alignItems: 'center',
      borderBottomLeftRadius:10,
      borderBottomRightRadius:10
  },
  flagModalButtonText: {
    color: '#E71E1E',
    fontSize: 17,
  },
  flagModalCloseButton: {
    marginTop: 20,
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  flagModalCloseButtonText: {
    color: 'white',
      fontSize: 17,
    fontWeight:'900'
    },
});

export default UserProfilePage;
