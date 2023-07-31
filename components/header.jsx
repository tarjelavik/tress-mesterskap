import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <header>
      <nav className="flex items-center flex-wrap border-b border-slate-100 p-3 px-5">
        <a href="/">
          <span className="font-semibold text-xl tracking-tight mr-10">
            VM i Tress
          </span>
        </a>
        <button
          onClick={handleClick}
          className="focus:outline-none inline-flex p-2 rounded lg:hidden ml-auto outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <div
          className={`${active ? "" : "hidden"
            }   w-full lg:inline-flex lg:flex-grow lg:w-auto lg:gap-x-2`}
        >
          <div className="lg:inline-flex lg:w-auto w-full lg: py-2 rounded items-center justify-center">
            <a className="block" href="/leaderboard">
              Resultatliste
            </a>
          </div>
          {/* <div className="lg:inline-flex lg:w-auto w-full py-2 rounded items-center justify-center">
            <a className="block" href="/players">
              Spillere
            </a>
          </div> */}
          <div className="lg:inline-flex lg:w-auto w-full py-2 rounded items-center justify-center">
            <a className="block" href="/match">
              Slag
            </a>
          </div>
          <div className="lg:inline-flex lg:w-auto w-full py-2 rounded items-center justify-center">
            <a className="block" href="/tournaments">
              Turneringer
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
