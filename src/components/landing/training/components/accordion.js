// components/FAQAccordion.js

import React, { useState } from 'react';

const FAQAccordion = ({ faqData }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div>
      {faqData.map((item, index) => (
        <div key={index} className="mb-4">
          <div
            onClick={() => handleToggle(index)}
            className="cursor-pointer flex justify-between items-center bg-gray-200 p-4 rounded-md"
          >
            <div className="font-semibold">{item.question}</div>
            <div>{openIndex === index ? '-' : '+'}</div>
          </div>
          {openIndex === index && (
            <div className="mt-2 p-4 bg-white rounded-md">
              <p>{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;
