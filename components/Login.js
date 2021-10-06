import React, { useRef, useState } from 'react';
import { TouchableOpacity, Text, TextInput, View,StyleSheet } from 'react-native';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import Constants from 'expo-constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import firebase from '../firebase.js';

export function Login() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null);

  const sendVerification = () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
      .then(setVerificationId);
  };

  const confirmCode = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then((result) => {
        console.log(result);
      });
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={{
            apiKey: "AIzaSyB7BDCqPlDy7wSa8nBAGXSP89PB5NVutD8",
            authDomain: "ascart-sahil.firebaseapp.com",
            projectId: "ascart-sahil",
            storageBucket: "ascart-sahil.appspot.com",
            messagingSenderId: "625281536301",
            appId: "1:625281536301:web:e0687097a15f1182fa83a4",
            measurementId: "G-Z8PEBHWRFL"
          }}
          attemptInvisibleVerification={true }
        />
        <TextInput
          placeholder="Phone Number"
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          autoCompleteType="tel"
          style={styles.textInput}
        />
        <TouchableOpacity
          style={styles.sendVerification}
          onPress={sendVerification}
        >
          <Text style={styles.buttonText}>Send Verification</Text>
        </TouchableOpacity>
        <TextInput
          placeholder="Confirmation Code"
          onChangeText={setCode}
          keyboardType="number-pad"
          style={styles.textInput}
        />
        <TouchableOpacity style={styles.sendCode} onPress={confirmCode}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      textInput: {
        paddingTop: 40,
        paddingBottom: 20,
        paddingHorizontal: 20,
        fontSize: 24,
        borderBottomColor: '#7f8c8d33',
        borderBottomWidth: 2,
        marginBottom: 10,
        textAlign: 'center',
      },
      sendVerification: {
        padding: 20,
        backgroundColor: '#3498db',
        borderRadius: 10,
      },
      sendCode: {
        padding: 20,
        backgroundColor: '#9b59b6',
        borderRadius: 10,
      },
      buttonText: {
        textAlign: 'center',
        color: '#ffffff',
      },

});