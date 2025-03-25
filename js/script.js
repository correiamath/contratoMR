class ContractApp {
  constructor() {
    // Elements
    this.loginCard = document.getElementById("loginCard");
    this.contractCard = document.getElementById("contractCard");
    this.confirmationCard = document.getElementById("confirmationCard");
    this.loginForm = document.getElementById("loginForm");
    this.errorMessage = document.getElementById("errorMessage");
    this.acceptBtn = document.getElementById("acceptBtn");
    this.rejectBtn = document.getElementById("rejectBtn");

    // Configuration
    this.credentials = {
      username: "Regilane",
      password: "101024",
    };

    this.targetDate = new Date("2025-04-10T00:00:00");

    // Initial setup
    this.loginForm.classList.add("login-disabled");
    this.initializeEventListeners();
    this.startCountdown();
  }

  startCountdown() {
    const updateCountdown = () => {
      const now = new Date();
      const distance = this.targetDate - now;

      if (distance <= 0) {
        document.getElementById("countdown").style.display = "none";
        this.loginForm.classList.remove("login-disabled");
        clearInterval(timer);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      document.getElementById("days").textContent = days
        .toString()
        .padStart(2, "0");
      document.getElementById("hours").textContent = hours
        .toString()
        .padStart(2, "0");
      document.getElementById("minutes").textContent = minutes
        .toString()
        .padStart(2, "0");
      document.getElementById("seconds").textContent = seconds
        .toString()
        .padStart(2, "0");
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
  }

  initializeEventListeners() {
    this.loginForm.addEventListener("submit", (e) => this.handleLogin(e));
    this.rejectBtn.addEventListener("mouseover", (e) =>
      this.moveRejectButton(e)
    );
    this.rejectBtn.addEventListener("touchstart", (e) =>
      this.moveRejectButton(e)
    );
    this.acceptBtn.addEventListener("click", () => this.handleAccept());
  }

  handleLogin(e) {
    e.preventDefault();

    if (this.loginForm.classList.contains("login-disabled")) {
      this.errorMessage.textContent =
        "Login disponível apenas após o término da contagem regressiva!";
      this.errorMessage.style.display = "block";
      return;
    }

    const username = document.getElementById("login").value;
    const password = document.getElementById("password").value;

    if (
      username === this.credentials.username &&
      password === this.credentials.password &&
      !/mobile/i.test(navigator.userAgent)
    ) {
      this.loginCard.style.display = "none";
      this.contractCard.style.display = "block";
      this.errorMessage.style.display = "none";
      this.esconderTitleCard();
    } else {
      this.errorMessage.textContent = !/mobile/i.test(navigator.userAgent)
        ? "Login ou senha incorretos!"
        : "Utilize um desktop para fazer login. 🖥️";
      this.errorMessage.style.display = "block";
      document.getElementById("password").value = "";
    }
  }

  calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  moveRejectButton(event) {
    const card = this.contractCard;
    const cardRect = card.getBoundingClientRect();
    const buttonRect = this.rejectBtn.getBoundingClientRect();

    // Calculate mouse position relative to card
    const mouseX = event.clientX - cardRect.left;
    const mouseY = event.clientY - cardRect.top;

    // Define minimum distance from mouse
    const minDistance = 150; // pixels

    // Calculate the maximum positions while keeping the button within the card
    const maxX = cardRect.width - buttonRect.width - 40;
    const maxY = cardRect.height - buttonRect.height - 40;

    let attempts = 0;
    let newX, newY;
    let distance = 0;

    // Try to find a position that's far enough from the mouse
    do {
      newX = Math.random() * maxX;
      newY = Math.random() * maxY;
      distance = this.calculateDistance(mouseX, mouseY, newX, newY);
      attempts++;
    } while (distance < minDistance && attempts < 20); // Limit attempts to prevent infinite loop

    // Set the button's position relative to the card
    this.rejectBtn.style.position = "absolute";
    this.rejectBtn.style.left = `${newX}px`;
    this.rejectBtn.style.top = `${newY}px`;

    // Add smooth transition
    this.rejectBtn.style.transition = "all 0.2s ease-out";
  }

  createFirework() {
    const heart = document.createElement("div");
    const firework = document.createElement("div");

    // Create and animate heart
    heart.className = "heart";
    heart.innerHTML = "💓";
    heart.style.position = "fixed";
    heart.style.left = `${Math.random() * window.innerWidth}px`;
    heart.style.top = `${Math.random() * window.innerHeight}px`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 3000);

    // Create and animate firework
    const maxWidth = window.innerWidth - 200;
    const maxHeight = window.innerHeight - 200;
    const x = Math.random() * maxWidth;
    const y = Math.random() * maxHeight;

    const colors = [
      "#ff0000",
      "#00ff00",
      "#0000ff",
      "#ffff00",
      "#ff00ff",
      "#00ffff",
      "#ff8800",
      "#ff0088",
      "#ff5555",
      "#55ff55",
      "#5555ff",
      "#ffff55",
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    firework.className = "firework";
    firework.style.setProperty("--firework-color", randomColor);
    firework.style.position = "fixed";
    firework.style.left = `${x}px`;
    firework.style.top = `${y}px`;

    document.body.appendChild(firework);
    setTimeout(() => firework.remove(), 2000);
  }

  handleAccept() {
    this.contractCard.style.display = "none";
    this.confirmationCard.style.display = "block";
    // Create fireworks and hearts animations
    setInterval(() => {
      // Limit concurrent fireworks
      if (document.getElementsByClassName("firework").length < 15) {
        this.createFirework();
      }
    }, 250);
    document.body.style.background = "#060606";
    document.getElementById("confirmationCard").style.background = "#060606";
    setTimeout(() => {
      this.playVideo();
    }, 1000);
  }

  playVideo() {
    const video = document.getElementById("videoPlayer");
    video.autoplay = true; // Define o autoplay
    video.play(); // Inicia a reprodução
    video.loop = true; //loop video
  }

  esconderTitleCard() {
    const titleCard = document.querySelector(".title-card");
    if (titleCard) {
      titleCard.style.display = "none";
    }
  }
}

// Initialize the app when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  new ContractApp();
});
