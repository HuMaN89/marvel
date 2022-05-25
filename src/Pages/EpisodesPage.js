import ComicsList from "../components/comicsList/ComicsList";
import Banner from "../components/banner/Banner";
import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";
import Helmet from "react-helmet";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
        <meta name="theme-color" content="#000000" />
        <title>Breaking Bad | Episodes Page</title>
      </Helmet>
      <ErrorBoundary>
        <Banner />
        <ComicsList />
      </ErrorBoundary>
    </>
  );
};

export default HomePage;
