import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "./App.css";
import Homepage from "./components/Homepage";
import NavbarComponent from "./components/NavbarComponent";
import SearchBar from "./components/SearchBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllActivities from "./components/AllActivities";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <NavbarComponent />
        </header>
        <main>
          <SearchBar />
          <Routes>
            <Route path="/activities" element={<AllActivities />}></Route>
            <Route path="/" element={<Homepage />}></Route>
          </Routes>
        </main>
        <footer></footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
