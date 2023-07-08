// src/services/storage.js
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { getFirestore, doc, setDoc, deleteDoc } from "firebase/firestore";

const storage = getStorage();
const db = getFirestore();

export const uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const uploadTask = uploadBytesResumable(ref(storage, imageName), blob);

    return new Promise((resolve, reject) => {
        uploadTask.on('state_changed',
            (snapshot) => {
                // progress function ...
            },
            (error) => {
                // error function ...
                console.log('Error uploading image:', error);
                reject(error);
            },
            () => {
                // complete function ...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    resolve(downloadURL);
                });
            }
        );
    });
};

export async function saveImageMetadata(imageName, imageUrl, userId, address, size, color, brand) {
    await setDoc(doc(db, "images", imageName), {
      name: imageName,
      url: imageUrl,
      userId: userId,
      address: address,
      size: size,
      color: color,
      brand: brand
    });
};

  
  export const deleteImage = async (imageName) => {
    const imageRef = ref(storage, imageName);

    // Delete the file
    await deleteObject(imageRef);

    // Delete the file details from Firestore
    await deleteDoc(doc(db, "images", imageName));
};