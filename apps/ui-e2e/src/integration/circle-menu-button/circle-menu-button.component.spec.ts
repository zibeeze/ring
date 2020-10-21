describe('ui', () => {
  beforeEach(() => cy.visit('/iframe.html?id=circlemenubuttoncomponent--primary&knob-item'));

  it('should render the component', () => {
    cy.get('zander-circle-menu-button').should('exist');
  });
});
