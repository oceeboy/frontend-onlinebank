"use client";
import React, { useState } from "react";

interface ContentDefult {
  id: number;
  title: string;
  description: string;
}
interface CardSectionProps {
  cards: ContentDefult[]; // Array of card content or IDs (can be updated based on your use case)
}

const CardSection: React.FC<CardSectionProps> = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <section className="w-full px-8 py-12 bg-white">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-50"
        >
          &larr;
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex >= cards.length - 3}
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-50"
        >
          &rarr;
        </button>
      </div>
      <div className="relative overflow-hidden">
        <div
          className="flex space-x-4 snap-x scroll-smooth overflow-x-auto"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: "transform 0.3s ease-in-out",
          }}
        >
          {cards.map((card) => (
            <div
              key={card.id}
              className="snap-center flex-shrink-0 w-1/3 p-4 bg-gray-50 rounded-md shadow-md"
            >
              <div className="h-32 bg-gray-200 rounded-md mb-4"></div>
              <h3 className="text-lg font-bold text-gray-800">{card.title}</h3>
              <p className="text-sm text-gray-600">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CardSection;
