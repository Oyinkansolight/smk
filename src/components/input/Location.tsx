import { GeoCodeResponse } from '@/types/geocode';
import { StandaloneSearchBox, useJsApiLoader } from '@react-google-maps/api';
import React, { useRef } from 'react';

const LocationInput = ({
  value,
  onChanged,
}: {
  value?: string;
  onChanged: (value: GeoCodeResponse | string) => void;
}) => {
  const inputRef = useRef<google.maps.places.SearchBox>();

  const handlePlaceChanged = () => {
    const p = inputRef.current?.getPlaces();
    p &&
      onChanged({
        ...p[0],
        geometry: {
          location: {
            lat: p[0].geometry?.location?.lat(),
            lng: p[0].geometry?.location?.lng(),
          },
        },
      });
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY ?? 'NULL',
    libraries: ['places'],
    region: 'ng',
  });

  return isLoaded ? (
    <StandaloneSearchBox
      onLoad={(ref) => (inputRef.current = ref)}
      onPlacesChanged={handlePlaceChanged}
    >
      <div>
        <div className='font-bold my-1'>Enter Address</div>
        <input
          defaultValue={value}
          onChange={(e) => onChanged(e.currentTarget.value)}
          type='text'
          className='form-control w-full rounded p-4 border-gray-200'
          placeholder='Enter Address'
        />
      </div>
    </StandaloneSearchBox>
  ) : (
    <div>Loading...</div>
  );
};

export default LocationInput;
