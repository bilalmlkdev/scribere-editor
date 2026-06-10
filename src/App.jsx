import { useState, useEffect } from 'react';
import Loader from './components/Loader';
import Editor from './Editor';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Optional: preload any heavy assets (fonts, etc.)
  useEffect(() => {
    // Simulate a small delay or actual preloading
    const preload = async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    };
    preload();
  }, []);

  const handleLoaderComplete = () => {
    setIsLoading(false);
  };

  return isLoading ? <Loader onComplete={handleLoaderComplete} /> : <Editor />;
}
