// DashboardScreen.js
import React, { useState } from 'react';
import { View, Button, TextInput, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { auth, signOut } from './firebaseConfig';
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import ImageInfoScreen from './ImageInfoScreen';

export default function DashboardScreen({ onOpenCamera, onSearch, setIsImageInfoOpen, setImageSelected }) {
  const [searchTerm, setSearchTerm] = useState('');
  const db = getFirestore();
  const [searchResults, setSearchResults] = useState([]);




  const handleSignOut = () => {
    signOut(auth).then(() => {
      console.log('User signed out');
    }).catch((error) => {
      console.log('Error signing out:', error);
    });
  };

  const handleImageSelect = (imageData) => {
    setImageSelected(imageData);
    setIsImageInfoOpen(true);
  };
  

 
const handleSearch = async () => {
  console.log('Se presionó el botón de búsqueda');
  onSearch(searchTerm).then((results) => {
    setSearchResults(results); // Actualiza el estado con los resultados de la búsqueda
  });
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
    
    <FlatList
  data={searchResults}
  keyExtractor={item => item.name}
  renderItem={({ item }) => (
    <TouchableOpacity onPress={() => handleImageSelect(item)}>
      <View style={{ flexDirection: 'row', margin: 10 }}>
        <Image
          source={{ uri: item.url }}
          style={{ width: 50, height: 50 }}
        />
        <Text>{item.name}</Text>
      </View>
    </TouchableOpacity>
  )}
/>

  </View>
);
}
