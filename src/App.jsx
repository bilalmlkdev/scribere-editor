import { useState } from 'react';
import Loader from './components/Loader';
import Editor from './components/editor/Editor';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoaderComplete = () => {
    setIsLoading(false);
  };

  return isLoading ? <Loader onComplete={handleLoaderComplete} /> : <Editor />;
}
