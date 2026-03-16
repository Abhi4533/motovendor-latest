import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';

interface Props {
  label?: string;
  onImageSelected?: (base64: string) => void;
}

export default function CustomImagePicker({ label, onImageSelected }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);

  // CAMERA PERMISSION
  const requestCameraPermission = async () => {
    if (Platform.OS === 'ios') return true;

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs camera permission to take pictures',
          buttonPositive: 'OK',
        },
      );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const openCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    const result: ImagePickerResponse = await launchCamera({
      mediaType: 'photo',
      includeBase64: true,
      quality: 0.7,
      saveToPhotos: true,
    });

    handleResult(result);
  };

  const openGallery = async () => {
    const result: ImagePickerResponse = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: true,
      quality: 0.7,
    });

    handleResult(result);
  };

  const handleResult = (result: ImagePickerResponse) => {
    setModalVisible(false);

    if (result.assets && result.assets.length > 0) {
      const asset = result.assets[0];

      setImageUri(asset.uri || null);

      if (asset.base64 && onImageSelected) {
        onImageSelected(asset.base64);
      }
    }
  };

  return (
    <>
      <TouchableOpacity
        style={styles.imageBox}
        onPress={() => setModalVisible(true)}
      >
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <Text style={styles.placeholder}>{label}</Text>
        )}
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.option} onPress={openCamera}>
              <Text style={styles.optionText}>Open Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option} onPress={openGallery}>
              <Text style={styles.optionText}>Choose from Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancel}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  imageBox: {
    backgroundColor: '#F1F1F1',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },

  placeholder: {
    fontSize: 12,
    color: '#777',
  },

  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },

  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },

  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },

  option: {
    paddingVertical: 14,
  },

  optionText: {
    fontSize: 16,
  },

  cancel: {
    marginTop: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },

  cancelText: {
    color: 'red',
  },
});
