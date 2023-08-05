import { launchImageLibrary } from 'react-native-image-picker';

export async function galleryClickImage(options) {
    return new Promise(async (resolve, reject) => {
      try {
        const _options = options ?? {
          mediaType: 'photo',
          maxWidth: 1080,
          maxHeight: 1080,
          quality: 1,
        };
        setTimeout(() => {
          launchImageLibrary(_options, async response => {
            if (response.didCancel) {
              reject('cancelled');
            } else if (response.errorMessage) {
              Alert.alert('Gallery Error', response.errorMessage);
              reject(response.errorMessage);
            } else if (response.assets?.length > 0) {
              resolve(response.assets[0]);
            } else {
              Alert.alert('Gallery Error', JSON.stringify(response));
            }
          });
        }, 500);
      } catch (err) {
        Alert.alert('Gallery Error', err?.message);
        reject(err?.message);
      }
    }
    );
  }

  export function isNullOrEmpty(text) {
    return text === undefined || text === '' || text === null || text.length == 0;
  }