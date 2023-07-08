// DashboardScreen.js
import React, { useState } from 'react';
import { View, Button, TextInput } from 'react-native';
import { auth, signOut } from './firebaseConfig';
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

export default function DashboardScreen({ onOpenCamera, onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const db = getFirestore();

  const handleSignOut = () => {
    signOut(auth).then(() => {
      console.log('User signed out');
    }).catch((error) => {
      console.log('Error signing out:', error);
    });
  };

  const handleSearch = () => {
    console.log('Se presionó el botón de búsqueda');
    onSearch(searchTerm);
  };
  

  return (
    <View>
      <Button title="Open Camera" onPress={onOpenCamera} />
      <TextInput
        placeholder="Search"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <Button title="Search" onPress={handleSearch} />
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
}
