"use client";

import { Canvas } from "@react-three/fiber";

export default function ProjectOrb() {
  return (
    <div className="h-40">
      <Canvas camera={{ position: [0, 0, 2.4], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[3, 3, 3]} intensity={1} />
        <mesh rotation={[0.6, 0.2, 0]}>
          <icosahedronGeometry args={[0.9, 2]} />
          <meshStandardMaterial color="#ffffff" wireframe opacity={0.35} transparent />
        </mesh>
      </Canvas>
    </div>
  );
}


