import Link from "next/link";
import React from "react";
import properties from "@/properties.json";
import PropertyCard from "@/components/PropertyCard";

const PropertiesPage = () => {
  return (
      <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.length === 0 ? (
            <p className="text-center col-span-3">No properties available.</p>
          ) : (

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {properties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
          </div>

          )}
          
         
          
            
        </div>
        </div>
        </section>


  );
};

export default PropertiesPage;
