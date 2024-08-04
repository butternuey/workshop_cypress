// const checkDefaultPage =() => {
//     cy.get('.router-link-active').should('have.text', 'menu');
//     cy.get(':nth-child(2) > a').should('have.text', 'cart (0)');
//     cy.get(':nth-child(3) > a').should('have.text', 'github');
//     cy.get('[data-test="coffee-list"] > li').should('have.length', 9);
//     cy.get('[data-test="checkout"]').should('be.visible');
//     cy.get('[data-test="checkout"]').should('have.text', 'Total: $0.00');
// }


// const addProductToCart =(productname, productprice) => {
//     cy.get(`[data-cy="${productname}"]`).click()
//     cy.get(':nth-child(2) > a').should('have.text', 'cart (1)')
//     cy.get('[data-test="checkout"]')
//         .should('have.text', 'Total: $'+ productprice)
// }

describe('Coffee shop payment', () => {
    // before(() => {
    //     //run once before all cases
    //     cy.intercept(
    //         {
    //             method: "POST",
    //             url: "https://www.google-analytics.com/**",
    //         },
    //             { message: "ieieiie" }
    //         ).as("GoogleAnalytics");
           
    //     cy.intercept(
    //         {
    //             method: "GET",
    //             url: "/list.json",
    //         },
    //         { 
    //             delay: 3000,
    //             fixture: "products.json"
    //         }
    //         ).as("List of products");
    //   })

    it("Pay via Total button ", () => {

        //Open website
        cy.step('Open website')
        cy.visit("https://coffee-cart-steel.vercel.app/");

        cy.checkDefaultPage()
        cy.addProductToCart('Cappuccino', '19.00')

        //Mouse hover on the total button
        cy.step('Mouse hover on the total button');
        cy.get('[data-test="checkout"]').trigger('mouseover')
        cy.get('.list-item').should('be.visible');
        cy.get('.list-item').should('have.text', 'Cappuccino x 1+-');

        //Payment via total button
        cy.step('Payment via total button');
        cy.get('[data-test="checkout"]').click();

        //Check payment popup
        cy.step('Check payment popup');
        cy.get('.modal-content').should('be.visible');
        cy.get('h1').should('have.text', 'Payment details');
        cy.get('.modal-content > p').should('have.text', 'We will send you a payment link via email.');
        cy.get(':nth-child(1) > label').should('have.text', 'Name');
        cy.get(':nth-child(2) > label').should('have.text', 'Email');
        cy.get('#name').should('be.enabled');
        cy.get('#email').should('be.enabled');
        cy.get('#promotion-label').should('have.text', 'I would like to receive order updates and promotional messages.');
        cy.get('#promotion').should('be.enabled');
        cy.get('#submit-payment').should('be.visible');

        //Enter payment detail
        cy.step('Enter payment detail');
        cy.get('#name').type('kittiya');
        cy.get('#email').type('kittiya@cy.com');

        //Submit payment
        cy.step('Submit payment');
        cy.get('#submit-payment').click();

        //Check success popup
        cy.step('Check success popup');
        cy.get('.snackbar').should('be.visible');
        cy.get('.snackbar').should('have.text', 'Thanks for your purchase. Please check your email for payment.');
        
        //Check cart and total after payment
        cy.step('Check cart and total after payment');
        cy.get(':nth-child(2) > a').should('have.text', 'cart (0)');
        cy.get('[data-test="checkout"]').should('have.text', 'Total: $0.00');
       
    });

    it("Pay via cart page", () => {
        //Open website
        cy.visit("https://coffee-cart-steel.vercel.app/");

         //check default page after open
         cy.get('.router-link-active').should('have.text', 'menu');
         cy.get(':nth-child(2) > a').should('have.text', 'cart (0)');
         cy.get(':nth-child(3) > a').should('have.text', 'github');
         cy.get('[data-test="coffee-list"] > li').should('have.length', 9);
         cy.get('[data-test="checkout"]').should('be.visible');
         cy.get('[data-test="checkout"]').should('have.text', 'Total: $0.00');

        //selected 1 cup of coffee
        cy.get('[data-cy="Cappuccino"]').click();
        cy.get(':nth-child(2) > a').should('have.text', 'cart (1)');
        cy.get('[data-test="checkout"]').should('have.text', 'Total: $19.00');

        //Mouse hover on the total button
        cy.get('[data-test="checkout"]').trigger('mouseover');
        cy.get('.list-item').should('be.visible');
        cy.get('.list-item').should('have.text', 'Cappuccino x 1+-');

       
        //Open the cart page
        cy.get(':nth-child(2) > a').click();

        //Check total price on cart page
        cy.get('[data-test="checkout"]').should('be.visible');
        cy.get('[data-test="checkout"]').should('have.text', 'Total: $19.00');

        //Check Detail on cart page
        cy.get('.list-header > :nth-child(1)').should('have.text', 'Item');
        cy.get('.list-header > :nth-child(2)').should('have.text', 'Unit');
        cy.get('.list-header > :nth-child(3)').should('have.text', 'Total');
        cy.get('ul[data-v-8965af83=""] > .list-item > :nth-child(1)').should('have.text', 'Cappuccino');
        cy.get(':nth-child(2) > .unit-desc').should('have.text', '$19.00 x 1');
        cy.get(':nth-child(2) > .unit-controller > [aria-label="Add one Cappuccino"]').should('be.visible');
        cy.get(':nth-child(2) > .unit-controller > [aria-label="Add one Cappuccino"]').should('have.text', '+');
        cy.get(':nth-child(2) > .unit-controller > [aria-label="Remove one Cappuccino"]').should('be.visible');
        cy.get(':nth-child(2) > .unit-controller > [aria-label="Remove one Cappuccino"]').should('have.text', '-');
        cy.get('.list-item > :nth-child(3)').should('have.text', '$19.00');
        cy.get('.delete').should('be.visible');

        //Payment via total button on cart page
        cy.get('[data-test="checkout"]').click();
        cy.get('.modal-content').should('be.visible');
        cy.get('h1').should('have.text', 'Payment details');
        cy.get('p').should('have.text', 'We will send you a payment link via email.');
        cy.get(':nth-child(1) > label').should('have.text', 'Name');
        cy.get(':nth-child(2) > label').should('have.text', 'Email');
        cy.get('#promotion-label').should('have.text', 'I would like to receive order updates and promotional messages.');
        cy.get('#promotion').should('be.enabled');
        
        //Enter payment detail
        cy.get('#name').type('kittiya');
        cy.get('#email').type('kittiya@cy.com');

        //Checked on promotion checkbox
        cy.get('#promotion').check();

        //Submit payment
        cy.get('#submit-payment').click();
       
        //Check success popup
        cy.get('.snackbar').should('be.visible');
        cy.get('.snackbar').should('have.text', 'Thanks for your purchase. Please check your email for payment.');

        //Check cart and total after payment
        cy.get(':nth-child(2) > a').should('have.text', 'cart (0)');
        cy.get('[data-test="checkout"]').should('have.text', 'Total: $0.00');
      
    });

   });