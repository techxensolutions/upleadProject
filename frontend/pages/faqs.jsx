import React, { useState } from "react";

const FAQs = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="py-24 px-8 max-w-5xl mx-auto flex flex-col md:flex-row gap-12">
      <div className="flex flex-col text-left basis-1/2">
        <p className="sm:text-4xl text-3xl font-extrabold text-base-content text-[#00a0df]">
          Frequently Asked Questions
        </p>
      </div>
      <ul className="basis-1/2">
        {[
          {
            question: "How to follow or unfollow companies?",
            answer:
              "Simply open the company profile page Then click the “Follow” button Company news alerts allow you to be notified when there are news alerts about companies you follow.",
          },
          {
            question: "How to install and use the Chrome Extension?",
            answer:
              "Here is the link to download the extension: SMB LEADS - Chrome Extension. Click “Add to Chrome” button. In case the SMB LEADS extension icon doesn’t show on the upper right corner of your Chrome browser, you may need to pin/enable it. To do that: a. Open the Extensions by clicking the puzzle icon next to your profile avatar. b. A dropdown menu will appear, showing you all of your enabled extensions. Each extension will have a pushpin icon to the right of it. Click the pushpin icon next to SMB LEADS extension, so that the icon turns blue",
          },
          {
            question: "What is SMB LEADS?",
            answer:
              "SMB LEADS is a complete source for high-quality, verified, contact and company information. With SMB LEADS, you can create a highly customized B2B prospect list with accurate data based on over 50 variables. We search the web by crawling millions of pages to analyze public documents such as news articles, press releases, blogs, social networks and executive profiles. We then use our proprietary algorithms to analyze and categorize all of the data we collect. The data then goes through a testing and validation phase where we weed out incorrect and outdated information. We track and update company and contact changes on a daily basis to keep the data accurate ongoing.",
          },
        ].map((faq, index) => (
          <li key={index}>
            <button
              className="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t md:text-lg border-base-content/10"
              aria-expanded={openFAQ === index}
              onClick={() => toggleFAQ(index)}
            >
              <span className="flex-1 text-base-content">{faq.question}</span>
              <svg
                className={`flex-shrink-0 w-4 h-4 ml-auto fill-current transform transition-transform ${
                  openFAQ === index ? "rotate-90" : ""
                }`}
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  y="7"
                  width="16"
                  height="2"
                  rx="1"
                  className="transform origin-center transition duration-200 ease-out false"
                ></rect>
                <rect
                  y="7"
                  width="16"
                  height="2"
                  rx="1"
                  className="transform origin-center rotate-90 transition duration-200 ease-out false"
                ></rect>
              </svg>
            </button>
            <div
              className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
                openFAQ === index ? "max-h-screen" : "max-h-0"
              }`}
            >
              <div className="pb-5 leading-relaxed">
                <div className="space-y-2 leading-relaxed text-gray-600">
                  {faq.answer}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FAQs;
