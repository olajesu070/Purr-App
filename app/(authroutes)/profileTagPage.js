import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  PanResponder,
  Animated,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import ThemedButton from '@/components/ThemedButton';

const SCALE_WIDTH = 280; // Total width of the scale (adjust as needed)
const MAX_VALUE = 10.0; // Max value on the scale
const BODY_TYPE_SCALE_WIDTH = 280; // Total width of scale
const BODY_TYPE_MAX = 6; // 0 (None) to 6 (Curvy)
const BODY_TYPE_LABELS = [
  'None',
  'Slim',
  'Average',
  'Full Figured',
  'Plus Size',
  'Toned',
  'Curvy',
];

const ProfileTagPage = () => {
  const [currentView, setCurrentView] = useState(1);
  const [selectedTags, setSelectedTags] = useState({
    industry: [],
    zodiac: [],
    interests: [],
    activities: [],
    sexuality: [],
    gender: [],
    pronouns: [],
    positionPreference: [],
    pride: [],
    prowlingFor: [],
    ethnicity: [],
    relationshipStatus: [],
  });

  const [value, setValue] = useState(0.0);
  const pan = useRef(new Animated.Value(0)).current;
  const [bodyTypeValue, setBodyTypeValue] = useState(0);
  const bodyTypePan = useRef(new Animated.Value(0)).current;

  // Convert position to scale value (0.00 - 10.00)
  const positionToValue = (posX) => (posX / SCALE_WIDTH) * MAX_VALUE;

  // Convert scale value to position
  const valueToPosition = (val) => (val / MAX_VALUE) * SCALE_WIDTH;

  // Move CatHead smoothly
  const moveCatHead = (newValue) => {
    const clampedValue = Math.max(0, Math.min(MAX_VALUE, newValue)); // Keep within bounds
    setValue(clampedValue.toFixed(2));
    Animated.spring(pan, {
      toValue: valueToPosition(clampedValue),
      useNativeDriver: false,
      speed: 10, // Smooth transition
    }).start();
  };

  // Dragging logic
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      moveCatHead(positionToValue(gesture.moveX));
    },
    onPanResponderRelease: () => pan.flattenOffset(),
  });

  // Convert position to body type (0 - 6)
  const positionToBodyType = (posX) => {
    let value = Math.round((posX / SCALE_WIDTH) * MAX_BODY_TYPE);
    return Math.max(0, Math.min(MAX_BODY_TYPE, value)); // Keep within range
  };

  // Convert body type value to position
  const bodyTypeToPosition = (val) => (val / MAX_BODY_TYPE) * SCALE_WIDTH;

  // Move CatHead smoothly
  const bodyTypeMoveCatHead = (newValue) => {
    setBodyType(newValue);
    Animated.spring(pan, {
      toValue: bodyTypeToPosition(newValue),
      useNativeDriver: false,
      speed: 10, // Smooth transition
    }).start();
  };
  // new
  // Convert position to body type (0 - 6)
  const bodyTypePositionToValue = (posX) => {
    let value = Math.round((posX / BODY_TYPE_SCALE_WIDTH) * BODY_TYPE_MAX);
    return Math.max(0, Math.min(BODY_TYPE_MAX, value)); // Keep within range
  };

  // Convert body type value to position
  const bodyTypeValueToPosition = (val) =>
    (val / BODY_TYPE_MAX) * BODY_TYPE_SCALE_WIDTH;

  // Move CatHead smoothly
  const moveBodyTypeCatHead = (newValue) => {
    setBodyTypeValue(newValue);
    Animated.spring(bodyTypePan, {
      toValue: bodyTypeValueToPosition(newValue),
      useNativeDriver: false,
      speed: 10, // Smooth transition
    }).start();
  };

  // Dragging logic
  const bodyTypePanResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      moveBodyTypeCatHead(bodyTypePositionToValue(gesture.moveX));
    },
    onPanResponderRelease: () => bodyTypePan.flattenOffset(),
  });

  const handleTagSelect = (category, tag) => {
    setSelectedTags((prevState) => {
      const updatedTags = [...prevState[category]];
      if (updatedTags.includes(tag)) {
        updatedTags.splice(updatedTags.indexOf(tag), 1); // Remove tag if already selected
      } else {
        updatedTags.push(tag); // Add tag if not selected
      }
      return { ...prevState, [category]: updatedTags };
    });
  };

  const handleNext = () => {
    setCurrentView((prev) => prev + 1);
  };
  const handleProceed = () => {
    router.push({
      pathname: '/profileAndPledgePage',
    });
  };

  return (
    <ThemedView style={styles.container}>
      {currentView === 1 && (
        <View style={styles.containerss}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.push('/registrationPage')}>
              <Ionicons name="chevron-back" size={24} color="white" />
            </TouchableOpacity>
            <ThemedText style={styles.buildProfileText}>
              Build Your Profile
            </ThemedText>

            <TouchableOpacity onPress={handleNext}>
              <ThemedText style={styles.skipText}>Skip</ThemedText>
            </TouchableOpacity>
          </View>
          <View>
            <ThemedText style={styles.tagSelectionInstruction}>
              Choose one, some, or none...your choice!
            </ThemedText>
          </View>

          <ScrollView contentContainerStyle={styles.formContainer}>
            {/* Interest Tags */}
            <View style={styles.categoryContainer}>
              <ThemedText style={styles.categoryTitle}>
                Your <Text style={styles.spanText}>Interests</Text>
              </ThemedText>
              <View style={styles.tagsContainer}>
                {[
                  'Art',
                  'Music',
                  'Movies',
                  'History',
                  'POC Creations',
                  'Anime',
                  'Travel',
                  'Craft',
                  'Queer Creations',
                  'Social Media',
                  'Politics',
                  'Gaming',
                  'Sustainability',
                  'Boba',
                  'Education',
                  'Fashion',
                  'Poetry',
                  'Pop-Culture',
                  'Law',
                  'Health',
                  'Vegan',
                  'Dystopia',
                  'TikTok',
                  'Cosplay',
                  'Tatto',
                  'Witchcraft',
                  'Activism',
                  'Reading',
                  'Animation',
                  'LGBTQ+Activism',
                  'Photography',
                ].map((tag) => (
                  <TouchableOpacity
                    key={tag}
                    style={[
                      styles.tag,
                      selectedTags.interests.includes(tag) &&
                        styles.selectedTag,
                    ]}
                    onPress={() => handleTagSelect('interests', tag)}
                  >
                    <Text
                      style={[
                        styles.tagText,
                        selectedTags.interests.includes(tag) &&
                          styles.selectedTagText,
                      ]}
                    >
                      {tag}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Activities Tags */}
            <View style={styles.categoryContainer}>
              <ThemedText style={styles.categoryTitle}>
                Your <Text style={styles.spanText}>Activities</Text>
              </ThemedText>
              <View style={styles.tagsContainer}>
                {[
                  'Art',
                  'Music',
                  'Movies',
                  'History',
                  'POC Creations',
                  'Anime',
                  'Travel',
                  'Craft',
                  'Queer Creations',
                  'Social Media',
                  'Politics',
                  'Gaming',
                  'Sustainability',
                  'Boba',
                  'Education',
                  'Fashion',
                  'Poetry',
                  'Pop-Culture',
                  'Law',
                  'Health',
                  'Vegan',
                  'Dystopia',
                  'TikTok',
                  'Cosplay',
                  'Tatto',
                  'Witchcraft',
                  'Activism',
                  'Reading',
                  'Animation',
                  'LGBTQ+Activism',
                  'Photography',
                ].map((tag) => (
                  <TouchableOpacity
                    key={tag}
                    style={[
                      styles.tag,
                      selectedTags.activities.includes(tag) &&
                        styles.selectedTag,
                    ]}
                    onPress={() => handleTagSelect('activities', tag)}
                  >
                    <Text
                      style={[
                        styles.tagText,
                        selectedTags.activities.includes(tag) &&
                          styles.selectedTagText,
                      ]}
                    >
                      {tag}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* ZOdiac Tags */}
            <View style={styles.categoryContainer}>
              <ThemedText style={styles.categoryTitle}>
                Your <Text style={styles.spanText}>Zodiac</Text>
              </ThemedText>
              <View style={styles.tagsContainer}>
                {[
                  'Art',
                  'Music',
                  'Movies',
                  'History',
                  'POC Creations',
                  'Anime',
                  'Travel',
                  'Craft',
                  'Queer Creations',
                  'Social Media',
                  'Politics',
                  'Gaming',
                  'Sustainability',
                  'Boba',
                  'Education',
                  'Fashion',
                  'Poetry',
                  'Pop-Culture',
                  'Law',
                  'Health',
                  'Vegan',
                  'Dystopia',
                  'TikTok',
                  'Cosplay',
                  'Tatto',
                  'Witchcraft',
                  'Activism',
                  'Reading',
                  'Animation',
                  'LGBTQ+Activism',
                  'Photography',
                ].map((tag) => (
                  <TouchableOpacity
                    key={tag}
                    style={[
                      styles.tag,
                      selectedTags.activities.includes(tag) &&
                        styles.selectedTag,
                    ]}
                    onPress={() => handleTagSelect('zodiac', tag)}
                  >
                    <Text
                      style={[
                        styles.tagText,
                        selectedTags.zodiac.includes(tag) &&
                          styles.selectedTagText,
                      ]}
                    >
                      {tag}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Industry Tags */}
            <View style={styles.categoryContainer}>
              <ThemedText style={styles.categoryTitle}>
                Your <Text style={styles.spanText}>Industry</Text>
              </ThemedText>
              <View style={styles.tagsContainer}>
                {[
                  'Art',
                  'Music',
                  'Movies',
                  'History',
                  'POC Creations',
                  'Anime',
                  'Travel',
                  'Craft',
                  'Queer Creations',
                  'Social Media',
                  'Politics',
                  'Gaming',
                  'Sustainability',
                  'Boba',
                  'Education',
                  'Fashion',
                  'Poetry',
                  'Pop-Culture',
                  'Law',
                  'Health',
                  'Vegan',
                  'Dystopia',
                  'TikTok',
                  'Cosplay',
                  'Tatto',
                  'Witchcraft',
                  'Activism',
                  'Reading',
                  'Animation',
                  'LGBTQ+Activism',
                  'Photography',
                ].map((tag) => (
                  <TouchableOpacity
                    key={tag}
                    style={[
                      styles.tag,
                      selectedTags.industry.includes(tag) && styles.selectedTag,
                    ]}
                    onPress={() => handleTagSelect('industry', tag)}
                  >
                    <Text
                      style={[
                        styles.tagText,
                        selectedTags.industry.includes(tag) &&
                          styles.selectedTagText,
                      ]}
                    >
                      {tag}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
          {/* Fixed Buttons */}
          <View style={styles.fixedButtonContainer}>
            <ThemedButton
              title="Next"
              onPress={handleNext}
              style={styles.button}
            />
            <ThemedButton
              title="Skip"
              onPress={handleNext}
              style={styles.skipButton}
            />
          </View>
        </View>
      )}

      {currentView === 2 && (
        <View>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.push('/registrationPage')}>
              <Ionicons name="chevron-back" size={24} color="white" />
            </TouchableOpacity>
            <ThemedText style={styles.buildProfileText}>
              Build Your Profile
            </ThemedText>

            <TouchableOpacity onPress={handleNext}>
              <ThemedText style={styles.skipText}>Skip</ThemedText>
            </TouchableOpacity>
          </View>
          <View>
            <ThemedText style={styles.tagSelectionInstruction}>
              Choose one, some, or none...your choice!
            </ThemedText>
          </View>
          <ScrollView contentContainerStyle={styles.formContainer}>
            {/* Additional Categories */}
            {[
              {
                title: 'Sexuality',
                category: 'sexuality',
                tags: [
                  'Heterosexual',
                  'Homosexual',
                  'Bisexual',
                  'Pansexual',
                  'Asexual',
                ],
              },
              {
                title: 'Gender',
                category: 'gender',
                tags: ['Male', 'Female', 'Non-Binary', 'Genderqueer'],
              },
              {
                title: 'Pronouns',
                category: 'pronouns',
                tags: ['He/Him', 'She/Her', 'They/Them'],
              },
              {
                title: 'Position Preference',
                category: 'positionPreference',
                tags: ['Top', 'Bottom', 'Versatile'],
              },
              {
                title: 'Pride',
                category: 'pride',
                tags: ['LGBTQ+', 'Ally', 'Advocate', 'Activist'],
              },
              {
                title: 'Prowling For',
                category: 'prowlingFor',
                tags: [
                  'Friendship',
                  'Networking',
                  'Dating',
                  'Long-term Relationship',
                ],
              },
              {
                title: 'Ethnicity',
                category: 'ethnicity',
                tags: [
                  'Asian',
                  'Black',
                  'Caucasian',
                  'Hispanic',
                  'Mixed Race',
                  'Other',
                ],
              },
              {
                title: 'Relationship Status',
                category: 'relationshipStatus',
                tags: [
                  'Single',
                  'In a Relationship',
                  'Married',
                  'Open Relationship',
                ],
              },
            ].map(({ title, category, tags }) => (
              <View>
                <View style={styles.categoryContainer} key={category}>
                  <ThemedText style={styles.categoryTitle}>
                    Your <Text style={styles.spanText}>{title}</Text>
                  </ThemedText>
                  <View style={styles.tagsContainer}>
                    {tags.map((tag) => (
                      <TouchableOpacity
                        key={tag}
                        style={[
                          styles.tag,
                          selectedTags[category].includes(tag) &&
                            styles.selectedTag,
                        ]}
                        onPress={() => handleTagSelect(category, tag)}
                      >
                        <Text
                          style={[
                            styles.tagText,
                            selectedTags[category].includes(tag) &&
                              styles.selectedTagText,
                          ]}
                        >
                          {tag}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
            ))}
            <View style={styles.catheadScaleContainer}>
              {/* Header Row */}
              <View style={styles.headerRow}>
                <TouchableOpacity
                  onPress={() => moveCatHead(0.0)}
                  style={styles.resetButton}
                >
                  <Text style={styles.resetText}>Reset</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Height</Text>
                <Text style={styles.measurement}>
                  {Math.floor(value)}' {((value % 1) * 12).toFixed(0)}"
                </Text>
              </View>

              {/* Scale Row (Clickable) */}
              <TouchableWithoutFeedback
                onPress={(event) =>
                  moveCatHead(positionToValue(event.nativeEvent.locationX))
                }
              >
                <View style={styles.scaleRow}>
                  <View style={styles.scaleLine} />

                  {/* Draggable Cat Head */}
                  <Animated.View
                    {...panResponder.panHandlers}
                    style={[
                      styles.catHead,
                      { transform: [{ translateX: pan }] },
                    ]}
                  >
                    <Image
                      source={require('../../assets/images/catHead.png')}
                      style={styles.catImage}
                    />
                  </Animated.View>
                </View>
              </TouchableWithoutFeedback>

              {/* Scale Numbers */}
              <View style={styles.scaleNumbers}>
                {[...Array(11)].map((_, i) => (
                  <Text key={i} style={styles.scaleText}>
                    {i}
                  </Text>
                ))}
              </View>
            </View>

            <View style={styles.bodyTypeContainer}>
              {/* Header Row */}
              <View style={styles.bodyTypeHeaderRow}>
                <TouchableOpacity
                  onPress={() => moveBodyTypeCatHead(0)}
                  style={styles.bodyTypeResetButton}
                >
                  <Text style={styles.bodyTypeResetText}>Reset</Text>
                </TouchableOpacity>
                <Text style={styles.bodyTypeHeaderTitle}>Body Type</Text>
                <Text style={styles.bodyTypeMeasurement}>
                  {BODY_TYPE_LABELS[bodyTypeValue]}
                </Text>
              </View>

              {/* Scale Row (Clickable) */}
              <TouchableWithoutFeedback
                onPress={(event) =>
                  moveBodyTypeCatHead(
                    bodyTypePositionToValue(event.nativeEvent.locationX)
                  )
                }
              >
                <View style={styles.bodyTypeScaleRow}>
                  {/* Scale Line */}
                  <View style={styles.bodyTypeScaleLine}>
                    {/* Tick Marks */}
                    {Array.from({ length: BODY_TYPE_MAX + 1 }).map((_, i) => (
                      <View
                        key={i}
                        style={[
                          styles.bodyTypeTickMark,
                          { left: `${(i / BODY_TYPE_MAX) * 100}%` }, // Position tick marks correctly
                        ]}
                      />
                    ))}
                  </View>

                  {/* Draggable Cat Head */}
                  <Animated.View
                    {...bodyTypePanResponder.panHandlers}
                    style={[
                      styles.bodyTypeCatHead,
                      { transform: [{ translateX: bodyTypePan }] },
                    ]}
                  >
                    <Image
                      source={require('../../assets/images/catHead.png')}
                      style={styles.bodyTypeCatImage}
                    />
                  </Animated.View>
                </View>
              </TouchableWithoutFeedback>

              {/* Scale Labels */}
              <View style={styles.bodyTypeScaleNumbers}>
                {BODY_TYPE_LABELS.map((label, i) => (
                  <Text key={i} style={styles.bodyTypeScaleText}>
                    {label}&nbsp;
                  </Text>
                ))}
              </View>
            </View>
          </ScrollView>
          <View style={styles.fixedButtonContainer}>
            <ThemedButton
              title="Next"
              onPress={handleProceed}
              style={styles.button}
            />
            <ThemedButton
              title="Skip"
              onPress={handleProceed}
              style={styles.skipButton}
            />
          </View>
        </View>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  formContainer: {
    paddingBottom: 170,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  buildProfileText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  skipText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#B976FF',
  },
  tagSelectionInstruction: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    fontStyle: 'italic',
    textAlign: 'center',
    alignSelf: 'center',
    marginBottom: 14,
  },
  categoryContainer: {
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  spanText: {
    color: '#B976FF',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    margin: 3,
    borderRadius: 32,
    backgroundColor: '#303437',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  selectedTag: {
    backgroundColor: '#B976FF',
  },
  tagText: {
    color: '#fff',
    fontSize: 14,
  },
  selectedTagText: {
    color: '#fff',
  },
  button: {
    // marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  fixedButtonContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    backgroundColor: '#040406',
    paddingVertical: 5,
    // paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#B976FF',
    // paddingVertical: 15,
    marginBottom: 10,
  },
  skipButton: {
    backgroundColor: 'transparent',
    // paddingVertical: 10,
    borderWidth: 2,
    borderColor: '#6C7072',
  },

  //   the measurement scale/
  catheadScaleContainer: {
    alignItems: 'center',
    // padding: 20,
    width: '100%',
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    // paddingHorizontal: 20,
    marginBottom: 10,
    color: '#fff',
  },
  resetButton: {
    // padding: 5,
  },
  resetText: {
    color: 'purple',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  measurement: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  scaleRow: {
    width: SCALE_WIDTH,
    height: 50,
    position: 'relative',
    justifyContent: 'center',
  },
  scaleLine: {
    width: '100%',
    height: 3,
    backgroundColor: '#6C7072',
    position: 'absolute',
  },
  catHead: {
    position: 'absolute',
    top: 10,
    left: 0,
  },
  catImage: {
    width: 26,
    height: 27,
  },
  scaleNumbers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: SCALE_WIDTH,
    marginTop: 10,
    color: '#fff',
  },
  scaleText: {
    fontSize: 14,
    color: '#fff',
  },

  //   body type scale
  bodyTypeContainer: {
    alignItems: 'center',
    // padding: 20,
    width: '100%',
  },
  bodyTypeHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    // paddingHorizontal: 20,
    // marginBottom: 10,
    marginTop: 30,
  },
  bodyTypeResetButton: {
    padding: 5,
  },
  bodyTypeResetText: {
    color: 'purple',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bodyTypeHeaderTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  bodyTypeMeasurement: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  bodyTypeScaleRow: {
    width: BODY_TYPE_SCALE_WIDTH,
    height: 50,
    position: 'relative',
    justifyContent: 'center',
  },
  bodyTypeScaleLine: {
    width: '100%',
    height: 3,
    backgroundColor: '#6C7072',
    position: 'absolute',
  },
  bodyTypeTickMark: {
    position: 'absolute',
    width: 3,
    height: 12,
    backgroundColor: '#6C7072',
    top: -4,
  },
  bodyTypeCatHead: {
    position: 'absolute',
    top: 10,
    left: 0,
  },
  bodyTypeCatImage: {
    width: 26,
    height: 27,
  },
  bodyTypeScaleNumbers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: BODY_TYPE_SCALE_WIDTH,
    color: '#fff',
    marginTop: 10,
  },
  bodyTypeScaleText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default ProfileTagPage;
