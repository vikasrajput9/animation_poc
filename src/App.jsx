import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";

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
  {
    id: 4,
    title: "Card Your",
    content: "This is the third card.",
    bg: "bg-yellow-400",
  },{
    id: 5,
    title: "Card Five",
    content: "This is the third card.",
    bg: "bg-purple-400",
  },{
    id: 6,
    title: "Card Six",
    content: "This is the third card.",
    bg: "bg-indigo-400",
  },
];

export default function App() {
  const [index, setIndex] = useState(0);
  const [scrolling, setScrolling] = useState(false);

  const handleScroll = useCallback(
    (e) => {
      if (scrolling) return;

      setScrolling(true);
      if (e.deltaY > 0) {
        setIndex((prev) => Math.min(prev + 1, cards.length - 1));
      } else {
        setIndex((prev) => Math.max(prev - 1, 0));
      }

      setTimeout(() => setScrolling(false), 600);
    },
    [scrolling]
  );

  return (
    <div
      onWheel={handleScroll}
      className={`w-full h-screen flex items-center justify-center transition-colors duration-500 ${cards[index].bg}`}
    >
      <div className="relative w-full max-w-md h-[400px] px-4 perspective">
        {cards.map((card, i) => {
          const isActive = i === index;
          const isBehind = i < index;

          return (
            <motion.div
              key={card.id}
              layout
              initial={false}
              animate={{
                y: isActive ? 0 : isBehind ? (index - i) * -20 : 100,
                scale: isActive ? 1 : 0.9,
                rotateX: isBehind ? 20 : 0,
                zIndex: isActive ? 10 : cards.length - i,
                opacity: isBehind ? 0.7 : 1,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute top-0 left-0 w-full rounded-2xl bg-white border border-gray-200 shadow-2xl p-8 text-center"
            >
              <h2 className="text-3xl font-semibold mb-4">{card.title}</h2>
              <p className="text-gray-700 text-base">{card.content}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

