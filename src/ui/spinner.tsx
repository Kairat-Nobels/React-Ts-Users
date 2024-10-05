import React from 'react';
import { Loader } from 'rsuite';

export const Spinner: React.FC = () => {
  return (
    <div>
      <Loader size="lg" center />
    </div>
  );
};