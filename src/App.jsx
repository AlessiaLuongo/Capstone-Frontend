import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "./assets/App.css";
import NavbarComponent from "./components/NavbarComponent";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllActivities from "./components/AllActivities";
import AllLocations from "./components/AllLocations";
import LoginComponent from "./components/LoginComponent";
import ProfiloUser from "./components/ProfiloUser";
import HomepageLoggedUser from "./components/HomepageLoggedUser";
import { useSelector } from "react-redux";
import HomepageGuests from "./components/HomepageGuests";
import RegisterComponent from "./components/RegisterComponent";

function App() {
  const loggedUser = useSelector((state) => state.loginUserReducer.accessToken);

  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <NavbarComponent />
        </header>
        <main>
          <Routes>
            <Route
              path="/homepage"
              element={
                <>{loggedUser ? <HomepageLoggedUser /> : <HomepageGuests />}</>
              }
            ></Route>
            <Route
              path="/activities"
              element={
                <>
                  <AllActivities />
                </>
              }
            ></Route>
            <Route
              path="/locations"
              element={
                <>
                  <AllLocations />
                </>
              }
            ></Route>

            <Route path="/register" element={<RegisterComponent />}></Route>
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
