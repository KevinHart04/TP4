import { useState } from "react";
import './App.css';
import Aurora from './assets/Aurora';
import SplitText from './assets/SplitText';
import CompareCountriesBox from './assets/CompareCountriesBox';
import CountrySearchBox from './assets/CountrySearchBox';
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const [showSearch, setShowSearch] = useState(false);
  const [showCompare, setShowCompare] = useState(false);

  const toggleSearch = () => {
    setShowSearch((v) => !v);
    if (showCompare) setShowCompare(false);
  };

  const toggleCompare = () => {
    setShowCompare((v) => !v);
    if (showSearch) setShowSearch(false);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <SplitText
          text="Mapamundi Interactivo"
          className="text-2xl font-semibold text-center"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
        />
      </header>

      <div className="Aurora">
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>

      <div className="button-container">
        <button className="map-button" onClick={toggleSearch}>
          Buscar País / Continente
        </button>
        <button className="map-button" onClick={toggleCompare}>
          Comparar Países
        </button>
      </div>

      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.4 }}
            key="search-box"
          >
            <CountrySearchBox />
          </motion.div>
        )}
        {showCompare && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.4 }}
            key="compare-box"
          >
            <CompareCountriesBox />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
