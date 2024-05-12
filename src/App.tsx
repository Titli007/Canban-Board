import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import DataBody from "./component/primary/DataBody";
import Nav from "./component/primary/Nav";
import SignUp from "./Authentication/SignUp";
import LogIn from "./Authentication/LogIn";

function App() {
  const [searchText, setSearchText] = useState<string>("");
  const [isSort, setIsSort] = useState<boolean>(false);
  const [filterText, setFilterText] = useState<string>("");


  return (
    <Router>
      <div>

        <Routes>
          <Route
            path="/"
            element={
              <div className="flex flex-col items-center w-full ">
                <Nav
                  setSearchText={setSearchText}
                  setIsSort={setIsSort}
                  setFilterText={setFilterText}
                />
                <DataBody
                  searchText={searchText}
                  isSort={isSort}
                  filterText={filterText}
                />
              </div>
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;