'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Patua_One } from 'next/font/google';

const patua = Patua_One({
  weight: '400',
  subsets: ['latin'],
});

export default function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [portfolioOpen, setPortfolioOpen] = useState(false);

  return (
    <>
      {/* DESKTOP */}
      <header className="hidden md:block bg-white shadow-md py-4">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <Link href="/">
            <h1
              className={`
                ${patua.className}
                text-5xl
                lg:text-6xl
                text-black
                hover:text-lime-500
                transition
              `}
            >
              ANZENEL DE LEON
            </h1>
          </Link>

          <h2
            className="
              text-xl
              lg:text-2xl
              font-bold
              lowercase
              tracking-[0.18em]
              text-black
            "
          >
            illustration & character design
          </h2>

          <nav className="flex items-center gap-10 mt-5">
            {/* PORTFOLIO */}
            <div
              className="relative"
            >
              <Link
                href="/portfolio/character-design"
                className="
                  text-[18px]
                  tracking-[0.2em]
                  hover:text-lime-500
                  transition
                "
              >
                portfolio
              </Link>
              <AnimatePresence>
                {portfolioOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.15 }}
                    className="
                      absolute
                      top-full
                      left-1/2
                      -translate-x-1/2
                      pt-3
                      z-50
                    "
                  >
                    <div
                      className="
                        bg-white
                        rounded-lg
                        shadow-xl
                        overflow-hidden
                        min-w-[220px]
                        border
                        border-neutral-200
                      "
                    >
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ILLUSTRATIONS */}
            <Link
              href="/portfolio/illustrations"
              className="
                text-[18px]
                tracking-[0.2em]
                hover:text-lime-500
                transition
              "
            >
              illustrations
            </Link>
            {/* ABOUT */}
            <Link
              href="/about"
              className="
                text-[18px]
                tracking-[0.2em]
                hover:text-lime-500
                transition
              "
            >
              about
            </Link>
          </nav>
        </div>
      </header>

      {/* MOBILE */}
      <header
        className="
          md:hidden
          sticky
          top-0
          z-50
          bg-white
          shadow-sm
        "
      >
        <div className="flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex flex-col">
            <h1
              className={`
                ${patua.className}
                text-2xl
                font-black
                uppercase
                text-black
                leading-none
              `}
            >
              Anzenel De Leon
            </h1>

            <span
              className="
                text-[10px]
                tracking-wide
                text-neutral-700
              "
            >
              character design + illustration
            </span>
          </Link>

          <button
            onClick={() => setIsMenuOpen(true)}
            className="text-3xl text-lime-500 leading-none"
          >
            ☰
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="
              fixed
              inset-0
              bg-white
              z-[999]
              md:hidden
            "
          >
            <button
              onClick={() => setIsMenuOpen(false)}
              className="
                absolute
                top-6
                right-6
                text-4xl
                text-lime-500
              "
            >
              ×
            </button>

          <div
        className="
          h-full
          flex
          flex-col
          justify-center
          items-center
          gap-10
        "
      >
        <Link
          href="/portfolio?category=character-design"
          onClick={() => setIsMenuOpen(false)}
          className={`
            ${patua.className}
            text-4xl
            text-black
            hover:text-lime-500
            transition
          `}
        >
          Portfolio
        </Link>

        <Link
          href="/portfolio?category=illustrations"
          onClick={() => setIsMenuOpen(false)}
          className={`
            ${patua.className}
            text-4xl
            text-black
            hover:text-lime-500
            transition
          `}
        >
          Illustrations
        </Link>

        <Link
          href="/about"
          onClick={() => setIsMenuOpen(false)}
          className={`
            ${patua.className}
            text-4xl
            text-black
            hover:text-lime-500
            transition
          `}
        >
          About
        </Link>
      </div>
    </motion.div>
  )}
</AnimatePresence>
    </>
  );
}