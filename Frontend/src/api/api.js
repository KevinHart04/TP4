const BASE_URL = "http://localhost:8080/mapa"; // Asegurate de que el backend corra en este puerto

export const getPaises = async () => {
  const res = await fetch(`${BASE_URL}/paisesTodos`);
  return res.json();
};

export const getPaisesOrdenados = async () => {
  const res = await fetch(`${BASE_URL}/paisesOrdenados`);
  return res.json();
};

export const getProvincias = async (pais) => {
  const res = await fetch(`${BASE_URL}/provincias?pais=${encodeURIComponent(pais)}`);
  return res.json();
};

export const getLimitrofes = async (pais) => {
  const res = await fetch(`${BASE_URL}/limitrofes?pais=${encodeURIComponent(pais)}`);
  return res.json();
};

export const compararSuperficie = async (pais1, pais2) => {
  const res = await fetch(`${BASE_URL}/comparar?pais1=${encodeURIComponent(pais1)}&pais2=${encodeURIComponent(pais2)}`);
  return res.json();
};
