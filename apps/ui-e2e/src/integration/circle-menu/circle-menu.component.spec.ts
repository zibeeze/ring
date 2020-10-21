describe('ui', () => {
  beforeEach(() => cy.visit('/iframe.html?id=circlemenucomponent--primary'));

  it('should render the component', () => {
    cy.get('zander-circle-menu').should('exist');
  });
});
