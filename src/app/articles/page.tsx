"use client";

import Link from "next/link";
import Navbar from "../ui/components/navbar";
import Image from "next/image";
import { poppins } from "../ui/fonts";
import Footer from "../ui/components/footer";
import { articlesDataForCards } from "@/lib/data";
import { useEffect, useState } from "react";

export default function ArticlesPage() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <ArticleBody />
        <Footer />
      </main>
    </>
  );
}

function ArticleBody() {
  const today = new Date();

  const formattedDate = today
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .toUpperCase();
  const [isMdScreen, setIsMdScreen] = useState(false);

  useEffect(() => {
    // Function to check screen size
    const checkScreenSize = () => {
      setIsMdScreen(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    checkScreenSize(); // Run initially
    window.addEventListener("resize", checkScreenSize); // Listen to window resize

    return () => window.removeEventListener("resize", checkScreenSize); // Cleanup event listener
  }, []);

  return (
    <div className="min-h-full max-h-full mt-20 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 2xl:px-[300px] 3xl:max-w-[600px] 3xl:mx-auto container">
      <div className="text-center p-2">
        <label className={`font-light ${poppins.className}`}>
          {formattedDate}
        </label>
      </div>
      <div className="py-6 md:py-10">
        <h1
          className={`text-3xl sm:text-4xl md:text-5xl font-bold text-[#4668B2] ${poppins.className}`}
        >
          Wewo and the Future of Water Conservation
        </h1>
      </div>
      <div className="flex justify-center pb-10">
        <div className="w-full sm:w-[540px] md:w-[720px] lg:w-[840px] xl:w-full 2xl:w-full bg-[#F4F4F4] shadow-lg rounded-lg">
          <Image
            src="/illustrations/WewoImpactPageIMG1.png"
            alt="Card Image"
            width={840}
            height={400}
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
      <div className="text-justify">
        <p
          className={`text-sm sm:text-base font-light ${poppins.className} pb-10`}
        >
          Water scarcity is a growing crisis, affecting millions of people every
          year. According to the World Resources Institute (2020), the
          Philippines is classified as a country experiencing high water stress,
          meaning demand for water exceeds supply in many regions. With
          increasing urbanization and climate change, access to clean water has
          become a pressing issue. This is where WEWO (Water Efficiency with
          Waste Optimization) comes in—a revolutionary IoT-powered system
          designed to collect and purify rainwater for non-potable applications.
        </p>

        <h1
          className={`text-lg sm:text-lg font-bold text-[#4668B2] pb-6 ${poppins.className}`}
        >
          Why Water Conservation Matters
        </h1>
        <p
          className={`text-sm sm:text-base font-light pb-10 ${poppins.className}`}
        >
          Freshwater sources are rapidly depleting, and conventional water
          systems struggle to keep up with the demand. The United Nations Water
          Report (2023) highlights that over 2 billion people worldwide lack
          access to safely managed drinking water. Every drop counts, and
          finding innovative solutions is no longer a choice—it’s a necessity.
          WEWO offers a game-changing approach to water conservation, ensuring
          that rainwater, a free and abundant resource, is efficiently
          collected, filtered, and utilized.
        </p>

        <h1
          className={`text-lg sm:text-xl font-bold text-[#4668B2] pb-6 ${poppins.className}`}
        >
          WEWO’s Role in Water Conservation
        </h1>
        <p className="text-sm sm:text-base font-light pb-10">
          <span className="font-semibold">1. Smart Rainwater Collection </span>–
          WEWO captures rainwater, reducing reliance on municipal water supplies
          and preventing excessive groundwater depletion. A study by the
          International Journal of Water Resources Development (2022) found that
          rainwater harvesting can reduce household water consumption by up to
          40%.
        </p>
        <p className="text-sm sm:text-base font-light pb-10">
          <span className="font-semibold">
            2. Automated Purification Process{" "}
          </span>
          – Through an advanced filtration system, rainwater is treated to meet
          non-potable standards for cleaning, irrigation, and sanitation.
          Research from the World Health Organization (WHO, 2021) states that
          proper filtration can eliminate 99% of bacteria and harmful
          contaminants from rainwater.
        </p>
        <p className="text-sm sm:text-base font-light pb-10">
          <span className="font-semibold">3. IoT-Powered Efficiency </span>–
          Every plastic bottle recycled means fewer waste materials in landfills
          and oceans. The United Nations Environment Programme (UNEP, 2022)
          highlights that proper waste management can cut plastic pollution by
          over 80% by 2040.
        </p>
        <p className="text-sm sm:text-base font-light pb-10">
          <span className="font-semibold">4. Sustainable Impact</span>– By
          maximizing rainwater usage, WEWO significantly reduces water wastage,
          making it a sustainable alternative for households, businesses, and
          communities. The Environmental Protection Agency (EPA, 2022) states
          that proper rainwater harvesting could help mitigate the effects of
          urban flooding and water shortages.
        </p>
      </div>

      <h1
        className={`text-lg sm:text-xl font-bold text-[#4668B2] pb-6 ${poppins.className}`}
      >
        Investing in WEWO: A Step Toward Sustainability
      </h1>
      <p className="text-sm sm:text-base font-light pb-20">
        As a forward-thinking investor, adopting WEWO means contributing to
        sustainable water management while gaining a competitive edge.
        Businesses can cut operational costs on water usage, communities can
        secure a steady water supply, and environmental impact is greatly
        minimized. By supporting WEWO, you are not just investing in
        technology—you are investing in the future of water sustainability.{" "}
        <br /> <br />
        Governments and businesses worldwide are recognizing the value of smart
        water solutions, with global investments in water technology expected to
        surpass $100 billion by 2030 (Grand View Research, 2023). Investing in
        WEWO aligns with global sustainability goals and ensures long-term
        economic and environmental benefits.
      </p>

      <hr className="mb-20 h-[2px] bg-gray-300" />

      <h3
        className={`text-center font-light text-sm sm:text-base pb-6 ${poppins.className}`}
      >
        OTHER ARTICLES
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 pb-28">
        {articlesDataForCards
          .filter((article) => article.id !== 1)
          .map((article, index, array) => {
            const isLastOddItem =
              isMdScreen &&
              array.length % 2 !== 0 &&
              index === array.length - 1;

            return (
              <Link
                key={article.id}
                href={`/articles/${article.id}`}
                className={`flex ${
                  isLastOddItem ? "md:col-span-2 md:justify-center" : ""
                }`}
              >
                <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full md:max-w-[400px]">
                  <img
                    src={article.image}
                    alt=""
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{article.title}</h3>
                    <p className="text-gray-600 text-sm">
                      {article.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}
