import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Scene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Setup
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1.5, 4.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    // Hill
    const hillGeo = new THREE.SphereGeometry(2.5, 64, 64);
    const hillMat = new THREE.MeshStandardMaterial({ 
      color: 0xF6F6F1, 
      roughness: 1,
      flatShading: false
    });
    const hill = new THREE.Mesh(hillGeo, hillMat);
    hill.position.y = -1.8;
    scene.add(hill);

    // Trees Group
    const treeGroup = new THREE.Group();
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x8B5A3C });
    const foliageMat = new THREE.MeshStandardMaterial({ color: 0x3F5A43 });

    // Create Trees
    for(let i = 0; i < 40; i++){
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.06, 0.3, 8), trunkMat);
      const cone = new THREE.Mesh(new THREE.ConeGeometry(0.25 + Math.random()*0.2, 0.8 + Math.random()*0.4, 8), foliageMat);
      
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.3 + Math.random() * 1.8;
      
      // Position on the hill sphere approximation (roughly flat top area)
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = -1.5; // Base level

      trunk.position.set(x, y + 0.15, z);
      cone.position.set(x, y + 0.6, z);
      
      // Random rotation for natural look
      trunk.rotation.y = Math.random() * Math.PI;
      cone.rotation.y = Math.random() * Math.PI;
      
      // Slight lean outwards
      const lean = 0.1;
      trunk.rotation.x = (Math.random() - 0.5) * lean;
      trunk.rotation.z = (Math.random() - 0.5) * lean;
      cone.rotation.x = trunk.rotation.x;
      cone.rotation.z = trunk.rotation.z;

      treeGroup.add(trunk);
      treeGroup.add(cone);
    }
    scene.add(treeGroup);

    // Particles (Fireflies)
    const pCount = 200;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    const pSpeed = new Float32Array(pCount);
    
    for(let i=0; i<pCount; i++){
      pPos[i*3] = (Math.random() - 0.5) * 6;
      pPos[i*3+1] = -0.5 + Math.random() * 3;
      pPos[i*3+2] = (Math.random() - 0.5) * 4;
      pSpeed[i] = 0.002 + Math.random() * 0.005;
    }
    
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x6CA67A,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // Animation Loop
    const clock = new THREE.Clock();
    let mouseX = 0;
    let mouseY = 0;

    const animate = () => {
      const t = clock.getElapsedTime();

      // Gentle rotation of the world
      treeGroup.rotation.y = Math.sin(t * 0.1) * 0.1 + (mouseX * 0.05);
      hill.rotation.y = Math.sin(t * 0.1) * 0.1 + (mouseX * 0.05);

      // Breathing effect
      treeGroup.position.y = Math.sin(t * 0.5) * 0.05;

      // Particle movement
      const positions = particles.geometry.attributes.position.array as Float32Array;
      for(let i=0; i<pCount; i++){
        positions[i*3+1] += Math.sin(t + i) * 0.002;
        // Subtle drift
        positions[i*3] += Math.cos(t * 0.5 + i) * 0.001;
      }
      particles.geometry.attributes.position.needsUpdate = true;

      // Camera drift based on mouse
      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
      camera.position.y += ((1.5 + mouseY * 0.2) - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    const animFrame = requestAnimationFrame(animate);

    // Event Listeners
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      // Dispose resources
      hillGeo.dispose();
      hillMat.dispose();
      trunkMat.dispose();
      foliageMat.dispose();
      pGeo.dispose();
      pMat.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none opacity-60 md:opacity-100" />;
};

export default Scene;