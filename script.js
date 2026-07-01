// ===============================
// LOADER
// ===============================

window.addEventListener("load", () => {
    setTimeout(() => {
      document.getElementById("loader").style.display = "none";
    }, 1800);
  });
  
  // ===============================
  // TYPING EFFECT
  // ===============================
  
  const message = "Happy Birthday parii ❤️";
  let index = 0;
  
  function typeText() {
    if (index < message.length) {
      document.getElementById("typing").innerHTML += message.charAt(index);
      index++;
      setTimeout(typeText, 100);
    }
  }
  
  typeText();
  
  // ===============================
  // COUNTDOWN
  // ===============================
  
  const targetDate = new Date("July 7, 2026 00:00:00").getTime();
  
  setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;
  
    document.getElementById("days").innerHTML =
      Math.floor(distance / (1000 * 60 * 60 * 24));
  
    document.getElementById("hours").innerHTML =
      Math.floor((distance / (1000 * 60 * 60)) % 24);
  
    document.getElementById("minutes").innerHTML =
      Math.floor((distance / (1000 * 60)) % 60);
  
    document.getElementById("seconds").innerHTML =
      Math.floor((distance / 1000) % 60);
  
  }, 1000);
  
  // ===============================
  // MUSIC
  // ===============================
  
  const music = document.getElementById("music");
  const musicBtn = document.getElementById("musicBtn");
  
  let playing = false;
  
  musicBtn.onclick = () => {
  
    if (playing) {
      music.pause();
      musicBtn.innerHTML = "🎵";
    } else {
      music.play();
      musicBtn.innerHTML = "⏸";
    }
  
    playing = !playing;
  
  };
  
  // ===============================
  // START BUTTON
  // ===============================
  
  document.getElementById("startBtn").onclick = () => {
  
    music.play();
  
    playing = true;
  
    musicBtn.innerHTML = "⏸";
  
    document.querySelector(".countdown")
      .scrollIntoView({
        behavior: "smooth"
      });
  
  };
  
  // ===============================
  // CELEBRATE BUTTON
  // ===============================
  
  document.getElementById("celebrateBtn").onclick = () => {
  
    const duration = 8000;
  
    const end = Date.now() + duration;
  
    const interval = setInterval(() => {
  
      confetti({
        particleCount: 12,
        spread: 120,
        startVelocity: 50,
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2
        }
      });
  
      if (Date.now() > end) {
        clearInterval(interval);
      }
  
    }, 250);
  
  };

// ======================================
// CANVAS FIREWORKS - PART 1
// ======================================

// Canvas
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Arrays
const rockets = [];
const particles = [];

// Random Color
function randomColor() {
    const colors = [
        "#ff1744",
        "#ff9100",
        "#ffd600",
        "#00e676",
        "#00b0ff",
        "#d500f9",
        "#ffffff"
    ];

    return colors[Math.floor(Math.random() * colors.length)];
}

// Particle
class Particle {

    constructor(x, y, color) {

        this.x = x;
        this.y = y;

        this.vx = (Math.random() - 0.5) * 8;
        this.vy = (Math.random() - 0.5) * 8;

        this.life = 100;
        this.color = color;

    }

    update() {

        this.x += this.vx;
        this.y += this.vy;

        this.vy += 0.05;

        this.life--;

    }

    draw() {

        ctx.beginPath();

        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);

        ctx.fillStyle = this.color;

        ctx.fill();

    }

}

// Rocket
class Rocket {

    constructor() {

        this.x = Math.random() * canvas.width;

        this.y = canvas.height;

        this.target = 100 + Math.random() * 250;

        this.speed = 6;

        this.color = randomColor();

    }

    update() {

        this.y -= this.speed;

    }

    draw() {

        ctx.beginPath();

        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);

        ctx.fillStyle = this.color;

        ctx.fill();

    }

}
// ======================================
// CANVAS FIREWORKS - PART 2
// ======================================

// Rocket Explosion
function explode(x, y, color) {

    for (let i = 0; i < 80; i++) {

        particles.push(new Particle(x, y, color));

    }

}

// Animation


// Launch rockets continuously
setInterval(() => {

    rockets.push(new Rocket());

}, 700);
// ======================================
// CANVAS FIREWORKS - PART 3 (Glow Effect)
// ======================================

// Smooth fading background
function drawBackground() {
    ctx.fillStyle = "rgba(2,3,13,0.18)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Replace animateFireworks() with this version
function animateFireworks() {

    drawBackground();

    // Rockets
    for (let i = rockets.length - 1; i >= 0; i--) {

        rockets[i].update();
        rockets[i].draw();

        if (rockets[i].y <= rockets[i].target) {

            explode(
                rockets[i].x,
                rockets[i].y,
                rockets[i].color
            );

            rockets.splice(i, 1);
        }
    }

    // Particles
    for (let i = particles.length - 1; i >= 0; i--) {

        const p = particles[i];

        p.update();

        ctx.save();
        ctx.globalAlpha = p.life / 100;

        ctx.shadowBlur = 15;
        ctx.shadowColor = p.color;

        p.draw();

        ctx.restore();

        if (p.life <= 0) {
            particles.splice(i, 1);
        }
    }

    requestAnimationFrame(animateFireworks);

}

// Start animation only once
animateFireworks();
