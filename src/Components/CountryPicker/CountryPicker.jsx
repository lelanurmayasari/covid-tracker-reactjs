import React, { useState, useEffect } from "react";
import { FormControl, NativeSelect } from "@material-ui/core";
import styles from "./CountryPicker.module.css";
import axios from "axios";

const CountryPicker = ({ handleCountryChange }) => {
  const [countries, setCountries] = useState([]);

  const getCountries = async () => {
    let url = "https://covid19.mathdro.id/api";
    try {
      const {
        data: { countries },
      } = await axios.get(`${url}/countries`);
      return countries.map((country) => country.name);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    const fetchAPI = async () => {
      setCountries(await getCountries());
    }
    fetchAPI();
  }, []);

  return (
    <FormControl className={styles.formControl}>
      <NativeSelect onChange={(e) => handleCountryChange(e.target.value)}>
        <option value="">Global</option>
        {countries.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default CountryPicker;
