import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import {useState, useEffect} from 'react';

import Button from "@/components/Button";

import { Image } from "expo-image";
import * as ImagePicker from 'expo-image-picker';

import { useRouter, useLocalSearchParams } from 'expo-router'

export default function Index() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Code for choosing photo from photo library
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (params.imageUri) {
      setSelectedImage(params.imageUri as string);
    }
  }, [params.imageUri]);

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
    <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center' }}>
        <View style={styles.footerContainer}>
          <Button label="Take a photo" theme='take_photo' onPress={goToCamera}/>
          <Button label="Choose a photo from library" theme='from_library' onPress={pickImageAsync}/>
        </View>
        <View style={styles.imageContainer}>
          <Image source={selectedImage} style={styles.image} />
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2E8B57",
  },
  imageContainer: {
    width: 320,
    height: 400,
    backgroundColor: "red"
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
