import React, { useState, useEffect } from "react";
import axios from "axios";
import sophie from "../assets/sophie.png";
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
    <div>
      <section class='container'>
        <div class='profile-image'>
          <img
            class='profile'
            src={sophie}
            alt='Sophie Anneliese - London Photographer'
          />
        </div>
        <div class='title'>
          <h1>Sophie Anneliese</h1>
        </div>
        <div class='links'>
          <ul>
            {data.map((link) => (
              <li>
                <a
                  href={link.url}
                  alt={link.title}
                  class={link.highlight ? "highlight" : null}
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default App;
