import React from "react"; 
import { Categories } from "./Categories";
import {Banner} from './Banner';
import {DealSlider} from './DealSlider';

export const Home = () => {
 
  return (
    <>
          <Categories />
          <main className="flex flex-col gap-3 px-2 mt-16 sm:mt-2">
            <Banner /> 
            <DealSlider title={"Discounts for You"} />
            <DealSlider title={"Top Brands, Best Price"} />
            <DealSlider title={"Top Offers On"} />

          </main>
 
    </>
  );
};
