import React from 'react';
import FancyForm from './components/FancyForm';
import './styles.css';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <FancyForm />
    </div>
  );
};

export default App;
