async function getTravelRecommendationData() {
    const data = await fetch('./travel_recommendation_api.json')
        .then((response) => response.json())
        .then((data) => {
            return data;
        });
    return data;
}

async function search() {
    const searchInput = document
        .getElementById('searchInput')
        .value.toLowerCase();
    if (searchInput === 'beaches' || searchInput === 'beach') {
        const travelData = await getTravelRecommendationData();
        displaySearchResults(travelData.beaches);
    } else if (searchInput === 'temples' || searchInput === 'temple') {
        const travelData = await getTravelRecommendationData();
        displaySearchResults(travelData.temples);
    } else {
        const countryData = await getTravelRecommendationData();
        filteredCountryData = countryData.countries.filter((country) => {
            return country.name.toLowerCase().includes(searchInput);
        });

        // Get all cities from filtered cities to account for cases where multiple countries are returned
        const allCities = [];
        filteredCountryData.forEach((country) => {
            allCities.push(...country.cities);
        });

        displaySearchResults(allCities);
    }
}

function displaySearchResults(searchResultsData) {
    console.log(searchResultsData);
    const searchResults = document.getElementById('search-results');
    const searchResultElements = searchResultsData.map((result) => {
        return `<div class="search-result">
            <img src="images/${result.imageUrl}" class="result-img">
            <div class="result-content">
                <h3>${result.name}</h3>
                <p>${result.description}</p>
                <button class="visitBtn">Visit</button>
            </div>
        </div>`;
    });

    searchResults.innerHTML = searchResultElements.join('');
}

function clearSearchResults() {
    document.getElementById('search-results').innerHTML =
        'Please enter a valid search query';
    document.getElementById('searchInput').value = '';
}

// IIFE to add event listeners
(function () {
    document.querySelector('.nav-branding').addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    document
        .getElementById('searchInput')
        .addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                search();
            }
        });
})();
