// components/PauseSessionScreen.js
import React, { useEffect, useRef, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Vibration,
  TouchableOpacity,
} from "react-native";
import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from "expo-av";

const guidedAudioMap = {
  1: require("../assets/sounds/1-min-Clarity.mp3"),
  2: require("../assets/sounds/2-min-Energy.mp3"),
  3: require("../assets/sounds/3-Minute.mp3"),
  4: require("../assets/sounds/4-Min-Creativity-Reset.mp3"),
  5: require("../assets/sounds/5-Minute-Clarity.mp3"),
};

export default function PauseSessionScreen({ route, navigation }) {
  const { duration, mode } = route.params;
  const [countdown, setCountdown] = useState(duration * 60);
  const scale = useRef(new Animated.Value(1)).current;
  const sound = useRef(new Audio.Sound()).current;

  useEffect(() => {
    // 1. Countdown timer
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          Vibration.vibrate();
          navigation.navigate("PauseConfirmation");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // 2. Bubble animation loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.5,
          duration: 4000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 4000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // 3. Play guided session if selected
    (async () => {
      if (mode !== "guided") return;

      try {
        const guidedTrack = guidedAudioMap[duration];
        if (!guidedTrack) {
          console.warn(`No guided track configured for duration: ${duration}`);
          return;
        }

        // 1) cấu hình audio mode TRƯỚC khi load
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true, // bật phát khi gạt silent
          interruptionModeIOS: InterruptionModeIOS.DoNotMix, // tránh "duck" làm nhỏ tiếng
          staysActiveInBackground: false, // bật true nếu muốn phát background (cần Info.plist)
          shouldDuckAndroid: false, // tránh tự hạ nhỏ tiếng trên Android
          interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
          playThroughEarpieceAndroid: false,
        });

        // 2) đảm bảo state sạch
        try {
          await sound.unloadAsync();
        } catch {}

        // 3) load rồi mới play (không dùng shouldPlay để dễ debug)
        await sound.loadAsync(guidedTrack, { shouldPlay: false });

        // 4) đảm bảo volume max (tránh trường hợp bị set 0)
        await sound.setVolumeAsync(1.0);

        // (khuyến nghị) gắn listener để bắt lỗi runtime
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded) {
            if (status.didJustFinish) {
              // tuỳ bạn: lặp lại hoặc chuyển màn
            }
          } else if (status.error) {
            console.warn("Playback error:", status.error);
          }
        });

        // 5) play
        await sound.playAsync();
      } catch (e) {
        console.warn("Audio start error:", e);
      }
    })();

    // cleanup on unmount
    return () => {
      clearInterval(countdownInterval);
      sound.unloadAsync().catch(() => {});
    };
  }, []);

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60 < 10 ? `0${countdown % 60}` : countdown % 60;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Take a Breath</Text>
      <Text style={styles.subheader}>
        Nurture yourself in this moment — breathe within the bubble.
      </Text>

      <Animated.View style={[styles.bubble, { transform: [{ scale }] }]}>
        <Text style={styles.bubbleText}>Breathe</Text>
      </Animated.View>

      <Text style={styles.timer}>
        {minutes}:{seconds}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("SoulfulPause")}
      >
        <Text style={styles.buttonText}>Return to Choices</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D6F4F4",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "600",
    color: "#4B0082",
    marginBottom: 6,
  },
  subheader: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#4B0082",
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 30,
  },
  bubble: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#B2DFDB",
    justifyContent: "center",
    alignItems: "center",
  },
  bubbleText: {
    fontSize: 20,
    fontWeight: "500",
    color: "#4B0082",
  },
  timer: {
    marginTop: 20,
    fontSize: 28,
    fontWeight: "500",
    color: "#4B0082",
  },
  button: {
    marginTop: 30,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: "#6A5ACD",
    borderRadius: 25,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "500",
  },
});
