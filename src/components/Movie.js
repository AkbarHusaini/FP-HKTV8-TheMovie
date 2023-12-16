import React from "react";

const Movie = ({ movie }) => {
  // Menyimpan judul yang telah dipendek
  const shortenedTitle = movie.Title.length > 18 ? movie.Title.slice(0, 25) + '...' : movie.Title;

  return (
    <div className="flex flex-col max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-md">
      <div>
        <img
          className="w-full h-64 object-cover"
          src={movie.Poster}
          alt={`${movie.Title} Poster`}
        />
      </div>
      <div className="p-6">
        <h2 className="font-bold text-xl mb-2">
          {shortenedTitle}
        </h2>
      </div>
    </div>
  );
};

export default Movie;
