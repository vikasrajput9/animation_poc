import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const cards = [
  {
    id: 1,
    title: "Card One",
    content: "This is the first card.",
    bg: "bg-red-400",
  },
  {
    id: 2,
    title: "Card Two",
    content: "This is the second card.",
    bg: "bg-blue-400",
  },
  {
    id: 3,
    title: "Card Three",
    content: "This is the third card.",
    bg: "bg-green-400",
  },
];

export default function App() {
  const [index, setIndex] = useState(0);
  const [scrolling, setScrolling] = useState(false); // to debounce rapid scrolls
  const currentCard = cards[index];

  const handleScroll = useCallback(
    (e) => {
      if (scrolling) return;

      setScrolling(true);
      if (e.deltaY > 0) {
        // Scroll down
        setIndex((prev) => (prev + 1) % cards.length);
      } else {
        // Scroll up
        setIndex((prev) => (prev - 1 + cards.length) % cards.length);
      }

      setTimeout(() => setScrolling(false), 600); // debounce duration matches animation
    },
    [scrolling]
  );

  return (
    <div
      onWheel={handleScroll}
      className={`w-full h-screen flex items-center justify-center transition-colors duration-500 ${currentCard.bg}`}
    >
      <div className="relative w-full max-w-md px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCard.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl bg-white border border-gray-200 shadow-2xl p-8 text-center"
          >
            <h2 className="text-3xl font-semibold mb-4">{currentCard.title}</h2>
            <p className="text-gray-700 text-base">{currentCard.content}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

