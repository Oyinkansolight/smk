import { LoadScript, StandaloneSearchBox } from '@react-google-maps/api';
import React, { useRef } from 'react';

const LocationInput = () => {
  const inputRef = useRef();

  const handlePlaceChanged = () => {
    const [place] = inputRef.current.getPlaces();
    if (place) {
      console.log(place.formatted_address);
      console.log(place.geometry.location.lat());
      console.log(place.geometry.location.lng());
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
      libraries={['places']}
    >
      <StandaloneSearchBox
        onLoad={(ref) => (inputRef.current = ref)}
        onPlacesChanged={handlePlaceChanged}
      >
        <input
          type='text'
          className='form-control'
          placeholder='Enter Address'
        />
      </StandaloneSearchBox>
    </LoadScript>
  );
};

export default LocationInput;
