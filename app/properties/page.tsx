import Link from "next/link";
import React from "react";
import {fetchProperties} from "@/utils/request";
import PropertyCard from "@/components/PropertyCard";


const PropertiesPage = async () => {
  const properties = await fetchProperties();
  console.log(" properties", properties);

  // sort properties by date created
  properties.sort((a: any, b: any) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <section className="px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {properties.length === 0 ? (
          <p className="text-center col-span-3">No properties available.</p>
        ) : (
          properties.map((property: any) => (
            <PropertyCard key={property._id} property={property} />
          ))
        )}
      </div>
    </section>
  );
};

export default PropertiesPage;
