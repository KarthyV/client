import React, { useState, createContext, useEffect } from "react";

export const MyContext = createContext("");

const AppContext = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("guvi-user")) {
      setUser(JSON.parse(localStorage.getItem("guvi-user")));
    }
  }, []);
  return (
    <MyContext.Provider value={{ user, setUser }}>
      {children}
    </MyContext.Provider>
  );
};

export default AppContext;
