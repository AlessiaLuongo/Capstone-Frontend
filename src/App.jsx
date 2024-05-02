import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "./App.css";
import Homepage from "./components/Homepage";
import NavbarComponent from "./components/NavbarComponent";

function App() {
  return (
    <div className="App">
      <NavbarComponent />
      <Homepage />
    </div>
  );
}

export default App;
