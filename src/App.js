import logo from "./logo.svg";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import defaultPic from "./imgs/figure_shock.png";
import otete from "./imgs/job_hisyo_woman_kochira.png";
import Button from "@mui/material/Button";

function App() {
  const mountRef = useRef(null);
  const [pic, setPic] = useState(defaultPic);

  useEffect(() => {
    const w = 500;
    const h = 500;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
    });

    const elm = mountRef.current;

    elm?.appendChild(renderer.domElement);

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(w, h);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, w / h, 1, 10000);
    camera.position.set(0, 0, +1000);

    const geometry = new THREE.SphereGeometry(300, 30, 30);

    const loader = new THREE.TextureLoader();

    const texture = loader.load(pic);

    const material = new THREE.MeshStandardMaterial({
      map: texture,
    });

    const mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);

    const ambientLight = new THREE.AmbientLight(0xffffff);
    ambientLight.position.set(1, 1, 1);

    scene.add(ambientLight);

    const tick = () => {
      mesh.rotation.y += 0.03;
      mesh.rotation.x += 0.03;
      mesh.rotation.z += 0.03;
      renderer.render(scene, camera);

      requestAnimationFrame(tick);
    };

    tick();

    return () => {
      elm?.removeChild(renderer.domElement);
    };
  }, [pic]);

  const changePic = (e) => {
    if (!e.target.files) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setPic(e.target?.result);
      console.log(e.target?.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        ref={mountRef}
        style={{
          position: "relative",
          zIndex: 1000,
        }}
      />
      <img
        src={otete}
        style={{
          position: "relative",
          right: 180,
          top: 210,
          zIndex: 999,
        }}
      />
      <Button
        variant="contained"
        component="label"
        style={{
          position: "relative",
          right: 300,
          top: -50,
        }}
      >
        画像の選択
        <input type="file" style={{ display: "none" }} onChange={changePic} />
      </Button>
    </div>
  );
}

export default App;
