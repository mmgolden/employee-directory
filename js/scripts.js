const gallery = document.getElementById('gallery');

// Fetch data from Random User Generator
fetch('https://randomuser.me/api/?results=12')
    .then(checkStatus)
    .then(data => displayEmployees(data.results))
    .catch(error => console.log(error));

// Check the status of the response
function checkStatus(response) {
    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject(`There was an error: ${response.status} ${response.statusText}`);
    }
}

// Display the employees on the page
function displayEmployees(data) {

    // Iterate over the data
    data.forEach(employee => {

        // Create a new card
        const card = document.createElement('div');
        card.className = 'card';

        // Create markup to go inside the card
        const markup = `
            <div class="card-img-container">
                <img class="card-img" src="${employee.picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="card-text">${employee.email}</p>
                <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
            </div>
        `;
        card.innerHTML = markup;

        // Append the card to the gallery
        gallery.appendChild(card);
    });
}