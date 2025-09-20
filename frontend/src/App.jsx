import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import NoteDetailPage from './pages/NoteDetailPage';

const App = () => {
  return ( 
    <div className='relative h-full w-full'>
    <div className="absolute inset-0 -z-10 h-full w-full 
  [background:radial-gradient(110%_110%_at_50%_15%,#000_70%,#7B3F0040_100%)]" />

      <Routes> 
        <Route path='/' element={<HomePage />} />
        <Route path='/create' element={<CreatePage />} />
        <Route path='/note/:id' element={<NoteDetailPage />} />  
      </Routes>
    </div>
  );
};

export default App;
