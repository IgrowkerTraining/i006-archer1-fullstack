import React, { useState } from 'react';

export const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = () => {
    console.log('Logging in with', email, password);
    // tu logika logowania
  };
  
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start pt-20 px-6 font-sans md:justify-center md:bg-[#f3efe6]"
      style={{ backgroundColor: '#FFFBF1' }}
    >
      <div
        className="w-full max-w-[400px] md:max-w-[420px] md:border md:border-[#e5dfd0] md:rounded-[40px] md:shadow-xl md:p-10 md:bg-[#FFFBF1] flex flex-col min-h-[600px]"
      >
        {/* Header */}
        <div className="mb-12 flex flex-col items-center">
          <h1 className="text-4xl font-extrabold text-[#0B1001] mb-2">¡Bienvenido!</h1>
          <p className="text-lg font-medium text-[#0B1001] opacity-80">Inicia sesión para continuar</p>
        </div>
        
        {/* Form */}
        <form className="flex flex-col gap-8 flex-grow" onSubmit={e => { e.preventDefault(); handleLogin(); }}>
          <label className="flex flex-col text-[#0B1001] font-semibold text-sm">
            Correo electrónico
            <input
              type="email"
              placeholder="Ingresa tu correo electrónico"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="mt-2 p-3 rounded-xl border border-gray-300 focus:border-[#68911B] focus:outline-none transition"
            />
          </label>

          <label className="flex flex-col text-[#0B1001] font-semibold text-sm relative">
            Contraseña
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="mt-2 p-3 rounded-xl border border-gray-300 focus:border-[#68911B] focus:outline-none transition"
            />
            <button
              type="button"
              className="absolute right-3 top-[38px] text-sm text-[#EFAD23] hover:underline"
              onClick={() => alert('Funcionalidad para recuperar contraseña')}
            >
              ¿Olvidaste tu contraseña?
            </button>
          </label>

          <button
            type="submit"
            disabled={!email || !password}
            className={`mt-auto w-full py-4 rounded-full font-bold text-lg transition-all active:scale-95
              ${email && password ? 'bg-[#68911B] text-[#FFFBF1] cursor-pointer' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          >
            Iniciar sesión
          </button>
        </form>

        {/* Footer */}
        <p className="text-center mt-8 text-[#0B1001] opacity-70">
          ¿No tienes cuenta?{' '}
          <a href="#" className="font-bold underline text-[#EFAD23] hover:text-[#c49011]">
            Regístrate
          </a>
        </p>

        {/* Mobile Home Indicator */}
        <div className="w-32 h-1.5 bg-gray-300 rounded-full mt-6 opacity-30 self-center" />
      </div>
    </div>
  );
};