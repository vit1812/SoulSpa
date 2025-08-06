// components/SoulResetScreen.js
import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Linking,
  SafeAreaView,
} from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.75;
const THUMB_HEIGHT = (CARD_WIDTH * 9) / 16;

const affirmations = [
  'I am gentle and kind with my heart.',
  'I relax into the healing process.',
  'I embrace my capacity to grow.',
  'It is fun and safe being me.',
  'Everything is already working out in my favor whether I realize it or not.',
  'I focus on what I appreciate.',
  'I take the next right step.',
  'I lovingly release the past.',
  'I am wise, capable, and abundant.',
  'I love living in my magnificent, healthy body.',
  'I am attracted to all that is good for me and all that is good for me is attracted to me.',
  'I receive love and abundance with open arms.',
  'I remain present and grounded in spite of anything.',
  'I unconditionally love and respect myself and others now.',
  'I am so grateful for my loving and fun connections with others.',
  'I am safe. I am powerful. I am cherished. I am wise.',
  'I have clear and focused goals and commit to them.',
  'I courageously and lovingly speak my truth at the right time to the right person.',
  'I am in sync with my Higher Power and rest in the shelter of infinite unconditional love.',
  'I am so happy and grateful now that I am the artist of my reality.',
  'Every choice, every action and every feeling contribute to my beautiful life!',
];

export default function SoulResetScreen({ navigation }) {
  const [showAffirmations, setShowAffirmations] = useState(false);

  const sections = [
    {
      title: 'Free Meditations',
      videos: [
        { id: 'rYd6yOjxzaI', label: 'Morning Affirmation Meditation' },
        { id: 'sAVOl-siF4A', label: 'Sleep Meditation' },
        { id: 'DKhGn9DKCbs', label: 'Starting Over Meditation' },
        { id: 'dpHN6tqSEZE', label: 'Loneliness to Connection Meditation' },
      ],
    },
    {
      title: 'Inner Power Boosts',
      videos: [
        { id: 'QwjTekEgZ34', label: 'Five Tips to Stress Less' },
        { id: 'JGEbFF_oxMY', label: 'Self Care Check-In' },
        { id: 'UWJxQ8xd7QA', label: 'Morning Routine' },
        { id: 'yXDv_HibWYg', label: 'Sleep Hacks' },
        { id: 'v_IMEMjtd_g', label: 'Relationships & Longevity' },
        { id: 'BRLIFUcgs6o', label: 'Make Stress Work for You' },
        { id: 'NSHpmjqGjrc', label: 'Create a New You' },
        { id: 'RoHrs7WPDMg', label: 'Mantras Power' },
        { id: 'iC06_Piv3M8', label: 'Become Bulletproof' },
        { id: '2tInv_DWfK4', label: 'Introduction to Soul Spa' },
      ],
    },
    {
      title: 'Short Breath Break',
      videos: [
        { id: 'jUiAr7Nduu4', label: '30-Second Breath Break' },
      ],
    },
    {
      title: 'Upgrade Meditations',
      videos: [
        { id: '_Pe3_euY2Zc', label: 'Stress Reset Meditation' },
        { id: 'yH-R3DQrHIY', label: 'CEO Clarity Meditation' },
        { id: '_806W0lPEo8', label: 'Meditation for Caregivers' },
      ],
    },
    {
      title: 'Longer Trainings',
      videos: [
        { id: '0BdIWDEYggk', label: 'Success Through Empathy' },
        { id: 'i6tK_1s5g8k', label: 'Intro to Neuro-Linguistic Programming' },
      ],
    },
  ];

  const openYouTube = (videoId) => {
    const url = `https://youtu.be/${videoId}`;
    Linking.openURL(url).catch(() => console.warn("Can't open URL", url));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {sections.map((sec) => (
        <View key={sec.title} style={styles.section}>
          <Text style={styles.sectionTitle}>{sec.title}</Text>
          {sec.videos.map((v) => (
            <View key={v.id} style={styles.card}>
              <Image
                style={styles.thumbnail}
                source={{ uri: `https://img.youtube.com/vi/${v.id}/mqdefault.jpg` }}
              />
              <TouchableOpacity
                style={styles.linkButton}
                onPress={() => openYouTube(v.id)}
              >
                <Text style={styles.linkText}>▶ {v.label}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ))}

      <TouchableOpacity
        style={styles.affToggle}
        onPress={() => setShowAffirmations((s) => !s)}
      >
        <Text style={styles.sectionTitle}>
          {showAffirmations ? 'Hide Daily Affirmations' : 'Healing Daily Affirmations'}
        </Text>
      </TouchableOpacity>
      {showAffirmations && (
        <View style={styles.section}>
          {affirmations.map((text, index) => (
            <View key={index} style={styles.affCard}>
              <Text style={styles.affText}>{text}</Text>
            </View>
          ))}
        </View>
      )}

              <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.homeButtonText}>Return Home</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fef9f5' },
  container: { flexGrow: 1, alignItems: 'center', paddingVertical: 20, backgroundColor: '#fef9f5' },
  section: { width: CARD_WIDTH, marginBottom: 30 },
  sectionTitle: { fontSize: 20, fontWeight: '600', color: '#4B0082', marginBottom: 12 },
  card: { marginBottom: 16, backgroundColor: '#FFF', borderRadius: 12, overflow: 'hidden', elevation: 2 },
  thumbnail: { width: CARD_WIDTH, height: THUMB_HEIGHT },
  linkButton: { padding: 10, backgroundColor: '#6A5ACD' },
  linkText: { color: '#FFF', fontSize: 16, fontWeight: '500', textAlign: 'center' },
  affToggle: { marginVertical: 10 },
  affCard: { backgroundColor: '#FFF', borderRadius: 8, padding: 10, marginBottom: 6, elevation: 1 },
  affText: { fontSize: 14, color: '#4B0082' },
  homeButton: { marginTop: 10, backgroundColor: '#6A5ACD', paddingVertical: 10, paddingHorizontal: 28, borderRadius: 25 },
  homeButtonText: { color: '#FFF', fontSize: 16, fontWeight: '500' },
});
