// App.js
import React, { useEffect, useState } from 'react';
import { View, Button, TextInput } from 'react-native';
import { auth, database, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './firebaseConfig';
import CameraComponent from './CameraComponent';
import { uploadImage, saveImageMetadata } from './storage';
import DashboardScreen from './DashboardScreen';
import ImageDetailsScreen from './ImageDetailsScreen';
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [isCameraOpen, setCameraOpen] = useState(false);
  const db = getFirestore();
  const [imageDetails, setImageDetails] = useState({ name: '', address: '' });
  const [isImageDetailsOpen, setImageDetailsOpen] = useState(false);

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
    const imageName = `${user.uid}_${timestamp}`;
    setImageDetails({ ...imageDetails, photo: photo, name: imageName });
    setCameraOpen(false);
    setImageDetailsOpen(true);
  };

  const handleOpenCamera = () => {
    setCameraOpen(true);
  };

  const handleCloseCamera = () => {
    setCameraOpen(false);
  };

  const handleSearch = async (searchTerm) => {
    try {
      console.log('Buscando:', searchTerm); // Este mensaje se mostrará cuando se inicie la búsqueda
      const q = query(collection(db, "images"), where("name", "==", searchTerm));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
        });
      } else {
        console.log('No se encontró ninguna imagen con ese nombre');
      }
      
    } catch (error) {
      console.log('Error al buscar:', error); // Este mensaje mostrará cualquier error que pueda surgir
    }
  };
  
  const handleUploadImage = () => {
    setImageDetailsOpen(false);
    uploadImage(imageDetails.photo.uri, imageDetails.name).then((imageUrl) => {
      console.log('Photo uploaded!');
      saveImageMetadata(imageDetails.name, imageUrl, user.uid, imageDetails.address).then(() => {
        console.log('Image metadata saved!');
      });
    }).catch((error) => {
      console.log('Error uploading photo:', error);
    });
  };

  if (user) {
    if (isCameraOpen) {
      return <CameraComponent onTakePicture={handleTakePicture} onClose={handleCloseCamera} />;
    } else if (isImageDetailsOpen) {
      return <ImageDetailsScreen onUpload={handleUploadImage} details={imageDetails} setDetails={setImageDetails} />;
    } else {
      return <DashboardScreen onOpenCamera={handleOpenCamera} onSearch={handleSearch} />;
    }
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
