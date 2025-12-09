
import React, { useRef, useEffect } from "react";
import * as THREE from "three";

export default function Hero3D() {
  const mountRef = useRef();
  // Track mouse position as normalized device coordinates
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // === THREE.JS SETUP ===
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 3.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Sphere geometry (blob placeholder)
    const geometry = new THREE.SphereGeometry(1.1, 64, 64);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.6,
      roughness: 0.25,
      transparent: true,
      opacity: 0.95,
      envMapIntensity: 1.2,
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1.2);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Mouse interaction for rotation
    const handleMouseMove = (e) => {
      // Normalize mouse to [-1, 1]
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    let frameId;
    const animate = () => {
      // Smoothly rotate sphere based on mouse
      sphere.rotation.y += ((mouse.current.x * Math.PI * 0.25) - sphere.rotation.y) * 0.08;
      sphere.rotation.x += ((mouse.current.y * Math.PI * 0.18) - sphere.rotation.x) * 0.08;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      renderer.dispose();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center bg-black overflow-hidden">
      <div ref={mountRef} className="absolute inset-0 z-0" />
      <h1 className="relative z-10 text-white text-6xl md:text-8xl font-extrabold tracking-tight text-center select-none pointer-events-none">
        Haziq Razak
      </h1>
    </section>
  );
}

