import { getApp, getApps, initializeApp } from '@react-native-firebase/app';
import analytics from '@react-native-firebase/analytics';

// Initialize Firebase Core
export const initializeFirebase = async () => {
  try {
    initializeApp();
    await new Promise(resolve => setTimeout(resolve, 100)); // đợi Firebase ổn định

    if (getApps().length === 0) {
      console.log('Firebase Analytics app = 0');
    }

    // const app = getApp();
    // console.log('Firebase initialized:', app.name);

    // Enable analytics collection
    // await analytics().setAnalyticsCollectionEnabled(true);
    console.log('Firebase Analytics initialized successfully');
  } catch (error) {
    console.error('Error initializing Firebase:', error);
  }
};

// Helper function to log custom events
export const logEvent = async (eventName, parameters = {}) => {
  // try {
  //   await analytics().logEvent(eventName, parameters);
  //   console.log(`Analytics event logged: ${eventName}`, parameters);
  // } catch (error) {
  //   console.error('Error logging analytics event:', error);
  // }
};

// Helper function to set user properties
export const setUserProperty = async (propertyName, propertyValue) => {
  try {
    await analytics().setUserProperty(propertyName, propertyValue);
    console.log(`User property set: ${propertyName} = ${propertyValue}`);
  } catch (error) {
    console.error('Error setting user property:', error);
  }
};

// Helper function to set user ID
export const setUserId = async (userId) => {
  try {
    await analytics().setUserId(userId);
    console.log(`User ID set: ${userId}`);
  } catch (error) {
    console.error('Error setting user ID:', error);
  }
};

// Analytics Events Constants
export const AnalyticsEvents = {
  APP_OPEN: 'app_open',
  SCREEN_VIEW: 'screen_view',
  BUTTON_CLICK: 'button_click',
  SESSION_START: 'session_start',
  SESSION_END: 'session_end',
  ROUTINE_START: 'routine_start',
  ROUTINE_END: 'routine_end',
  AFFIRMATION_VIEW: 'affirmation_view',
  AFFIRMATION_SAVE: 'affirmation_save'
}; 