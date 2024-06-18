import React from "react"; 
import { Categories } from "./Categories";
import {Banner} from './Banner';

export const Home = () => {
 
  return (
    <>
          <Categories />
          <main className="flex flex-col gap-3 px-2 mt-16 sm:mt-2">
            <Banner /> 
          </main>
 
    </>
  );
};
