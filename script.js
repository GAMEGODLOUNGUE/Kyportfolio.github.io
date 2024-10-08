// WebGL background using three.js (futuristic 3D effects)
let scene, camera, renderer, stars, starGeo;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 1;
    camera.rotation.x = Math.PI / 2;

    starGeo = new THREE.Geometry();
    for (let i = 0; i < 6000; i++) {
        let star = new THREE.Vector3(
            Math.random() * 600 - 300,
            Math.random() * 600 - 300,
            Math.random() * 600 - 300
        );
        star.velocity = 0;
        star.acceleration = 0.02;
        starGeo.vertices.push(star);
    }

    let sprite = new THREE.TextureLoader().load('https://threejsfundamentals.org/threejs/resources/images/star.png');
    let starMaterial = new THREE.PointsMaterial({
        color: 0xaaaaaa,
        size: 0.7,
        map: sprite
    });

    stars = new THREE.Points(starGeo, starMaterial);
    scene.add(stars);

    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("canvas-container").appendChild(renderer.domElement);

    animate();
}

function animate() {
    starGeo.vertices.forEach(p => {
        p.velocity += p.acceleration;
        p.y -= p.velocity;

        if (p.y < -200) {
            p.y = 200;
            p.velocity = 0;
        }
    });
    starGeo.verticesNeedUpdate = true;
    stars.rotation.y += 0.002;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

init();

// GSAP animations for scrolling effects
gsap.from(".glitch", { duration: 2, opacity: 0, y: 50, ease: "power2.out" });
gsap.from(".neon-title", { duration: 1.5, opacity: 0, x: -100, ease: "power2.out" });
gsap.from(".project", { duration: 2, opacity: 0, y: 50, ease: "power2.out", stagger: 0.5 });

// Responsive handling for Three.js renderer
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
