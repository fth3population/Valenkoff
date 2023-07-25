import React, { useContext } from "react";
import TemplatesDropdown from "./TeamplateDropdown";
import NumberOfUsesTemplatesDropdown from "./NumberOfUsesTemplatesDropdown";
import { RiSearch2Line } from "react-icons/ri";
import { TemplateContext } from "../contexts/TemplateContext";

const Search = () => {
  const { template } = useContext(TemplateContext);
  console.log(template);
  return (
    <div className="px-[30px] py-6 max-w-[1170px] mx-auto flex flex-col lg:flex-row justify-between gap-4 lg:gap-x-3 relative lg:-top-4 lg:shadow-1 bg-white lg:bg-transparent lg:backdrop-blur rounded-lg">
      <TemplatesDropdown />
      <NumberOfUsesTemplatesDropdown />
      <button
        className="bg-violet-700 hover:bg-violet-800
    transition w-full lg:max-w-[162px] h-16 rounded-lg flex justify-center items-center
    text-whit text-lg"
      >
        <RiSearch2Line />
      </button>
    </div>
  );
};

export default Search;
