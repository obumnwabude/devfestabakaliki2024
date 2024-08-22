// import { FirebaseProvider } from "@/contexts/FirebaseContext.tsx";
import { PrimeReactProvider } from "primereact/api";
import Tailwind from "primereact/passthrough/tailwind";
import React from "react";
import ReactDOM from "react-dom/client";
import HomePage from "@/pages/home.tsx";
import RegisterPage from "@/pages/register.tsx";
import "./index.css";
import "@fontsource-variable/inter";
import "@fontsource-variable/dm-sans";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <FirebaseProvider> */}
    <PrimeReactProvider value={{ unstyled: true, pt: Tailwind, ripple: true }}>
      <RouterProvider router={router} />
    </PrimeReactProvider>
    {/* </FirebaseProvider> */}
  </React.StrictMode>
);
