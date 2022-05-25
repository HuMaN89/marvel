// import useMarvelService from "../../services/MarvelService";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import useMarvelService from "../../services/MarvelService";
import { useState, useEffect } from "react";
import Spinner from "../spinner/Spinner";

import "./Search.scss";
import * as Yup from "yup";

const Search = () => {
  const { getSearchCharacter, loading, error } = useMarvelService();
  const [errorDiv, setErrorDiv] = useState(false);
  const [data, setData] = useState(false);
  const content = (
    <div style={{ display: "flex", marginTop: "15px" }}>
      {" "}
      <h3> There is it! Visit {data.name} page?</h3>
      <Link to={`/characters/${data.charID}`}>
        <button type="button" className="button button__main">
          <div className="inner">TO PAGE</div>
        </button>
      </Link>
    </div>
  );
  return (
    <Formik
      initialValues={{
        name: "",
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .min(3, "Минимум 3 символа для заполнения")
          .required("This field is required"),
      })}
      onSubmit={(values) => {
        setData(false);
        setErrorDiv(false);
        getSearchCharacter(values.name).then((res) => {
          if (res === false) {
            setErrorDiv(true);
          } else {
            setData(res);
          }
        });
      }}
    >
      <Form className="search">
        <h3>Or find a character by name:</h3>
        <div className="search-panel">
          <Field name="name" type="text" placeholder="Enter name" />
          <button type="submit" className="button button__main">
            <div className="inner">FIND</div>
          </button>
        </div>
        <ErrorMessage
          name="name"
          render={(msg) => <div className="error-msg">{msg}</div>}
        />
        {errorDiv ? (
          <h3>The character was not found. Check the name and try again</h3>
        ) : null}
        <div style={{ color: "green" }}>{data ? content : null}</div>
      </Form>
    </Formik>
  );
};

export default Search;
