import React, { useRef } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, Image ,Animated  } from 'react-native'
import { useAppDispatch } from '../Hooks'
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { toggleSplash } from '../Redux/SplashSlice';
import { LinearGradient } from 'expo-linear-gradient';

const Splash = ({ navigation, route }: { navigation: any, route: any }) => {

  const dispatch = useAppDispatch()
  const splash = useSelector((state: RootState) => state.splash.done);
  const fadeAnim = useRef(new Animated.Value(0)).current;


  useFocusEffect(
    React.useCallback(() => {
      if(splash) {
        navigation.replace(route.params.gotoscreen);
      }
      else {
      const timer = setTimeout(() => {
        dispatch(toggleSplash())
        navigation.replace(route.params.gotoscreen);
      }, 2000);
      return () => clearTimeout(timer);
    }
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700, // Fade-in duration
        useNativeDriver: true,
      }).start();
      return () => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 700, // Fade-out duration
          useNativeDriver: true,
        }).start();
      };
    }, [])
  );

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <LinearGradient
        colors={['#11263A', '#1A3E61']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.5, y: 0.5 }}
        style={styles.gradient}
      >
        <View style={styles.logoContainer}>
          <Image source={require("../assets/Logo.png")} resizeMode='contain' style={styles.logo} />
        </View>
      </LinearGradient>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: '60%',
    height: '60%',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
});

export default Splash
