import { useRef } from 'react';
import ExportOptions from './ExportOptions';
import Logo from './Logo';
import Themes from './Themes';
import ViewPorts from './ViewPorts';

export default function Navbar() {
  const elementRef = useRef(null);
  return (
    <nav className="flex items-center justify-between h-12 w-full max-w-full px-4 border-b border-white/20">
      {/* logo */}
      <Logo />

      {/* <h1 ref={elementRef}>Hello</h1> */}
      {/* right side */}
      <div className="flex items-center gap-1.5">
        <ViewPorts />
        <Themes />
        <span className="h-6 w-[1px] mx-1 bg-white/20"></span>
        <ExportOptions targetRef={elementRef} />
      </div>
    </nav>
  );
}
