import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SoulResetRoom() {
  const navigation = useNavigation();
  const [duration, setDuration] = useState(null);
  const [mode, setMode] = useState(null);

  const handleStart = () => {
    if (duration && mode) {
      navigation.navigate('ResetSession', { duration, mode });
    }
  };

  const renderButton = (label, onPress, selected) => (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.optionButton, selected && styles.selectedButton]}
    >
      <Text style={[styles.optionText, selected && styles.selectedText]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose your clarity break:</Text>
      <Text style={styles.subtitle}>Even one quiet moment can return you to yourself.</Text>

      <Text style={styles.sectionTitle}>How many minutes?</Text>
      <View style={styles.row}>
        {renderButton('1 min', () => setDuration(1), duration === 1)}
        {renderButton('3 min', () => setDuration(3), duration === 3)}
        {renderButton('5 min', () => setDuration(5), duration === 5)}
      </View>

      <Text style={styles.sectionTitle}>Choose your vibe:</Text>
      <View style={styles.row}>
        {renderButton('Guided', () => setMode('guided'), mode === 'guided')}
        {renderButton('Music', () => setMode('music'), mode === 'music')}
        {renderButton('Silent', () => setMode('silent'), mode === 'silent')}
      </View>

      <TouchableOpacity style={styles.startButton} onPress={handleStart}>
        <Text style={styles.startText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7F9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3B3B6D',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#3B3B6D',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3B3B6D',
    marginTop: 20,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 10,
  },
  optionButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#5C6BC0',
  },
  selectedButton: {
    backgroundColor: '#DCE1F4',
  },
  optionText: {
    fontSize: 14,
    color: '#3B3B6D',
  },
  selectedText: {
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: '#F7C8B4',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 30,
  },
  startText: {
    color: '#3B3B6D',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
