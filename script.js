// Select Elements
const greetingCard = document.getElementById("greetingCard");
const cardInner = document.getElementById("cardInner");
const animationScreen = document.getElementById("animationScreen");
const bgMusic = document.getElementById("bgMusic");
const canvas = document.getElementById("snow");
const cloudsContainer = document.getElementById("clouds");
const santa = document.getElementById("santa");
const giftBag = document.querySelector(".gift-bag");
const scene = document.querySelector(".scene");
const ctx = canvas.getContext("2d");

// Snowflake Array
const snowflakes = [];

// Ensure all necessary elements exist before running animations
if (!greetingCard || !cardInner || !animationScreen || !bgMusic || !canvas || !cloudsContainer || !santa || !giftBag || !scene) {
  console.error("One or more required elements are missing from the HTML!");
}

// Flip card on click
greetingCard.addEventListener("click", () => {
  cardInner.style.transform = "rotateY(180deg)";

  // Zoom in after flip
  setTimeout(() => {
    greetingCard.style.transform = "scale(10)";
    greetingCard.style.transition = "transform 1s ease-in-out";

    // Show animation screen after zoom
    setTimeout(() => {
      greetingCard.classList.add("hidden");
      animationScreen.classList.remove("hidden");

      // Start background music
      bgMusic.play();

      // Start Santa animation
      startSantaAnimation();
    }, 1000);
  }, 1000);
});

// Function to create clouds dynamically
function createClouds(numClouds) {
  for (let i = 0; i < numClouds; i++) {
    const cloud = document.createElement("div");

    // Randomly assign size class (small, medium, large)
    const sizeClasses = ["small", "medium", "large"];
    const randomClass = sizeClasses[Math.floor(Math.random() * sizeClasses.length)];
    cloud.classList.add("cloud", randomClass);

    // Randomize starting position
    cloud.style.left = `${Math.random() * 100}vw`;
    cloud.style.top = `${Math.random() * 20 + 5}%`;

    // Append the cloud to the container
    cloudsContainer.appendChild(cloud);
  }
}

// Create 5 clouds dynamically
createClouds(5);

// Function to create and animate gifts
function createGift() {
  const gift = document.createElement("div");
  gift.className = "gift";

  // Align gift's initial position with the gift-bag
  const sceneRect = scene.getBoundingClientRect();
  const bagRect = giftBag.getBoundingClientRect();
  const giftX = bagRect.left - sceneRect.left + bagRect.width / 2 - 15; // Center horizontally
  const giftY = bagRect.top - sceneRect.top; // Start at the top of the bag

  gift.style.left = `${giftX}px`;
  gift.style.top = `${giftY}px`;

  // Append the gift to the scene
  scene.appendChild(gift);

  // Animate the gift falling
  const fallDistance = scene.offsetHeight - bagRect.top;
  const animation = gift.animate(
    [
      { transform: `translateY(0px)`, opacity: 1 },
      { transform: `translateY(${fallDistance}px)`, opacity: 0 },
    ],
    {
      duration: 2000,
      easing: "ease-in",
      iterations: 1,
    }
  );

  // Remove the gift element after animation ends
  animation.onfinish = () => gift.remove();
}

// Generate gifts periodically
setInterval(createGift, 500);

// Snowfall Effect
function createSnowflakes() {
  snowflakes.length = 0; // Clear existing snowflakes

  for (let i = 0; i < 100; i++) {
    snowflakes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      speed: Math.random() * 1 + 0.5,
    });
  }
}

function drawSnowflakes() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snowflakes.forEach((flake) => {
    ctx.beginPath();
    ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
  });
}

function moveSnowflakes() {
  snowflakes.forEach((flake) => {
    flake.y += flake.speed;
    if (flake.y > canvas.height) flake.y = -flake.radius;
  });
}

function animateSnowfall() {
  drawSnowflakes();
  moveSnowflakes();
  requestAnimationFrame(animateSnowfall);
}

// Resize Canvas
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  createSnowflakes();
}

window.addEventListener("resize", resizeCanvas);

// Initialize Snowfall
resizeCanvas();
createSnowflakes();
animateSnowfall();
