import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from '../assets/logo.png';
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
      <section className='container'>
        <div className='logo'>
          <img src={logo} className="Logo" />
        </div>
        <div className='links'>
          <ul>
            {data.map((link) => (
              <li>
                <a
                  href={link.url}
                  alt={link.title}
                  className={link.highlight ? "highlight" : null}
                >
                  {link.title}
                </a>
                <div class="blur"></div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default App;
