import React, { useState } from "react";

const faqs = [
  { id: 1, question: "How can I contact you?", answer: "You can reach us via email or phone." },
  { id: 2, question: "What services do you provide?", answer: "We specialize in web development, content creation, blogging, and digital solutions tailored to your needs."  },
  { id: 3, question: "Do you offer support?", answer: "Yes, we provide 24/7 customer support for all our clients." }
];

function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // ✅ Fix: Define 'faqId' as number type
  const toggleFAQ = (faqId: number) => {
    setOpenIndex(prevId => (prevId === faqId ? null : faqId));
  };

  return (
    <div className="py-10 text-center bg-gray-50">
      {/* Heading */}
      <h2 className="text-2xl font-bold mb-6 text-gray-900"> <span className="bg-gradient-to-r from-pink-400 to-orange-300 bg-clip-text text-transparent">Frequently</span> Asked Questions</h2>

      {/* FAQ List */}
      <div className="max-w-2xl mx-auto space-y-4">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="p-4 border rounded-lg cursor-pointer bg-white shadow-sm hover:shadow-md transition"
            onClick={() => toggleFAQ(faq.id)}
          >
            <h3 className="font-semibold flex justify-between items-center text-gray-800">
              {faq.question}
              <span className="text-xl">{openIndex === faq.id ? "−" : "+"}</span>
            </h3>
            {openIndex === faq.id && <p className="mt-2 text-gray-600">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Faq;
