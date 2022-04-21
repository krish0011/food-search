const loadCountries = () => {
    fetch('https://restcountries.com/v3.1/all')
        .then(res => res.json())
        .then(data => displayCountries(data))
}
loadCountries();

const displayCountries = countries => {
    // countries API er info gula sorasori array te thakle sei info gula 'for' or 'forEach' loop er dara paowa jabe

    // for(const country of countries){
    //     console.log(country);
    // }
    const countriesDiv = document.getElementById('countries-id');

    countries.forEach(country => {
        const div = document.createElement('div');
        div.classList.add('countries-div');

        div.innerHTML = `<h3>${country.name.common}</h3>
                        <p>${country.capital}</p>
                        <button onclick = "loadCountryDetail('${country.name.common}')">Details</button>
                         `;

        countriesDiv.appendChild(div);
    });

}

const loadCountryDetail = countryName => {
    // fetching the info or calling API
    const url = `https://restcountries.com/v3.1/name/${countryName}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCountryDetail(data[0]))

    // display detail
    const displayCountryDetail = detail => {
        const countryDetailDiv = document.getElementById('country-detail');
        // countryDetailDiv = '';
        const div = document.createElement('div');
        div.classList.add('country-detail-div');

        // informations
        div.innerHTML = `<h3>Name: ${detail.name.common}</h3>
                        <img width ="200px" src ="${detail.flags.png}">
                        <h5>Official Name: ${detail.name.official}</h5>
                        <p>Capital: ${detail.capital}</p>
                        <p>Continents: ${detail.continents}</p>
                        <p>Population: ${detail.population}</p>
                        <p>Language: ${detail.languages.spa}</p>
                        <p>Area: ${detail.area}</p>
                        
                      
                         `;

        countryDetailDiv.appendChild(div);
    }


}
