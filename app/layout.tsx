import React from "react";
import "../assets/styles/global.css";
type MainLayoutProps = React.PropsWithChildren<{}>;

export const metadata = {
  title: "Property Pulse | Find The Perfect Rental",
  description: "Discover your ideal rental property with Property Pulse.",
  keywords: "rental, property, real estate, apartments, houses, rent",
};
const Mainlayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default Mainlayout;
