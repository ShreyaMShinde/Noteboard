import React from 'react'
import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import NoteDetailPage from './pages/NoteDetailPage';
import { toast } from 'react-hot-toast';

const App = () => {
  return (

   <div>
     

     <Routes> 
        <Route path='/' element={<div>HomePage</div>} />
        <Route path='/create' element={<div>CreatePage</div>} />
        <Route path='/note/:id' element={<div>NoteDetailPage</div>} />  

     </Routes>

    </div>
  );
};

export default App;