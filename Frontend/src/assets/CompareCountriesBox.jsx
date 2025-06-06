import { useEffect, useState } from "react";
import { getPaises, compararSuperficie } from "../api/api";
import './CompareCountriesBox.css';

function CompareCountriesBox() {
  const [paises, setPaises] = useState([]);
  const [pais1, setPais1] = useState("");
  const [pais2, setPais2] = useState("");
  const [ganador, setGanador] = useState(null);

  useEffect(() => {
    getPaises().then(setPaises);
  }, []);

  const comparar = async () => {
    if (pais1 && pais2 && pais1 !== pais2) {
      const result = await compararSuperficie(pais1, pais2);
      setGanador(result);
    }
  };

  return (
    <div className="compare-box">
      <select value={pais1} onChange={(e) => setPais1(e.target.value)}>
        <option value="">País 1</option>
        {paises.map(p => (
          <option key={p.nombre} value={p.nombre}>{p.nombre}</option>
        ))}
      </select>

      <select value={pais2} onChange={(e) => setPais2(e.target.value)}>
        <option value="">País 2</option>
        {paises.map(p => (
          <option key={p.nombre} value={p.nombre}>{p.nombre}</option>
        ))}
      </select>

      <button onClick={comparar}>Comparar Superficie</button>

      {ganador && (
        <div className="result-box">
          <p><strong>{ganador.nombre}</strong> tiene mayor superficie: {ganador.superficie} km²</p>
        </div>
      )}
    </div>
  );
}

export default CompareCountriesBox;
