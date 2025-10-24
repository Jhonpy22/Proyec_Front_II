// pages/ProfilePage.tsx
import React from 'react';

const ProfilePage: React.FC = () => {
  return (
    <div className="p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Datos Personales</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">Aquí irá el formulario de datos personales</p>
          {/* Aquí agregaremos el formulario después */}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;