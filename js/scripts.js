const body = document.querySelector('body');
const gallery = document.getElementById('gallery');
let employees;
const modalContainer = document.createElement('div');
modalContainer.className = 'modal-container';

// Fetch data from Random User Generator
fetch('https://randomuser.me/api/?results=12&nat=us,au,ca,gb,nz')
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

    // Add the data to the employees variable
    employees = data;

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

// Convert birthdate
function convertBirthday(date) {
    const year = date.slice(2, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);
    return `${month}/${day}/${year}`;
}

// Show modal
function showModal(event) {

    // Get the card that was selected
    const card = event.target.closest('.card');

    // Find the employee in the data with the email from the selected employee
    const email = card.lastElementChild.firstElementChild.nextElementSibling.textContent;
    const employee = employees.find(employee => employee.email === email);

    // Create the markup to go inside the modal container
    const markup = `
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="modal-text">${employee.email}</p>
                <p class="modal-text cap">${employee.location.city}</p>
                <hr>
                <p class="modal-text">${employee.phone}</p>
                <p class="modal-text">${employee.location.street}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
                <p class="modal-text">Birthday: ${convertBirthday(employee.dob.date)}</p>
            </div>
        </div>
    `;
    modalContainer.innerHTML = markup;

    // Append the modal container to the body
    body.appendChild(modalContainer);
}

// Close the modal
function closeModal() {
    body.removeChild(modalContainer);
}

// When an employee card is clicked
gallery.addEventListener('click', function(event) {
    if (event.target.className !== 'gallery') {
        showModal(event);
    }
});

body.addEventListener('click', function(event) {
    const target = event.target;
    if (target.textContent === 'X' || target.className === 'modal-close-btn' || target.className === 'modal-container') {
        closeModal();
    }
});