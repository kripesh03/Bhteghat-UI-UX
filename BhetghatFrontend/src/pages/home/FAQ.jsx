import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    question: "What is this platform about?",
    answer: "This platform helps users discover and browse upcoming events happening around Nepal, including music, art, workshops, and more.",
  },
  {
    question: "Do I need an account to join events?",
    answer: "Yes, you'll need to create a free account to register or buy tickets for events.",
  },
  {
    question: "How do I host my own event?",
    answer: "You can host events by registering as an organizer. Once approved, you’ll be able to list your events and manage attendees.",
  },
  {
    question: "Are events free to attend?",
    answer: "Some events are free, while others require ticket purchases. You can filter events based on price on the browse page.",
  },
  {
    question: "Is there a mobile app available?",
    answer: "We're currently working on a mobile app. Stay tuned for updates!",
  },
];

const FaqPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">

      <main className="flex-1 max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4 text-center">Frequently Asked Questions</h1>
        <p className="text-gray-500 text-center mb-10">
          Find answers to common questions below.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md">
              <button
                className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none"
                onClick={() => toggleAnswer(index)}
              >
                <span className="font-medium text-gray-800">{faq.question}</span>
                <FaChevronDown
                  className={`transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-600">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </main>

    </div>
  );
};

export default FaqPage;
