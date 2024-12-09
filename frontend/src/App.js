import { lazy, Suspense } from "react";
import { createContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Layout from "./components/Layout/Layout.jsx";
import Loader from "./components/Loader/Loader.jsx";

const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));

const ContactsPage = lazy(() =>
  import("./pages/ContactsPage/ContactsPage.jsx")
);

const AboutMePage = lazy(() => import("./pages/AboutMePage/AboutMePage.jsx"));

const NotFoundPage = lazy(() =>
  import("./pages/NotFoundPage/NotFoundPage.jsx")
);

const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="contacts" exact element={<ContactsPage />} />
            <Route path="about-me" exact element={<AboutMePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
      <Toaster />
    </ThemeContext.Provider>
  );
}

export default App;
