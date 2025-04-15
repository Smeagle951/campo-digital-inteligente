
import React, { useEffect, useRef } from 'react';

const FarmMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Esta é uma implementação básica. Para um mapa real,
    // seria necessário integrar com o Google Maps API ou outro serviço
    const loadMap = () => {
      if (mapRef.current) {
        // Aqui você adicionaria a inicialização real do mapa
        console.log("Mapa carregado");
      }
    };
    
    loadMap();
  }, []);
  
  return (
    <div ref={mapRef} className="w-full h-full rounded-lg overflow-hidden bg-cover bg-center" 
      style={{ 
        backgroundImage: "url('https://i.imgur.com/GEVjULK.jpg')" 
      }}>
      <div className="h-full w-full flex items-center justify-center bg-black/20 text-white">
        <div className="text-center p-4 bg-black/40 rounded-lg">
          <h3 className="text-xl font-semibold">Fazenda Esperança</h3>
          <p>Sorriso, MT - Brasil</p>
          <p className="text-sm mt-2">850 hectares • 4 talhões</p>
        </div>
      </div>
    </div>
  );
};

export default FarmMap;
