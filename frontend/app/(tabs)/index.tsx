import { Text, View, StyleSheet} from "react-native";
import React from "react";
import { useState } from 'react';

import Button from "@/components/Button";

import { Image } from "expo-image";
import * as ImagePicker from 'expo-image-picker';

const PlaceholderImage = require('@/assets/images/Black.png');

export default function Index() {

  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert('You did not select any image.');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={PlaceholderImage} style={styles.image} />
      </View>
      <View style={styles.footerContainer}>
        <Button label="Take a photo" theme='take_photo'/>
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
  },
})
