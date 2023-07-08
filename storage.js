// src/services/storage.js
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, setDoc } from "firebase/firestore";

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

export async function saveImageMetadata(imageName, imageUrl, userId) {
    await setDoc(doc(db, "images", imageName), {
      name: imageName,
      url: imageUrl,
      userId: userId
    });
  };
