import { GeoCodeResponse } from '@/types/geocode';
import { LoadScript, StandaloneSearchBox } from '@react-google-maps/api';
import React, { useRef } from 'react';

const LocationInput = ({
  onChanged,
}: {
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

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY ?? 'NULL'}
      libraries={['places']}
      region='ng'
    >
      <StandaloneSearchBox
        onLoad={(ref) => (inputRef.current = ref)}
        onPlacesChanged={handlePlaceChanged}
      >
        <div>
          <div className='font-bold my-1'>Enter Address</div>
          <input
            onChange={(e) => onChanged(e.currentTarget.value)}
            type='text'
            className='form-control w-full rounded p-4 border-gray-200'
            placeholder='Enter Address'
          />
        </div>
      </StandaloneSearchBox>
    </LoadScript>
  );
};

export default LocationInput;
