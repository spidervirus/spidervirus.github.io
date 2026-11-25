/**
 * Aman Mohamed Ali — Luxury 3D Gaming Canvas
 * Powered by Three.js (r128)
 * Features: Floating Cyber Torus Knot, Geometric Shards, Particle Starfield, Mouse Parallax
 */

(function () {
  const canvas = document.getElementById('webgl-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  // 1. Scene, Camera, Renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 7;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance',
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // 2. Lighting (Cyber-Luxury Neon Lights)
  const ambientLight = new THREE.AmbientLight(0x0f172a, 1.2);
  scene.add(ambientLight);

  // Cyan Key Light
  const cyanLight = new THREE.PointLight(0x00f5ff, 3, 50);
  cyanLight.position.set(5, 5, 4);
  scene.add(cyanLight);

  // Violet Fill Light
  const violetLight = new THREE.PointLight(0xa855f7, 3.5, 50);
  violetLight.position.set(-6, -4, 3);
  scene.add(violetLight);

  // Gold Specular Light
  const goldLight = new THREE.PointLight(0xf59e0b, 2.5, 30);
  goldLight.position.set(0, 6, -2);
  scene.add(goldLight);

  // 3. Central 3D Cyber Artifact: Glass & Wireframe Torus Knot
  const group = new THREE.Group();
  scene.add(group);

  // Outer Solid Torus Knot with metallic sheen
  const knotGeo = new THREE.TorusKnotGeometry(1.6, 0.42, 140, 24, 2, 3);
  const knotMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    emissive: 0x1e1b4b,
    roughness: 0.2,
    metalness: 0.9,
    wireframe: false,
    transparent: true,
    opacity: 0.88,
  });
  const knotMesh = new THREE.Mesh(knotGeo, knotMat);
  group.add(knotMesh);

  // Inner Glowing Wireframe Cage
  const wireGeo = new THREE.TorusKnotGeometry(1.62, 0.43, 80, 16, 2, 3);
  const wireMat = new THREE.MeshBasicMaterial({
    color: 0x00f5ff,
    wireframe: true,
    transparent: true,
    opacity: 0.35,
  });
  const wireMesh = new THREE.Mesh(wireGeo, wireMat);
  group.add(wireMesh);

  // Position group in hero viewport background (slightly to the right)
  function updateGroupPosition() {
    if (window.innerWidth >= 992) {
      group.position.set(2.8, 0.4, 0);
      group.scale.set(1.15, 1.15, 1.15);
    } else {
      group.position.set(0, 1.2, -1.5);
      group.scale.set(0.85, 0.85, 0.85);
    }
  }
  updateGroupPosition();

  // 4. Floating 3D Geometric Shards (Icosahedrons & Octahedrons)
  const shards = [];
  const shardGeometries = [
    new THREE.IcosahedronGeometry(0.35, 0),
    new THREE.OctahedronGeometry(0.4, 0),
    new THREE.TetrahedronGeometry(0.3, 0),
  ];

  const shardMaterials = [
    new THREE.MeshStandardMaterial({ color: 0x00f5ff, metalness: 0.8, roughness: 0.2, wireframe: true }),
    new THREE.MeshStandardMaterial({ color: 0xa855f7, metalness: 0.9, roughness: 0.15, transparent: true, opacity: 0.75 }),
    new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.7, roughness: 0.3, wireframe: true }),
  ];

  for (let i = 0; i < 24; i++) {
    const geo = shardGeometries[i % shardGeometries.length];
    const mat = shardMaterials[i % shardMaterials.length];
    const shard = new THREE.Mesh(geo, mat);

    shard.position.set(
      (Math.random() - 0.5) * 18,
      (Math.random() - 0.5) * 14,
      (Math.random() - 0.5) * 10
    );

    shard.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);

    const speed = {
      rotX: (Math.random() - 0.5) * 0.02,
      rotY: (Math.random() - 0.5) * 0.02,
      floatSpeed: 0.5 + Math.random() * 1.5,
      offset: Math.random() * Math.PI * 2,
    };

    shards.push({ mesh: shard, speed, originY: shard.position.y });
    scene.add(shard);
  }

  // 5. Starfield Dust Particles
  const particleCount = 1400;
  const particleGeo = new THREE.BufferGeometry();
  const particlePos = new Float32Array(particleCount * 3);
  const particleColors = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    particlePos[i3] = (Math.random() - 0.5) * 35;
    particlePos[i3 + 1] = (Math.random() - 0.5) * 35;
    particlePos[i3 + 2] = (Math.random() - 0.5) * 20;

    // Alternate Cyan, Purple and White colors
    const r = Math.random();
    if (r < 0.4) {
      particleColors[i3] = 0.0;     // R
      particleColors[i3 + 1] = 0.96; // G
      particleColors[i3 + 2] = 1.0;  // B (Cyan)
    } else if (r < 0.75) {
      particleColors[i3] = 0.66;
      particleColors[i3 + 1] = 0.33;
      particleColors[i3 + 2] = 0.97; // Purple
    } else {
      particleColors[i3] = 0.95;
      particleColors[i3 + 1] = 0.8;
      particleColors[i3 + 2] = 0.3;  // Gold
    }
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
  particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

  const particleMat = new THREE.PointsMaterial({
    size: 0.045,
    vertexColors: true,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending,
  });

  const particleSystem = new THREE.Points(particleGeo, particleMat);
  scene.add(particleSystem);

  // 6. Mouse Parallax & Dynamic Tracking
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  // 7. Render Loop
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // Smooth mouse damping
    targetX += (mouseX - targetX) * 0.04;
    targetY += (mouseY - targetY) * 0.04;

    // Central Artifact Rotation
    knotMesh.rotation.x = elapsedTime * 0.25;
    knotMesh.rotation.y = elapsedTime * 0.35;
    wireMesh.rotation.x = elapsedTime * 0.25;
    wireMesh.rotation.y = elapsedTime * 0.35;

    // Mouse responsiveness on artifact
    group.rotation.x = targetY * 0.6;
    group.rotation.y = targetX * 0.8;

    // Bobbing shards
    shards.forEach(({ mesh, speed, originY }) => {
      mesh.rotation.x += speed.rotX;
      mesh.rotation.y += speed.rotY;
      mesh.position.y = originY + Math.sin(elapsedTime * speed.floatSpeed + speed.offset) * 0.4;
    });

    // Slow particle drift
    particleSystem.rotation.y = elapsedTime * 0.02;
    particleSystem.rotation.x = targetY * 0.1;

    // Camera subtle sway
    camera.position.x = targetX * 0.35;
    camera.position.y = targetY * 0.35;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }
  animate();

  // 8. Resize Listener
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    updateGroupPosition();
  });
})();
