'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaInstagram, FaXTwitter } from 'react-icons/fa6';
import { HiOutlineMail } from 'react-icons/hi';
import { Bebas_Neue } from 'next/font/google';


const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
});

export default function AboutPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setSending(true);
    setSent(false);

    try {
      await fetch(
        'YOUR_GOOGLE_SCRIPT_URL_HERE',
        {
          method: 'POST',
          body: JSON.stringify({
            name,
            email,
            message,
          }),
        }
      );

      setSent(true);

      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error(error);
    }

    setSending(false);
  };

  return (
    <main className="bg-[#f3f3f3] min-h-screen">
      <section className="max-w-7xl mx-auto px-6 pt-10 pb-24">     
<div className="grid lg:grid-cols-[1fr_420px] gap-16 items-center">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
      <h2
      className={`
      font-bold
        text-3xl
        md:text-4xl
        tracking-wide
        mb-8
      `}
    >
      hello! i'm anzenel
    </h2>

    <div className="space-y-6 text-lg text-neutral-700 leading-relaxed">
      <p>i'm a fine arts graduate, who also enjoys designing characters from time to time C-:</p>
      <p>mixed media collage has been a huge interest of mine lately! i love experimenting with textured layers and using every colour in the rainbow for my illustrations!</p>
      <p>i go by an33dl & 💣 in most online spaces, but you can also call me anzii!
        i'm always on the hunt for creative projects, so if my work piques your interest,
        my email is always open!</p>
    </div>

    <div className="mt-6"> 
      <a
        href="mailto:anziidlart@gmail.com"
        className="text-xl hover:opacity-60 transition"
      >
        anziidlart@gmail.com
      </a>

      <div className="flex items-center gap-5 mt-6">
        <a href="https://x.com/an33dl" target="_blank" rel="noopener noreferrer" className="text-black text-2xl hover:scale-110 transition">
          <FaXTwitter />
        </a>

        <a href="https://www.instagram.com/an33dl/" target="_blank" rel="noopener noreferrer" className="text-black text-2xl hover:scale-110 transition">
          <FaInstagram />
        </a>

        <a href="mailto:anziidlart@gmail.com" className="text-black text-2xl hover:scale-110 transition">
          <HiOutlineMail />
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
                src="/logo-icon-green-outline.svg"
                alt="VGen"
                width={28}
                height={28}
                className="
                  brightness-0
                  md:w-7
                  md:h-7
                  w-6
                  h-6
                "
              />
              </a>
      </div>
    </div>
  </motion.div>

  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.1 }}
  >
    <Image
      src="/about-doodle.png"
      alt="aneedle"
      width={700}
      height={700}
      className="w-full max-w-[450px] mx-auto"
    />
  </motion.div>
</div>
<div className="pt-8">
              <h3
                className={`
                  text-3xl
                  md:text-3xl
                  tracking-wide
                  font-bold
                  mb-6
                `}
              >
                got inquiries?
              </h3>
               <form
                onSubmit={handleSubmit}
                className="space-y-5"
                >
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required
                    className="
                    w-full
                    bg-white
                    border
                    border-neutral-200
                    rounded-2xl
                    px-5
                    py-4
                    shadow-sm
                    outline-none
                    transition-all
                    duration-300
                    focus:border-black
                    focus:shadow-lg
                    "
                />

                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className="
                    w-full
                    bg-white
                    border
                    border-neutral-200
                    rounded-2xl
                    px-5
                    py-4
                    shadow-sm
                    outline-none
                    transition-all
                    duration-300
                    focus:border-black
                    focus:shadow-lg
                    "
                />

                <textarea
                    rows={7}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Message"
                    required
                    className="
                    w-full
                    bg-white
                    border
                    border-neutral-200
                    rounded-2xl
                    px-5
                    py-4
                    shadow-sm
                    outline-none
                    resize-none
                    transition-all
                    duration-300
                    focus:border-black
                    focus:shadow-lg
                    "
                />

                <button
                    type="submit"
                    disabled={sending}
                    className="
                    rounded-2xl
                    border
                    border-black
                    px-8
                    py-4
                    font-medium
                    transition-all
                    duration-300
                    hover:bg-black
                    hover:text-white
                    hover:scale-[1.02]
                    disabled:opacity-50
                    "
                >
                    {sending ? 'Sending...' : 'Submit'}
                </button>

                {sent && (
                    <p className="text-green-600">
                    Message sent successfully.
                    </p>
                )}
                </form>
              </div>  
      </section>
    </main>
  );
}
