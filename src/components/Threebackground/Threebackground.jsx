import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import "./Threebackground.scss";

export default function ThreeBackground() {
  const sceneRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor("#e5e5e5");
    renderer.setSize(window.innerWidth, window.innerHeight);
    sceneRef.current.appendChild(renderer.domElement);

    window.addEventListener("resize", () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    });

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshLambertMaterial({ color: 0xF7F7F7 });

    let meshX = -10;
    for (let i = 0; i < 15; i++) {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = (Math.random() - 0.5) * 10;
      mesh.position.y = (Math.random() - 0.5) * 10;
      mesh.position.z = (Math.random() - 0.5) * 10;
      scene.add(mesh);
      meshX += 1;
    }

    const light1 = new THREE.PointLight(0xffffff, 1, 1000);
    light1.position.set(0, 0, 0);
    scene.add(light1);

    const light2 = new THREE.PointLight(0xffffff, 2, 1000);
    light2.position.set(0, 0, 25);
    scene.add(light2);

    const render = function () {
      requestAnimationFrame(render);
      renderer.render(scene, camera);
    };

    render();

    return () => {
      window.removeEventListener("resize", () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      });
    };
  }, []);

  return <div ref={sceneRef} className="three-background" />;
}
