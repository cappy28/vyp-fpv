"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import DroneModel from "./DroneModel";

export default function DroneScene() {
  return (
    <Canvas
      camera={{ position: [1.6, 0.9, 1.9], fov: 40 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[2, 2, 2]} intensity={40} color="#3fd7e0" />
      <pointLight position={[-2, -1, -2]} intensity={15} color="#e8a33d" />
      <directionalLight position={[0, 3, 1]} intensity={0.6} />
      <Suspense fallback={null}>
        <DroneModel />
      </Suspense>
    </Canvas>
  );
}
