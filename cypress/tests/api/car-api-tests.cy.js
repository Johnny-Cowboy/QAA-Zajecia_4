describe('Car API tests', () => {

    it('GET car list test', () => {
    
        // Step 1
        cy.request({
            method: 'GET',
            url:'http://localhost:8080/cars'
        }).as('details');
        cy.log('Request was sent.')
        
        // Step 2
        cy.get('@details').its('status').should('eq', 200);
        cy.get('@details').its('body').should('not.be.empty');
        cy.log('Request status is correct and response body is not empty.');
    
        // Debug
        cy.get('@details').then((response) => {
            cy.log('Response was: ' + JSON.stringify(response.body));
    
        })
    })
    
    it('POST Add new car: Kia Creed', () => {
    
        // Step 1
        cy.request({
            method: 'POST',
            url:'http://localhost:8080/cars',
            body: {
                "manufacturer": "Kia",
                "model": "Ceed"
            }
        }).as('details');
        cy.log('Request was sent.')
        
        // Step 2
        cy.get('@details').its('status').should('eq', 200);
        cy.get('@details').its('body').should('not.be.empty');
        cy.log('Request status is correct and response body is not empty.');
    
        // Step 3
        cy.get('@details').then((response) => {
            cy.wrap(JSON.stringify(response.body))
                .should('include', 'Kia')
                .should('include', 'Ceed');
        })
    })
    
    it.only('DELETE Newly added car', () => {
    
        // Set-up
        cy.request({
            method: 'POST',
            url:'http://localhost:8080/cars',
            body: {
                "manufacturer": "Tesla",
                "model": "Model S"
            }
        }).as('testData');
        
        cy.get('@testData').its('status').should('eq', 200);
        cy.get('@testData').then((response) => {
            const carId = response.body.length
            cy.log('Car was created with id = ' + carId);
            Cypress.env('carId', carId);
            cy.pause();
        })
        cy.log('Test data created correctly.')
    
        // Step 1
    
        cy.then(()=>{
            const carId = Cypress.env('carId');
            cy.request({
                method: 'DELETE',
                url:`http://localhost:8080/cars/${carId}`,
            }).as('details');
        
            cy.get('@details').its('status').should('eq', 200);
    
             // Step 2
        cy.get('@details').then((response) => {
            cy.wrap(JSON.stringify(response.body))
                .should('not.include', 'Tesla')
                .should('not.include', 'Model S');
        })
        })
       
    })
    
    })