import React, { useState } from "react";
import "./App.css";
import { Card, CardContent, } from "@material-ui/core";
import InfoBox from "./InfoBox";
import LineGraph from "./LineGraph";
import Table from "./Table";
import { prettyPrintStat } from "./util";
import numeral from "numeral";
import Map from "./Map";
import "leaflet/dist/leaflet.css";
import Fade from 'react-reveal/Fade';
import logo from './image/logo.png'
import LoadingBar from 'react-top-loading-bar'
import { useGetCountryQuery } from "./state/services/countryApi";
import { useGetCountriesQuery } from "./state/services/countries";

const App = () => {
  const [progress, setProgress] = useState(0)
  const [countryCode, setCountryCode] = useState('worldwide')
  const [casesType, setCasesType] = useState("cases");
  // const [tableData, setTableData] = useState([]);

  // Country code And Country name
  const { data: countryData } = useGetCountryQuery(countryCode);
  const countryName = countryData;

  // Country names and Cases
  const { data: countriesDetails } = useGetCountriesQuery();
  const allCountryData = countriesDetails;
  // console.log(allCountryData, 'allCountryData')

  // Country names and value
  const allCountryName = allCountryData?.map((countries) => ({
    name: countries.country,
    value: countries.countryInfo.iso2,
    case: countries.cases
  }))
  const latData = (countryName?.countryInfo?.lat);
  const longData = (countryName?.countryInfo?.long);

  var TableData = allCountryName?.map((country) => ({
    totalName: country.name,
    totalCase: country.case
  }))

  function compare(a, b) {
    if (a.totalCase < b.totalCase) {
      return 1;
    }
    if (a.totalCase > b.totalCase) {
      return -1;
    }
    return 0;
  }
  const tableData = TableData?.sort(compare);

  const onCountryChange = (e) => {
    const countryCode = e.target.value;
    if (countryCode === "worldwide") {
      document.title = "Coronavirus Outbreak in World"
    } else {
      document.title = `Coronavirus Outbreak in ${countryCode}`
    }
    setProgress(40)
    setCountryCode(countryCode);
    setProgress(100)

  };

  const nameOfCountry = () => {
    if (countryCode === 'worldwide') {
      return countryCode
    } else {
      return countryName?.country
    }
  }

  return (
    <div className="main_app">
      <div className="app">
        <LoadingBar
          height={5}
          color='#f11946'
          progress={progress}
        />
        <div>
          <div className="logo">
            <Fade top>
              <img src={logo} alt="Logo" />
              <h1>COVID-19 Tracker</h1>
            </Fade>
          </div>
          <div className="selectwrap">
            <select variant="outlined" value={countryCode} onChange={onCountryChange}>
              <option value="worldwide">Worldwide</option>
              {allCountryName?.map((country, i) => (
                <option key={i} value={country.value}>{country.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="main_top">
        <div className="left_container">
          <div className="infobox1">
            <InfoBox
              onClick={(e) => setCasesType("cases")}
              title="Coronavirus Cases"
              style={{ color: "#6be1ff" }}
              country={nameOfCountry()}
              color="#6ce0ff"
              isRed
              active={casesType === "cases"}
              cases={prettyPrintStat(countryName?.todayCases)}
              total={numeral(countryName?.cases).format("0.0a")}
            />
          </div>
          <div className="infobox2">
            <div className="ininfox2">
              <InfoBox
                onClick={(e) => setCasesType("recovered")}
                title="Recovered"
                color="#6ce0ff"
                active={casesType === "recovered"}
                cases={prettyPrintStat(countryName?.todayRecovered)}
                total={numeral(countryName?.recovered).format("0.0a")}
              />
            </div>
            <div className="ininfox3">
              <InfoBox
                onClick={(e) => setCasesType("deaths")}
                title="Deaths"
                isRedO
                color="#6ce0ff"
                active={casesType === "deaths"}
                cases={prettyPrintStat(countryName?.todayDeaths)}
                total={numeral(countryName?.deaths).format("0.0a")}
              />
            </div>
          </div>
        </div>
        <div className="graph_container">
          <CardContent className="card_graph" >
            <p >Worldwide new {casesType}</p>
            <LineGraph casesType={casesType} />
          </CardContent>
        </div>
      </div>
      <div className="bottom_container">
        <div className="map_container">
          <Map
            popUpData={nameOfCountry()}
            countries={allCountryData}
            casesType={casesType}
            center={(countryCode === "worldwide" ? { lat: 34.80746, lng: -40.4796 } : { lat: [latData], lng: [longData] })}
            zoom={(countryCode === "worldwide" ? 1.5 : 4)} />
        </div>
        <div className="table_container">
          <Card className="app__right" style={{ borderRadius: '12px', background: '#102544' }}>
            <CardContent style={{ background: '#19345c' }}>
              <div className="app__information">
                <h3>Live Cases by Country</h3>
                <Table countries={tableData} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default App;