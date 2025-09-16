import { useState } from "react";
import { ThemeContext } from "./contexts/ThemeContext";
import MainPage from "./pages/MainPage";

function App() {
  const [dark, setDark] = useState(false);

  return (
    <ThemeContext.Provider value={dark}>
      <MainPage setDark={setDark} />
    </ThemeContext.Provider>
  );
}

export default App;
