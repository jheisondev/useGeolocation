/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import useGeolocation from './src/hooks/useGeolocation';

const App = () => {
  const {
    location,
    loading,
    requestLocations,
    negativePermissions,
    openConfig,
    error,
  } = useGeolocation();

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <StatusBar
        barStyle={'dark-content'}
        translucent
        backgroundColor="transparent"
      />

      {location.coords && !loading && (
        <>
          <Text style={styles.text}>
            Latitude: {location ? location.coords?.latitude : 'Buscando...'}
          </Text>
          <Text style={styles.text}>
            Longitude: {location ? location.coords?.longitude : 'Buscando...'}
          </Text>
        </>
      )}

      {!location.coords && error.message ? (
        <>
          <Text style={styles.text}>Erro ao capturar geolocalização!</Text>
          <Text style={styles.text}>Erro: {error.code}</Text>
        </>
      ) : null}

      {loading ? (
        <>
          <ActivityIndicator size="large" />
          <Text style={styles.text}>Localizando dispositivo...</Text>
        </>
      ) : (
        !negativePermissions && (
          <TouchableOpacity style={styles.button} onPress={requestLocations}>
            <Text style={styles.textButton}>Buscar Geolocalização</Text>
          </TouchableOpacity>
        )
      )}

      {negativePermissions && (
        <>
          <Text style={styles.text}>Permissões de Geolocalização negadas!</Text>
          <TouchableOpacity style={styles.button} onPress={openConfig}>
            <Text style={styles.textButton}>Abrir configurações</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#262626',
    borderRadius: 8,
    width: '92%',
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
  },
  text: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'normal',
    color: '#000000',
  },
  textButton: {
    color: '#FFFFFF',
  },
});
