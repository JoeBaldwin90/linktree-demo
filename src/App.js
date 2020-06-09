import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const spaceID = process.env.SPACE;
const token = process.env.TOKEN;
const url =
  `https://cdn.contentful.com/spaces/${spaceID}/environments/master/entries?access_token=${token}`;

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios(url);
      const links = response.data.items.map((link) => link.fields);
      setData(links);
    };

    fetchData();
  }, []);

  return (
    <div>
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
  );
};

export default App;
