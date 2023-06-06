import type { AppProps } from "next/app";

import { ToastProvider } from "@/contexts/ToastContext";
import "@/styles/globals.css";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [appRoot, setAppRoot] = useState<HTMLDivElement>();

  return (
    <>
      <ToastProvider portalTarget={appRoot}>
        <Component {...pageProps} />
      </ToastProvider>
      <div ref={setAppRoot}></div>
    </>
  );
}
