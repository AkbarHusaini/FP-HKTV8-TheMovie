/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import Search from "./Search";
import MovieImage from "../assets/movies.png";

const Header = ({ title, searchMovies }) => {
  return (
    <div className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center">
          <img src={MovieImage} alt="Title Image" className="h-8 w-8 mr-2" />
          <h1 className="text-2xl font-semibold mb-4 md:mb-0">{title}</h1>
        </div>
        <Search searchMovies={searchMovies} />
      </div>
    </div>
  );
};

export default Header;
