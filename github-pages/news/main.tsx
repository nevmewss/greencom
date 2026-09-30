import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import NewsRoute from "../../app/news/page";
import "../../app/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NewsRoute />
  </StrictMode>,
);
