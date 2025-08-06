import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MorningAffirmations from './data/MorningAffirmations';

export default function MorningScreen() {
  const navigation = useNavigation();
  const [intention, setIntention] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const getRandomAffirmation = () => {
    const index = Math.floor(Math.random() * MorningAffirmations.length);
    return MorningAffirmations[index];
  };

  const [affirmation, setAffirmation] = useState(getRandomAffirmation());

  const handleSubmit = () => {
    setAffirmation(getRandomAffirmation());
    setSubmitted(true);
  };

  const resetEntry = () => {
    setIntention('');
    setSubmitted(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.select({ ios: 'padding', android: undefined })}
      >
      {!submitted ? (
        <>
          <Text style={styles.title}>Morning Centering</Text>
          <Text style={styles.subtitle}>Welcome to your clean slate</Text>
          <Text style={styles.prompt}>What is your intention today?</Text>
          <TextInput
            style={styles.input}
            value={intention}
            onChangeText={setIntention}
            placeholder="Enter your intention"
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.subtitle}>
            Your intention has been whispered to the wind:
          </Text>
          <Text style={styles.userIntention}>"{intention}"</Text>
          <Text style={styles.affirmation}>{affirmation}</Text>

          <Text style={styles.magicPrompt}>
            Feeling called to set another focus?
          </Text>
          <TouchableOpacity style={styles.secondaryButton} onPress={resetEntry}>
            <Text style={styles.secondaryButtonText}>Add Another Intention</Text>
          </TouchableOpacity>
        </>
      )}

      <View style={styles.bottomNav}>
        {[
          { label: 'Home', target: 'Home' },
          { label: 'Bedtime', target: 'Bedtime' },
          { label: 'Soulful Pause', target: 'SoulfulPause' },
          { label: 'Soul Reset', target: 'SoulReset' },
        ].map(({ label, target }) => (
          <TouchableOpacity
            key={label}
            onPress={() => navigation.navigate(target)}
          >
            <Text style={styles.navButton}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFBEA',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFBEA',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#4B0082',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#4B0082',
    marginBottom: 10,
    textAlign: 'center',
  },
  prompt: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  input: {
    width: '90%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#4B0082',
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
    color: '#4B0082',
    backgroundColor: '#FFFFFF',
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    borderColor: '#4B0082',
    borderWidth: 1,
    marginTop: 10,
  },
  buttonText: {
    color: '#4B0082',
    fontSize: 16,
    fontWeight: '600',
  },
  userIntention: {
    fontSize: 20,
    fontWeight: '500',
    color: '#4B0082',
    fontStyle: 'italic',
    marginVertical: 12,
    textAlign: 'center',
  },
  affirmation: {
    fontSize: 18,
    color: '#4B0082',
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 12,
  },
  magicPrompt: {
    fontSize: 15,
    fontStyle: 'italic',
    color: '#6A5ACD',
    marginBottom: 8,
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: '#E6D6FA',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  secondaryButtonText: {
    color: '#4B0082',
    fontWeight: '600',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    backgroundColor: '#E6E6FA',
    paddingVertical: 12,
    borderRadius: 16,
  },
  navButton: {
    color: '#4B0082',
    fontWeight: '600',
    fontSize: 16,
  },
});
