import React, { useEffect, useRef, useState } from "react";
import "./Landing.scss";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";
import blue from "../../Assets/Images/blue.png";
import green from "../../Assets/Images/green.png";
import red from "../../Assets/Images/red.png";
import yellow from "../../Assets/Images/yellow.png";
import orange from "../../Assets/Images/orange.png";
import white from "../../Assets/Images/white.jpg";

import logo from "../../Assets/Images/Quizzy (1).png";

export default function Landing() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const leaderboardRef = useRef(null);
  const [isCubeVisible, setIsCubeVisible] = useState(true);

  const navigatetostart = () => {
    setIsCubeVisible(false);
    navigate("/Start");
  };

  useEffect(() => {
    if (!isCubeVisible) {
      return;
    }

    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas });

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor("#2D9EAA");
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const materials = [
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(blue),
      }),
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(green),
      }),
      new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(red) }),
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(yellow),
      }),
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(white),
      }),
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(orange),
      }),
    ];
    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);
    if (window.innerWidth >= 1000) {
      cube.position.x = 2;
    }
    camera.position.z = 5;

    let isCursorMoving = false;
    let timer;

    const handleMouseMove = (event) => {
      isCursorMoving = true;

      clearTimeout(timer);

      timer = setTimeout(() => {
        isCursorMoving = false;
      }, 2000);

      const { clientX, clientY } = event;
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      const mouseX = (clientX - windowHalfX) / windowHalfX;
      const mouseY = (clientY - windowHalfY) / windowHalfY;
      cube.rotation.x = mouseY * Math.PI;
      cube.rotation.y = mouseX * Math.PI;
    };

    const handleWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const animate = () => {
      requestAnimationFrame(animate);

      if (!isCursorMoving) {
        cube.rotation.x += 0.008;
        cube.rotation.y += 0.008;
      }

      renderer.render(scene, camera);
    };

    document.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleWindowResize);

    animate();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [isCubeVisible]);

  const handleNavItemClick = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="landing">
      <section className="first">
        <canvas className={isCubeVisible ? "background-canvas" : ""} ref={canvasRef}></canvas>
        <header>
          <a href="/">
            <img src={logo} alt="Quizzy Logo" className="logo" />
          </a>
          <nav>
            <ul>
              <li onClick={() => handleNavItemClick(aboutRef)}>About</li>
              <li onClick={() => handleNavItemClick(leaderboardRef)}>Leaderboard</li>
              <li onClick={() => handleNavItemClick(contactRef)}>Contact</li>
              <button type="button" className="login">
                Login
              </button>
              <button type="button" className="signup">
                Signup
              </button>
            </ul>
          </nav>
        </header>
        <div className="first-content">
          <p className="title">show real</p>
          <p className="heading">POWER OF YOUR MIND</p>
          <button onClick={navigatetostart}>Get started</button>
        </div>
      </section>
    </div>
  );
}
