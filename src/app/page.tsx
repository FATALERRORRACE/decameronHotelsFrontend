'use client'
import React from 'react';
import App from '../components/App';
import { AlertProvider } from '../components/alerts/AlertContext';

const Page = () => {
  return (
    <AlertProvider>
      <App />
    </AlertProvider>
  );
};

export default Page;