import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import affirmations from './data/affirmations'; // this file should already be in your /data folder

export default function RevealInsightScreen() {
  const [showInsight, setShowInsight] = useState(false);
  const [affirmation, setAffirmation] = useState('');
  const [question, setQuestion] = useState('');

  const insights = [
    'What am I being invited to notice today?',
    'What does my soul long for in this moment?',
    'Where can I release control and soften?',
    'What belief is ready to shift?',
    'Who would I be without this thought?',
    'Where is the wonder hiding today?',
    'What part of me needs my love right now?',
  ];

  const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const reveal = () => {
    setAffirmation(getRandomItem(affirmations));
    setQuestion(getRandomItem(insights));
    setShowInsight(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Return to Your Center</Text>

      {!showInsight ? (
        <TouchableOpacity style={styles.button} onPress={reveal}>
          <Text style={styles.buttonText}>Reveal Insight</Text>
        </TouchableOpacity>
      ) : (
        <>
          <Text style={styles.affirmation}>{affirmation}</Text>
          <Text style={styles.question}>{question}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F2F2',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 40,
    color: '#003333',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#FF9933',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 30,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  affirmation: {
    fontSize: 22,
    fontStyle: 'italic',
    color: '#006666',
    textAlign: 'center',
    marginVertical: 20,
  },
  question: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
});
