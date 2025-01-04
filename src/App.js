import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Branch from './components/Branch/Branch';
import AddBranch from './components/AddBranch/AddBranch';
import UploadBranch from './components/UploadBranch/UploadBranch';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/home" element={<Home/>} />
        <Route path='/branches' element={<Branch />} />
        <Route exact path="/" element={<Login/>} />
        <Route path='/addbranch' element={<AddBranch/>} />
        <Route path='/addbranch/:id' element={<AddBranch/>} />
        <Route path='/uploadExcel' element={<UploadBranch/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
