import { Link } from "react-router-dom";
import GrainyShader from "../../components/background/GrainyShader";
import Logo from "../../components/nav/Logo";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { LuGithub } from "react-icons/lu";

export function Landing() {
  return (
    <GrainyShader className="min-h-screen">
      <div className="min-h-screen max-w-5xl mx-auto flex flex-col">
        <header className="flex items-center justify-between px-6 h-14">
          <Logo />
          <div className="flex items-center gap-2">
            <Link
              to="/editor"
              className="text-xs font-medium bg-white/90 hover:bg-white text-black rounded-lg px-2.5 py-[5px] active:scale-99"
            >
              Open Editor
            </Link>
          </div>
        </header>

        <main className="flex-1 flex flex-col justify-center px-6 py-16 sm:py-24">
          <div className="max-w-4xl space-y-6 sm:space-y-8">
            <span className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium text-white/80">
              Open Source{" "}
              <span className="hidden md:inline">| Free Forever</span>
            </span>

            <div className="space-y-1.5">
              <h1 className="font-instrument text-5xl sm:text-6xl md:text-7xl lg:text-8xl bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
                Craft words
              </h1>
              <h2 className="font-instrument text-5xl sm:text-6xl md:text-7xl lg:text-8xl bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent pb-2">
                worth framing.
              </h2>
            </div>

            <p className="lg:text-base text-sm text-white/60 max-w-lg leading-relaxed">
              A minimalist tool for writers and designers. Write with a rich
              editor, style with beautiful themes, and export stunning
              typographic images all in your browser.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/editor"
                className="group inline-flex items-center justify-center gap-1.5 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-medium text-black hover:bg-white active:scale-99"
              >
                Start Creating
                <MdOutlineKeyboardArrowRight
                  size={18}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>

              <a
                href="https://github.com/bilalmlkdev/scribere-editor"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-lg px-3 py-[9px] text-xs font-medium text-white/80 bg-white/10  active:scale-99"
              >
                <LuGithub
                  size={16}
                  className="transition-transform duration-200 group-hover:scale-110"
                />
                View on GitHub
              </a>
            </div>
          </div>

          <div className="mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs text-white/40">
            <span>No sign-up. No watermarks. No catch.</span>
            <span className="hidden sm:inline text-white/20">·</span>
            <span>Everything runs locally in your browser.</span>
          </div>
        </main>
      </div>
    </GrainyShader>
  );
}
