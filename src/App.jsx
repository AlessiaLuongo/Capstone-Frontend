import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "./App.css";
import Homepage from "./components/Homepage";
import NavbarComponent from "./components/NavbarComponent";
import SearchBar from "./components/SearchBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllActivities from "./components/AllActivities";
import AllLocations from "./components/AllLocations";
import LoginComponent from "./components/LoginComponent";
import ProfiloUser from "./components/ProfiloUser";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <NavbarComponent />
        </header>
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SearchBar />
                  <Homepage />
                </>
              }
            ></Route>
            <Route
              path="/activities"
              element={
                <>
                  <SearchBar />
                  <AllActivities />
                </>
              }
            ></Route>
            <Route
              path="/locations"
              element={
                <>
                  <SearchBar />
                  <AllLocations />
                </>
              }
            ></Route>

            <Route path="/login" element={<LoginComponent />}></Route>
            <Route path="/profile" element={<ProfiloUser />}></Route>
          </Routes>
        </main>
        <footer></footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
