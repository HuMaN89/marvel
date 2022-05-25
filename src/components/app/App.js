import "./App.scss";
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "../header/Header";
const Page404 = lazy(() => import("../../Pages/404"));
const HomePage = lazy(() => import("../../Pages/HomePage"));
const EpisodesPage = lazy(() => import("../../Pages/EpisodesPage"));
const SingleEpisodePage = lazy(() => import("../../Pages/SingleEpisodePage"));
const SingleCharacterPage = lazy(() =>
  import("../../Pages/SingleCharacterPage")
);

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Suspense>
            <Routes>
              <Route exact element={<HomePage />} path="/" />
              <Route
                exact
                element={<SingleCharacterPage />}
                path="/characters/:CharacterId"
              />
              <Route exact element={<EpisodesPage />} path="/episodes" />
              <Route
                element={<SingleEpisodePage />}
                path="/episodes/:episodeId"
              />
              <Route element={<Page404 />} path="/*" />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

export default App;
