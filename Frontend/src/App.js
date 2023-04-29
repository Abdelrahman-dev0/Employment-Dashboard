import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./shared/Header";
import Sidebar from "./shared/sidebar";

function App() {
  return (
    <div className="App">
      <div className="header">
        <Header />
      </div>

      <div className="outlet">
        <Outlet />
      </div>
      <div className="side">
        <Sidebar />
      </div>
    </div>
  );
}

export default App;
