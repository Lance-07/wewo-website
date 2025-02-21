"use client";

import Link from "next/link";
import Navbar from "../ui/components/navbar";
import { Facebook, Mail } from "lucide-react";
import Image from "next/image";
import { poppins } from "../ui/fonts";
import { useRouter } from "next/navigation";
import articlesData from "./mockdata/page";

export default function ArticlesPage() {
  return (
    <main>
      <Navbar />
      <ArticleBody />
      <Footer />
      <ArticlesPages />
    </main>
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

  return (
    <div className={"flex flex-col items-center justify-center gap-4"}>
      <div className={"min-h-full max-h-full mt-40 px-[600px]"}>
        <div className={"justify-self-center p-2"}>
          <label className={`font-light ${poppins.className}`}>
            {formattedDate}
          </label>
        </div>
        <div className={"py-10"}>
          <h1
            className={`text-5xl font-bold text-[#4668B2] ${poppins.className}`}
          >
            Wewo and the Future of Water Conservation
          </h1>
        </div>
        <div className={"pb-10"}>
          {/* image card container */}
          <div
            className={"w-[840px] h-[400px] bg-[#F4F4F4] shadow-lg rounded-lg"}
          >
            <Image
              src={"/illustrations/WewoImpactPageIMG1.png"}
              alt="Card Image"
              width={840}
              height={400}
              className={"w-full h-full object-cover"}
            />
          </div>
        </div>
        <div className={""}>
          {/* paragraph main container */}
          <p
            className={`text-[14px] text-justify font-light ${poppins.className} pb-10`}
          >
            Water scarcity is a growing crisis, affecting millions of people
            every year. According to the World Resources Institute (2020), the
            Philippines is classified as a country experiencing high water
            stress, meaning demand for water exceeds supply in many regions.
            With increasing urbanization and climate change, access to clean
            water has become a pressing issue. This is where WEWO (Water
            Efficiency with Waste Optimization) comes in—a revolutionary
            IoT-powered system designed to collect and purify rainwater for
            non-potable applications.
          </p>

          <h1 className={`${poppins.className} font-bold text-[#4668B2] pb-10`}>
            Why Water Conservation Matters
          </h1>
          <p className={`${poppins.className} font-light text-[14px] pb-10`}>
            Freshwater sources are rapidly depleting, and conventional water
            systems struggle to keep up with the demand. The United Nations
            Water Report (2023) highlights that over 2 billion people worldwide
            lack access to safely managed drinking water. Every drop counts, and
            finding innovative solutions is no longer a choice—it’s a necessity.
            WEWO offers a game-changing approach to water conservation, ensuring
            that rainwater, a free and abundant resource, is efficiently
            collected, filtered, and utilized
          </p>

          <h1 className={`${poppins.className} font-bold text-[#4668B2] pb-10`}>
            WEWO’s Role in Water Conservation
          </h1>
          <p className={`font-light text-[14px] pb-10`}>
            <span className="font-semibold">
              1. Smart Rainwater Collection{" "}
            </span>
            – WEWO captures rainwater, reducing reliance on municipal water
            supplies and preventing excessive groundwater depletion. A study by
            the International Journal of Water Resources Development (2022)
            found that rainwater harvesting can reduce household water
            consumption by up to 40%. <br />
            <br />
            <span className="font-semibold">
              2. Automated Purification Process{" "}
            </span>
            – Through an advanced filtration system, rainwater is treated to
            meet non-potable standards for cleaning, irrigation, and sanitation.
            Research from the World Health Organization (WHO, 2021) states that
            proper filtration can eliminate 99% of bacteria and harmful
            contaminants from rainwater. <br />
            <br />
            <span className="font-semibold">3. IoT-Powered Efficiency </span> –
            Sensors track water quality, ensuring that only clean water is
            distributed, while unfiltered water undergoes reprocessing.
            According to Statista (2023), IoT-enabled water management systems
            have improved efficiency by over 25% in smart cities worldwide.{" "}
            <br />
            <br />
            <span className="font-semibold">4. Sustainable Impact </span> – By
            maximizing rainwater usage, WEWO significantly reduces water
            wastage, making it a sustainable alternative for households,
            businesses, and communities. The Environmental Protection Agency
            (EPA, 2022) states that proper rainwater harvesting could help
            mitigate the effects of urban flooding and water shortages.
          </p>

          <h1 className={`${poppins.className} font-bold text-[#4668B2] pb-10`}>
            Investing in WEWO: A Step Toward Sustainability
          </h1>
          <p className={`font-light text-[14px] pb-36`}>
            As a forward-thinking investor, adopting WEWO means contributing to
            sustainable water management while gaining a competitive edge.
            Businesses can cut operational costs on water usage, communities can
            secure a steady water supply, and environmental impact is greatly
            minimized. By supporting WEWO, you are not just investing in
            technology—you are investing in the future of water sustainability.{" "}
            <br />
            <br />
            Governments and businesses worldwide are recognizing the value of
            smart water solutions, with global investments in water technology
            expected to surpass $100 billion by 2030 (Grand View Research,
            2023). Investing in WEWO aligns with global sustainability goals and
            ensures long-term economic and environmental benefits.
          </p>

          <hr className="mb-36 h-[2px] bg-gray-300" />
        </div>
        <h3
          className={`${poppins.className} justify-self-center font-light text-[14px] pb-10`}
        >
          OTHER ARTICLES
        </h3>

        <div className={"flex flex-col md:flex-row gap-6 px-6 pb-28"}>
          {/* Main container of 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
            {/* Sub container of 3 cards */}
            {/* <!-- Card 1 --> */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src="your-image.jpg"
                alt=""
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg">Battles Against Bottles</h3>
                <p className="text-gray-600 text-sm">
                  Plastic pollution has become one of the most alarming
                  environmental challenges of our time.
                </p>
              </div>
            </div>
            {/* <!-- Card 2 --> */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src="your-image.jpg"
                alt=""
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg">Reduced Carbon Footprint</h3>
                <p className="text-gray-600 text-sm">
                  Waste management and water conservation strategies can reduce
                  carbon emissions by up to 20% in urban areas.
                </p>
              </div>
            </div>
            {/* <!-- Card 3 --> */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src="your-image.jpg"
                alt=""
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg">Community Engagement</h3>
                <p className="text-gray-600 text-sm">
                  Sustainability awareness through community engagement
                  programs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className={"w-full h-[448px] relative"}>
      {/* Overlay Color Gradient */}
      <div className="absolute h-full w-full inset-0 bg-[linear-gradient(to_right,_#344D80_0%,_#53BAC6_31%,_#7CBA5A_68%,_#4A803D_100%)]"></div>

      {/* Dark Effect Overlay Gradient */}
      <div className="w-full h-full opacity-25 absolute inset-0 pointer-events-none bg-gradient-to-b from-black from-0%"></div>

      <div
        className={
          "relative flex flex-col items-center justify-center h-full w-full"
        }
      >
        <div className={"w-[275px] h-[80px] mb-10"}>
          <Image
            src={"/icons/logo.png"}
            width={609}
            height={206}
            alt="logo"
            className={"w-full h-auto"}
          />
        </div>

        <div
          className={"text-white flex-col flex items-center text-center gap-4"}
        >
          <h1 className={"text-4xl font-bold"}>Collect. Conserve. Recycle.</h1>
          <h2 className={`w-8/12 ${poppins.className}`}>
            WEWO isn&#39;t just water purification. It&#39;s the breakthrough
            solution for a sustainable future.
          </h2>

          <div className={"flex gap-5"}>
            <Link href={"https://www.facebook.com/"} target="_blank">
              <Facebook />
            </Link>
            <Link href={"https://mail.google.com/mail/u/"} target="_blank">
              <Mail />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function ArticlesPages() {
  const pageId = [1, 2, 3];

  return (
    <div>
      <h1>Animal List</h1>
      {pageId.map((id) => (
        <Link key={id} href={`/articles/${id}`}>
          <div
            style={{
              cursor: "pointer",
              marginBottom: "10px",
              border: "1px solid black",
              padding: "10px",
            }}
          >
            awdadada
          </div>
        </Link>
      ))}
    </div>
  );
}
