import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo_archer1.png';

type Role = 'PRODUCTOR' | 'TECNICO' | null;

export const OnboardingScreen: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const navigate = useNavigate();

 const handleContinue = () => {
  if (selectedRole) {
   navigate('/login', { state: { role: selectedRole } }); 
  }
};

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start pt-20 px-6 font-sans md:justify-center md:bg-[#f3efe6]"
      style={{ backgroundColor: '#FFFBF1' }}
    >
      <div
        className="w-full max-w-[400px] md:max-w-[420px] md:border md:border-[#e5dfd0] md:rounded-[40px] md:shadow-xl md:p-10 md:bg-[#FFFBF1] flex flex-col min-h-[600px]"
      >
        <div className="mb-12 flex flex-col items-center">
          <img
            src={logo}
            alt="Archer1 Logo"
            className="h-20 w-auto mb-4 object-contain"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <p className="text-xl font-medium" style={{ color: '#0B1001', opacity: 0.8 }}>
            Selecciona tu perfil para continuar
          </p>
        </div>

        <div className="w-full max-w-[400px] flex flex-col gap-6">
          <button
            onClick={() => setSelectedRole('PRODUCTOR')}
            className="w-full py-10 px-6 rounded-[32px] border-2 transition-all duration-300 text-center flex flex-col items-center justify-center"
            style={{
              backgroundColor: selectedRole === 'PRODUCTOR' ? '#EFAD23' : '#68911B',
              borderColor: selectedRole === 'PRODUCTOR' ? '#EFAD23' : 'transparent',
            }}
          >
            <span className="text-2xl font-bold block mb-1" style={{ color: '#0B1001' }}>
              PRODUCTOR
            </span>
            <span className="text-sm opacity-60" style={{ color: '#0B1001' }}>
              Registro y gestión de actividades agrícolas
            </span>
          </button>

          <button
            onClick={() => setSelectedRole('TECNICO')}
            className="w-full py-10 px-6 rounded-[32px] border-2 transition-all duration-300 text-center flex flex-col items-center justify-center"
            style={{
              backgroundColor: selectedRole === 'TECNICO' ? '#EFAD23' : '#68911B',
              borderColor: selectedRole === 'TECNICO' ? '#EFAD23' : 'transparent',
            }}
          >
            <span className="text-2xl font-bold block mb-1" style={{ color: '#0B1001' }}>
              TÉCNICO
            </span>
            <span className="text-sm opacity-60" style={{ color: '#0B1001' }}>
              Supervisión y observaciones técnicas
            </span>
          </button>
        </div>

        <button
          onClick={handleContinue}
          disabled={!selectedRole}
          className={`mt-auto mb-20 w-full max-w-[340px] py-4 rounded-full font-bold text-lg transition-all active:scale-95 shadow-sm self-center
            ${selectedRole ? 'cursor-pointer' : 'cursor-not-allowed'}`}
          style={{
            // Tło: pełna zieleń lub 15% Twojej zieleni
            backgroundColor: selectedRole ? '#68911B' : 'rgba(104, 145, 27, 0.15)', 
            // Tekst: kremowy lub 60% Twojej zieleni (wyraźny)
            color: selectedRole ? '#FFFBF1' : 'rgba(104, 145, 27, 0.6)', 
            marginTop: '10px'
          }}
        >
          Continuar
        </button>

        <div className="w-32 h-1.5 bg-gray-300 rounded-full mb-2 opacity-30 self-center" />
      </div>
    </div>
  );
};