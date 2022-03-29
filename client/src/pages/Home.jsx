import React, { useState, useEffect } from "react";
import Topbar from "../components/Topbar";
import Middlebar from "../components/Middlebar";
import Bottom from "../components/Bottom";
import Loader from "../components/Loader";
import { publicRequest } from "../requestMethod";

const Home = ({ logout }) => {
  const [country, setCountry] = useState("India");
  const [middleData, setMiddleData] = useState([0, 0, 0]);
  const [stats, setStats] = useState([]);
  const [dataLimit, setDataLimit] = useState(15);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    // console.log(country);
    const fetchData = async () => {
      setLoading(true);
      const countryData = await publicRequest.get("/" + country);
      let data = countryData.data;

      if (data.length === 0) {
        setStats([]);
        setMiddleData([0, 0, 0]);
        setLoading(false);
        return;
      }
      let p = data.reverse().slice(0, dataLimit);
      p = p.map((dat, index) => ({
        ...dat,
        Date: new Date(dat.Date).toLocaleDateString(),
        NewCases:
          index <= dataLimit - 5 && dat.Confirmed - p[index + 1].Confirmed,
        NewDeaths: index <= dataLimit - 5 && dat.Deaths - p[index + 1].Deaths,
        NewRecovered: index <= dataLimit - 5 && dat.Confirmed - dat.Active,
      }));
      p = p.map((dat, index) => ({
        ...dat,
        NewRecovered:
          index <= dataLimit - 5 &&
          dat.Active + dat.NewCases - p[index + 1].Active,
      }));
      p = p.slice(0, dataLimit - 5);
      setMiddleData([p[0].Active, -p[0].Active + p[0].Confirmed, p[0].Deaths]);
      setStats(p.reverse());
      setLoading(false);
    };
    fetchData();
  }, [country, dataLimit]);

  const chngHandler = (con) => {
    setCountry(con);
  };
  const changeDataLimit = (limit) => {
    setDataLimit(limit);
  };

  return (
    <>
      <Topbar
        chngHandler={chngHandler}
        from={stats.length > 0 && new Date(stats[0].Date).toDateString()}
        changeDataLimit={changeDataLimit}
        logout={logout}
      />
      <Middlebar data={middleData} />
      <Bottom stats={stats} />

      {loading && <Loader />}
    </>
  );
};

export default Home;
