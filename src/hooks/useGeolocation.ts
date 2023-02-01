/* eslint-disable prettier/prettier */
import { useState } from 'react';
import { Linking, Platform } from 'react-native';

import Geolocation, {
  GeolocationResponse,
  GeolocationError,
} from '@react-native-community/geolocation';

import { request, PERMISSIONS, check } from 'react-native-permissions';

const useGeolocation = () => {
  const [location, setLocation] = useState({} as GeolocationResponse);
  const [error, setError] = useState({} as GeolocationError);
  const [loading, setLoading] = useState(false);
  const [negativePermissions, setNegativePermissions] = useState(false);

  const getLocation = () => {
    setLoading(true);

    Geolocation.getCurrentPosition(
      pos => {
        setLocation(pos);
        setLoading(false);
      },
      er => {
        setError(er);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 1000,
      }
    );
  };

  const requestLocations = async () => {
    const permission = Platform.OS === 'ios'
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

    const checkPermission = await check(permission);

    if (checkPermission === 'granted') {
      getLocation();
    } else {
      const requestResult = await request(permission);

      if (requestResult === 'granted') {
        getLocation();
      }

      if (requestResult === 'denied') {
        setNegativePermissions(true);
      }
    }
  };

  const openConfig = () => {
    Linking.openSettings();
  };

  return {
    location,
    error,
    loading,
    negativePermissions,
    requestLocations,
    openConfig,
  };
};

export default useGeolocation;
