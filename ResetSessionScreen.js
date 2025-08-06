import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Animated, StyleSheet, TouchableOpacity, Vibration } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ResetSessionScreen({ route = {} }) {
  const { duration = 1 } = route.params || {};
  const [countdown, setCountdown] = useState(duration * 60);
  const [showComplete, setShowComplete] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [breathText, setBreathText] = useState('Inhale');
  const navigation = useNavigation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setShowComplete(true);
          Vibration.vibrate(500);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const breathInterval = setInterval(() => {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.5,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]).start();
      setBreathText((prev) => (prev === 'Inhale' ? 'Exhale' : 'Inhale'));
    }, 4000);

    return () => clearInterval(breathInterval);
  }, []);

  const handleReturnHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Even one quiet moment can return you to yourself</Text>
      <Animated.View style={[styles.bubble, { transform: [{ scale: scaleAnim }] }]}>
        <Text style={styles.breathText}>{breathText}</Text>
      </Animated.View>
      {showComplete ? (
        <Text style={styles.complete}>You honored yourself today.</Text>
      ) : (
        <>
          <TouchableOpacity style={styles.button} onPress={handleReturnHome}>
            <Text style={styles.buttonText}>Return Home</Text>
          </TouchableOpacity>
          <Text style={styles.countdown}>{formatTime(countdown)}</Text>
        </>
      )}
    </View>
  );
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D6F4F4',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 100,
    paddingBottom: 40,
  },
  title: {
    fontSize: 18,
    color: '#3A237A',
    textAlign: 'center',
    marginBottom: 40,
    marginHorizontal: 20,
  },
  bubble: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#EADCF3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  breathText: {
    fontSize: 24,
    color: '#3A237A',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#FACBAA',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginBottom: 10,
  },
  buttonText: {
    color: '#3A237A',
    fontWeight: 'bold',
    fontSize: 16,
  },
  countdown: {
    fontSize: 20,
    color: '#3A237A',
    marginTop: 10,
  },
  complete: {
    fontSize: 22,
    color: '#3A237A',
    textAlign: 'center',
    marginTop: 20,
  },
});
