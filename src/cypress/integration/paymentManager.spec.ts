describe('Payment Manager Service', () => {
    it('should send a transaction', () => {
      cy.request('POST', '/send', {
        amount: 100,
        toAddress: 'receiver@example.com',
        status: 'pending'
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id');
        expect(response.body.status).to.eq('pending');
      });
    });
  
    it('should withdraw a transaction', () => {
      cy.request('POST', '/withdraw', {
        amount: 50,
        toAddress: 'receiver@example.com',
        status: 'pending'
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id');
        expect(response.body.status).to.eq('pending');
      });
    });
  });