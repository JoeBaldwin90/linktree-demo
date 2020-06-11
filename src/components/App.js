import React, { useState, useEffect } from "react";
import axios from "axios";
import bg from "../assets/bg.mp4";
import bgImg from "../assets/bg.png";
import bgWebm from "../assets/bg.webm";
import logo from "../assets/logo.png";
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
      <video
        autoPlay={true}
        loop={true}
        preload='auto'
        playsInline
        muted
        className='video'
      >
        <source src={bg} type='video/mp4'></source>
        <source src={bgWebm} type='video/webm'></source>
        <img src={bgImg} />
      </video>
      <section className='container'>
        <div className='profile-image'>
          <img className='profile' src={logo} alt='Nitara' />
        </div>
        <div className='links'>
          <ul>
            {data.map((link, i) => (
              <li key={i}>
                <a
                  href={link.url}
                  alt={link.title}
                  className={link.highlight ? "highlight" : null}
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
