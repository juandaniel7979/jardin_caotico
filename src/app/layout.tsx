import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link'; // Para enlaces
import { HomeIcon, VideoCameraIcon, CubeIcon } from '@heroicons/react/24/outline'; // Íconos gráficos
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Jardín Caótico',
  description: 'Proyectos vlog y modelos 3D',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-gray-100 text-gray-900`}>
        {/* Header de navegación */}
        <header className="bg-blue-600 text-white p-4 shadow-md">
          <nav className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-xl font-bold flex items-center">
              <HomeIcon className="h-6 w-6 mr-2" />
              Jardín Caótico
            </Link>
            <ul className="flex space-x-6">
              <li>
                <Link href="/vlogs" className="flex items-center hover:underline">
                  <VideoCameraIcon className="h-5 w-5 mr-1" />
                  Vlogs
                </Link>
              </li>
              <li>
                <Link href="/3d-models" className="flex items-center hover:underline">
                  <CubeIcon className="h-5 w-5 mr-1" />
                  Modelos 3D
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className="container mx-auto p-4">
          {children}
        </main>
        <footer className="bg-blue-600 text-white p-4 text-center">
          © 2025 Jardín Caótico
        </footer>
      </body>
    </html>
  );
}