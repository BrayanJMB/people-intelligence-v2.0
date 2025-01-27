import React from "react";
import "./cards.css";
import imgEj from "/assets/img/img-ej.png";
import imgEj2 from "/assets/img/img-ej2.png";
import { IconDots } from "@tabler/icons-react";

export default function ContainerCards() {
  const cards = [
    {
      title: "Example interview title",
      date: "12/Jun/2024",
      imageUrl: `${imgEj}`,
    },
    {
      title: "Example interview title",
      date: "12/Jun/2024",
      imageUrl: `${imgEj2}`,
    },
    {
      title: "Example interview title",
      date: "12/Jun/2024",
      imageUrl: `${imgEj}`,
    },
    {
      title: "Example interview title",
      date: "12/Jun/2024",
      imageUrl: `${imgEj2}`,
    },
  ];

  return (
    <section className="m-8 p-8 bg-white h-max rounded-[20px] overflow-hidden">
      <h2 className="font-bold text-[20px] mb-4">Dashboard destacados</h2>
      <section className="flex space-x-4 overflow-x-auto justify-between scroll-container pb-5">
        {cards.map((card, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg shadow-md flex flex-col justify-evenly w-[400px] flex-shrink-0 relative"
          >
            <div className="relative">
              <h4 className="font-semibold text-lg">{card.title}</h4>
              <span className="text-sm text-gray-500">{card.date}</span>
            </div>
            <div className="flex justify-end mt-2">
              <button className="text-gray-500 text-[48px] absolute top-[15px] bg-[#E3E3E3] flex items-center justify-center rounded">
                <IconDots stroke={2} />
              </button>
            </div>
            <div className="mt-4">
              <img
                src={card.imageUrl}
                alt={card.title}
                className="w-full h-40 object-cover rounded-md"
              />
            </div>
          </div>
        ))}
      </section>
    </section>
  );
}
