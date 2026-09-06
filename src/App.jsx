import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing } from "./pages/landing/Landing";
import Editor from "./components/editor/Editor";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/editor" element={<Editor />} />
      </Routes>
    </BrowserRouter>
  );
}
