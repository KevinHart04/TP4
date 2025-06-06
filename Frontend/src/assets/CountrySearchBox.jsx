import { useState, useEffect } from "react";
import './CountrySearchBox.css';
import { getPaises, getProvincias, getLimitrofes } from "../api/api"; // asumimos rutas correctas

export default function CountrySearchBox() {
  const [searchTerm, setSearchTerm] = useState("");
  const [pais, setPais] = useState(null);
  const [provincias, setProvincias] = useState([]);
  const [limitrofes, setLimitrofes] = useState([]);

  // Cuando el término cambia, buscamos el país completo (nombre exacto)
  useEffect(() => {
    if (searchTerm.trim().length === 0) {
      setPais(null);
      setProvincias([]);
      setLimitrofes([]);
      return;
    }

    // Primero buscamos si hay país con ese nombre exacto (puede ajustarse a búsqueda mejorada)
    getPaisesTodos()
      .then((paises) => {
        const encontrado = paises.find(p => p.nombre.toLowerCase() === searchTerm.toLowerCase());
        if (encontrado) {
          setPais(encontrado);

          getProvincias(encontrado.nombre).then(setProvincias);
          getLimitrofes(encontrado.nombre).then(setLimitrofes);
        } else {
          setPais(null);
          setProvincias([]);
          setLimitrofes([]);
        }
      })
      .catch(console.error);
  }, [searchTerm]);

  return (
    <div className="country-box">
      <input
        type="text"
        className="search-input"
        placeholder="Escribe el nombre del país"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      {pais ? (
        <div className="search-result">
          <h3>{pais.nombre}</h3>
          <p><strong>Capital:</strong> {pais.capital}</p>
          <p><strong>Superficie:</strong> {pais.superficie.toLocaleString()} km²</p>
          <p><strong>Provincias:</strong> {provincias.map(p => p.nombre).join(", ") || "No tiene"}</p>
          <p><strong>Países Limítrofes:</strong> {limitrofes.map(l => l.nombre).join(", ") || "No tiene"}</p>
        </div>
      ) : (
        searchTerm.length > 0 && <p className="search-result">No se encontró el país.</p>
      )}
    </div>
  );
}
