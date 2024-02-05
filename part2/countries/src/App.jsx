import { useState, useEffect } from "react";
import countryService from "./services/countries";

const CountryDetails = ({ country }) => {
  if (country) {
    return (
      <div>
        <h1>{country.name.common}</h1>
        <div>
          <p>
            <strong>Capital:</strong> {country.capital}
          </p>
          <p>
            <strong>Area:</strong> {country.area}
          </p>
        </div>
        <div>
          <strong>Languages:</strong>
          <ul>
            {Object.values(country.languages).map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
        </div>
        <img src={country.flags.png} height="200px" />
      </div>
    );
  }
  return;
};

const SearchResults = ({ results, handleSelectCountry }) => {
  if (results.length === 0) {
    return <div>No results.</div>;
  }
  if (results.length === 1) {
    return <CountryDetails country={results[0]} />;
  }
  if (results.length >= 10) {
    return <div>Too many matches. Specify another filter</div>;
  }

  return (
    <div>
      {results.map((country) => {
        return (
          <div key={country.ccn3}>
            {country.name.common}
            <button onClick={() => handleSelectCountry(country)}>show</button>
          </div>
        );
      })}
    </div>
  );
};

function App() {
  const [countries, setCountries] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    countryService.getAll().then((response) => setCountries(response));
  }, []);

  const handleSearchInputChange = (event) => {
    const searchString = event.target.value;
    setSearchInput(searchString);
    setSelectedCountry(null);
    setResults(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchString.toLowerCase())
      )
    );
  };

  const handleSelectCountry = (country) => setSelectedCountry(country);

  return (
    <div>
      find countries{" "}
      <input value={searchInput} onChange={handleSearchInputChange} />
      <SearchResults
        results={results}
        handleSelectCountry={handleSelectCountry}
      />
      <CountryDetails country={selectedCountry} />
    </div>
  );
}

export default App;
