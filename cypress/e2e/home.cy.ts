const indexPage = Cypress.env('indexPage');
const computer = Cypress.env('computer');
const iPhone14 = Cypress.env('iPhone14');
const galaxyS20Ultra = Cypress.env('galaxyS20Ultra');

describe('Types of searches on computer', () => {
    it('Search location valid', () => {
        cy.visit(indexPage);
        cy.viewport(computer.width, computer.height);
        cy.get('[data-cy="inp_location"]').type('123');
        cy.get('li[data-cy]').first().click();
        cy.wait(3000)
        cy.get('[data-cy="btn_understood"]').scrollIntoView().click();
        cy.wait(2000)
    });
    it('Search location invalid', () => {
        cy.visit(indexPage);
        cy.viewport(computer.width, computer.height);
        cy.get('[data-cy="inp_location"]').type('123');
        cy.get('li[data-cy]').eq(1).click();
        cy.wait(3000)
        cy.get('[data-cy="btn_understood"]').scrollIntoView().click();
    });
});
//
describe('Types of searches on IOS', () => {
    it('Search location valid', () => {
        cy.visit(indexPage);
        cy.viewport(iPhone14.width, iPhone14.height);// resolution iPhone 14 Pro Max
        cy.get('[data-cy="inp_location"]').type('123');
        cy.get('li[data-cy]').first().click();
        cy.wait(2000)
        cy.get('[data-cy="btn_understood"]').scrollIntoView().click();
        cy.wait(2000)
    });
    it('Search location invalid', () => {
        cy.visit(indexPage);
        cy.viewport(iPhone14.width, iPhone14.height);// resolution iPhone 14 Pro Max
        cy.get('[data-cy="inp_location"]').type('123');
        cy.get('li[data-cy]').eq(1).click();
        cy.wait(2000)
        cy.get('[data-cy="btn_understood"]').scrollIntoView().click();
    });
});
//
describe('Types of searches on Android', () => {
    it('Search location valid', () => {
        cy.visit(indexPage);
        cy.viewport(galaxyS20Ultra.width, galaxyS20Ultra.height);// resolution Samsung Galaxy S20 Ultra
        cy.get('[data-cy="inp_location"]').type('123');
        cy.get('li[data-cy]').first().click();
        cy.wait(2000)
        cy.get('[data-cy="btn_understood"]').scrollIntoView().click();
        cy.wait(2000)
    });
    it('Search location invalid', () => {
        cy.viewport(galaxyS20Ultra.width, galaxyS20Ultra.height);// resolution Samsung Galaxy S20 Ultra
        cy.visit(indexPage);
        cy.get('[data-cy="inp_location"]').type('123');
        cy.get('li[data-cy]').eq(1).click();
        cy.wait(2000)
        cy.get('[data-cy="btn_understood"]').scrollIntoView().click();
    });
});

