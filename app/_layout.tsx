import {
  Pressable, Text, View, SafeAreaView,
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import WebView from 'react-native-webview';
import SpaceMonoRegular from '../assets/fonts/SpaceMono-Regular.ttf';
import style from '../styles/_layout';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

function RootLayoutNav() {
  const [showWebView, setShowWebView] = useState(false);

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#f6f6f6',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Pressable
        onPress={() => {
          setShowWebView(true);
        }}
        style={style.btnLogin}
      >
        <Text style={style.btnLoginText}>
          Login
        </Text>
      </Pressable>
      <Pressable
        onPress={() => {
          console.log('Register btn pressed');
        }}
        style={style.btnRegister}
      >
        <Text style={style.btnRegisterText}>
          Register
        </Text>
      </Pressable>
      {
        showWebView && (
          <View style={{ flex: 1, backgroundColor: 'yellow', width: '100%' }}>
            <WebView source={{ uri: 'https://donor.almsbucket.ml/user/portal' }} />
          </View>
        )
      }
    </SafeAreaView>
  );
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: SpaceMonoRegular,
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <>
      {!loaded && <SplashScreen />}
      {loaded && <RootLayoutNav />}
    </>
  );
}
