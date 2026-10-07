const API_URL = 'https://api.api-ninjas.com/v1/animals';
const LEGACY_API_URL = 'https://api-ninjas.com/api/animals';

function buildAnimalImage(name) {
  const cleanName = String(name || 'animal').trim();
  return `https://source.unsplash.com/featured/600x400/?${encodeURIComponent(cleanName)}`;
}

function normalizeAnimal(item) {
  if (!item || typeof item !== 'object') {
    return null;
  }

  const name = item.name || item.animal || item.species || '';

  if (!name) {
    return null;
  }

  return {
    name,
    image: buildAnimalImage(name),
  };
}

export async function fetchAnimalsByName(term) {
  const searchTerm = String(term || '').trim();

  if (!searchTerm) {
    return [];
  }

  const apiKey = process.env.REACT_APP_API_NINJAS_KEY;

  if (!apiKey) {
    throw new Error('Configure a variável REACT_APP_API_NINJAS_KEY no arquivo .env');
  }

  const params = new URLSearchParams({ name: searchTerm });
  const urls = [
    `${API_URL}?${params.toString()}`,
    `${LEGACY_API_URL}?${params.toString()}`,
  ];

  let lastError = null;

  for (const url of urls) {
    try {
      const response = await fetch(url, {
        headers: {
          'X-Api-Key': apiKey,
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        lastError = new Error(`Erro ao consultar API: ${response.status}`);
        continue;
      }

      const data = await response.json();
      const animals = Array.isArray(data) ? data : [];

      return animals
        .map(normalizeAnimal)
        .filter(Boolean)
        .slice(0, 10);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error('Não foi possível buscar os animais');
}
