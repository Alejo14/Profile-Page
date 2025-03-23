const fetchConfiguration = async () => {
  const lsConfig = localStorage.getItem("configuration");
  if (lsConfig !== null) return JSON.parse(lsConfig);
  const res = await fetch("data/configuration.json");
  const data = await res.json();
  localStorage.setItem("configuration", JSON.stringify(data));
  return data;
};

export default fetchConfiguration;
