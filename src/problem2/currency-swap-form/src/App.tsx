import React from 'react';
import SwapForm from './components/SwapForm';
import './styles.css';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <SwapForm />
    </div>
  );
};

export default App;
