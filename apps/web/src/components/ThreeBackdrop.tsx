import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float, Stars, Sphere } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

// The floating shapes and connections
function NeuralNodes() {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!group.current) return;
    // Smooth Parallax effect based on mouse pointer
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, (state.pointer.x * Math.PI) / 10, 0.05);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, (state.pointer.y * Math.PI) / 10, 0.05);
  });

  return (
    <group ref={group}>
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={2}>
        {/* Outer wireframe sphere representing Network/Cloud */}
        <Sphere args={[1.5, 64, 64]} scale={1.2}>
          <meshPhysicalMaterial 
            color="#7c5cfc" 
            emissive="#7c5cfc"
            emissiveIntensity={0.2}
            roughness={0.2} 
            metalness={0.8}
            wireframe={true}
            transparent
            opacity={0.12}
          />
        </Sphere>
        {/* Inner solid core representing Logic/System */}
        <Sphere args={[0.6, 32, 32]}>
          <meshStandardMaterial 
            color="#00d4aa" 
            emissive="#00d4aa" 
            emissiveIntensity={0.6} 
            roughness={0.3} 
            metalness={0.8}
          />
        </Sphere>
      </Float>
    </group>
  );
}

// Particle system around the core representing Data/ML
function ParticleSwarm() {
  const ref = useRef<THREE.Points>(null);
  
  // Generate random points in a sphere volume
  const spherePositions = useMemo(() => {
    const count = 3500;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 6 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    // Slow continuous rotation
    ref.current.rotation.x -= delta / 12;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={spherePositions} stride={3} frustumCulled={false}>
        <PointMaterial 
          transparent 
          color="#00d4aa" 
          size={0.025} 
          sizeAttenuation={true} 
          depthWrite={false}
          opacity={0.4}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

export function ThreeBackdrop() {
  return (
    <div className="three-backdrop" aria-hidden="true" style={{ pointerEvents: 'none' }}>
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 45 }} 
        dpr={[1, 2]} 
        eventSource={document.body} 
        eventPrefix="client"
      >
        {/* Subtle background stars for depth */}
        <Stars radius={100} depth={50} count={3000} factor={3} saturation={0} fade speed={1.5} />
        
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#7c5cfc" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#00d4aa" />
        
        <NeuralNodes />
        <ParticleSwarm />
      </Canvas>
    </div>
  );
}
