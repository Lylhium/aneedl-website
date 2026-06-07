'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

import Logo from '../../public/logo.png';
import VgenLogo from '../../public/logo-icon-green-outline.svg';

import { FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { HiOutlineMail } from 'react-icons/hi';
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2';

export default function Home() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleAudio = () => {
    if (!videoRef.current) return;

    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <div className="bg-white overflow-hidden">
      <main>
        <section className="relative h-screen w-full overflow-hidden">
          {/* VIDEO HERO */}
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.6,
              ease: 'easeOut',
            }}
            className="absolute inset-0"
          >
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="
                absolute
                inset-0
                w-full
                h-full
                object-cover
              "
            >
              <source src="/hero-video.mp4" type="video/mp4" />
            </video>
          </motion.div>

          {/* OVERLAY */}
          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/60
              via-black/20
              to-black/10
              z-10
            "
          />

          {/* AUDIO BUTTON */}
          <button
            onClick={toggleAudio}
            className="
              absolute
              top-6
              right-6
              md:top-8
              md:right-8
              z-30

              bg-black/30
              backdrop-blur-md

              rounded-full
              p-3

              text-white

              hover:bg-black/50
              transition
            "
          >
            {isMuted ? (
              <HiSpeakerXMark size={24} />
            ) : (
              <HiSpeakerWave size={24} />
            )}
          </button>

          {/* CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 1,
            }}
            className="
              absolute
              bottom-8
              md:bottom-12
              left-6
              md:left-10
              z-20
            "
          >
            {/* LOGO */}
            <Image
              src={Logo}
              alt="AN33DL"
              priority
              width={600}
              height={300}
              className="
                w-[180px]
                md:w-[280px]
                h-auto
                mb-4
                drop-shadow-lg
              "
            />

            {/* TITLE */}
            <h2
              className="
                text-white
                text-xl
                md:text-4xl
                font-bold
                uppercase
                leading-tight
                tracking-wide
                drop-shadow-lg
              "
            >
          
            </h2>

            {/* SOCIALS */}
            <div className="flex items-center gap-5 mt-6">
              <a
                href="https://x.com/an33dl"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  text-white
                  text-2xl
                  hover:scale-110
                  transition
                "
              >
                <FaXTwitter />
              </a>

              <a
                href="https://www.instagram.com/an33dl/"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  text-white
                  text-2xl
                  hover:scale-110
                  transition
                "
              >
                <FaInstagram />
              </a>

              <a
                href="https://vgen.co/an33dl"
                target="_blank"
                rel="noopener noreferrer"
                title="VGen"
                className="
                  hover:scale-110
                  transition
                  flex
                  items-center
                "
              >
                <Image
                  src={VgenLogo}
                  alt="VGen"
                  width={28}
                  height={28}
                  className="
                    invert
                    brightness-0
                    md:w-7
                    md:h-7
                    w-6
                    h-6
                  "
                />
              </a>

              <a
                href="mailto:anziidlart@gmail.com"
                className="
                  text-white
                  text-2xl
                  hover:scale-110
                  transition
                "
              >
                <HiOutlineMail />
              </a>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}