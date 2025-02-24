"use client";

import Navbar from "@/app/ui/components/navbar";
import { Facebook, Mail } from "lucide-react";
import Image from "next/image";
import { poppins } from "@/app/ui/fonts";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Footer from "@/app/ui/components/footer";
import { articlesDataForCards } from "@/lib/data";

export default function ArticlesPages() {
  const { id } = useParams() as { id: string };
  const articlesData: Record<
    string,
    {
      title: string;
      image: string;
      description: string;
      content: {
        heading?: string;
        text?: string;
        ParagraphIntro?: string;
        heading1?: string;
        headingtext1?: string;
        heading2?: string;
        heading3?: string;
        subSections?: {
          subHeading?: string;
          text?: string;
        }[];
        footer?: string;
      }[];
    }
  > = {
    "1": {
      title: "WEWO and the Future of Water Conservation",
      image: "/illustrations/WewoImpactPageIMG1.png",
      description:
        "Plastic pollution has become one of the most alarming environmental challenges of our time.",
      content: [
        {
          heading: "",
          ParagraphIntro:
            "Water scarcity is a growing crisis, affecting millions of people every year. According to the World Resources Institute (2020), the Philippines is classified as a country experiencing high water stress, meaning demand for water exceeds supply in many regions. With increasing urbanization and climate change, access to clean water has become a pressing issue. This is where WEWO (Water Efficiency with Waste Optimization) comes in—a revolutionary IoT-powered system designed to collect and purify rainwater for non-potable applications.",
        },
        {
          heading: "Why Water Conservation Matters",
          text: "Freshwater sources are rapidly depleting, and conventional water systems struggle to keep up with the demand. The United Nations Water Report (2023) highlights that over 2 billion people worldwide lack access to safely managed drinking water. Every drop counts, and finding innovative solutions is no longer a choice—it’s a necessity. WEWO offers a game-changing approach to water conservation, ensuring that rainwater, a free and abundant resource, is efficiently collected, filtered, and utilized.",
        },
        {
          heading: "WEWO’s Role in Water Conservation",
          subSections: [
            {
              subHeading: "1. Smart Rainwater Collection",
              text: "WEWO captures rainwater, reducing reliance on municipal water supplies and preventing excessive groundwater depletion. A study by the International Journal of Water Resources Development (2022) found that rainwater harvesting can reduce household water consumption by up to 40%.",
            },
            {
              subHeading: "2. Automated Purification Process",
              text: "Through an advanced filtration system, rainwater is treated to meet non-potable standards for cleaning, irrigation, and sanitation. Research from the World Health Organization (WHO, 2021) states that proper filtration can eliminate 99% of bacteria and harmful contaminants from rainwater.",
            },
            {
              subHeading: "3. IoT-Powered Efficiency",
              text: "Every plastic bottle recycled means fewer waste materials in landfills and oceans. The United Nations Environment Programme (UNEP, 2022) highlights that proper waste management can cut plastic pollution by over 80% by 2040.",
            },
            {
              subHeading: "4. Sustainable Impact",
              text: "By maximizing rainwater usage, WEWO significantly reduces water wastage, making it a sustainable alternative for households, businesses, and communities. The Environmental Protection Agency (EPA, 2022) states that proper rainwater harvesting could help mitigate the effects of urban flooding and water shortages.",
            },
          ],
        },
        {
          heading: "Investing in WEWO: A Cleaner Future",
          text: "As a forward-thinking investor, adopting WEWO means contributing to sustainable water management while gaining a competitive edge. Businesses can cut operational costs on water usage, communities can secure a steady water supply, and environmental impact is greatly minimized. By supporting WEWO, you are not just investing in technology—you are investing in the future of water sustainability.",
          footer:
            "Governments and businesses worldwide are recognizing the value of smart water solutions, with global investments in water technology expected to surpass $100 billion by 2030 (Grand View Research, 2023). Investing in WEWO aligns with global sustainability goals and ensures long-term economic and environmental benefits.",
        },
      ],
    },
    "2": {
      title: "WEWO and the Battle Against Plastic Waste",
      image: "/illustrations/WewoImpactPageIMG2.png",
      description:
        "Plastic pollution has become one of the most alarming environmental challenges of our time.",
      content: [
        {
          heading: "",
          ParagraphIntro:
            "Plastic pollution has become one of the most alarming environmental challenges of our time. Every year, millions of tons of plastic waste end up in the ocean, harming marine life and disrupting ecosystems. According to the Ellen MacArthur Foundation (2021), by 2050, there could be more plastic than fish in the ocean if no drastic action is taken. WEWO is taking a stand against plastic waste by integrating a reverse vending machine system that rewards users for recycling plastic bottles.",
        },
        {
          heading: "The Plastic Waste Crisis",
          text: "The Philippines ranks among the top contributors to plastic pollution, with over 2.7 million tons of plastic waste generated annually (World Bank, 2022). Improper disposal leads to clogged drainage systems, waterway pollution, and increased greenhouse gas emissions from plastic decomposition.",
        },
        {
          heading: "How WEWO Reduces Plastic Waste",
          subSections: [
            {
              subHeading: "1. Reverse Vending Machine Technology",
              text: "WEWO incentivizes individuals to recycle plastic bottles by allowing them to exchange them for clean water. Studies by the National Geographic Society (2023) show that financial incentives boost recycling rates by up to 60%.",
            },
            {
              subHeading: "2. Encouraging Responsible Consumer Behavior",
              text: "By making recycling a rewarding habit, WEWO fosters a culture of sustainability within communities, reducing single-use plastic consumption.",
            },
            {
              subHeading: "3. Reducing Environmental Damage",
              text: "Every plastic bottle recycled means fewer waste materials in landfills and oceans. The United Nations Environment Programme (UNEP, 2022) highlights that proper waste management can cut plastic pollution by over 80% by 2040.",
            },
            {
              subHeading: "4. Supporting Circular Economy",
              text: "Recycled plastic bottles can be repurposed into new materials, reducing dependency on virgin plastic production and minimizing industrial pollution.",
            },
          ],
        },
        {
          heading: "Investing in WEWO: A Cleaner Future",
          text: "WEWO presents a unique opportunity for investors to support sustainability while driving business growth. Companies and municipalities adopting WEWO can benefit from improved environmental responsibility, stronger customer engagement, and government incentives promoting eco-friendly initiatives. With increasing global awareness and stricter regulations on plastic waste, now is the perfect time to invest in smart, sustainable solutions like WEWO.",
          footer:
            "With WEWO, every plastic bottle recycled is a step toward a cleaner, greener world.",
        },
      ],
    },
    "3": {
      title:
        "WEWO’s Role in Reducing Carbon Footprint and Combating Climate Change",
      image: "/illustrations/WewoImpactPageIMG3.png",
      description:
        "Waste management and water conservation strategies can reduce carbon emissions by up to 20% in urban areas.",
      content: [
        {
          heading: "",
          ParagraphIntro:
            "As the world faces the growing threat of climate change, innovative solutions like WEWO are stepping up to mitigate environmental damage. WEWO’s cutting-edge system, which integrates water conservation and plastic waste reduction, plays a crucial role in lowering carbon emissions. By reducing plastic production, improving energy efficiency, and minimizing waste transport emissions, WEWO contributes to a more sustainable future.",
        },
        {
          heading: "Reducing Plastic Production to Cut Emissions",
          text: "Plastic production is a major contributor to greenhouse gas emissions, with the entire lifecycle of a plastic bottle—from manufacturing to disposal—releasing significant amounts of carbon dioxide (CO₂) into the atmosphere. According to a report by the Center for International Environmental Law (CIEL, 2023), the production of plastic alone accounts for nearly 3% of global emissions. WEWO helps reduce this impact by encouraging plastic bottle recycling, lowering the demand for new plastic production, and ultimately decreasing carbon emissions from manufacturing processes.",
        },
        {
          heading: "Energy-Efficient Water Management",
          text: "Traditional water treatment plants consume vast amounts of energy for filtration, disinfection, and distribution. In contrast, WEWO’s IoT-driven water purification system operates with significantly lower energy requirements. By optimizing water filtration and ensuring only necessary treatment is applied, WEWO reduces electricity consumption and minimizes the carbon footprint associated with water management.",
        },
        {
          heading: "Minimizing Waste Transport Emissions",
          text: "Transporting plastic waste and bottled water generates high levels of emissions due to fuel consumption. The World Bank (2023) highlights that waste transportation accounts for nearly 5% of urban carbon emissions. WEWO addresses this issue by promoting localized recycling and water reuse, eliminating the need for long-haul waste transport and reducing emissions associated with waste logistics",
        },
      ],
    },
    "4": {
      title:
        "Building a Greener Future: WEWO’s Role in Environmental Awareness and Community Engagement",
      image: "/illustrations/WewoImpactPageIMG4.png",
      description:
        "Sustainability awareness through community engagement programs.",
      content: [
        {
          heading: "",
          ParagraphIntro:
            "Addressing environmental challenges requires more than just technology—it demands active community participation. WEWO is not only a system for water purification and plastic recycling but also a catalyst for environmental awareness. Through educational programs, public engagement initiatives, and reward-based incentives, WEWO fosters a culture of sustainability, inspiring communities to take meaningful action.",
        },
        {
          heading: "Raising Awareness Through Education",
          text: "Sustainability begins with knowledge. WEWO actively promotes environmental awareness through workshops, digital campaigns, and school programs that educate individuals about water conservation and waste management. Studies show that informed communities are more likely to adopt sustainable habits (United Nations Environment Programme, 2023). By making sustainability education accessible, WEWO empowers individuals to make eco-friendly choices.",
        },
        {
          heading: "Empowering Local Communities",
          text: "One of WEWO’s core strengths is its accessibility. By placing stations in schools, malls, and barangay centers, WEWO integrates sustainability into daily life. These stations serve as visible reminders of the importance of recycling and water conservation, encouraging individuals to adopt environmentally friendly behaviors. Community-based initiatives like these are proven to increase participation rates in sustainability efforts (Journal of Environmental Psychology, 2022).",
        },
        {
          heading: "Collaborating for Greater Impact",
          text: "WEWO partners with environmental NGOs, private companies, and local government units (LGUs) to amplify its impact. These collaborations help fund projects, expand educational outreach, and ensure that waste management policies align with sustainable goals. Public-private partnerships in environmental efforts have been shown to significantly enhance the effectiveness of sustainability initiatives (World Economic Forum, 2023)",
        },
        {
          heading: "Incentivizing Sustainable Behavior",
          text: "People are more likely to adopt sustainable habits when given tangible rewards. WEWO’s reward-based model encourages individuals to recycle plastic bottles in exchange for clean water, reinforcing positive environmental behavior. Studies on behavioral economics suggest that incentive-driven programs can lead to long-term sustainable lifestyle changes (Harvard Business Review, 2023).",
        },
      ],
    },
  };

  const articles = articlesData[id as string] || {
    title: "Unknown",
    image: "/default-image.png",
    description: "No information available.",
    content: [],
  };

  return (
    <main>
      <Navbar />
      <ArticleBody id={id} articlesData={articles} />
      <Footer />
    </main>
  );
}

function ArticleBody({
  articlesData,
  id,
}: {
  id: string;
  articlesData: {
    title: string;
    image: string;
    description: string;
    content: {
      heading?: string;
      text?: string;
      ParagraphIntro?: string;
      subSections?: {
        subHeading?: string;
        text?: string;
      }[];
      footer?: string;
    }[];
  };
}) {
  const [isMdScreen, setIsMdScreen] = useState(false);
  const [visibleArticles, setVisibleArticles] = useState(
    articlesDataForCards.slice(0, 3)
  );

  useEffect(() => {
    setVisibleArticles((prevArticles) => {
      const filteredArticles = prevArticles.filter(
        (article) => article.id !== parseInt(id)
      );

      const remainingArticles = articlesDataForCards.filter(
        (article) => !prevArticles.some((a) => a.id === article.id)
      );

      const newVisibleArticles = [
        ...filteredArticles,
        ...remainingArticles.slice(0, 3 - filteredArticles.length),
      ];

      // Log to confirm the updated articles
      console.log("Clicked ID:", id);
      console.log("Updated Articles:", newVisibleArticles);

      return newVisibleArticles;
    });
  }, []);

  useEffect(() => {
    // Function to check screen size
    const checkScreenSize = () => {
      setIsMdScreen(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    checkScreenSize(); // Run initially
    window.addEventListener("resize", checkScreenSize); // Listen to window resize

    return () => window.removeEventListener("resize", checkScreenSize); // Cleanup event listener
  }, []);

  const today = new Date();
  const formattedDate = today
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .toUpperCase();

  const { title, image, content } = articlesData;

  return (
    <div
      className={
        "min-h-full max-h-full mt-20 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 2xl:px-[300px] 3xl:max-w-[600px] 3xl:mx-auto container"
      }
    >
      <div>
        <div className={"justify-self-center p-2"}>
          <label className={`font-light ${poppins.className}`}>
            {formattedDate}
          </label>
        </div>
        <div className={"py-6 md:py-10"}>
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl font-bold text-[#4668B2] ${poppins.className}`}
          >
            {articlesData.title}
          </h1>
        </div>
        <div className={"flex justify-center pb-10"}>
          {/* image card container */}
          <div
            className={
              "w-full sm:w-[540px] md:w-[720px] lg:w-[840px] xl:w-full 2xl:w-full bg-[#F4F4F4] shadow-lg rounded-lg"
            }
          >
            <Image
              src={articlesData.image}
              alt="Card Image"
              width={840}
              height={400}
              className={"w-full h-full object-cover"}
            />
          </div>
        </div>
        <div className={"text-justify"}>
          {/* paragraph main container */}
          <p
            className={`text-sm sm:text-base font-light ${poppins.className} pb-10`}
          >
            {
              articlesData.content.find((item) => item.ParagraphIntro)
                ?.ParagraphIntro
            }
          </p>

          {content.map((item, index) => (
            <div key={`content-${index}`} className="mb-6">
              {/* Main Heading */}
              {item.heading && (
                <h2
                  className={`${poppins.className} text-lg sm:text-lg md:text-lg 2xl:text-xl font-bold text-[#4668B2]`}
                >
                  {item.heading}
                </h2>
              )}

              {/* Check if subSections exist and have content */}
              {item.subSections && item.subSections.length > 0 ? (
                <div className="mt-2">
                  {item.subSections.map((section, subIndex) => (
                    <div
                      key={`subSection-${index}-${subIndex}`}
                      className="mt-2"
                    >
                      {/* Lightly Bold SubHeading */}
                      <h3
                        className={`${poppins.className} text-sm sm:text-md font-bold text-black mb-1`}
                      >
                        {section.subHeading}
                      </h3>
                      {/* SubSection Text */}
                      <p className="text-sm sm:text-base font-light pb-10">
                        {section.text}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                /* Else: Display heading and text only if subSections is empty */
                item.text && (
                  <p className="text-sm sm:text-base font-light pb-10">
                    {item.text}
                  </p>
                )
              )}
            </div>
          ))}
          <br />
          <br />
          <p className={`font-light text-[14px]`}>
            {content.find((item) => item.footer)?.footer}
          </p>
          <p
            className={`${poppins.className} font-light text-[14px] pb-10`}
          ></p>

          <hr className="mb-36 h-[2px] bg-gray-300" />
        </div>
        <h3
          className={`${poppins.className} justify-self-center font-light text-[14px] pb-10`}
        >
          OTHER ARTICLES
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 pb-28">
          {visibleArticles.map((article, index, array) => {
            const isLastOddItem =
              isMdScreen &&
              array.length % 2 !== 0 && // If there's an odd number of items
              index === array.length - 1; // Last item in the array

            return (
              <div
                key={article.id}
                className={`${
                  isLastOddItem ? "md:col-span-2 flex justify-center" : ""
                }`}
              >
                <Link
                  href={`/articles/${article.id}`}
                  className="w-full flex justify-center"
                >
                  <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full md:max-w-[400px] min-h-[330px] flex flex-col">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="font-bold text-lg">{article.title}</h3>
                      <p className="text-gray-600 text-sm flex-grow">
                        {article.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
