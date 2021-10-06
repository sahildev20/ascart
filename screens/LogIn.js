import React, { useRef, useState } from "react";
import {
  TouchableOpacity,
  Image,
  Dimensions,
  Text,
  TextInput,
  View,
  StyleSheet,
} from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import Constants from "expo-constants";
import { CartContext } from "../CartContext";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Footer from "../components/Footer.js";
import firebase from "../firebase.js";
import "@firebase/firestore";
import MenuFooter from "../components/MenuFooter.js";
let deviceWidth = Dimensions.get("window").width;

export function LogIn({ navigation }) {
  const { addUser } = useContext(CartContext);

  const code = "+91";
  const recaptchaVerifier = React.useRef(null);
  const [username, setUsername] = React.useState();
  const [phoneNumber, setPhoneNumber] = React.useState();
  const [verificationId, setVerificationId] = React.useState();
  const [verificationCode, setVerificationCode] = React.useState();
  const [userId, setUserId] = React.useState();
  const firebaseConfig = {
    apiKey: "AIzaSyB7BDCqPlDy7wSa8nBAGXSP89PB5NVutD8",
    authDomain: "ascart-sahil.firebaseapp.com",
    projectId: "ascart-sahil",
    storageBucket: "ascart-sahil.appspot.com",
    messagingSenderId: "625281536301",
    appId: "1:625281536301:web:e0687097a15f1182fa83a4",
    measurementId: "G-Z8PEBHWRFL",
  };
  const [message, showMessage] = useState(
    !firebaseConfig
      ? {
          text: "To get started, provide a valid firebase config in App.js and open this snack on an iOS or Android device.",
        }
      : undefined
  );

  const attemptInvisibleVerification = false;

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        attemptInvisibleVerification={attemptInvisibleVerification}
      />
      <View style={styles.imgContainer}></View>
      <View style={styles.containerText}>
        <Text style={styles.labelText}>Enter Your Name</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Ranveer"
          autoFocus
          autoCompleteType="name"
          textContentType="text"
          onChangeText={(username) => setUsername(username)}
        />
        <Text style={styles.labelText}>Enter phone number</Text>
        <TextInput
          style={styles.textInput}
          placeholder="9828620478"
          autoCompleteType="tel"
          keyboardType="phone-pad"
          // editable={!verificationId}
          textContentType="telephoneNumber"
          onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
          maxLength={10}
        />
        <TouchableOpacity
          // disabled={!phoneNumber}
          // color='#90CBFB'
          style={styles.button}
          onPress={async () => {
            // The FirebaseRecaptchaVerifierModal ref implements the
            // FirebaseAuthApplicationVerifier interface and can be
            // passed directly to `verifyPhoneNumber`.
            try {
              let newNumber = code + "" + phoneNumber;
              const phoneProvider = new firebase.auth.PhoneAuthProvider();
              const verificationId = await phoneProvider.verifyPhoneNumber(
                newNumber,
                recaptchaVerifier.current
              );
              setVerificationId(verificationId);
              showMessage({
                text: "Verification code has been sent to your phone.",
              });
            } catch (err) {
              let errormsg = "Something Went Wrong Please Try Again !";
              showMessage({ text: `Error: ${errormsg}`, color: "red" });
            }
          }}
        >
          <Text style={styles.buttonText}>Send OTP</Text>
        </TouchableOpacity>

        <Text style={styles.labelText}>Enter OTP</Text>
        <TextInput
          style={styles.textInput}
          editable={!!verificationId}
          placeholder="123456"
          onChangeText={setVerificationCode}
          maxLength={6}
        />
        <TouchableOpacity
          style={styles.button}
          disabled={!verificationId}
          onPress={async () => {
            try {
              const credential = firebase.auth.PhoneAuthProvider.credential(
                verificationId,
                verificationCode
              );
              firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                  setUserId(user.uid);
                }
              });
              await firebase.auth().signInWithCredential(credential);
              navigation.navigate("Products", {
                userId: userId,
                name: username,
                age: 10,
              });

              showMessage({ text: "Phone authentication successful 👍" });
            } catch (err) {
              showMessage({ text: `Error: ${err.message}`, color: "red" });
            }
          }}
        >
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>

        {message ? (
          <TouchableOpacity
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: 0xffffffee, justifyContent: "center" },
            ]}
            onPress={() => showMessage(undefined)}
          >
            <Text
              style={{
                color: message.color || "blue",
                fontSize: 12,
                textAlign: "center",
                margin: 20,
                position: "absolute",
                bottom: 40,
                left: 10,
              }}
            >
              {message.text}
            </Text>
          </TouchableOpacity>
        ) : undefined}
        {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
      </View>
      <Footer />
      <MenuFooter />
    </View>
  );
}

const styles = StyleSheet.create({
  imgContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 100,
    width: 50,
    height: 50,
    marginTop: 10,
  },
  avatar: {
    width: 50,
    height: 50,
  },
  containerText: {
    padding: 10,
    marginTop: 10,
    backgroundColor: "#ffffff",
    width: deviceWidth - (deviceWidth / 100) * 15,
    alignItems: "flex-start",
  },

  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#F2F2F2",
    alignItems: "center",
    // justifyContent: "center",
  },
  textInput: {
    color: "grey",
    paddingVertical: 5,
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 15,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 2,
    textAlign: "left",
    width: "100%",
  },
  labelText: {
    marginTop: 20,
    fontSize: 15,
    textAlign: "left",
  },
  button: {
    textAlign: "center",
    borderRadius: 5,
    color: "white",
    paddingVertical: 8,
    backgroundColor: "#F29F05",
    width: "100%",
  },
  buttonText: {
    color: "#ffffff",
    letterSpacing: 2,
    fontWeight: "600",
    textAlign: "center",
  },
});
