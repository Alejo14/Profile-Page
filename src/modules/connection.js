const fetchConfiguration = async () => {
  const res = await fetch("data/configuration.json");
  const data = await res.json();
  return data;
};

export { fetchConfiguration };
