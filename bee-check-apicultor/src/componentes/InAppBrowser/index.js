import { Linking, Alert } from 'react-native';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';

import { colors } from '../../../assets';

async function openLinkInBrowser(url) {
  try {
    if (await InAppBrowser.isAvailable()) {
      const result = await InAppBrowser.open(url, {
        // Android Properties
        showTitle: true,
        toolbarColor: colors.theme_primary,
        secondaryToolbarColor: '#FFFFFF',
        enableUrlBarHiding: true,
        enableDefaultShare: false,
        forceCloseOnRedirection: false,
        
        // iOS Properties
        dismissButtonStyle: 'cancel',
        preferredBarTintColor: colors.theme_second,
        preferredControlTintColor: 'white',
        readerMode: false,
        animated: true,
        modalPresentationStyle: 'overFullScreen',
        modalTransitionStyle: 'partialCurl',
        modalEnabled: true,
        enableBarCollapsing: false,
      })
    } else {
      Linking.openURL(url);
    }
  } catch (error) {
    Alert.alert('Falha ao abrir link', 'Por favor, tente novamente mais tarde');
    // Alert.alert(error.message);
  }
}

export default openLinkInBrowser;