import React from "react";
import Link from "next/link";

const HomePage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Welcome to the Home Page</h1>
      <Link href="/properties" className="text-blue-500 underline">
        Go to Properties
      </Link>
    </div>
  );
};

export default HomePage;
