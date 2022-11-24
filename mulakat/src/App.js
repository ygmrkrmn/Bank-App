import "./App.css";
import Login from "./Login";
import Header from "./Header";
import Ekle from "./Ekle";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useState } from "react";
import Hesaplama from "./Hesaplama";

function App() {
  const [token, setToken] = useState("");
  const [allBanks, setAllBanks] = useState([]);
  const [getVade, setGetVade] = useState([]);
  return (
    <div>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Login setToken={setToken} />}></Route>
          <Route
            path="/bankaekle"
            element={
              <Ekle
                setToken={setToken}
                token={token}
                allBanks={allBanks}
                setAllBanks={setAllBanks}
              />
            }
          ></Route>
          <Route
            path="/anasayfa"
            element={<Login setToken={setToken} />}
          ></Route>
          <Route
            path="/hesaplama"
            element={
              <Hesaplama
                allBanks={allBanks}
                setAllBanks={setAllBanks}
                getVade={getVade}
                setGetVade={setGetVade}
              />
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
