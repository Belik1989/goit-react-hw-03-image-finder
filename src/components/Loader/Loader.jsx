import React from 'react';
import { Dna } from 'react-loader-spinner';
import { Spinner } from './Loader.styled';

export const Loader = () => {
  return (
    <Spinner>
      <Dna
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </Spinner>
  );
};
