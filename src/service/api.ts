export async function fetchApiGosat() {
  const apiGosat = 'http://127.0.0.1:8000/relatorio';
  const response = await fetch(apiGosat);
  const data = await response.json();
  return data;
}