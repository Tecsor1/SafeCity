// ImageInfoScreen.js
import React from 'react';
import { View, Text, Image, Button } from 'react-native';

export default function ImageInfoScreen({ image, onBack }) {
  return (
    <View>
      <Button title="Back" onPress={onBack} />
      <Image
        source={{ uri: image.url }}
        style={{ width: '100%', height: '70%' }} // O la dimensión que prefieras
      />
      <Text>Name: {image.name}</Text>
      <Text>Address: {image.address}</Text>
    </View>
  );
}
