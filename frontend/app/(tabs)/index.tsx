import { StyleSheet, View } from "react-native";
import React from "react";
import {useState} from 'react';

import Button from "@/components/Button";

import { Image } from "expo-image";
import * as ImagePicker from 'expo-image-picker';

import { useRouter } from 'expo-router'
import { Link } from "expo-router";

export default function Index() {

  const router = useRouter();

  // Code for choosing photo from photo library
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      // Check if photo format is jpeg, jpg, or png
      if (result.assets[0].mimeType?.endsWith("jpeg") || result.assets[0].mimeType?.endsWith("jpg") || result.assets[0].mimeType?.endsWith("png")) {
        setSelectedImage(result.assets[0].uri);
      } else {
        alert("You must choose photo format of jpeg, jpg, or png!");
      }
    } else {
      alert('You did not select any image.');
    }
  }

  // Code for routing to camera screen
  const goToCamera = () => {
    router.navigate("../camera");
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={selectedImage} style={styles.image} />
      </View>
      <View style={styles.footerContainer}>
        <Button label="Take a photo" theme='take_photo' onPress={goToCamera}/>
        <Button label="Choose a photo from library" theme='from_library' onPress={pickImageAsync}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#2E8B57"
  },
  imageContainer: {
    width: 320,
    height: 400
  },
  image: {
    width: 320,
    height: 400,
    borderRadius: 18
  },
  footerContainer: {
    flex: 1 / 10,
    alignItems: 'center'
  }
})
