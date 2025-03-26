import { StyleSheet, View, Pressable, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';

type Props = {
  label: string;
  theme: string;
};

export default function Button({ label, theme }: Props) {
  if (theme === 'take_photo') {
    return (
      <View
        style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, { backgroundColor: '#fff' }]}
          onPress={() => alert('You pressed a button.')}>
          <FontAwesome name="camera" size={19} color="black" style={styles.buttonIcon} />
          <Text style={[styles.buttonLabel, { color: '#25292e' }]}>{label}</Text>
        </Pressable>
      </View>
    );
  }
  else if (theme === 'from_library'){
    return (
        <View 
            style={styles.buttonContainer}>
            <Pressable 
                style={[styles.button, { backgroundColor: '#fff' }]}
                onPress={() => alert('You pressed a button.')}>
                <FontAwesome name="picture-o" size={18} color="black" style={styles.buttonIcon} />
                <Text style={[styles.buttonLabel, { color: '#25292e' }]}>{label}</Text>
            </Pressable>
        </View>
    );
  }
  else {
    return (
        <View 
            style={styles.buttonContainer}>
            <Pressable 
                style={[styles.button, { backgroundColor: '#fff' }]}
                onPress={() => alert('You pressed a button.')}>
                <Text style={[styles.buttonLabel, { color: '#25292e' }]}>{label}</Text>
            </Pressable>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
});
