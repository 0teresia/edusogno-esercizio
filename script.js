document.addEventListener('DOMContentLoaded', function() {
    const togglePasswordIcons = document.querySelectorAll('.toggle-password');

    togglePasswordIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const targetId = this.dataset.target;
            const passwordInput = document.getElementById(targetId);

            if (passwordInput) {
                if (passwordInput.type === 'password') {
                    passwordInput.type = 'text';
                    this.innerHTML = '<ion-icon name="eye-off"></ion-icon>';
                } else {
                    passwordInput.type = 'password';
                    this.innerHTML = '<ion-icon name="eye"></ion-icon>'; 
                }
            } else {
                console.error('Password input with id ' + targetId + ' not found.');
            }
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    // Define eventTablesContainer outside of the event listener function
    const eventTablesContainer = document.createElement('div');
    eventTablesContainer.id = 'admin-event-tables'; // Assign an ID

    // Append eventTablesContainer to the admin-event-tables
    const adminEventTables = document.getElementById('admin-event-tables');
    adminEventTables.appendChild(eventTablesContainer);
    
    // Initially hide the forms
    document.querySelectorAll('.form-box').forEach(form => {
        form.style.display = 'none';
    });

    // User links
    const userRegisterLinks = document.querySelectorAll('.register-link[data-type="user"]');
    const userLoginLinks = document.querySelectorAll('.login-link[data-type="user"]');
    const userRegisterForm = document.querySelector('.form-box.register.user-register');
    const userLoginForm = document.querySelector('.form-box.login.user-login');

    // Admin links
    const adminRegisterLinks = document.querySelectorAll('.register-link[data-type="admin"]');
    const adminLoginLinks = document.querySelectorAll('.login-link[data-type="admin"]');
    const adminRegisterForm = document.querySelector('.form-box.register.admin-register');
    const adminLoginForm = document.querySelector('.form-box.login.admin-login');

    // Define wrapper and dashboard elements
    const wrapper = document.querySelector('.wrapper');
    const dashboard = document.querySelector('.dashboard');

    // Initially hide the dashboard
    dashboard.style.display = 'none';

    // Add event listeners for user register links
    userRegisterLinks.forEach(userRegisterLink => {
        userRegisterLink.addEventListener('click', () => {
            wrapper.classList.add('active');
            userRegisterForm.style.display = 'block';
            userLoginForm.style.display = 'none';
            adminRegisterForm.style.display = 'none';
            adminLoginForm.style.display = 'none';
            dashboard.style.display = 'none';
        });
    });

    // Add event listeners for user login links
    userLoginLinks.forEach(userLoginLink => {
        userLoginLink.addEventListener('click', () => {
            wrapper.classList.remove('active');
            userLoginForm.style.display = 'block';
            userRegisterForm.style.display = 'none';
            adminRegisterForm.style.display = 'none';
            adminLoginForm.style.display = 'none';
            dashboard.style.display = 'none';
        });
    });

    // Add event listeners for admin register links
    adminRegisterLinks.forEach(adminRegisterLink => {
        adminRegisterLink.addEventListener('click', () => {
            wrapper.classList.add('active');
            adminRegisterForm.style.display = 'block';
            adminLoginForm.style.display = 'none';
            userRegisterForm.style.display = 'none';
            userLoginForm.style.display = 'none';
            dashboard.style.display = 'none';
        });
    });

    // Add event listeners for admin login links
    adminLoginLinks.forEach(adminLoginLink => {
        adminLoginLink.addEventListener('click', () => {
            wrapper.classList.remove('active');
            adminLoginForm.style.display = 'block';
            adminRegisterForm.style.display = 'none';
            userRegisterForm.style.display = 'none';
            userLoginForm.style.display = 'none';
            dashboard.style.display = 'none';
        });
    });

    // Append eventTablesContainer to the dashboard
    dashboard.appendChild(eventTablesContainer);
   // Render user accounts for the admin
    if (currentUser && currentUser.role === 'admin') {
    renderUserAccounts();
}

});

// Storing user data
let users = JSON.parse(localStorage.getItem('users')) || [];
let admins = JSON.parse(localStorage.getItem('admins')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser'));


// Function to show login form and hide others
function loginForm() {
    document.querySelectorAll('.form-box.login').forEach(form => {
        form.style.display = 'block';
    });
    document.querySelectorAll('.form-box.register').forEach(form => {
        form.style.display = 'none';
    });
}

// Function to show register form and hide others
function registerForm() {
    document.querySelectorAll('.form-box.register').forEach(form => {
        form.style.display = 'block';
    });
    document.querySelectorAll('.form-box.login').forEach(form => {
        form.style.display = 'none';
    });
}

// Function to show user registration form and hide others
function showUserForm() {
    // Hide admin forms
    document.querySelector('.admin-login').style.display = 'none';
    // Show user forms
    document.querySelector('.user-register').style.display = 'none';
    document.querySelector('.user-login').style.display = 'block';
    // Hide admin button
    document.querySelector('.admin-button').style.display = 'none';
    document.querySelector('.user-button').style.display = 'none';
     document.querySelector('.admin-dashboard').style.display = 'none';

}

// Function to show admin registration form and hide others
function showAdminForm() {
    // Hide user forms
    document.querySelector('.user-register').style.display = 'none';
    document.querySelector('.user-login').style.display = 'none';
    // Show admin forms
    document.querySelector('.admin-login').style.display = 'block';
    // Hide user button
    document.querySelector('.user-button').style.display = 'none';
    document.querySelector('.admin-button').style.display = 'none';

}

// Function to save admin data
function saveAdminData() {
    const adminName = document.getElementById('admin-name').value;
    const adminEmail = document.getElementById('admin-register-email').value;
    const adminPassword = document.getElementById('admin-register-password').value;
    // Check for empty inputs
    if (!adminName || !adminEmail || !adminPassword) {
        alert('Please fill in all fields.');
        return;
    }
    // Check if admin with the same email already exists
    const existingAdmin = admins.find(admin => admin.email === adminEmail);
    if (existingAdmin) {
        alert('Admin with this email already exists. Please use a different email.');
        return;
    }
    admins.push({ name: adminName, email: adminEmail, password: adminPassword });
    localStorage.setItem('admins', JSON.stringify(admins)); // Save admins to localStorage
    alert('Admin registered successfully! Please login.');
    // Automatically switch to login form after successful registration
    showAdminForm();
}

// Function to login as admin
function adminLogin() {
    const adminEmail = document.getElementById('admin-login-email').value;
    const adminPassword = document.getElementById('admin-login-password').value;
    
    // Check if the email matches Teresia's email
    if (adminEmail !== 'teresia.yieldplus.uk@gmail.com') {
        alert('Only Admins are allowed to log in.');
        return;
    }
    
    // Check if the password is correct
    if (adminPassword !== '1234') {
        alert('Incorrect password. Please try again.');
        return;
    }
    
    if (adminEmail) {
        currentUser = adminEmail;
        localStorage.setItem('currentUser', JSON.stringify(currentUser)); // Save current user to localStorage
        document.querySelector('.wrapper').classList.remove('active');
        document.querySelector('.dashboard').style.display = 'block';
        // Hide the user login form
        document.querySelector('.form-box.login.admin-login').style.display = 'none';
         // Hide the user and admin buttons on the dashboard
        document.querySelector('.admin-button').style.display = 'none';
    } else {
        alert('Invalid credentials. Please try again.');
    }
    // Retrieve admin events from localStorage
    const adminEvents = JSON.parse(localStorage.getItem('adminEvents')) || [];
    // Render admin events for admins after successful login
    renderAdminEventsForAdmins(adminEvents);
}

// Function to save user data
function saveUserData() {
    const userFirstName = document.getElementById('user-first-name').value;
    const userLastName = document.getElementById('user-last-name').value;
    const userEmail = document.getElementById('user-register-email').value;
    const userPassword = document.getElementById('user-register-password').value;
    // Check if user with the same email already exists
    const existingUser = users.find(user => user.email === userEmail);
    if (existingUser) {
        alert('User with this email already exists. Please use a different email.');
        return;
    }
    // Store user data in localStorage
    users.push({ firstName: userFirstName, lastName: userLastName, email: userEmail, password: userPassword });
    localStorage.setItem('users', JSON.stringify(users));
    alert('User registered successfully! Please login.');
    // Automatically switch to login form after successful registration
    showUserForm();
}

function userLogin() {
    const userEmail = document.getElementById('user-login-email').value;
    const userPassword = document.getElementById('user-login-password').value;
    // Retrieve user data from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users'));
    if (!storedUsers) {
        alert('No user found. Please register first.');
        return;
    }
    const storedUserData = storedUsers.find(user => user.email === userEmail && user.password === userPassword);
    if (!storedUserData) {
        alert('No user found or incorrect credentials. Please try again.');
        return;
    }
    currentUser = storedUserData;
    localStorage.setItem('currentUser', JSON.stringify(currentUser)); 
    // Hide login form and show dashboard
    document.querySelector('.wrapper').classList.remove('active');
    document.querySelector('.dashboard').style.display = 'block';
    // Hide forms and button from displaying
    document.querySelector('.form-box.login.user-login').style.display = 'none';
    document.querySelector('.user-button').style.display = 'none';
    document.querySelector('.admin-button').style.display = 'none';
    document.querySelector('.admin-dashboard').style.display = 'none';
    document.querySelector('.button-event').style.display = 'none';
    document.querySelector('.button-logout').style.display = 'block';

    // Update the welcome message in the dashboard
    const dashboardHeading = document.getElementById('dashboard-heading');
    if (dashboardHeading) {
        const userFirstName = currentUser.firstName || localStorage.getItem("firstName");
        const userLastName = currentUser.lastName || localStorage.getItem("lastName");
        if (userFirstName && userLastName) {
            dashboardHeading.textContent = 'Hi ' + userFirstName + ' ' + userLastName + ', here are your events';
        } else {
            dashboardHeading.textContent = 'Hi, here are your events';
        }
    } else {
        console.error("Element with ID 'dashboard-heading' not found.");
    }
    // Render user events on the user dashboard
    renderUserEvents(userEmail); 
}


// Event listener for "Add Event" button
document.getElementById('add-event-btn').addEventListener('click', function() {
    showEventForm();
});

// Function to show the event form container and populate user checkboxes
function showEventForm() {
     // Hide the container-fluid
    const containerFluid = document.querySelector('.container-fluid');
    containerFluid.style.display = 'none';

    // Display the event form container
    document.getElementById('eventFormContainer').style.display = 'block';

    // Populate the list of registered users with checkboxes
    showRegisteredUsers();
}

// Function to populate the list of registered users with checkboxes
// Function to populate the list of registered users with checkboxes
function showRegisteredUsers() {
    // Get the user list container
    const userListContainer = document.getElementById('userSelectionDiv');

    // Clear previous content
    userListContainer.innerHTML = '';

    // Render user data with checkboxes
    users.forEach(user => {
        // Create a checkbox for each registered user
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = 'selectedUsers';
        checkbox.value = user.email; 

        // Create a label for the checkbox
        const label = document.createElement('label');
        label.textContent = user.firstName + ' ' + user.lastName; // Display first and last names
        label.appendChild(checkbox);

        // Create a list item to contain the label and checkbox
        const listItem = document.createElement('li');
        listItem.appendChild(label);

        // Append the list item to the user list container
        userListContainer.appendChild(listItem);
    });
}


// Add event listener for form submission
document.getElementById('addEventForm').addEventListener('submit', addAdminEvent);

// Function to add an event for admin
function addAdminEvent(event) {
    event.preventDefault(); // Prevent form submission

    // Get event details from the form
    const eventTitle = document.getElementById('eventTitle').value;
    const eventDate = document.getElementById('eventDate').value;
    const eventTime = document.getElementById('eventTime').value;
    
    // New: Get the join link from the form
    const eventLink = document.getElementById('eventLink').value;

    // Get selected users
    const selectedUsers = [];
    const selectedCheckboxes = document.querySelectorAll('input[name="selectedUsers"]:checked');
    selectedCheckboxes.forEach(function(checkbox) {
        selectedUsers.push(checkbox.value); 
    });

    // Create event object including the link
    const newEvent = {
        title: eventTitle,
        date: eventDate,
        time: eventTime,
        link: eventLink, // Add the link to the event object
        users: selectedUsers
    };

    // Save event to local storage for admins
    let adminEvents = JSON.parse(localStorage.getItem('adminEvents')) || [];
    adminEvents.push(newEvent);
    localStorage.setItem('adminEvents', JSON.stringify(adminEvents));

    // Save event to local storage for each user selected
    selectedUsers.forEach(userEmail => {
        const userEventsKey = `userEvents-${userEmail}`;
        let userEvents = JSON.parse(localStorage.getItem(userEventsKey)) || [];
        userEvents.push(newEvent);
        localStorage.setItem(userEventsKey, JSON.stringify(userEvents));
    });

    // Reset form
    document.getElementById('addEventForm').reset();

    // Alert user that event has been added successfully
    alert('Event added successfully!');

    // Render events on the dashboard
    renderEvents();

    // Close the event form
    closeEventForm();

    // Show the containerFluid
    const containerFluid = document.querySelector('.container-fluid');
    containerFluid.style.display = 'block';
}

// Function to close the event form
function closeEventForm() {
    const eventFormContainer = document.getElementById('eventFormContainer');
    eventFormContainer.style.display = 'none';
}

function viewEvent(event) {
    // Hide the container-fluid
    const containerFluid = document.querySelector('.container-fluid');
    containerFluid.style.display = 'none';

    // Code to display view popup with event details
    const viewPopup = document.getElementById('viewPopup');
    if (!viewPopup) {
        console.error("Element with ID 'viewPopup' not found.");
        return;
    }

    // Check if other elements exist
    const titleElement = document.getElementById('viewTitle');
    const dateElement = document.getElementById('viewDate');
    const timeElement = document.getElementById('viewTime');
    const userListElement = document.getElementById('viewUserList');

    if (!titleElement || !dateElement || !timeElement || !userListElement) {
        console.error("One or more elements not found.");
        return;
    }

    // Set element textContent
    titleElement.textContent = event.title;
    dateElement.textContent = event.date;
    timeElement.textContent = event.time;
    
    // Clear previous content
    userListElement.innerHTML = '';

    // Create a list to display users
    const userList = document.createElement('ul');

    // Add each user to the list
    event.users.forEach(user => {
        const userItem = document.createElement('li');
        userItem.textContent = user;
        userList.appendChild(userItem);
    });

    // Append the user list to the userListElement
    userListElement.appendChild(userList);

    viewPopup.style.display = 'block';
}

function closeViewPopup() {
    // Hide the view popup
    const viewPopup = document.getElementById('viewPopup');
    if (viewPopup) {
        viewPopup.style.display = 'none';
    } else {
        console.error("Element with ID 'viewPopup' not found.");
    }

    // Show the container-fluid
    const containerFluid = document.querySelector('.container-fluid');
    if (containerFluid) {
        containerFluid.style.display = 'block';
    } else {
        console.error("Element with class 'container-fluid' not found.");
    }
}

function openEventForm() {
    // Show the event form
    const eventFormContainer = document.getElementById('eventFormContainer');
    eventFormContainer.style.display = 'block';

     // Hide the container-fluid
    const containerFluid = document.querySelector('.container-fluid');
    containerFluid.style.display = 'none';
}

function editEvent(eventIndex) {
    // Retrieve the list of events from local storage
    let adminEvents = JSON.parse(localStorage.getItem('adminEvents')) || [];

    // If the event index is valid, proceed with editing
    if (eventIndex >= 0 && eventIndex < adminEvents.length) {
        // Retrieve the event object to be edited
        const eventToEdit = adminEvents[eventIndex];

        // Populate the event form with the event details
        document.getElementById('eventTitle').value = eventToEdit.title;
        document.getElementById('eventDate').value = eventToEdit.date;
        document.getElementById('eventTime').value = eventToEdit.time;

        // Show the event form
        openEventForm();

        // Add event listener to the event form submit button
        const submitEventBtn = document.querySelector('.event-form-btn');
        submitEventBtn.addEventListener('click', function(event) {
            event.preventDefault();

            // Retrieve the updated details from the form
            const updatedTitle = document.getElementById('eventTitle').value;
            const updatedDate = document.getElementById('eventDate').value;
            const updatedTime = document.getElementById('eventTime').value;

            // Update the event object with the new details
            eventToEdit.title = updatedTitle;
            eventToEdit.date = updatedDate;
            eventToEdit.time = updatedTime;

            // Update the event in the adminEvents array
            adminEvents[eventIndex] = eventToEdit;

            // Update the events in local storage
            localStorage.setItem('adminEvents', JSON.stringify(adminEvents));

            // Alert user that event has been edited successfully
            alert('Event edited successfully!');

            // Update the UI to reflect the changes
            renderAdminEventsForAdmins(adminEvents);

            // Close the event form
            closeEventForm();
        });
    } else {
        alert('Invalid event index.');
    }
}
// Function to close the event form and display the container fluid
function closeEventForm() {
    // Show the container-fluid
    const containerFluid = document.querySelector('.container-fluid');
    containerFluid.style.display = 'block';

    // Hide the event form
    const eventFormContainer = document.getElementById('eventFormContainer');
    eventFormContainer.style.display = 'none';
}

// Function to delete an event
function deleteEvent(eventIndex) {
    // Retrieve the list of events from local storage
    let adminEvents = JSON.parse(localStorage.getItem('adminEvents')) || [];

    // If the event index is valid, remove the event from the array
    if (eventIndex >= 0 && eventIndex < adminEvents.length) {
        const deletedEventTitle = adminEvents[eventIndex].title;

        // Delete the event from admin events
        adminEvents.splice(eventIndex, 1);

        // Update the events in local storage
        localStorage.setItem('adminEvents', JSON.stringify(adminEvents));

        // Update the UI to reflect the changes
        renderAdminEventsForAdmins(adminEvents);

        // Alert the user that the event has been deleted from admin events
        alert(`Event "${deletedEventTitle}" deleted successfully from admin events.`);

        // Delete the event from user events
        const userEmails = users.map(user => user.email);
        userEmails.forEach(userEmail => {
            const userEventsKey = `userEvents-${userEmail}`;
            let userEvents = JSON.parse(localStorage.getItem(userEventsKey)) || [];
            const index = userEvents.findIndex(event => event.title === deletedEventTitle);
            if (index !== -1) {
                userEvents.splice(index, 1);
                localStorage.setItem(userEventsKey, JSON.stringify(userEvents));
            }
        });

        // Alert the user that the event has been deleted from user events
        alert(`Event "${deletedEventTitle}" deleted successfully from user events.`);
    } else {
        alert('Invalid event index.');
    }
}

// Function to render events on the dashboard
function renderEvents() {
    // Get the current user from localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser) {
        console.error("Current user not found.");
        return;
    }

    // If the current user is an admin, render admin events for admins
    if (currentUser.role === 'admin') {
        const adminEvents = JSON.parse(localStorage.getItem('adminEvents')) || [];
        renderAdminEventsForAdmins(adminEvents);
    } else {
        // If the current user is not an admin, render user's events
        const userEmail = currentUser.email;
        renderUserEvents(userEmail); 
    }
}


// Function to render admin events for admins with pagination
function renderAdminEventsForAdmins(adminEvents, currentPage = 1) {
    const eventsPerPage = 4;
    const startIndex = (currentPage - 1) * eventsPerPage;
    const endIndex = startIndex + eventsPerPage;
    const totalEvents = adminEvents.length;
    const totalPages = Math.ceil(totalEvents / eventsPerPage);

    const eventTablesContainer = document.getElementById('admin-event-tables');

    // Check if eventTablesContainer exists
    if (!eventTablesContainer) {
        console.error("Element with ID 'admin-event-tables' not found.");
        return;
    }

    // Clear any existing content
    eventTablesContainer.innerHTML = '';

    // Create the table
    const table = document.createElement('table');
    table.classList.add('table', 'table-bordered', 'table-striped');
    eventTablesContainer.appendChild(table);

    // Create the table headers
    const tableHead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = ["#", "Event Title", "Event Date", "Event Time", "Action"];
    headers.forEach(headerText => {
        const header = document.createElement('th');
        header.textContent = headerText;
        headerRow.appendChild(header);
    });
    tableHead.appendChild(headerRow);
    table.appendChild(tableHead);

    // Create and populate the table body
    const tableBody = document.createElement('tbody');
    for (let i = startIndex; i < endIndex && i < totalEvents; i++) {
        const event = adminEvents[i];
        const eventRow = document.createElement('tr');

        // Index column
        const indexCell = document.createElement('td');
        indexCell.textContent = i + 1;
        eventRow.appendChild(indexCell);

        // Event Title column
        const titleCell = document.createElement('td');
        titleCell.textContent = event.title;
        eventRow.appendChild(titleCell);

        // Event Date column
        const dateCell = document.createElement('td');
        dateCell.textContent = event.date;
        eventRow.appendChild(dateCell);

        // Event Time column
        const timeCell = document.createElement('td');
        timeCell.textContent = event.time;
        eventRow.appendChild(timeCell);

        // Action column
        const actionCell = document.createElement('td');

        // View button
        const viewButton = document.createElement('button');
        viewButton.textContent = 'View';
        viewButton.classList.add('action-buttons', 'view-button');
        viewButton.title = 'View Record';
        viewButton.onclick = function() {
            viewEvent(event); 
        };
        actionCell.appendChild(viewButton);

        // Edit button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-button', 'action-buttons');
        editButton.title = 'Edit Record';
        editButton.onclick = function() {
            editEvent(i); 
        };
        actionCell.appendChild(editButton);

        // Delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('action-buttons', 'delete-button');
        deleteButton.onclick = function() {
            deleteEvent(i); 
        };
        actionCell.appendChild(deleteButton);

        eventRow.appendChild(actionCell);
        tableBody.appendChild(eventRow);
    }

    table.appendChild(tableBody);

    // Add pagination buttons if necessary
    if (totalPages > 1) {
        const paginationContainer = document.createElement('div');
        paginationContainer.classList.add('pagination-container');

        // Previous button
        if (currentPage > 1) {
            const prevButton = document.createElement('button');
            prevButton.textContent = 'Previous';
            prevButton.onclick = function() {
                renderAdminEventsForAdmins(adminEvents, currentPage - 1);
            };
            paginationContainer.appendChild(prevButton);
        }

        // Next button
        if (currentPage < totalPages) {
            const nextButton = document.createElement('button');
            nextButton.textContent = 'Next';
            nextButton.onclick = function() {
                renderAdminEventsForAdmins(adminEvents, currentPage + 1);
            };
            paginationContainer.appendChild(nextButton);
        }

        eventTablesContainer.appendChild(paginationContainer);
    }
}

// Function to render events for a specific user
function renderUserEvents(userEmail) {
    const userEventsContainer = document.getElementById('user-events');
    if (!userEventsContainer) {
        console.error("Element with ID 'user-events' not found.");
        return;
    }

    // Clear previous content
    userEventsContainer.innerHTML = '';

    // Retrieve the user's events from localStorage
    const userEventsKey = `userEvents-${userEmail}`;
    const userEvents = JSON.parse(localStorage.getItem(userEventsKey)) || [];

    // Display the user's events on the dashboard
    userEvents.forEach(event => {
        const eventContainer = document.createElement('div');
        eventContainer.classList.add('user-event-container');

        const titleElement = document.createElement('div');
        titleElement.textContent = event.title;
        titleElement.classList.add('user-event-title');
        eventContainer.appendChild(titleElement);

        const dateTimeContainer = document.createElement('div');

        const dateElement = document.createElement('div');
        dateElement.textContent = event.date;
        dateElement.classList.add('user-event-date');
        dateTimeContainer.appendChild(dateElement);

        const timeElement = document.createElement('div');
        timeElement.textContent = event.time;
        timeElement.classList.add('user-event-time');
        dateTimeContainer.appendChild(timeElement);

        eventContainer.appendChild(dateTimeContainer);

        const joinButton = document.createElement('button');
        joinButton.textContent = 'JOIN';
        joinButton.classList.add('user-event-join-button');
        joinButton.onclick = function() {
            joinEvent(event.title);
        };
        eventContainer.appendChild(joinButton);

        userEventsContainer.appendChild(eventContainer);
    });
}

// Function to join an event (or meeting)
function joinEvent(title) {
    // Retrieve the selected event from adminEvents
    const adminEvents = JSON.parse(localStorage.getItem('adminEvents')) || [];
    const selectedEvent = adminEvents.find(event => event.title === title);

    if (!selectedEvent) {
        alert('Event not found.');
        return;
    }

    // Check if the selected event has a meeting URL
    if (selectedEvent.meetingURL) {
        // Open the meeting URL in a new tab/window
        window.open(selectedEvent.meetingURL, '_blank');
    } else {
        // If meeting URL is not available, display a message
        alert('Meeting URL not found for this event.');
    }
}

// Function to log out
function logOut() {
    // Clear the current user from localStorage
    localStorage.removeItem('currentUser');
    
    // Redirect to the login page or perform any other necessary action
    window.location.reload();
}