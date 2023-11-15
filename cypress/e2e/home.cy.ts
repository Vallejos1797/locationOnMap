describe('Types of searches on computer', () => {
  it('Search location valid', () => {
    cy.visit('http://localhost:3000/');
    cy.viewport(1920, 1080);
    cy.get('[data-cy="inp_location"]').type('123');
    cy.get('li[data-cy]').first().click();
    cy.wait(2000)
    cy.get('[data-cy="btn_understood"]').scrollIntoView().click();
    cy.wait(2000)
  });
  it('Search location invalid', () => {
    cy.viewport(1920, 1080);
    cy.visit('http://localhost:3000/');
    cy.get('[data-cy="inp_location"]').type('123');
    cy.get('li[data-cy]').eq(1).click();
    cy.wait(2000)
    cy.get('[data-cy="btn_understood"]').scrollIntoView().click();
  });
});

describe('Types of searches on IOS', () => {
  it('Search location valid', () => {
    cy.visit('http://localhost:3000/');
    cy.viewport(430, 932);// resolution iPhone 14 Pro Max
    cy.get('[data-cy="inp_location"]').type('123');
    cy.get('li[data-cy]').first().click();
    cy.wait(2000)
    cy.get('[data-cy="btn_understood"]').scrollIntoView().click();
    cy.wait(2000)
  });
  it('Search location invalid', () => {
    cy.viewport(430, 932);// resolution iPhone 14 Pro Max
    cy.visit('http://localhost:3000/');
    cy.get('[data-cy="inp_location"]').type('123');
    cy.get('li[data-cy]').eq(1).click();
    cy.wait(2000)
    cy.get('[data-cy="btn_understood"]').scrollIntoView().click();
  });
});

describe('Types of searches on Android', () => {
  it('Search location valid', () => {
    cy.visit('http://localhost:3000/');
    cy.viewport(430, 932);// resolution Samsung Galaxy S20 Ultra
    cy.get('[data-cy="inp_location"]').type('123');
    cy.get('li[data-cy]').first().click();
    cy.wait(2000)
    cy.get('[data-cy="btn_understood"]').scrollIntoView().click();
    cy.wait(2000)
  });
  it('Search location invalid', () => {
    cy.viewport('samsung-s10' );
    cy.visit('http://localhost:3000/');
    cy.get('[data-cy="inp_location"]').type('123');
    cy.get('li[data-cy]').eq(1).click();
    cy.wait(2000)
    cy.get('[data-cy="btn_understood"]').scrollIntoView().click();
  });
});

