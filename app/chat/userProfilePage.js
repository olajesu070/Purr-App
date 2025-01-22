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
import UserProfileChat from '../../assets/images/userProfileChat.png';
import UserProfileFootstamp from '../../assets/images/userProfileFootstamp.png';
import GoogleAdsImage from '../../assets/images/googleAds.png';




const UserProfilePage = ({ navigation }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [activeTab, setActiveTab] = useState("about");
  const [flagModalVisible, setFlagModalVisible] = useState(false);
  const [blockUserModalVisible, setBlockUserModalVisible] = useState(false);
  const router = useRouter();
  const handleOpenFlagModal = () => setFlagModalVisible(true);
  const handleCloseFlagModal = () => setFlagModalVisible(false);

    
    // Reusable UserTag Component
    const UserTag = ({ text }) => {
      return (
        <View style={styles.userTag}>
          <Text style={styles.tagText}>{text}</Text>
        </View>
      );
    };


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
               source={UserProfileImage}
              style={styles.fullScreenImage}
            />
          </TouchableOpacity>
        </Modal>

        {/* Purple Line */}
        <View style={styles.lineContainer}>
            <View style={styles.grayLine} />
            <View style={styles.purpleLine} />
            <View style={styles.grayLine} />
        </View>


        {/* User Info Row */}
        <View style={styles.userInfoRow}>
          <View style={styles.userInfoLeft}>
            <View style={styles.onlineBadge} />
            <Text style={styles.username}>Danielle,</Text>
            <Text style={styles.age}>25</Text>
          </View>
          <View style={styles.chatIcons}>
                <TouchableOpacity>
                        <Image
                        source={UserProfileFootstamp}
                        style={styles.userProfileImage}
                        />
                </TouchableOpacity>
                      <TouchableOpacity style={styles.chatIconSpacing} onPress={() => router.back()}>
                          <Image
                                source={UserProfileChat}
                                style={styles.userProfileImage}
                            />
                        </TouchableOpacity>
          </View>
        </View>

       <View style={styles.userTagContainer}>
            <UserTag text="She/Her" />
            <UserTag text="2 miles away" />
        </View>

              

        {/* Tabs (About Me | Stats) */}
        <View style={styles.tabs}>
      {/* About Me Tab */}
      <TouchableOpacity
        style={[styles.tab, activeTab === "about" && styles.activeTab]}
        onPress={() => setActiveTab("about")}
      >
        <Text style={[styles.tabText, activeTab === "about" && styles.activeTabText]}>
          About Me
        </Text>
      </TouchableOpacity>

      {/* Stats Tab */}
      <TouchableOpacity
        style={[styles.tab, activeTab === "stats" && styles.activeTab]}
        onPress={() => setActiveTab("stats")}
                  >
                      <View>
                          <Text style={[styles.tabText, activeTab === "stats" && styles.activeTabText]}>
                            Stats
                            </Text>
                      </View>
        
      </TouchableOpacity>
    </View>

              <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 20 }}>
        <Image source={GoogleAdsImage} style={styles.googleAdsImage} />
    </View>

        {/* About Me Section */}
              {activeTab === "about" && (
                  <View style={styles.sectionContainer}>
                        <View>
                            <Text style={styles.sectionLabel}>About</Text>
                        </View>
                        <View style={styles.section}>
                            <Text style={styles.sectionContent}>
                            I love traveling and meeting new people.
                            </Text>
                        </View>
                    </View>
                )}

       {/* Stats Section */}
       {activeTab === "stats" && (
        <View style={styles.sectionContainer}>
            {/* About Section */}
            <View>
            <Text style={styles.sectionLabel}>About</Text>
            </View>
            <View style={styles.section}>
            <Text style={styles.sectionContent}>
                I love traveling and meeting new people.
            </Text>
            </View>

           {/* Tags Section */}
<View style={styles.tagSection}>
    <Text style={styles.tagTitle}>Height</Text>
    <View style={styles.userTagContainer}>
        <UserTag text="5’5”" />
    </View>

    <Text style={styles.tagTitle}>Gender Identity</Text>
    <View style={styles.userTagContainer}>
        <UserTag text="Queer" />
        <UserTag text="Woman" />
    </View>
                          
                          <Text style={styles.tagTitle}>Sexual Identity</Text>
    <View style={styles.userTagContainer}>
        <UserTag text="Lesbian" />
    </View>
                          
  <Text style={styles.tagTitle}>Prides</Text>
    <View style={styles.userTagContainer}>
        <UserTag text="Hey Mamas" />
        <UserTag text="Lipstick" />
    </View>
                          

  <Text style={styles.tagTitle}>Relationship Status</Text>
    <View style={styles.userTagContainer}>
        <UserTag text="Single" />
     </View>
                          

  <Text style={styles.tagTitle}>Position</Text>
    <View style={styles.userTagContainer}>
        <UserTag text="Pillow Princess" />
                          </View>
                          
    <Text style={styles.tagTitle}>Prowling For</Text>
    <View style={styles.userTagContainer}>
        <UserTag text="Relationship" />
        <UserTag text="Hookups" />
        <UserTag text="Dates" />
        </View>
                          
                          <Text style={styles.tagTitle}>Body Type</Text>
    <View style={styles.userTagContainer}>
        <UserTag text="Average" />
    </View>
                        
                          

</View>

        </View>
        )}
      </ScrollView>

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
    width: 350,
    height: 400,
    alignSelf: "center",
      resizeMode: 'cover',
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
    userProfileImage: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    },
  
  lineContainer: {
    flexDirection: "row",
    width: "30%", // Adjust width as needed
    alignSelf: "center",
    marginVertical: 20,
    justifyContent: "center",
  },
  grayLine: {
    height: 3,
    backgroundColor: "#202325",
    flex: 1, // Each section takes equal width
  },
  purpleLine: {
    height: 3,
    backgroundColor: "#B976FF",
    flex: 1, // The middle part has the same width as the others
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
  width: "98%",
  marginTop: 10,
  backgroundColor: "#202325",
  alignSelf: "center", // Centers the tabs horizontally
  justifyContent: "center", // Ensures content is centered inside
  borderRadius: 8, // Optional: adds rounded corners
//   paddingVertical: 5, 
},
  tab: {
    flex: 1, // Each tab takes up 50% of the width
    padding: 10,
    alignItems: "center",
  },
  activeTab: {
      backgroundColor: "#303437",
      borderRadius: 6
    
  },
  tabText: {
    color: "white",
    fontSize: 16,
  },
  activeTabText: {
    fontWeight: "bold",
    },
  
    googleAdsImage: {
      backgroundColor:'red'
  },
 section: {
  backgroundColor: "#303437",
  borderRadius: 10, // Rounded corners
  padding: 12, 
     marginTop: 10, 
  marginHorizontal:5
    },
  sectionContainer: {
  padding: 12, 
     marginTop: 10, 
//   marginHorizontal:15
},

sectionContent: {
  fontSize: 16,
  color: "white",
},

  sectionLabel: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "bold",
  },
//   sectionContent: {
//     fontSize: 16,
//     color: "white",
//       marginTop: 5,
//     backgroundColor:'#303437'
    //   },
  tagTitle: {
  fontSize: 16,
  fontWeight: "bold",
      color: "white",
  marginTop:8
//   marginBottom: 8, // Space between title and tags
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
  userTagContainer: {
    flexDirection: "row", // Places tags in a row
    gap: 5, // Space between tags
    alignItems: "center",
      alignSelf: "flex-start", // Centers the tags
    marginTop: 5
  },
  userTag: {
    backgroundColor: "#303437",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  tagText: {
    fontSize: 14,
    color: "#fff",
  },
});

export default UserProfilePage;
