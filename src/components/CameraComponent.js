// src/components/CameraComponent.js
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';

export default function CameraComponent({ onTakePicture }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [cameraRef, setCameraRef] = useState(null)

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <View style={{ flex: 1 }}>
            <Camera style={{ flex: 1 }} type={type} ref={ref => {
                setCameraRef(ref);
            }}>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'flex-end'
                    }}>
                    <TouchableOpacity
                        style={{
                            flex: 0.2,
                            alignSelf: 'flex-end',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(0,0,0,0.3)',
                            borderRadius: 5,
                            paddingHorizontal: 10,
                            margin: 20,
                        }}
                        onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            );
                        }}>
                        <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            flex: 0.5,  // Se incrementó el flex a 0.5
                            alignSelf: 'flex-end',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(0,0,0,0.3)',
                            borderRadius: 5,
                            paddingHorizontal: 10,
                            margin: 20,
                        }}
                        onPress={async () => {
                            if(cameraRef){
                                let photo = await cameraRef.takePictureAsync();
                                onTakePicture(photo);
                            }
                        }}>
                        <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Take Picture </Text>
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    );
}
