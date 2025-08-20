import Link from 'next/link';
import { VideoCameraIcon, CubeIcon } from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">Bienvenido a Jardín Caótico</h1>
      <p className="text-lg mb-12 text-center max-w-2xl">
        Explora nuestros proyectos: vlogs inspiradores y modelos 3D interactivos. ¡Haz clic en las tarjetas para acceder!
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Tarjeta para Vlogs */}
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center transform hover:scale-105 transition-transform">
          <VideoCameraIcon className="h-16 w-16 text-blue-500 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Vlogs</h2>
          <p className="text-gray-600 mb-4">Videos sobre proyectos caóticos y creativos.</p>
          <Link href="/vlogs" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Acceder a Vlogs
          </Link>
        </div>
        
        {/* Tarjeta para Modelos 3D */}
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center transform hover:scale-105 transition-transform">
          <CubeIcon className="h-16 w-16 text-blue-500 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Modelos 3D</h2>
          <p className="text-gray-600 mb-4">Explora y interactúa con modelos gráficos en 3D.</p>
          <Link href="/3d-models" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Acceder a Modelos 3D
          </Link>
        </div>
      </div>
    </div>
  );
}