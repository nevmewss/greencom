import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import WishlistPage from "../../app/wishlist/page";
import "../../app/globals.css";
import "../../app/shop.css";

createRoot(document.getElementById("root")!).render(<StrictMode><WishlistPage /></StrictMode>);
