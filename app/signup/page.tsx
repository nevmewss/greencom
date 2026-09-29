"use client";

import { useEffect, useState } from "react";
import { AuthPage } from "../components/shop";

export default function SignupPage() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("mode", "signup");
    window.history.replaceState({}, "", url);
    // The child auth page reads the mode from the URL when it mounts.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReady(true);
  }, []);
  return ready ? <AuthPage /> : null;
}
