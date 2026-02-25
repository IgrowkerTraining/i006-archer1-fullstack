import React, { useState } from 'react';
import logo from '../assets/logo_archer1.png';
 

type Role = 'PRODUCTOR' | 'TECNICO' | null;

export const OnboardingScreen: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<Role>(null);

  const handleContinue = () => {
    if (selectedRole) {
      console.log(`Role selected: ${selectedRole}`);
      // Navigation logic to be implemented here
    }
  };

  return (
   <div 
  className="min-h-screen flex flex-col items-center justify-start pt-20 px-6 font-sans md:justify-center md:bg-[#f3efe6]" 
  style={{ backgroundColor: '#FFFBF1' }}
>
  <div
  className="w-full max-w-[400px] 
             md:max-w-[420px] 
             md:border md:border-[#e5dfd0] 
             md:rounded-[40px] 
             md:shadow-xl 
             md:p-10 
             md:bg-[#FFFBF1]
             flex flex-col min-h-[600px]"
>
      {/* Header Section */}
      <div className="mb-12 flex flex-col items-center">
        <img 
          src={logo} 
          alt="Archer1 Logo" 
          className="h-20 w-auto mb-4 object-contain"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            console.error("Logo file logoarcher1.png not found in assets folder");
          }}
        />
        <p className="text-xl font-medium" style={{ color: '#0B1001', opacity: 0.8 }}>
          Selecciona tu perfil para continuar
        </p>
      </div>
      

      {/* Role Selection Container */}
      <div className="w-full max-w-[400px] flex flex-col gap-6">
        
        {/* Card: PRODUCTOR */}
        <button 
          onClick={() => setSelectedRole('PRODUCTOR')}
          className="w-full py-10 px-6 rounded-[32px] border-2 transition-all duration-300 text-center flex flex-col items-center justify-center"
          style={{ 
            backgroundColor: selectedRole === 'PRODUCTOR' ? '#FFFFFF' : 'rgba(11, 16, 1, 0.05)',
            borderColor: selectedRole === 'PRODUCTOR' ? '#68911B' : 'transparent',
            boxShadow: selectedRole === 'PRODUCTOR' ? '0px 10px 30px rgba(104, 145, 27, 0.1)' : 'none'
          }}
        >
          <span className="text-2xl font-bold block mb-1" style={{ color: '#0B1001' }}>
            PRODUCTOR
          </span>
          <span className="text-sm opacity-60" style={{ color: '#0B1001' }}>
            Registro y gestión de actividades agrícolas
          </span>
        </button>

        {/* Card: TÉCNICO */}
        <button 
          onClick={() => setSelectedRole('TECNICO')}
          className="w-full py-10 px-6 rounded-[32px] border-2 transition-all duration-300 text-center flex flex-col items-center justify-center"
          style={{ 
            backgroundColor: selectedRole === 'TECNICO' ? '#FFFFFF' : 'rgba(11, 16, 1, 0.05)',
            borderColor: selectedRole === 'TECNICO' ? '#EFAD23' : 'transparent',
            boxShadow: selectedRole === 'TECNICO' ? '0px 10px 30px rgba(239, 173, 35, 0.1)' : 'none'
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

      {/* Action Button */}
      <button
        onClick={handleContinue}
        disabled={!selectedRole}
        className="mt-auto mb-20 w-full max-w-[340px] py-4 rounded-full font-bold text-lg transition-all active:scale-95"
        style={{ 
          backgroundColor: selectedRole ? '#68911B' : 'rgba(11, 16, 1, 0.1)',
          color: selectedRole ? '#FFFBF1' : 'rgba(11, 16, 1, 0.3)',
          cursor: selectedRole ? 'pointer' : 'not-allowed',
          marginTop: '10px'
        }}
      >
        Continuar
      </button>

      {/* Mobile Home Indicator */}
      <div className="w-32 h-1.5 bg-gray-300 rounded-full mb-2 opacity-30" />
    </div>
    </div>
  );
};