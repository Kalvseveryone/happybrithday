/* ==========================================================================
   ROMANTIC & CUTE BIRTHDAY WEBSITE JAVASCRIPT
   Configurable, Interactive, Mobile-First
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. CONFIGURATION OBJECT (Mudah Diubah / Easy Customization)
   -------------------------------------------------------------------------- */
const CONFIG = {
  // Nama panggilan pacar
  partnerName: "Sayang",

  // Nama kamu (pengirim)
  senderName: "Aku",

  // PIN Rahasia (4 Digit)
  pin: "0101",

  // Subtitle di bagian paling atas
  heroSubtitle: "A little celebration for the most special girl in my life ♡",

  // Surat Cinta (Bisa menggunakan HTML / Newline)
  letterText: `Happy birthday, sayang.

Hari ini adalah hari spesial karena hari ini adalah hari lahir seseorang yang sangat berarti buat aku.

Aku mungkin nggak selalu bisa mengungkapkan semuanya dengan kata-kata, tapi aku ingin kamu tahu kalau kehadiran kamu punya tempat yang sangat spesial di hidup aku.

Thank you for every little thing, every laugh, every moment, and every memory we've created together.

Aku berharap di umur kamu yang baru ini, kamu selalu dikelilingi hal-hal baik, orang-orang yang sayang sama kamu, dan banyak alasan untuk tersenyum.

Semoga semua hal yang kamu impikan perlahan bisa menjadi nyata.

And most importantly, I hope you always remember that you are loved.

Happy birthday, my favorite person. ♡`,

  // 3 Memory Cards (Foto, Judul, Tanggal, Deskripsi)
  memories: [
    {
      title: "The Beginning",
      date: "Memory 01",
      desc: "our first meet, aku awalnya gugup karena ketemu lagi but now as a couple but the date is going to well our vibes match and blend sepanjanggg waktuu, bestt fellingg",
      image: "assets/1.jpg"
    },
    {
      title: "second meet",
      date: "Memory 02",
      desc: "meet kita keduaa and ofc we are more more know each other that time, im very happy to meet you again that time remmeber i cant sleep buat besokk berangkatt hihi",
      image: "assets/2.jpg"
    },
    {
      title: "last week",
      date: "Memory 03",
      desc: "after a long long time we are not seing togeher finaly we can meet, but now with extra dayss, my fav meet fot nowww",
      image: "assets/3.jpg"
    }
  ],

  // Running Marquee Photos (Hanya Foto)
  runningPhotos: [
    { image: "assets/running1.jpg", title: "Memories Reel 01" },
    { image: "assets/running2.jpg", title: "Memories Reel 02" },
    { image: "assets/running3.jpg", title: "Memories Reel 03" }
  ],

  // Path file musik latar
  musicUrl: "assets/bgmusic.mp3"
};

// Constant PIN check
const CORRECT_PIN = CONFIG.pin || "0101";


/* --------------------------------------------------------------------------
   2. DOM STATE & INITIALIZATION
   -------------------------------------------------------------------------- */
let currentPinInput = "";
let isMusicPlaying = false;
let particles = [];
let animFrameId = null;

document.addEventListener("DOMContentLoaded", () => {
  // Render Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // Populate dynamic data from CONFIG
  initDynamicContent();

  // Initialize Keypad & PIN logic
  initPinKeypad();

  // Initialize Gift box interaction
  initGiftBox();

  // Initialize Letter unfold
  initLoveLetter();

  // Initialize Memory gallery & Lightbox
  initMemoriesGallery();

  // Initialize Scroll observer for digital flowers
  initScrollObservers();

  // Initialize Audio Player
  initAudioPlayer();

  // Initialize Floating Particle Overlay Canvas
  initParticlesCanvas();

  // Handle keyboard physical input for PIN
  initKeyboardListener();
});


/* --------------------------------------------------------------------------
   3. DYNAMIC CONTENT INJECTION FROM CONFIG
   -------------------------------------------------------------------------- */
function initDynamicContent() {
  const partnerDisplays = document.querySelectorAll("#partner-name-display");
  partnerDisplays.forEach(el => el.textContent = CONFIG.partnerName);

  const heroSub = document.getElementById("hero-subtitle-display");
  if (heroSub && CONFIG.heroSubtitle) {
    heroSub.textContent = CONFIG.heroSubtitle;
  }

  const yearEl = document.getElementById("year-display");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}


/* --------------------------------------------------------------------------
   4. PAGE 1: PIN LOGIC & KEYPAD
   -------------------------------------------------------------------------- */
function initPinKeypad() {
  const keys = document.querySelectorAll(".key-btn[data-key]");
  const btnClear = document.getElementById("btn-clear");
  const btnBackspace = document.getElementById("btn-backspace");
  const btnUnlock = document.getElementById("btn-unlock");

  keys.forEach(key => {
    key.addEventListener("click", () => {
      const digit = key.getAttribute("data-key");
      if (currentPinInput.length < 4) {
        currentPinInput += digit;
        updatePinDots();
        if (currentPinInput.length === 4) {
          setTimeout(validatePin, 200);
        }
      }
    });
  });

  if (btnClear) {
    btnClear.addEventListener("click", () => {
      currentPinInput = "";
      updatePinDots();
    });
  }

  if (btnBackspace) {
    btnBackspace.addEventListener("click", () => {
      if (currentPinInput.length > 0) {
        currentPinInput = currentPinInput.slice(0, -1);
        updatePinDots();
      }
    });
  }

  if (btnUnlock) {
    btnUnlock.addEventListener("click", validatePin);
  }
}

function updatePinDots() {
  for (let i = 0; i < 4; i++) {
    const dot = document.getElementById(`dot-${i}`);
    if (dot) {
      if (i < currentPinInput.length) {
        dot.classList.add("filled");
        dot.textContent = "•";
      } else {
        dot.classList.remove("filled");
        dot.textContent = "";
      }
    }
  }
}

function validatePin() {
  const pinCard = document.getElementById("pin-card");

  if (currentPinInput === CORRECT_PIN) {
    // PIN Correct! Trigger smooth transition to Page 2
    showToast("PIN Benar! Selamat datang sayang ♡", "success");
    
    // Confetti pop on unlock
    if (window.confetti) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }

    const pagePin = document.getElementById("page-pin");
    const pageGift = document.getElementById("page-gift");

    pagePin.classList.add("exit");
    
    setTimeout(() => {
      pagePin.classList.remove("active", "exit");
      pageGift.classList.add("active");
    }, 600);

  } else {
    // PIN Incorrect! Shake card & toast message
    if (pinCard) {
      pinCard.classList.add("shake-card");
      setTimeout(() => pinCard.classList.remove("shake-card"), 500);
    }
    
    showToast("Hmm... coba ingat lagi sayang ♡");
    
    // Clear entered digits
    currentPinInput = "";
    updatePinDots();
  }
}

function initKeyboardListener() {
  document.addEventListener("keydown", (e) => {
    const pagePin = document.getElementById("page-pin");
    if (!pagePin || !pagePin.classList.contains("active")) return;

    if (e.key >= "0" && e.key <= "9") {
      if (currentPinInput.length < 4) {
        currentPinInput += e.key;
        updatePinDots();
        if (currentPinInput.length === 4) {
          setTimeout(validatePin, 200);
        }
      }
    } else if (e.key === "Backspace") {
      if (currentPinInput.length > 0) {
        currentPinInput = currentPinInput.slice(0, -1);
        updatePinDots();
      }
    } else if (e.key === "Enter") {
      validatePin();
    }
  });
}


/* --------------------------------------------------------------------------
   5. PAGE 2: GIFT BOX ANIMATION
   -------------------------------------------------------------------------- */
function initGiftBox() {
  const giftTrigger = document.getElementById("gift-box-trigger");
  const giftClickBtn = document.getElementById("gift-click-btn");

  const openGiftHandler = () => {
    if (!giftTrigger || giftTrigger.classList.contains("opened")) return;
    
    giftTrigger.classList.add("opened");

    // Burst confetti from gift
    if (window.confetti) {
      // First burst
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#ff4d6d', '#ff9ebb', '#ffd700', '#ffffff']
      });

      // Second celebratory wave
      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 80,
          origin: { x: 0.2, y: 0.6 }
        });
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 80,
          origin: { x: 0.8, y: 0.6 }
        });
      }, 300);
    }

    // Auto play music when gift is opened
    playAudio();

    // Transition to Page 3 Main Scrollable Page
    setTimeout(() => {
      const pageGift = document.getElementById("page-gift");
      const pageMain = document.getElementById("page-main");

      pageGift.classList.add("exit");

      setTimeout(() => {
        pageGift.classList.remove("active", "exit");
        pageGift.style.display = "none";
        
        pageMain.classList.remove("hidden-screen");
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 600);

    }, 1200);
  };

  if (giftTrigger) giftTrigger.addEventListener("click", openGiftHandler);
  if (giftClickBtn) giftClickBtn.addEventListener("click", openGiftHandler);
}


/* --------------------------------------------------------------------------
   6. PAGE 3: LOVE LETTER UNFOLD
   -------------------------------------------------------------------------- */
function initLoveLetter() {
  const envelopeSeal = document.getElementById("envelope-seal");
  const openLetterBtn = document.getElementById("open-letter-btn");
  const envelopeCard = document.getElementById("envelope-card");
  const letterContent = document.getElementById("letter-content");

  // Inject letter text from CONFIG
  if (letterContent) {
    letterContent.textContent = CONFIG.letterText;
  }

  const toggleLetter = () => {
    if (!envelopeCard) return;
    const isOpened = envelopeCard.classList.contains("opened");
    
    if (!isOpened) {
      envelopeCard.classList.add("opened");
      if (openLetterBtn) openLetterBtn.style.display = "none";
      
      // Little heart pop confetti
      if (window.confetti) {
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.7 },
          colors: ['#ff4d6d', '#ffb7c5']
        });
      }
    }
  };

  if (envelopeSeal) envelopeSeal.addEventListener("click", toggleLetter);
  if (openLetterBtn) openLetterBtn.addEventListener("click", toggleLetter);
}


/* --------------------------------------------------------------------------
   7. PAGE 3: MEMORIES GALLERY & LIGHTBOX
   -------------------------------------------------------------------------- */
function initMemoriesGallery() {
  const gridContainer = document.getElementById("memories-grid");
  if (!gridContainer || !CONFIG.memories) return;

  gridContainer.innerHTML = "";

  CONFIG.memories.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "memory-card";
    card.innerHTML = `
      <div class="memory-img-box">
        <span class="memory-badge">${item.date || `Memory 0${index + 1}`}</span>
        <img src="${item.image}" alt="${item.title}" loading="lazy" onerror="this.src='assets/memory1.jpg'">
      </div>
      <div class="memory-info">
        <h3 class="font-serif font-bold">${item.title}</h3>
        <p>${item.desc}</p>
      </div>
    `;

    card.addEventListener("click", () => openLightbox(item));
    gridContainer.appendChild(card);
  });

  // Populate Continuous Left-to-Right Photocard Marquee Track (Hanya Foto running1, running2, running3)
  const marqueeTrack = document.getElementById("marquee-track");
  if (marqueeTrack) {
    marqueeTrack.innerHTML = "";
    
    const photosToRun = CONFIG.runningPhotos || [
      { image: "assets/running1.jpg", title: "Memory Moment 01" },
      { image: "assets/running2.jpg", title: "Memory Moment 02" },
      { image: "assets/running3.jpg", title: "Memory Moment 03" }
    ];

    // Duplicate 4 times to ensure seamless infinite looping animation
    const marqueeItems = [
      ...photosToRun,
      ...photosToRun,
      ...photosToRun,
      ...photosToRun
    ];

    marqueeItems.forEach((item, idx) => {
      const card = document.createElement("div");
      card.className = "marquee-photocard-only";
      card.innerHTML = `
        <div class="marquee-photo-frame">
          <img src="${item.image}" alt="Running Photo ${(idx % 3) + 1}" loading="lazy">
        </div>
      `;
      card.addEventListener("click", () => openLightbox({
        title: item.title || `Our Special Memory 0${(idx % 3) + 1}`,
        date: "Memory Reel",
        desc: "A beautiful memory moment with you ♡",
        image: item.image
      }));
      marqueeTrack.appendChild(card);
    });
  }

  // Lightbox close listener
  const closeBtn = document.getElementById("lightbox-close-btn");
  const modal = document.getElementById("lightbox-modal");

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeLightbox();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
}

function openLightbox(memory) {
  const modal = document.getElementById("lightbox-modal");
  const img = document.getElementById("lightbox-img");
  const title = document.getElementById("lightbox-title");
  const date = document.getElementById("lightbox-date");
  const desc = document.getElementById("lightbox-desc");

  if (img) img.src = memory.image;
  if (title) title.textContent = memory.title;
  if (date) date.textContent = memory.date || "Special Moment";
  if (desc) desc.textContent = memory.desc;

  if (modal) modal.classList.add("active");
}

function closeLightbox() {
  const modal = document.getElementById("lightbox-modal");
  if (modal) modal.classList.remove("active");
}


/* --------------------------------------------------------------------------
   8. SCROLL OBSERVERS & DIGITAL FLOWERS
   -------------------------------------------------------------------------- */
function initScrollObservers() {
  // Final love burst button action
  const finalBtn = document.getElementById("final-love-btn");
  if (finalBtn) {
    finalBtn.addEventListener("click", () => {
      showToast("I love you so much! ♡", "love");
      if (window.confetti) {
        confetti({
          particleCount: 150,
          spread: 120,
          origin: { y: 0.8 },
          colors: ['#ff4d6d', '#ff85a1', '#ffd700']
        });
      }
    });
  }

  // IntersectionObserver for Flower Garden Section
  const flowerSection = document.getElementById("digital-flowers");
  if (flowerSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const flowerItems = document.querySelectorAll(".flower-item");
          flowerItems.forEach(item => item.classList.add("bloomed"));
        }
      });
    }, { threshold: 0.25 });

    observer.observe(flowerSection);
  }
}


/* --------------------------------------------------------------------------
   9. AUDIO PLAYER & FLOATING CONTROLS
   -------------------------------------------------------------------------- */
function initAudioPlayer() {
  const audio = document.getElementById("bg-music");
  const toggleBtn = document.getElementById("music-toggle");

  if (!audio || !toggleBtn) return;

  if (CONFIG.musicUrl) {
    audio.src = CONFIG.musicUrl;
  }

  // Set volume to maximum
  audio.volume = 1.0;

  toggleBtn.addEventListener("click", () => {
    if (isMusicPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  });
}

function playAudio() {
  const audio = document.getElementById("bg-music");
  const toggleBtn = document.getElementById("music-toggle");
  
  if (!audio || !toggleBtn) return;

  // Volume maksimum
  audio.volume = 1.0;

  audio.play().then(() => {
    isMusicPlaying = true;
    toggleBtn.classList.add("playing");
    toggleBtn.setAttribute("title", "Hentikan Musik");
  }).catch((err) => {
    console.warn("Autoplay blocked or audio missing:", err);
    isMusicPlaying = false;
    toggleBtn.classList.remove("playing");
  });
}

function pauseAudio() {
  const audio = document.getElementById("bg-music");
  const toggleBtn = document.getElementById("music-toggle");

  if (!audio || !toggleBtn) return;

  audio.pause();
  isMusicPlaying = false;
  toggleBtn.classList.remove("playing");
  toggleBtn.setAttribute("title", "Putar Musik");
}


/* --------------------------------------------------------------------------
   10. CUSTOM TOAST NOTIFICATION SYSTEM
   -------------------------------------------------------------------------- */
function showToast(message, type = "normal") {
  const toastContainer = document.getElementById("toast-container");
  const toastMessage = document.getElementById("toast-message");

  if (!toastContainer || !toastMessage) return;

  toastMessage.textContent = message;
  toastContainer.classList.add("show");

  setTimeout(() => {
    toastContainer.classList.remove("show");
  }, 3000);
}


/* --------------------------------------------------------------------------
   11. FLOATING PARTICLES CANVAS (HEARTS & PETALS)
   -------------------------------------------------------------------------- */
function initParticlesCanvas() {
  const canvas = document.getElementById("particles-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Particle Class
  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height - height;
      this.size = Math.random() * 12 + 6;
      this.speedY = Math.random() * 1.2 + 0.5;
      this.speedX = Math.sin(Math.random() * Math.PI) * 0.8;
      this.opacity = Math.random() * 0.6 + 0.2;
      this.rotation = Math.random() * 360;
      this.rotSpeed = Math.random() * 2 - 1;
      this.type = Math.random() > 0.4 ? "heart" : "petal";
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      this.rotation += this.rotSpeed;

      if (this.y > height + 20) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.globalAlpha = this.opacity;

      if (this.type === "heart") {
        ctx.fillStyle = "#ff4d6d";
        ctx.beginPath();
        const topCurveHeight = this.size * 0.3;
        ctx.moveTo(0, topCurveHeight);
        ctx.bezierCurveTo(0, 0, -this.size / 2, 0, -this.size / 2, topCurveHeight);
        ctx.bezierCurveTo(-this.size / 2, (this.size + topCurveHeight) / 2, 0, this.size, 0, this.size);
        ctx.bezierCurveTo(0, this.size, this.size / 2, (this.size + topCurveHeight) / 2, this.size / 2, topCurveHeight);
        ctx.bezierCurveTo(this.size / 2, 0, 0, 0, 0, topCurveHeight);
        ctx.closePath();
        ctx.fill();
      } else {
        // Petal shape
        ctx.fillStyle = "#ffb3c6";
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size * 0.4, this.size * 0.8, 0, 0, 2 * Math.PI);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  // Create particle pool
  const count = window.innerWidth < 768 ? 20 : 35;
  particles = Array.from({ length: count }, () => new Particle());

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    animFrameId = requestAnimationFrame(animate);
  }

  // Respect prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion) {
    animate();
  }
}
