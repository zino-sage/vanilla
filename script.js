// Fetch and display customers
document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://jsonplaceholder.typicode.com/users';
    let customers = [];

    // DOM Elements
    const customerList = document.getElementById('customer-list');
    const searchInput = document.getElementById('search');
    const sortSelect = document.getElementById('sort');
    const noResult = document.getElementById('no-result');

    // Fetch customers from API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            customers = data;
            displayCustomers(customers);
        })
        .catch(error => console.error('Error fetching customers:', error));

    // Display customers
    function displayCustomers(customers) {
        customerList.innerHTML = ''; // Clear the customer list
        if (customers.length === 0) {
            noResult.textContent = "No customer(s) found with the search criteria.";
            return;
        }
        noResult.textContent = ''; // Clear the no result message
        customers.forEach(customer => {
            const customerCard = document.createElement('div');
            customerCard.classList.add('col-md-3', 'mb-5');
        
            customerCard.innerHTML = `
                <div class="card h-100">
                    <div class="card-body d-flex flex-column">
                    
                        <div class="d-flex justify-content-between align-items-start">
                         <img src="images/kurtis.jpg" alt="${customer.username}'s Picture" class="profile-image">
                        </div>
                         <h5 class="card-title" style="font-size: 0.85em;">${customer.name}</h5>
                        <span style="color: gray; font-size: 0.7em;">@${customer.username}</span><br>
                        <p style="color: blue; font-size: 0.85em;">"${customer.company.catchPhrase}"</p><br>
                        <p class="card-text" style="font-size: 0.85em;">
                            <i class="bi bi-envelope" style="color: darkblue;"></i> ${customer.email}<br>
                            <i class="bi bi-geo-alt" style="color: darkblue;"></i> ${customer.address.street}, ${customer.address.city}, ${customer.address.zipcode}<br>
                            <i class="bi bi-telephone" style="color: darkblue;"></i> ${customer.phone}<br>
                            <i class="bi bi-globe" style="color: darkblue;"></i> ${customer.website}<br>
                            <i class="bi bi-suitcase-lg" style="color: darkblue;"></i> ${customer.company.name}<br>
                            <i class="bi bi-building" style="color: darkblue;"></i> ${customer.company.bs}
                        </p>
                    </div>
                </div>
            `;
        
            customerList.appendChild(customerCard);
        });
           
        
    }

    // Filter customers by name
    searchInput.addEventListener('input', () => {
        const searchText = searchInput.value.toLowerCase();
        const filteredCustomers = customers.filter(customer => 
            customer.name.toLowerCase().includes(searchText)
        );
        displayCustomers(filteredCustomers);
    });

    // Sort customers alphabetically
    sortSelect.addEventListener('change', () => {
        const sortOrder = sortSelect.value;
        const sortedCustomers = [...customers].sort((a, b) => {
            return sortOrder === 'asc'
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name);
        });
        displayCustomers(sortedCustomers);
    });
});
