import React, { useEffect, useReducer } from "react";
import Header from "./Header";
import Movie from "./Movie";

const API_KEY = "c94343a8";

const initialState = {
  movies: [],
  loading: true,
  errorMessage: null,
  page: 1,
};

// ...
const reducer = (state, action) => {
  switch (action.type) {
    case "LOAD_INITIAL_MOVIES_SUCCESS":
      return {
        ...state,
        movies: action.payload,
        loading: false,
      };
    case "LOAD_INITIAL_MOVIES_FAILURE":
      return {
        ...state,
        errorMessage: action.error,
        loading: false,
      };
    case "SEARCH_MOVIES_SUCCESS":
      return {
        ...state,
        movies: action.payload,
        loading: false,
      };
    case "SEARCH_MOVIES_FAILURE":
      return {
        ...state,
        errorMessage: action.error,
        loading: false,
      };
    default:
      return state;
  }
};

const HomePage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loadInitialMovies = async () => {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?s=movie&apikey=${API_KEY}&page=1`
      );
      const data = await response.json();

      if (data.Response === "True") {
        dispatch({
          type: "LOAD_INITIAL_MOVIES_SUCCESS",
          payload: data.Search,
        });
      } else {
        dispatch({
          type: "LOAD_INITIAL_MOVIES_FAILURE",
          error: data.Error,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      dispatch({
        type: "LOAD_INITIAL_MOVIES_FAILURE",
        error: "An error occurred while fetching data.",
      });
    }
  };

  const searchMovies = async (searchValue, page = 1) => {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?s=${searchValue}&apikey=${API_KEY}&page=${page}`
      );
      const data = await response.json();

      if (data.Response === "True") {
        dispatch({
          type: "SEARCH_MOVIES_SUCCESS",
          payload: data.Search,
        });
      } else {
        dispatch({
          type: "SEARCH_MOVIES_FAILURE",
          error: data.Error,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      dispatch({
        type: "SEARCH_MOVIES_FAILURE",
        error: "An error occurred while fetching data.",
      });
    }
  };

  const loadMoreMovies = () => {
    searchMovies("movie", state.page + 1);
  };

  useEffect(() => {
    loadInitialMovies();
  }, []);

  return (
    <div>
      <Header title="Movie Ku" searchMovies={searchMovies} />
      <div className="p-4 md:p-8 bg-center">
        <div className="flex flex-wrap -mx-2 md:-mx-4 lg:-mx-4">
          {state.loading && !state.errorMessage ? (
            <span>Loading...</span>
          ) : state.errorMessage ? (
            <div className="text-red-500">{state.errorMessage}</div>
          ) : (
            <>
              {state.movies.map((movie, index) => (
                <div
                  key={`${index}-${movie.Title}`}
                  className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2 md:p-4 lg:p-4"
                >
                  <Movie movie={movie} />
                </div>
              ))}
            </>
          )}
        </div>
        <div className="mt-8 text-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={loadMoreMovies}
          >
            Load More
          </button>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
