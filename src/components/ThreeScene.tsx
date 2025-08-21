'use client';

import React, { useRef, useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stars } from '@react-three/drei';
import { Suspense } from 'react';
import * as THREE from 'three';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

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
  const { camera } = useThree();
  const controlsRef = useRef<OrbitControlsImpl>(null);

  // Configura la posición inicial de la cámara
  useEffect(() => {
    if (controlsRef.current) {
      // Usa los valores obtenidos de los logs
      camera.position.set(0.01, 2.00, 0.06); // Reemplaza con tu Camera Position preferida
      controlsRef.current.target = new THREE.Vector3(0, 0, 0); // Reemplaza con tu Camera Target preferido
      controlsRef.current.update();
    }
  }, [camera]);

  // Log de posición y target al cambiar OrbitControls
  const handleControlsChange = () => {
    if (controlsRef.current && controlsRef.current.object) {
      const position = controlsRef.current.object.position;
      const target = controlsRef.current.target;
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
    } else {
      console.log('OrbitControls not yet initialized');
    }
  };

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <primitive object={scene} scale={[1, 1, 1]} position={[0, 0, 0]} />
      <OrbitControls
        ref={controlsRef}
        enablePan={true}
        minDistance={2}
        maxDistance={10}
        onChange={handleControlsChange}
      />
    </>
  );
};

const ThreeScene: React.FC = () => {
  return (
    <div style={{ position: 'relative', height: '500px', width: '100%' }}>
      <Canvas>
        <Suspense fallback={<LoadingIndicator />}>
          <SceneContent />
        </Suspense>
        <Stars/>
      </Canvas>
    </div>
  );
};

export default ThreeScene;