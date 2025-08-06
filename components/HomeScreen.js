import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Logo from '../SoulSpaLogo.png';
import questions from './data/questions';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [questionIndex, setQuestionIndex] = useState(0);

  useEffect(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    if (questions?.length) {
      setQuestionIndex(dayOfYear % questions.length);
    }
  }, []);

  const question = questions?.[questionIndex];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={Logo} style={styles.logo} resizeMode="contain" />

      <Text style={styles.reflectionText}>Soul Reflection of the Day</Text>
      <Text style={styles.magicPhrase}>
        Let this question shimmer quietly in the background of your day...
      </Text>
      <Text style={styles.questionText}>{question}</Text>

      <View style={styles.divider} />

      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => navigation.navigate('SoulfulPause')}
      >
        <Ionicons name="leaf" size={24} color="#6A5ACD" style={styles.icon} />
        <Text style={styles.tabText}>Soulful Pause</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => navigation.navigate('Morning')}
      >
        <Ionicons name="sunny" size={24} color="#F5A623" style={styles.icon} />
        <Text style={styles.tabText}>Morning Centering</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => navigation.navigate('Bedtime')}
      >
        <Ionicons name="moon" size={24} color="#8E44AD" style={styles.icon} />
        <Text style={styles.tabText}>Bedtime Peace</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => navigation.navigate('SoulReset')}
      >
        <Ionicons
          name="refresh-circle"
          size={24}
          color="#16A085"
          style={styles.icon}
        />
        <Text style={styles.tabText}>Soul Reset</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D8BFD8',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 220,
    height: 220,
    marginBottom: 10,
  },
  reflectionText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#4B0082',
    marginBottom: 6,
    textAlign: 'center',
  },
  magicPhrase: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#4B0082',
    marginBottom: 12,
    paddingHorizontal: 30,
    textAlign: 'center',
  },
  questionText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#4B0082',
    marginBottom: 20,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#E6E6FA',
    width: '80%',
    marginBottom: 20,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3E5F5',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 12,
    marginVertical: 8,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 18,
    marginLeft: 12,
    color: '#4B0082',
    fontWeight: '500',
  },
  icon: {
    marginRight: 8,
  },
});
