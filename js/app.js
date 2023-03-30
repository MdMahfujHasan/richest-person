// https://forbes400.onrender.com/api/forbes400?limit=10
// https://forbes400.onrender.com/api/forbes400/youngest
// https://forbes400.onrender.com/api/forbes400/?limit=10/youngest

document.getElementById('btn-search').addEventListener('click', function () {
    const billionaireSearchField = document.getElementById('billionaire-search-field');
    const billionaireSearchFieldValue = billionaireSearchField.value;

    const billionaireCountSearchField = document.getElementById('billionaire-count-search-field');
    const billionaireCountSearchFieldValue = billionaireCountSearchField.value;

    loadBillionaires(billionaireSearchFieldValue, billionaireCountSearchFieldValue);

    billionaireSearchField.value = '';
    billionaireCountSearchField.value = '';
})


const loadBillionaires = async (searchText, count) => {
    const url = `https://forbes400.onrender.com/api/forbes400/?limit=${count}/${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayBillionaires(data);
}

const displayBillionaires = billionaires => {
    console.log(billionaires);
    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent = '';
    billionaires.forEach(billionaire => {
        console.log(billionaire);
        const { person, personName, rank, industries, finalWorth, city, countryOfCitizenship, squareImage, bios, archivedWorth, estWorthPrev, privateAssetsWorth } = billionaire;
        const bio = bios.join('. ');
        const containerDiv = document.createElement('div');
        containerDiv.classList.add('col');
        containerDiv.innerHTML = `
        <div>
            <h3>${personName}</h3>
            <h4>Biography</h4>
            <p>${bio}</p>
        </div>

        <section class="d-flex justify-content-center align-items-center gap-4">
            <div>
                <img width="200px" src="${squareImage}" alt="image">
            </div>
            <div>
                <h4>General Information</h4>
                <hr>
                <p><b>Citizenship:</b> ${countryOfCitizenship}</p>
                <p><b>City:</b> ${city}</p>
                <h4>Financial Information</h4>
                <hr>
                <p><b>Exchange:</b> ${archivedWorth}</p>
                <p><b>Ticker:</b> ${estWorthPrev}</p>
                <p><b>Total Shares:</b> ${finalWorth}</p>
                <p><b>Share Price:</b> ${privateAssetsWorth}</p>
                <button class="btn btn-outline-dark">Details</button>
            </div>
        </section>
        `;
        cardContainer.appendChild(containerDiv);
    })
}