import { Game } from "./core/Game";
import { loadCompanyRegistry } from "./data/companyRegistry";

// Initialize the game when the DOM is loaded
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Load company data
    const companies = await loadCompanyRegistry();

    // Create and start the game
    const game = new Game(companies);
    game.init();
    game.start();

    // Handle window resize
    window.addEventListener("resize", () => {
      game.handleResize();
    });
  } catch (error) {
    console.error("Failed to initialize the game:", error);
  }
});
