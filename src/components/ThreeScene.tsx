'use client'; // Necesario para WebGL

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';

const ThreeScene: React.FC = () => {
  return (
    <Canvas style={{ height: '500px', width: '100%' }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
      <OrbitControls />
      <Stars />
    </Canvas>
  );
};

export default ThreeScene;