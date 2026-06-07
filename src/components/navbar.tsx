'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Bebas_Neue } from 'next/font/google';

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
});

export default function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [portfolioOpen, setPortfolioOpen] = useState(false);

  return (
    <>
      {/* DESKTOP */}
      <header className="hidden md:block bg-[#f3f3f3] py-4">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <Link href="/">
         <h1
          className={`
            ${bebas.className}
            text-5xl
            lg:text-6xl
            tracking-wide
            text-black
            hover:text-lime-500
            transition
          `}
        >
          Anzenel De Leon
        </h1>
          </Link>

          <h2
            className="
              text-xl
              lg:text-2xl
              font-bold
              uppercase
              tracking-[0.18em]
              text-black
            "
          >
            Illustration & Character Design
          </h2>
         
        

          <nav className="flex items-center gap-10 mt-5">
            {/* PORTFOLIO */}
            <div
              className="relative"
              onMouseEnter={() => setPortfolioOpen(true)}
              onMouseLeave={() => setPortfolioOpen(false)}
            >
             <Link
              href="/portfolio?category=character-design"
              className="
                text-[18px]
                uppercase
                tracking-[0.2em]
                hover:text-lime-500
                transition
              "
            >
              Portfolio
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
                      <Link
                        href="/portfolio?category=character-design"
                        className="
                          block
                          px-5
                          py-3
                          text-sm
                          hover:bg-neutral-100
                          transition
                        "
                      >
                        Character Design
                      </Link>

                      <Link
                        href="/portfolio?category=fine-arts"
                        className="
                          block
                          px-5
                          py-3
                          text-sm
                          hover:bg-neutral-100
                          transition
                        "
                      >
                        Fine Arts
                      </Link>

                      <Link
                        href="/portfolio?category=illustrations"
                        className="
                          block
                          px-5
                          py-3
                          text-sm
                          hover:bg-neutral-100
                          transition
                        "
                      >
                        Illustrations
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ILLUSTRATIONS */}
           <Link
            href="/portfolio?category=illustrations"
            className="
              text-[18px]
              uppercase
              tracking-[0.2em]
              hover:text-lime-500
              transition
            "
          >
            Illustrations
          </Link>
            {/* ABOUT */}
            <Link
              href="/about"
              className="
                text-[18px]
                uppercase
                tracking-[0.2em]
                hover:text-lime-500
                transition
              "
            >
              About
            </Link>
          </nav>
        </div>
      </header>

      {/* MOBILE */}
    <header className="md:hidden bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-6">
          <Link href="/">
            <h1
            className="
              text-3xl
              font-black
              uppercase
              text-black
              leading-none
            "
            style={{
              fontFamily:
                'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif',
            }}
          >
            Anzenel De Leon
          </h1>
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
              leading-none
              text-lime-500
              hover:scale-110
              transition
            "
          >
            ×
          </button>
         <div
  className="
    h-full
    flex
    flex-col
    items-center
    justify-center
    gap-8
  "
>
  <Link
    href="/portfolio?category=character-design"
    onClick={() => setIsMenuOpen(false)}
    className="text-2xl text-black uppercase tracking-wide"
    style={{
      fontFamily:
        'Impact, Haettenschweiler, Arial Narrow Bold, sans-serif',
    }}
  >
    Portfolio
  </Link>

  <Link
    href="/portfolio?category=character-design"
    onClick={() => setIsMenuOpen(false)}
    className="text-2xl text-black uppercase tracking-wide"
    style={{
      fontFamily:
        'Impact, Haettenschweiler, Arial Narrow Bold, sans-serif',
    }}
  >
    Character Design
  </Link>

  <Link
    href="/portfolio?category=fine-arts"
    onClick={() => setIsMenuOpen(false)}
    className="text-2xl text-black uppercase tracking-wide"
    style={{
      fontFamily:
        'Impact, Haettenschweiler, Arial Narrow Bold, sans-serif',
    }}
  >
    Fine Arts
  </Link>

  <Link
    href="/portfolio?category=illustrations"
    onClick={() => setIsMenuOpen(false)}
    className="text-2xl text-black uppercase tracking-wide"
    style={{
      fontFamily:
        'Impact, Haettenschweiler, Arial Narrow Bold, sans-serif',
    }}
  >
    Illustrations
  </Link>

  <Link
    href="/about"
    onClick={() => setIsMenuOpen(false)}
    className="text-2xl text-black uppercase tracking-wide"
    style={{
      fontFamily:
        'Impact, Haettenschweiler, Arial Narrow Bold, sans-serif',
    }}
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