import Image from "next/image";

'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/components/ThemeProvider';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export default function Home() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen">
      <header className="fixed w-full top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <nav className="container mx-auto px-4 py-4 flex justify-end">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <SunIcon className="h-6 w-6" />
            ) : (
              <MoonIcon className="h-6 w-6" />
            )}
          </button>
        </nav>
      </header>

      <main className="container mx-auto px-4 pt-24">
        <section className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">
              Aman Ali
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Full Stack Developer & Cybersecurity Specialist passionate about securing web applications and optimizing IT infrastructure.
            </p>
            <motion.a
              href="/resume.pdf"
              className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download Resume
            </motion.a>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
