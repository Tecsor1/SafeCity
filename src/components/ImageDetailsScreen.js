// ImageDetailsScreen.js
import React from 'react';
import { View, Button, TextInput } from 'react-native';

export default function ImageDetailsScreen({ onUpload, details, setDetails }) {
  return (
    <View>
      <TextInput
        placeholder="Name"
        value={details.name}
        onChangeText={(text) => setDetails({ ...details, name: text })}
      />
      <TextInput
        placeholder="Address"
        value={details.address}
        onChangeText={(text) => setDetails({ ...details, address: text })}
      />
      <TextInput
        placeholder="Size"
        value={details.size}
        onChangeText={(text) => setDetails({ ...details, size: text })}
      />
      <TextInput
        placeholder="Color"
        value={details.color}
        onChangeText={(text) => setDetails({ ...details, color: text })}
      />
      <TextInput
        placeholder="Brand"
        value={details.brand}
        onChangeText={(text) => setDetails({ ...details, brand: text })}
      />
      <Button title="Upload" onPress={onUpload} />
    </View>
  );
}


