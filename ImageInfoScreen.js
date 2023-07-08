// ImageInfoScreen.js
import React from 'react';
import { View, Text, Image, Button } from 'react-native';
import { deleteImage } from './storage';
import { auth } from './firebaseConfig';


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
        <View>
          <Button title="Back" onPress={onBack} />
          <Image
            source={{ uri: image.url }}
            style={{ width: '100%', height: '70%' }} // Or whatever dimension you prefer
          />
          <Text>Name: {image.name}</Text>
          <Text>Address: {image.address}</Text>
          {auth.currentUser && auth.currentUser.uid === image.userId &&
            <Button title="Delete" onPress={handleDelete} />
          }
        </View>
      );
    }
