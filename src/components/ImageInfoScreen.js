import React from 'react';
import { View, Text, Image, Button, ScrollView } from 'react-native';
import { deleteImage } from '../services/storage/storage';
import { auth } from '../services/firebase/firebaseConfig';

export default function ImageInfoScreen({ image, onBack }) {

  const handleDelete = async () => {
    try {
      await deleteImage(image.name);
      console.log('Image deleted!');
      onBack(); // go back after deleting
    } catch (error) {
      console.log('Error deleting image:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Button title="Back" onPress={onBack} />
        <Image
          source={{ uri: image.url }}
          style={{ flex: 0.7, width: '100%' }} // Use flex for height
        />
        <View style={{ flex: 0.3 }}> 
          <Text>Name: {image.name}</Text>
          <Text>Address: {image.address}</Text>
          <Text>Size: {image.size}</Text> 
          <Text>Color: {image.color}</Text> 
          <Text>Brand: {image.brand}</Text>
          {auth.currentUser && auth.currentUser.uid === image.userId &&
          <Button title="Delete" onPress={handleDelete} />
}
        </View>
      </View>
    </ScrollView>
  );
}
