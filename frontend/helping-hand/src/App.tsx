import { useContext } from "react";
import { Header } from "./Components/Header/Header";
import { Home } from "./Components/Home/Home";
import { Route, Routes } from "react-router-dom";
import { DailyTargets } from "./Components/DailyTargets/DailyTargets";
import { FoodForm } from "./Components/FoodForm";
import { Login } from "./Components/Login/Login";
import { Settings } from "./Components/Settings/Settings";
import { DarkThemeContext } from "./Context/DarkThemeContext";
import { AboutAccordion } from "./Components/About/AboutAccordion";
import { History } from "./Components/History/History";
import { DemoBanner } from "./Components/DemoBanner/DemoBanner";
import { Footer } from "./Components/Footer/Footer";

export function App() {
  const { darkTheme } = useContext(DarkThemeContext);

  return (
    <div className={`App ${darkTheme ? 'dark' : 'light'}`}>
      <a className="skip-link" href="#main">Skip to content</a>
      <DemoBanner />
      {/* Render the Header component */}
      <Header />

      <div id="main" className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-entry" element={<FoodForm />} />
          <Route path="/history" element={<History />} />
          <Route path="/login" element={<Login />} />
          <Route path="/daily-targets" element={<DailyTargets />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<AboutAccordion />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
