import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Animated, StyleSheet, Vibration, Dimensions } from 'react-native';
import { Audio } from 'expo-av';

const screenWidth = Dimensions.get('window').width;

export default function ResetSession({ route, navigation }) {
  const { duration = 1, mode = 'silent' } = route.params || {};
  const [secondsLeft, setSecondsLeft] = useState(duration * 60);
  const [isInhale, setIsInhale] = useState(true);
  const [sound, setSound] = useState(null);
  const scale = useRef(new Animated.Value(1)).current;

  // Breathing Animation Loop
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.5,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();

    const textToggle = setInterval(() => {
      setIsInhale((prev) => !prev);
    }, 4000);

    return () => {
      loop.stop();
      clearInterval(textToggle);
    };
  }, []);

  // Countdown Timer
  useEffect(() => {
    if (secondsLeft === 0) {
      Vibration.vibrate(500);
      navigation.navigate('Home'); // return to home
    }
    const timer = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  // Play music if selected
  useEffect(() => {
    let audio;
    const playMusic = async () => {
      if (mode === 'music') {
        audio = new Audio.Sound();
        try {
          await audio.loadAsync(require('../Pausemusicbreath-of-life.mp3'));
          await audio.setIsLoopingAsync(true);
          await audio.playAsync();
          setSound(audio);
        } catch (e) {
          console.error('Audio playback error:', e);
        }
      }
    };
    playMusic();
    return () => {
      if (audio) {
        audio.stopAsync();
        audio.unloadAsync();
      }
    };
  }, [mode]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isInhale ? 'Inhale' : 'Exhale'}</Text>
      <Animated.View style={[styles.bubble, { transform: [{ scale }] }]} />
      <Text style={styles.countdown}>{formatTime(secondsLeft)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    color: '#5D1049',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bubble: {
    width: screenWidth * 0.5,
    height: screenWidth * 0.5,
    backgroundColor: '#D1C4E9',
    borderRadius: screenWidth * 0.4,
    opacity: 0.8,
    marginBottom: 60,
  },
  countdown: {
    position: 'absolute',
    bottom: 40,
    fontSize: 20,
    color: '#37474F',
    fontWeight: '600',
  },
});
