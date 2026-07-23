"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const SIGNAL = "#3FD7E0";
const COPPER = "#E8A33D";

function Propeller({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 22;
  });

  return (
    <group position={position} ref={ref}>
      <mesh>
        <boxGeometry args={[0.62, 0.008, 0.045]} />
        <meshStandardMaterial color="#1c2028" roughness={0.5} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[0.62, 0.008, 0.045]} />
        <meshStandardMaterial color="#1c2028" roughness={0.5} />
      </mesh>
    </group>
  );
}

function Arm({ angle }: { angle: number }) {
  const length = 0.62;
  const x = Math.cos(angle) * length;
  const z = Math.sin(angle) * length;
  const isFront = Math.abs(angle) < Math.PI / 2;

  return (
    <group>
      <mesh
        position={[x / 2, 0, z / 2]}
        rotation={[0, -angle, 0]}
      >
        <boxGeometry args={[length, 0.03, 0.08]} />
        <meshStandardMaterial color="#14171d" roughness={0.35} metalness={0.4} />
      </mesh>

      {/* Motor housing */}
      <mesh position={[x, 0.02, z]}>
        <cylinderGeometry args={[0.09, 0.09, 0.09, 16]} />
        <meshStandardMaterial color="#20242c" roughness={0.3} metalness={0.6} />
      </mesh>

      {/* LED tip */}
      <mesh position={[x, 0.02, z]}>
        <sphereGeometry args={[0.028, 12, 12]} />
        <meshStandardMaterial
          color={isFront ? SIGNAL : COPPER}
          emissive={isFront ? SIGNAL : COPPER}
          emissiveIntensity={2.2}
        />
      </mesh>

      <Propeller position={[x, 0.075, z]} />
    </group>
  );
}

export default function DroneModel() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0022;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.9) * 0.05;
    }
  });

  const armAngles = [Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4];

  return (
    <group ref={groupRef} scale={1.25}>
      {/* Central body / carbon plate */}
      <mesh>
        <boxGeometry args={[0.32, 0.05, 0.32]} />
        <meshStandardMaterial color="#0e1015" roughness={0.25} metalness={0.55} />
      </mesh>

      {/* FC stack hint */}
      <mesh position={[0, 0.06, 0]}>
        <boxGeometry args={[0.16, 0.05, 0.16]} />
        <meshStandardMaterial color="#181c24" roughness={0.4} metalness={0.3} />
      </mesh>

      {/* Camera / canopy */}
      <mesh position={[0.05, 0.1, 0]} rotation={[0, 0, -0.15]}>
        <boxGeometry args={[0.09, 0.07, 0.09]} />
        <meshStandardMaterial color={SIGNAL} emissive={SIGNAL} emissiveIntensity={0.4} roughness={0.15} metalness={0.2} />
      </mesh>

      {armAngles.map((angle) => (
        <Arm key={angle} angle={angle} />
      ))}

      {/* HUD reticle ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.05, 0.004, 8, 64]} />
        <meshBasicMaterial color={SIGNAL} transparent opacity={0.25} />
      </mesh>
    </group>
  );
}
