import { Poppins } from "next/font/google";
import localFont from "next/font/local";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const mazzard_soft_h = localFont({
  src: [
    {
      path: "../../../public/fonts/MazzardSoftH-Black.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../../public/fonts/MazzardSoftH-ExtraBold.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../../public/fonts/MazzardSoftH-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../../public/fonts/MazzardSoftH-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../../public/fonts/MazzardSoftH-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/fonts/MazzardSoftH-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/MazzardSoftH-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../../public/fonts/MazzardSoftH-ExtraLight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../../public/fonts/MazzardSoftH-Thin.otf",
      weight: "100",
      style: "normal",
    },
  ],
  fallback: ["sans-serif"],
});
