'use client';

import React, { useRef, useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Suspense } from 'react';
import * as THREE from 'three';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

// Componente para el fondo de estrellas
const StarField: React.FC = () => {
  const starCount = typeof window !== 'undefined' && window.innerWidth < 768 ? 1000 : 5000;

  const vertices = [];
  for (let i = 0; i < starCount; i++) {
    const x = THREE.MathUtils.randFloatSpread(2000);
    const y = THREE.MathUtils.randFloatSpread(2000);
    const z = THREE.MathUtils.randFloatSpread(2000);
    vertices.push(x, y, z);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  const material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 2,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.8,
  });

  const points = new THREE.Points(geometry, material);

  return <primitive object={points} />;
};

// Componente para el fallback de Suspense (cubo giratorio)
const LoadingIndicator: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
};

// Componente interno para la escena
const SceneContent: React.FC = () => {
  const { scene } = useGLTF('/models/duvan.glb');
  const { camera, gl } = useThree();
  const controlsRef = useRef<OrbitControlsImpl>(null);

  // Configura la posición, target y rotación inicial de la cámara
  useEffect(() => {
    if (controlsRef.current) {
      // Posición y target iniciales
      camera.position.set(0.64, 2.51, -0.30); // Tu posición inicial
      controlsRef.current.target = new THREE.Vector3(1.00, 0.50, 0.00); // Tu target

      // Rotación inicial: usa un enfoque indirecto
      controlsRef.current.update();
      // Ajusta la rotación usando los métodos internos de OrbitControls
      // Nota: azimuthalAngle y polarAngle son internos, usamos un workaround
      (controlsRef.current as any).azimuthalAngle = 180 * Math.PI / 180; // Rotación Y (radianes)
      (controlsRef.current as any).polarAngle = 180 * Math.PI / 180; // Rotación X (radianes)
      controlsRef.current.update();
    }
    // Configura fondo negro
    gl.setClearColor(0x000000, 1);
  }, [camera, gl]);

  // Log de posición, target y rotación al cambiar OrbitControls
  const handleControlsChange = () => {
    if (controlsRef.current && controlsRef.current.object) {
      const position = controlsRef.current.object.position;
      const target = controlsRef.current.target;
      const rotation = controlsRef.current.object.rotation;
      console.log('Camera Position:', {
        x: position.x.toFixed(2),
        y: position.y.toFixed(2),
        z: position.z.toFixed(2),
      });
      console.log('Camera Target:', {
        x: target.x.toFixed(2),
        y: target.y.toFixed(2),
        z: target.z.toFixed(2),
      });
      console.log('Camera Rotation (degrees):', {
        x: (rotation.x * 180 / Math.PI).toFixed(2),
        y: (rotation.y * 180 / Math.PI).toFixed(2),
        z: (rotation.z * 180 / Math.PI).toFixed(2),
      });
      console.log('OrbitControls Angles (degrees):', {
        azimuthal: (controlsRef.current.getAzimuthalAngle() * 180 / Math.PI).toFixed(2),
        polar: (controlsRef.current.getPolarAngle() * 180 / Math.PI).toFixed(2),
      });
    } else {
      console.log('OrbitControls not yet initialized');
    }
  };

  return (
    <>
      <StarField />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <primitive object={scene} scale={[1, 1, 1]} position={[0, 0, 0]} />
      <OrbitControls
        ref={controlsRef}
        enablePan={true}
        minDistance={0.05}
        maxDistance={10}
        onChange={handleControlsChange}
      />
    </>
  );
};

const ThreeScene: React.FC = () => {
  return (
    <div style={{ position: 'relative', height: '500px', width: '100%' }}>
      <Canvas gl={{ antialias: true, alpha: false }}>
        <Suspense fallback={<LoadingIndicator />}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeScene;