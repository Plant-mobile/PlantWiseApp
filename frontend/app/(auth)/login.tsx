import React, { useContext, useState } from 'react';
import { View, TextInput, Text, StyleSheet, useColorScheme, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { UserContext } from '../../services/auth/auth';
import {useTranslation} from 'react-i18next'
import { translation } from "../../services/translateService";
import { Colors } from '../../constants/Colors';
import Spacer from '../../components/Spacer';
import { LinearGradient } from 'expo-linear-gradient';
import ThemedText from '../../components/ThemedText';

export default function LoginScreen() {
  const ColorScheme = useColorScheme()
  const theme = Colors[ColorScheme] ?? Colors.light
  const router = useRouter();
  const userCtx = useContext(UserContext)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {i18n} = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);


  const handleLogin = async () => {

    if (userCtx && email && password) {
      userCtx.login(email, password)

      router.replace('/(dashboard)/main'); 
    }
  };

  const handleRegester = async () => {
      router.replace('/regester'); 
  };


if(userCtx.user == null){
  return (
    <View style={[styles.container,{backgroundColor: theme.secondaryBackgroundColor}]}>

          <Spacer height={50} />
          <View style = {styles.boxShadow}>
          <Text style = {[{fontFamily: Colors.primaryFontBold, fontSize: 80, textAlign: 'center', color: Colors.primaryColor,}]}>{translation('g.welcome')}</Text>
          </View>
          <Spacer height={20} />
          <Text style={[styles.title, {color: Colors.primaryColor}, styles.boxShadow]}>{translation('login.login-form')}</Text>
          <Spacer height={50} />
          <View style ={styles.inputContainer}>
            <TextInput
              style={[styles.input, styles.boxShadow, {backgroundColor: theme.inputBackgroundColor}]}
              placeholder={isEmailFocused ? '' : translation('g.email')}
              placeholderTextColor={Colors.primaryColor}
              value={email}
              onChangeText={setEmail}
              keyboardType='email-address'
              onFocus={() => setIsEmailFocused(true)} 
              onBlur={() => setIsEmailFocused(false)}
              textAlign={isRTL ? 'right' : 'left'}
            />
            <Image source = {require('../../assets/loginCamera.png')}  style={[styles.icon, {height: 17}]} />
          </View>
          <Spacer height={30} />
          <View style ={styles.inputContainer}>
              <TextInput
                style={[styles.input, styles.boxShadow, {backgroundColor: theme.inputBackgroundColor}]}
                placeholder={isPasswordFocused ? '' : translation('g.password')}
                placeholderTextColor={Colors.primaryColor}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                onFocus={() => setIsPasswordFocused(true)} 
                onBlur={() => setIsPasswordFocused(false)}
                textAlign={isRTL ? 'right' : 'left'} 
              />
              <Image source = {require('../../assets/lockLogin.png')}  style={[styles.icon, {height: 18}]} />
          </View>
          <Text style={[styles.forgetPassword, {color: Colors.primaryColor}]}>{translation('login.forget-password')}</Text>
          <Spacer height={50} />
              <LinearGradient
                colors={[theme.inputBackgroundColor, theme.primaryBackgroundColor]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.button, styles.boxShadow]}
                >
                <Text onPress={handleLogin} style={styles.btn}>{translation('login.login')}</Text> 
              </LinearGradient>
        <Spacer height={130} />



        <View style ={{ position: 'relative'}}>
          <Image source = {require('../../assets/Line_3.png')} style={{margin:-20, width:140}} />
          <Text style ={{position: 'absolute', left: 135, width: Dimensions.get('window').width, bottom: 10, color: Colors.primaryColor, fontWeight: 'bold'}}>
              {translation('g.continue')}
          </Text>
          <Image source = {require('../../assets/Line_3.png')} style={{ position: 'absolute' ,margin:-20, width:135, right:0}} />
        </View>
        <Spacer height={20} />
        <View style ={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Image source = {require('../../assets/Frame_9.png')} />
        </View>
        <Spacer height={80} />
        <ThemedText style={{textAlign: 'center', color: Colors.primaryColor, fontWeight: 500}}>
          {translation('login.no-account')}
        <ThemedText onPress={handleRegester} style ={{fontWeight: 'bold'}}>{translation('login.register-here')}</ThemedText>
      </ThemedText>
    </View>
  );
  }
}


const styles = StyleSheet.create({
  container: { 
    flex: 1,  
    padding: 20, 
  },
  input: {
    marginVertical: 10, 
    padding: 20, 
    borderRadius:50, 
    paddingRight:15, 
    fontWeight: 800, 
    paddingHorizontal: 50, 
    height: 70, 
    fontSize: 20,
    color: Colors.primaryColor
  },
  title: { 
    fontSize: 20, 
    textAlign: 'center', 
    marginBottom: 20, 
    fontFamily: 'PlayfairDisplay' 
  },
   inputContainer: {
    position: 'relative',
    width: '100%',
    justifyContent: 'center',
  },
  icon: {
    position: 'absolute',
    left: 20,
    width: 19,

  },
  forgetPassword: {
    fontSize: 13,
    textAlign: 'right',
    fontWeight: 700
  },
  btn: {
    color: 'white',
    textAlign: 'center',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius:12,
    fontWeight: 'bold'

  },
    button: {
    position: "absolute",
    bottom: 300,
    left: 132,
    marginTop: 30,
    paddingVertical: 1,
    paddingHorizontal: 30,
    borderRadius:16,
  },
  boxShadow:{
    shadowColor: '#000',
    shadowOffset: { width: 1.25, height: 1 },
    shadowOpacity: 0.25,
    elevation: 4
  }
});
