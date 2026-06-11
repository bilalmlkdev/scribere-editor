import { useState } from 'react';
import Loader from './components/Loader';
import Editor from './components/editor/Editor';

export default function App() {
  const [isLoading, setIsLoading] = useState(() => !sessionStorage.getItem('glyphic_loaded'));

  const handleLoaderComplete = () => {
    sessionStorage.setItem('glyphic_loaded', '1');
    setIsLoading(false);
  };

  return isLoading ? <Loader onComplete={handleLoaderComplete} /> : <Editor />;
}
