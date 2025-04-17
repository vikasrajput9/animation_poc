import React, { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";

const cards = [
  { id: 1, bg: "bg-red-400" },
  { id: 2, bg: "bg-blue-400" },
  { id: 3, bg: "bg-green-400" },
  { id: 4, bg: "bg-yellow-400" },
  { id: 5, bg: "bg-purple-400" },
  { id: 6, bg: "bg-indigo-400" },
];

const generateEdgeCircles = (count = 14) =>
  Array.from({ length: count }).map((_, idx) => {
    const edgeBias = () => {
      const val = Math.random();
      return val < 0.3
        ? `${Math.random() * 10}%`
        : val > 0.7
        ? `${90 + Math.random() * 10}%`
        : `${Math.random() * 100}%`;
    };

    return {
      id: idx,
      size: `${30 + Math.random() * 30}px`,
      top: edgeBias(),
      left: edgeBias(),
      color: [
        "bg-red-500",
        "bg-blue-500",
        "bg-yellow-500",
        "bg-green-500",
        "bg-purple-500",
        "bg-pink-500",
        "bg-orange-500",
        "bg-indigo-500",
      ][Math.floor(Math.random() * 8)],
    };
  });

export default function App() {
  const [index, setIndex] = useState(0);
  const [scrolling, setScrolling] = useState(false);
  const [circles, setCircles] = useState(generateEdgeCircles());

  useEffect(() => {
    const interval = setInterval(() => {
      setCircles(generateEdgeCircles());
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleScroll = useCallback(
    (e) => {
      if (scrolling) return;
      setScrolling(true);
      setIndex((prev) =>
        e.deltaY > 0 ? Math.min(prev + 1, cards.length - 1) : Math.max(prev - 1, 0)
      );
      setTimeout(() => setScrolling(false), 600);
    },
    [scrolling]
  );

  const currentBg = index === 0 ? cards[0].bg : cards[index].bg;

  return (
    <div
      onWheel={handleScroll}
      className={`w-full h-screen flex flex-col items-center justify-center transition-colors duration-500 ${currentBg}`}
    >
      <div className="relative w-full max-w-6xl h-[700px] px-4 overflow-hidden">
        {/* First Card Always Visible */}
        <motion.div
          className="absolute top-0 left-0 w-full h-[500px] z-0 rounded-[3rem] bg-blue-100 border border-gray-200 shadow-2xl p-8 flex items-center overflow-hidden"
        >
          <div className="text-center space-y-6 z-10 w-full">
            <h2 className="text-black text-4xl font-bold leading-snug">
              We let our number<br />
              do the talking
            </h2>

            <div className="space-y-4">
              <div>
                <p className="text-red-600 text-4xl font-extrabold">4.96%</p>
                <p className="text-gray-600 text-base font-medium">Google rating</p>
              </div>
              <div>
                <p className="text-red-600 text-4xl font-extrabold">98.20%</p>
                <p className="text-gray-600 text-base font-medium">Got into their dream school</p>
              </div>
              <div>
                <p className="text-red-600 text-4xl font-extrabold">5000+</p>
                <p className="text-gray-600 text-base font-medium">Students guided</p>
              </div>
            </div>

            {circles.map((circle) => (
              <motion.div
                key={circle.id}
                className={`absolute rounded-full ${circle.color}`}
                animate={{
                  top: [circle.top, `${Math.random() * 100}%`],
                  left: [circle.left, `${Math.random() * 100}%`],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  width: circle.size,
                  height: circle.size,
                  opacity: 0.5,
                  filter: "blur(2px)",
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Other Cards with Stack */}
        {cards.slice(1).map((card, i) => {
          const isActive = i + 1 === index;
          const isBefore = i + 1 < index;
          const stackOffset = index - (i + 1);

          return (
            <motion.div
              key={card.id}
              initial={{ y: 1000, opacity: 0 }}
              animate={{
                y: isBefore ? -stackOffset * 40 : isActive ? 0 : 1000,
                scale: isBefore ? 1 - stackOffset * 0.03 : isActive ? 1 : 0.9,
                zIndex: isActive ? 999 : cards.length - i,
                opacity: isBefore ? 0.7 : isActive ? 1 : 0,
              }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="absolute top-0 left-0 w-full h-[400px] rounded-[3rem] bg-blue-100 border border-gray-200 shadow-2xl p-4 flex items-center overflow-hidden"
            >
              <div className="flex w-full h-full">
                <div className="w-3/12 flex items-center justify-center relative">
                  <div className="space-y-4 text-left z-10">
                    <h2 className="text-xl font-bold">
                      <span className="text-black">Meet You, </span>
                      <span className="text-red-600">from the future</span>
                    </h2>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      There’s someone at your dream school with the same ambitions,
                      interests, and profile as you!!!
                    </p>
                    <button className="bg-black text-white px-4 py-2 rounded-full font-semibold text-sm shadow-md hover:opacity-90 transition">
                      Explore Top Admits
                    </button>
                  </div>
                </div>
                <div className="relative w-9/12 h-full">
                  <img
                    src={`https://source.unsplash.com/random/400x300?sig=${card.id}`}
                    alt="Random"
                    className="w-full h-full object-cover rounded-r-[3rem]"
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}