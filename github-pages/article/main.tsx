import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ArticleRoute from "../../app/article/page";
import "../../app/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ArticleRoute />
  </StrictMode>,
);
