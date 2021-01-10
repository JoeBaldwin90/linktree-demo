import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import logo from "../assets/clo-logo.svg";
import arrow from "../assets/arrow.png";
import { SiteLink } from "./SiteLink";
import "./App.scss";

const spaceID = process.env.REACT_APP_SPACE;
const token = process.env.REACT_APP_TOKEN;
const url = `https://cdn.contentful.com/spaces/${spaceID}/environments/master/entries?access_token=${token}`;

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios(url);
      const links = response.data.items
        .map((link) => link.fields)
        .sort((a, b) => (a.order > b.order ? 1 : -1));
      setData(links);
    };

    fetchData();
  }, []);

  return (
    <Fragment>
      <img src={logo} className='logo' alt='Clo Studio Logo' />
      <section className='container'>
        <ul className='links'>
          {data.map((link, i) => (
            <li key={i}>
              <img src={arrow} className='arrow' alt='Arrow' />
              <SiteLink
                url={link.url}
                alt={link.title + " Link"}
                highlight={link.highlight ? "highlight" : null}
                index={(i + 1) * 100}
              >
                {link.title}
              </SiteLink>
            </li>
          ))}
        </ul>
      </section>
    </Fragment>
  );
};

export default App;
