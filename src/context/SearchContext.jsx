import React, { createContext, useState } from "react";

export const SearchContext = createContext();

export const ContextProvider = ({ children }) => {
  const [filter, setFilter] = useState({
    type: "",
    genre: "",
    rate: "",
    date: "",
  });

  const [genre, setGenre] = useState([]);
  return (
    <SearchContext.Provider
      value={{
        filter,
        setFilter,
        genre,
        setGenre,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
