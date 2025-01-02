'use client'
import React from 'react';
import FileUploader from './components/FileUploader';
import ParametersForm from './components/ParametersForm';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white text-center font-semibold flex items-center justify-center">
      <div className="min-w-screen border-2 text-center items-center justify-center  ">
        <div className='border-b-2'>
        <h1 className='font-semibold p-1 text-xl '>Algorytm mrówkowy</h1>
        <div className='font-thin p-1'>
        <FileUploader fileName="berlin52.tsp" />
        <FileUploader fileName="att48.tsp" />
        </div>
        </div>
        <ParametersForm />
      </div>
    </div>
  );
};

export default Home;