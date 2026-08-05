import scribereLogo from "../../../public/scribereLogo.svg";
import { useViewport } from '../../hooks/useViewport';

export default function Logo() {
  const isMobile = useViewport();

  return (
    <div className="flex items-center gap-1.5">
      <span>
        <img src={scribereLogo} alt="scribere-logo" className="h-5 w-auto" />
      </span>
      <h3
        className={`font-medium text-[13.5px] tracking-wide bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent ${isMobile ? "hidden" : "block"}`}
      >
        Scribere
      </h3>
    </div>
  );
}
