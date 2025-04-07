import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
  const currentCard = cards[index];

  const handleNext = () => setIndex((prev) => (prev + 1) % cards.length);
  const handlePrev = () => setIndex((prev) => (prev - 1 + cards.length) % cards.length);

  return (
    <div
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

        <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 flex gap-4">
          <button
            onClick={handlePrev}
            className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
          >
            <ArrowLeft />
          </button>
          <button
            onClick={handleNext}
            className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
          >
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
