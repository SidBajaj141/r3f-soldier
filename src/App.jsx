import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useLoader, } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useAnimations, OrbitControls } from '@react-three/drei';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils';
import './App.css';

function Soldier({ position, animationIndex}) {
  const group = useRef();
  const gltf = useLoader(GLTFLoader, 'https://threejs.org/examples/models/gltf/Soldier.glb');
  const { actions} = useAnimations(gltf.animations, group);

  useEffect(() => {
    
    actions[gltf.animations[animationIndex].name].play();
    
  }, [actions, animationIndex]);

  return (
    <group ref={group} position={position}>
      <primitive object={SkeletonUtils.clone(gltf.scene)} />
    </group>
  );
}

function Scene() {

  
  return (
    <>
      <Canvas camera={{ position: [2, 3, -6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[-3, 10, -10]}
          intensity={3}
        />
        <Suspense fallback={null}>
          <Soldier position={[-2, 0, 0]} animationIndex={0} />
          <Soldier position={[0, 0, 0]} animationIndex={1}  />
          <Soldier position={[2, 0, 0]} animationIndex={3}  />
        </Suspense>
        <OrbitControls />
      </Canvas>
      
    </>
  );
}

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Scene />
    </div>
  );
}