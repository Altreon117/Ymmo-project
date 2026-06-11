import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // INDISPENSABLE : sans ça, la carte sera cassée !
import './Map.css'

// De fausses données (en attendant que ta collègue te fournisse la vraie API)
const biensImmobiliers = [
  { id: 1, titre: "Appartement 3 pièces", prix: "440 000 €", lat: 48.8209, lng: 2.2785, ville: "Vanves" },
  { id: 2, titre: "Maison familiale", prix: "650 000 €", lat: 48.8014, lng: 2.1204, ville: "Versailles" },
];

function Map() {
  // Coordonnées pour centrer la carte (ex: Paris/Ile-de-France)
  const centreCarte = [48.8566, 2.3522]; 

  return (
    // La div parent DOIT avoir une hauteur définie, sinon la carte ne s'affiche pas
    <div className="map-container">
      <MapContainer 
        center={centreCarte} 
        zoom={10} 
        style={{ height: '100%', width: '100%' }}
      >
        {/* Le fond de carte (TileLayer). Ici, on utilise OpenStreetMap (gratuit) */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {/* On boucle sur nos biens pour afficher les marqueurs */}
        {biensImmobiliers.map((bien) => (
          <Marker key={bien.id} position={[bien.lat, bien.lng]}>
            {/* La petite bulle qui s'ouvre au clic */}
            <Popup>
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ margin: '0 0 5px 0', fontSize: '14px' }}>{bien.titre}</h3>
                <p style={{ margin: 0, fontWeight: 'bold', color: '#e63946' }}>{bien.prix}</p>
                <p style={{ margin: 0, fontSize: '12px' }}>{bien.ville}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;