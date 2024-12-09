import HomePage from "./pages/HomePage/HomePage.jsx";
import ContactsPage from "./pages/ContactsPage/ContactsPage.jsx";
import AboutMePage from "./pages/AboutMePage/AboutMePage.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";

function App() {
  return (
    <div className="App">
      <HomePage />
      <ContactsPage />
      <AboutMePage />
      <NotFoundPage />
    </div>
  );
}

export default App;
