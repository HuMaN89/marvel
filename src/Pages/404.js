import { Link } from "react-router-dom";
import ErrorMessage from "../components/errorMessage/ErrorMessage";

const Page404 = () => {
  return (
    <div>
      <ErrorMessage />
      <p style={{ textAlign: "center", fontWeight: "bold", fontSize: "24px" }}>
        Page doesn't exist
      </p>
      <Link
        style={{
          textAlign: "center",
          fontWeight: "bold",
          width: "100%",
          marginTop: "15px",
          fontSize: "24px",
        }}
        to="/"
      >
        {" "}
        Back to main page
      </Link>
    </div>
  );
};
export default Page404;
