import { renderLogPage } from "./pages/logPage.js";
import { renderTrainingHistoryPage } from "./pages/trainingHistoryPage.js";
import { renderPassGeneratorPage } from "./pages/passGeneratorPage.js";
import { renderProfilePage } from "./pages/profilePage.js";

const views: Record<string, (container: HTMLElement) => void> = {
  log: renderLogPage,
  history: renderTrainingHistoryPage,
  generator: renderPassGeneratorPage,
  profile: renderProfilePage,
};

export function navigateTo(page: string) {
  const app = document.getElementById("app");
  if (!app) return;

  app.innerHTML = "";
  const render = views[page];
  if (render) {
    render(app);
  } else {
    app.innerHTML = "<h2>page not found/h2>";
  }
}
