import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';

// --- CORRECTIF VITE POUR LES ICONES LEAFLET ---
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
});
// ----------------------------------------------

function Map({ biens = [] }) { // On récupère les biens envoyés par EstateBoard
  // On centre sur la France par défaut avec un zoom éloigné
  const centreCarte = [46.603354, 1.888334]; 
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const geocoderVilles = async () => {
      const coordonneesEnCache = {}; // Pour mémoriser les villes déjà cherchées
      const nouveauxMarqueurs = [];

      for (const bien of biens) {
        if (!bien.ville) continue;

        const ville = bien.ville.toLowerCase();

        // 1. Si on connaît déjà la ville, on recycle les coordonnées
        if (coordonneesEnCache[ville]) {
          nouveauxMarqueurs.push({ ...bien, ...coordonneesEnCache[ville] });
          continue;
        }

        // 2. Sinon, on interroge l'API gratuite du gouvernement français
        try {
          // On cherche spécifiquement des communes (type=municipality)
          const reponse = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(bien.ville)}&type=municipality&limit=1`);
          const data = await reponse.json();

          if (data.features && data.features.length > 0) {
            // Attention : L'API renvoie [Longitude, Latitude], Leaflet veut [Latitude, Longitude]
            const coords = data.features[0].geometry.coordinates; 
            const position = { lat: coords[1], lng: coords[0] };
            
            coordonneesEnCache[ville] = position; // On sauvegarde dans notre cache
            nouveauxMarqueurs.push({ ...bien, ...position });
          }
        } catch (error) {
          console.error("Impossible de trouver la ville :", bien.ville, error);
        }
        
        // Petite pause de 100ms pour ne pas bloquer l'API du gouvernement avec trop de requêtes
        await new Promise(resolve => setTimeout(resolve, 100)); 
      }

      setMarkers(nouveauxMarqueurs);
    };

    if (biens.length > 0) {
      geocoderVilles();
    } else {
      setMarkers([]); // Si aucun bien (ex: recherche qui ne donne rien), on vide la carte
    }
  }, [biens]); // Ce code se relance à chaque fois que la liste des biens change

  return (
    <div className="map-container" style={{ height: '100%', minHeight: '500px', width: '100%' }}>
      <MapContainer 
        center={centreCarte} 
        zoom={5} // Zoom=5 permet de voir la France entière
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {/* On affiche nos marqueurs générés dynamiquement */}
        {markers.map((marker) => (
          <Marker key={marker.id} position={[marker.lat, marker.lng]}>
            <Popup>
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ margin: '0 0 5px 0', fontSize: '14px' }}>{marker.titre}</h3>
                <p style={{ margin: 0, fontWeight: 'bold', color: '#e63946' }}>{marker.prix} €</p>
                <p style={{ margin: 0, fontSize: '12px', color: 'gray' }}>{marker.ville} - {marker.type_bien}</p>
                <a href={`/EstateDetails/${marker.id}`} style={{ display: 'block', marginTop: '8px', fontSize: '12px' }}>Voir le détail</a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;