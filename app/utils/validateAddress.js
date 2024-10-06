// utils/validateAddress.js
const calculateDistanceFromParis = (lon, lat) => {
    const parisCoords = { lon: 2.3522, lat: 48.8566 };
    const R = 6371; // Rayon de la Terre en km
  
    const degToRad = (deg) => (deg * Math.PI) / 180;
  
    const dLat = degToRad(lat - parisCoords.lat);
    const dLon = degToRad(lon - parisCoords.lon);
  
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degToRad(parisCoords.lat)) *
        Math.cos(degToRad(lat)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
  
    return distance;
  };
  
  export const validateAddress = async (address) => {
    try {
      const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(address)}&limit=1`);
  
      if (!response.ok) {
        console.error("Erreur lors de la validation de l'adresse:", response.statusText);
        return false;
      }
  
      const data = await response.json();
      const features = data.features;
  
      if (features.length > 0) {
        const [lon, lat] = features[0].geometry.coordinates;
        const distance = calculateDistanceFromParis(lon, lat);
        return distance <= 50; // Distance en km
      }
  
      return false;
    } catch (error) {
      console.error("Erreur lors de la validation de l'adresse:", error);
      return false;
    }
  };
  