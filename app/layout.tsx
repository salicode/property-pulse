import React from "react";
import "../assets/styles/global.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";

type MainLayoutProps = React.PropsWithChildren<{}>;

export const metadata = {
  title: "Property Pulse | Find The Perfect Rental",
  description: "Discover your ideal rental property with Property Pulse.",
  keywords: "rental, property, real estate, apartments, houses, rent",
};
const Mainlayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <AuthProvider>
    <html lang="en">
      <body>
        <NavBar />
        
        <main> 
        {children}
         </main>
        <Footer />
        </body>
    </html>
    </AuthProvider>
  );
};

export default Mainlayout;
