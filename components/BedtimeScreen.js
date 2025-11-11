import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import bedtimeAffirmations from "./data/BedtimeAffirmations";
// Firebase Analytics imports
import { logEvent, AnalyticsEvents } from "../firebase";

export default function BedtimeScreen() {
  const [inputText, setInputText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [affirmation, setAffirmation] = useState("");

  useEffect(() => {
    // Track screen view when component mounts
    logEvent(AnalyticsEvents.SCREEN_VIEW, {
      screen_name: "Bedtime",
      screen_class: "BedtimeScreen",
      timestamp: new Date().toISOString(),
    });
  }, []);

  const handleRelease = () => {
    // Log release event
    logEvent("bedtime_release_submitted", {
      text_length: inputText.length,
      screen_name: "Bedtime",
      timestamp: new Date().toISOString(),
    });

    const randomAffirmation =
      bedtimeAffirmations[
        Math.floor(Math.random() * bedtimeAffirmations.length)
      ];
    setAffirmation(randomAffirmation);
    setSubmitted(true);
    setInputText("");
  };

  const handleReleaseAnother = () => {
    // Log release another event
    logEvent("bedtime_release_another", {
      screen_name: "Bedtime",
      timestamp: new Date().toISOString(),
    });

    setSubmitted(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {!submitted ? (
          <View style={styles.inputContainer}>
            <Text style={styles.prompt}>
              What no longer needs to travel with you into tomorrow?
            </Text>
            <TextInput
              style={styles.input}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Type here and release it..."
              placeholderTextColor="#999"
              multiline
            />
            <TouchableOpacity
              style={styles.releaseButton}
              onPress={handleRelease}
            >
              <Text style={styles.releaseText}>Send it to the Stars</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.confirmation}>
            <Text style={styles.affirmation}>{affirmation}</Text>
            <Text style={styles.confirmText}>
              Your words have been released to the night sky.
            </Text>
            <TouchableOpacity
              style={styles.peachButton}
              onPress={handleReleaseAnother}
            >
              <Text style={styles.navText}>Release Another</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#E6E6FA",
  },
  container: {
    backgroundColor: "#E6E6FA",
    flexGrow: 1,
    paddingBottom: 40,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  inputContainer: {
    marginBottom: 40,
    alignItems: "center",
  },
  prompt: {
    fontSize: 20,
    color: "#4B0082",
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "600",
  },
  input: {
    height: 120,
    width: "100%",
    borderColor: "#4B0082",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    textAlignVertical: "top",
    backgroundColor: "#fff",
    marginBottom: 20,
    fontSize: 16,
  },
  releaseButton: {
    backgroundColor: "#ADD8E6",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  releaseText: {
    fontSize: 16,
    color: "#4B0082",
    fontWeight: "600",
  },
  confirmation: {
    alignItems: "center",
    marginBottom: 30,
  },
  affirmation: {
    fontSize: 20,
    fontWeight: "600",
    color: "#4B0082",
    marginBottom: 15,
    textAlign: "center",
  },
  confirmText: {
    fontSize: 16,
    color: "#4B0082",
    marginBottom: 20,
    textAlign: "center",
  },
  peachButton: {
    backgroundColor: "#ADD8E6",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 10,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  navText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#4B0082",
  },
});
