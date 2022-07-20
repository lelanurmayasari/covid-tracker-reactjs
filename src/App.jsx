import { Typography } from "@material-ui/core";
import axios from "axios";
import React from "react";
import styles from "./App.module.css";
import Cards from "./Components/Cards/Cards";
import CountryPicker from "./Components/CountryPicker/CountryPicker";

class App extends React.Component {
  state = {
    country: "",
    data: {},
  };

  async componentDidMount() {
    const data = await this.getData();
    this.setState({ data });
  }

  getData = async (country) => {
    const url = "https://covid19.mathdro.id/api";
    let setURL = country ? `${url}/countries/${country}` : url;
    try {
      const {
        data: { confirmed, recovered, deaths, lastUpdate },
      } = await axios.get(setURL);
      return { confirmed, recovered, deaths, lastUpdate };
    } catch (error) {
      return error;
    }
  };

  handleCountryChange = async (country) => {
    let data = await this.getData(country);
    this.setState({ data });
  };

  render() {
    const { data } = this.state;
    const lastUpdate = new Date(data.lastUpdate).toDateString();
    return (
      <div className={styles.container}>
        {/* <h1>Hello world</h1> */}
        <img className={styles.image} src="./home.jpeg" alt="img-covid" />
        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
          Last Updated: {lastUpdate}
        </Typography>
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Cards data={data} />
      </div>
    );
  }
}

export default App;
