'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaInstagram, FaTwitter } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';

export default function Footer() {
  return (
    <footer className="footer footer-center p-10 bg-base-200 dark:bg-darkbut text-base-content rounded justify-items-center">
      <nav>
        <motion.div
          className="grid grid-flow-col gap-10"
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.75 }}
        >
          <Link target="_blank" href="https://www.instagram.com/an33dl/#">
            <FaInstagram className="h-10 w-10" />
          </Link>

          <Link target="_blank" href="https://x.com/an33dl">
            <FaTwitter className="h-10 w-10" />
          </Link>

          <Link target="_blank" href="mailto:agustinpfarherr@gmail.com?subject=Hello Agustín&body=">
            <SiGmail className="h-10 w-10" />
          </Link>
        </motion.div>
      </nav>

      <aside>
        <div className="font-bold pt-10">
          © 2025 <span className="text-[#A5D57D]">an33dl</span> All Rights Reserved
        </div>
      </aside>
    </footer>
  );
}
