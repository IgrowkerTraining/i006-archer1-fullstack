import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '../services/api'; 
import { useAuth } from '../hooks/useAuth';// Para guardar al usuario logueado
import { useExplotation } from '../context/ExplotationContext';

export const LoginScreen: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    
    const navigate = useNavigate();
    const location = useLocation();

 
    const selectedRole = location.state?.role || null;

    // 1. Asegúrate de extraer 'login' del hook useAuth antes de la función
const { login } = useAuth(); 
const { cargarExplotacionesByProducer } = useExplotation();

const handleLogin = async () => {
    try {
        const response = await api.login({ email, password });
        const res = response as any;

        // 1. Extraemos el token que ya vimos que sí llega
        const token = res.token;

        if (!token) {
            throw new Error("No se recibió un token del servidor");
        }

        // 2. EXTRAEMOS EL ID DEL TOKEN (Ya que el servidor no lo envía aparte)
        // El token tiene 3 partes separadas por puntos. La segunda parte tiene los datos.
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(window.atob(base64));
        
        // El ID suele venir como 'id' o 'sub' dentro del token
        const userId = payload.id || payload.sub;

        if (!userId) {
            throw new Error("El token no contiene un ID de usuario válido");
        }

        // 3. Creamos un objeto de usuario manual con ese ID
        const user = { 
            id: userId, 
            email: email, 
            role: selectedRole 
        };

        console.log("Usuario recuperado del token:", user);

        // 4. Guardamos la sesión
       login(user as any, token); 

        // 5. Redirigimos
        if (selectedRole === 'PRODUCTOR') {
            const explotaciones = await cargarExplotacionesByProducer(userId);

            if (!explotaciones || explotaciones.length === 0) {
                navigate('/initial'); // <--- Esto es lo que querías ver
            } else {
                navigate('/homeProductor');
            }
        } else {
            navigate(selectedRole === 'TECNICO' ? '/homeTecnic' : '/');
        }

    } catch (error: any) {
        console.error('Error detallado:', error);
        alert('Error al entrar: ' + (error.message || 'Datos incorrectos'));
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
                
                <button 
                    onClick={() => navigate('/')}
                    className="self-start mb-4 text-sm font-bold text-[#68911B] opacity-70 hover:opacity-100 flex items-center gap-1"
                >
                    ←
                </button>

                <div className="mb-12 flex flex-col items-center text-center">
                    <h1 className="text-4xl font-extrabold text-[#68911B] mb-2">¡Bienvenido!</h1>
                    <p className="text-lg font-medium text-[#0B1001] opacity-80">
                        Inicia sesión como <span className="text-[#68911B]">{selectedRole || 'usuario'}</span>
                    </p>
                </div>

                <form
                    className="flex flex-col gap-6 flex-grow"
                    onSubmit={e => { e.preventDefault(); handleLogin(); }}
                >
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-sm text-[#0B1001]">
                            Correo electrónico
                        </label>
                        <input
                            type="email"
                            placeholder="Ingresa tu correo electrónico"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            className="p-3 rounded-xl border focus:ring-1 focus:outline-none transition placeholder:text-[#68911B] placeholder:opacity-50"
                            style={{
                                borderColor: '#68911B',
                                backgroundColor: '#FFFBF1',
                                color: '#68911B'
                            }}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold text-sm mb-2 text-[#0B1001]">
                            Contraseña
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="********"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                className="w-full p-3 rounded-xl border focus:ring-1 focus:outline-none transition pr-16 placeholder:text-[#68911B] placeholder:opacity-50"
                                style={{
                                    borderColor: '#68911B',
                                    backgroundColor: '#FFFBF1',
                                    color: '#68911B'
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-[#68911B] opacity-70 hover:opacity-100 uppercase"
                            >
                                {showPassword ? "Ocultar" : "Ver"}
                            </button>
                        </div>
                        <button
                            type="button"
                            className="mt-2 self-end text-sm text-[#EFAD23] font-medium hover:underline transition-colors"
                            onClick={() => alert('Recuperar')}
                        >
                            ¿Olvidaste tu contraseña?
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={!email || !password}
                        className={`mt-auto w-full py-4 rounded-full font-bold text-lg transition-all active:scale-95 shadow-sm
                        ${email && password ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                        style={{
                            backgroundColor: '#68911B', 
                            color: '#FFFBF1',
                            opacity: email && password ? 1 : 0.4
                        }}
                    >
                        Iniciar sesión
                    </button>
                </form>

                <div className="mt-8">
                    <hr style={{ borderColor: '#e5dfd0' }} />
                </div>

                <div className="text-center mt-8">
                    <p className="text-[#0B1001] opacity-70">
                        ¿No tienes cuenta?{' '}
                        <button 
                            type="button"
                            onClick={() => navigate('/register')}
                            className="font-bold underline text-[#EFAD23] hover:text-[#c49011]"
                        >
                            Regístrate
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};