// App.js
import React, { useEffect, useState } from 'react';
import { View, Button, TextInput } from 'react-native';
import { auth, database, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './firebaseConfig';
import CameraComponent from './CameraComponent';
import { uploadImage } from './storage';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        console.log('User is signed in');
        setUser(user);
      } else {
        console.log('User is signed out');
        setUser(null);
      }
    });
  }, []);

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);
        setUser(user);
      })
      .catch(error => console.log(error.message));
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
        setUser(user);
      })
      .catch(error => console.log(error.message));
  };

  const handleTakePicture = (photo) => {
    const timestamp = Date.now();
    uploadImage(photo.uri, `${user.uid}_${timestamp}`).then(() => {
      console.log('Photo uploaded!');
    }).catch((error) => {
      console.log('Error uploading photo:', error);
    });
  };

  if (user) {
    return <CameraComponent onTakePicture={handleTakePicture} />;
  }

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignUp} />
      <Button title="Sign In" onPress={handleSignIn} />
    </View>
  );
}
