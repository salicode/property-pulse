import Link from "next/link";
import React from "react";

const PropertiesPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        Welcome to the Properties Page
      </h1>
      <Link href="/" className="text-blue-500 underline">
        Go Home
      </Link>
    </div>
  );
};

export default PropertiesPage;
