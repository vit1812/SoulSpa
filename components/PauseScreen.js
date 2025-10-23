import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
// Firebase Analytics imports
import { logEvent, AnalyticsEvents } from '../firebase';

const { height } = Dimensions.get('window');

export default function PauseScreen({ navigation }) {
  const [duration, setDuration] = useState(1);
  const [mode, setMode] = useState('guided'); // 'guided' | 'silent'

  const durations = [1, 2, 3, 4, 5];
  const durationRows = [durations.slice(0, 2), durations.slice(2)];
  const modes = ['guided', 'silent'];

  useEffect(() => {
    // Track screen view when component mounts
    logEvent(AnalyticsEvents.SCREEN_VIEW, {
      screen_name: 'Pause',
      screen_class: 'PauseScreen',
      timestamp: new Date().toISOString()
    });
  }, []);

  // Handle duration selection with analytics
  const handleDurationSelect = (selectedDuration) => {
    setDuration(selectedDuration);
    
    // Log duration selection event
    logEvent('pause_duration_selected', {
      duration: selectedDuration,
      screen_name: 'Pause',
      timestamp: new Date().toISOString()
    });
  };

  // Handle mode selection with analytics
  const handleModeSelect = (selectedMode) => {
    setMode(selectedMode);
    
    // Log mode selection event
    logEvent('pause_mode_selected', {
      mode: selectedMode,
      screen_name: 'Pause',
      timestamp: new Date().toISOString()
    });
  };

  // Handle start session with analytics
  const handleStartSession = () => {
    // Log session start event
    logEvent(AnalyticsEvents.SESSION_START, {
      duration: duration,
      mode: mode,
      screen_name: 'Pause',
      timestamp: new Date().toISOString()
    });

    // Navigate to session screen
    navigation.navigate('PauseSession', { duration, mode });
  };

  // Handle return home with analytics
  const handleReturnHome = () => {
    // Log return home event
    logEvent('pause_return_home', {
      screen_name: 'Pause',
      timestamp: new Date().toISOString()
    });

    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Clarity Break:</Text>
      <Text style={styles.subtitle}>
        Even one quiet moment can return you to yourself.
      </Text>

      <View style={styles.durationWrapper}>
        {durationRows.map((rowDurations, rowIndex) => (
          <View
            key={`duration-row-${rowIndex}`}
            style={[
              styles.row,
              styles.durationRow,
              rowIndex === durationRows.length - 1 && styles.durationRowLast,
            ]}
          >
            {rowDurations.map((d) => (
              <TouchableOpacity
                key={d}
                style={[
                  styles.optionButton,
                  duration === d && styles.optionButtonSelected,
                ]}
                onPress={() => handleDurationSelect(d)}
              >
                <Text
                  style={[
                    styles.optionText,
                    duration === d && styles.optionTextSelected,
                  ]}
                >
                  {d} min
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

      <Text style={styles.sectionLabel}>Choose Your Vibe:</Text>
      <View style={styles.row}>
        {modes.map((m) => (
          <TouchableOpacity
            key={m}
            style={[
              styles.optionButton,
              mode === m && styles.optionButtonSelected,
            ]}
            onPress={() => handleModeSelect(m)}
          >
            <Text
              style={[
                styles.optionText,
                mode === m && styles.optionTextSelected,
              ]}
            >
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.startButton}
        onPress={handleStartSession}
      >
        <Text style={styles.startButtonText}>Start</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleReturnHome}>
        <Text style={styles.returnText}>Return Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9E5',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 160,
    paddingBottom: 80,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#4B0082',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#4B0082',
    marginTop: 8,
    marginBottom: 30,
    paddingHorizontal: 40,
    textAlign: 'center',
  },
  durationWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  durationRow: {
    marginBottom: 12,
  },
  durationRowLast: {
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 24,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: '#4B0082',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginHorizontal: 8,
    marginVertical: 6,
    backgroundColor: '#ffffff',
  },
  optionButtonSelected: {
    backgroundColor: '#6A5ACD',
    borderColor: '#6A5ACD',
  },
  optionText: {
    color: '#4B0082',
    fontSize: 16,
    fontWeight: '500',
  },
  optionTextSelected: {
    color: 'white',
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: '500',
    color: '#4B0082',
    marginBottom: 12,
  },
  startButton: {
    backgroundColor: '#FFDEAD',
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginTop: 10,
    marginBottom: 20,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4B0082',
  },
  returnText: {
    fontSize: 14,
    color: '#4B0082',
    textDecorationLine: 'underline',
  },
});
