// src/components/PublicView.jsx
import React, { useEffect, useState } from 'react';

const PublicView = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subdomain = window.location.hostname.split('.')[0];
    fetch(`${import.meta.env.VITE_API_URL}/api/public/${subdomain}`)
      .then(response => response.json())
      .then(data => {
        setCategories(data.categories || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener la carta pública:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen text-xl">Cargando...</div>;
  }

  return (
    <div className="p-6 min-h-screen bg-base-200">
      <header className="mb-6">
        <h1 className="text-4xl font-bold text-primary mb-2">Carta del Comercio</h1>
        <p className="text-base-content">Explora nuestras categorías y productos</p>
      </header>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <div key={cat.id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-accent">{cat.name}</h2>
              {cat.products && cat.products.map((prod) => (
                <div key={prod.id} className="mt-2">
                  <div className="font-semibold">{prod.name}</div>
                  <div className="text-sm text-base-content">{prod.description}</div>
                  <div className="text-primary font-bold">${prod.price}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicView;

