import React from "react";
import Image from "next/image";

const AboutUs = () => {
  return (
    <div className="w-full">
      <div className="text-center m-auto pt-20">
        <h1 className="text-[#00a0df] text-[43px] font-bold max-md:text-3xl max-sm:text-2xl font-serif">
          At SMB LEADS, We Believe in Data Transparency
        </h1>
        <p className="my-10 text-lg max-sm:text-sm m-auto w-[65%] max-md:w-[80%] text-gray-600">
          It's only by chance that SMB LEADS is the only sales intelligence tool
          with a data accuracy guarantee. We believe in data accuracy for our
          customers. This is what keeps the sales pipeline productive.
        </p>
        <p className="my-10 text-lg max-sm:text-sm m-auto w-[65%] max-md:w-[80%] text-gray-600">
          Learn more about our Data Accuracy Guarantee.
        </p>
      </div>
      <div className="flex flex-col items-center py-20 w-[80%] m-auto text-sm text-gray-600 max-md:pt-10">
        <h2 className="text-2xl font-bold mb-4 text-[#00a0df]">
          A SHORT LETTER FROM OUR CEO
        </h2>
        <h3 className="text-xl font-semibold mb-4">
          We Don’t Just Scrape, We Hand-Pick
        </h3>
        <div className="border rounded-lg p-6 w-full max-w-3xl ">
          <p className="mb-4">
            Before we started SMB LEADS, I worked at a business doing B2B
            prospecting for clients. And like most things, I hated prospecting.
            Not really the prospecting part, but the way I was doing prospecting
            back then.
          </p>
          <p className="mb-4">
            You see, I dreaded going through endless LinkedIn profiles and
            looking at my screen for hours.
          </p>
          <p className="mb-4">
            I was spending entire days going through online prints and CSV files
            with split information. And the data I was getting from those
            platforms was usually anything but high-quality.
          </p>
          <p className="mb-4">
            This way of doing things, through online scraping, never really
            worked. It was always a hassle and, most of the time, the data I was
            getting was not accurate at all. My frustration increased when I
            realized that many of my competitors had already great automated
            prospecting solutions.
          </p>
          <p className="mb-4">
            That’s when and why I started using SMB LEADS. I asked everyone why
            they were still trying to take screenshots of LinkedIn profiles and
            save them as CSVs instead of simply using SMB LEADS to get the most
            accurate B2B contact and company details.
          </p>
          <p className="mb-4">
            As time went by, the team grew, and so did the SMB LEADS platform. We
            perfected our systems for hand-picking the best leads and keeping
            our data as accurate as possible.
          </p>
          <p className="mb-4">
            It’s because of this process that we can give you the best leads,
            and if they’re wrong, you get your money back. Guaranteed.
          </p>
          <p className="mb-4">
            And we’ll keep giving you the best data possible as we grow. Backed
            by our 95% data accuracy guarantee, we want to make sure you get the
            best out of your prospecting efforts, and that you don’t have to
            worry about your data being accurate.
          </p>
          <div className="flex items-center mt-6">
            <Image
              src="/avatar.png"
              width={60}
              height={60}
              alt="CEO"
              className="rounded-full"
            />
            <div className="ml-4">
              <p className="font-bold">CEO Name</p>
              <p className="text-gray-500">CEO of Company</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center m-auto py-20 ">
        <h2 className="text-[#00a0df] text-[35px] font-bold max-md:text-2xl max-sm:text-xl ">
          Meet Our Leaders
        </h2>
        <p className="my-10 text-lg max-sm:text-sm m-auto w-[65%] max-md:w-[80%] text-gray-600">
          Behind every great company are great leaders. Get to know the
          visionaries guiding SMB LEADS towards excellence.
        </p>
        <div
          className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-10 w-[80%] m-auto "
        >
          {[
            {
              name: "CEO",
              position: "Founder & CEO",
              description:
                "CEO has 10+ years experience as a B2B sales expert. He was previously Chief Executive Officer at SMB LEADS since founding it in 2017.",
              image: "/avatar.png",
              linkedin: "https://www.linkedin.com",
            },
            {
              name: "CTO",
              position: "CTO",
              description:
                "CTO invented email verification in real-time. He worked as Director of Technology at various companies before joining SMB LEADS.",
              image: "/avatar.png",
              linkedin: "https://www.linkedin.com/",
            },
            {
              name: "VP of Sales",
              position: "VP of Sales",
              description:
                "VP of Sales spent years with leading SaaS companies before joining SMB LEADS. His ability to drive results led him to SMB LEADS.",
              image: "/avatar.png",
              linkedin: "https://www.linkedin.com",
            },
            {
              name: "Dir. of Customer",
              position: "Dir. of Customer Success",
              description:
                "Dir. of Customer has 10+ years of experience in customer success. Prior to joining SMB LEADS, she worked at SaaS companies helping them grow.",
              image: "/avatar.png",
              linkedin: "https://www.linkedin.com",
            },
            {
              name: "Gina Maisano",
              position: "Director of Talent and People",
              description:
                "Talent and People leader with over 5+ years of experience. Gina joined SMB LEADS to help grow the team and build a strong company culture.",
              image: "/avatar.png",
              linkedin: "https://www.linkedin.com",
            },
          ].map((leader, index) => (
            <div
              key={index}
              className="border rounded-lg p-6 flex flex-col items-center "
            >
              <Image
                src={leader.image}
                width={100}
                height={100}
                alt={leader.name}
                className="rounded-full mb-4"
              />
              <h3 className="text-xl font-bold">{leader.name}</h3>
              <p className="text-gray-500">{leader.position}</p>
              <p className="text-gray-600 mt-2">{leader.description}</p>
              <a
                href={leader.linkedin}
                target="_blank"
                className="text-[#00a0df] mt-4"
              >
                <Image
                  src="data:image/png;base64,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"
                  width={20}
                  height={20}
                  alt="LinkedIn"
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
