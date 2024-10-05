import React from 'react';
import UsersList from '@components/UsersList';
import { Container } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <div className="App">
      <Container className='container-center'>
        <UsersList />
        <Toaster position="top-right" />
      </Container>
    </div>
  );
};

export default App;
