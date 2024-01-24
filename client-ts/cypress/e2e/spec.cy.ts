///<reference types="Cypress" />

describe("My First Test", () => {
  let previousArtistName;

  it('user journey', () => {
    cy.visit("http://127.0.0.1:5173/")
    //load search bar
    cy.get('[data-cy="search-bar"]').should('exist');

    //should search artist
    cy.get('[data-cy="search-bar"]').type('ABBA');
    cy.get('[data-cy="search-button"]').click();

    //should load artist list
    cy.get('[data-cy="artist-search-list"]').should('exist');

    //should load playlist on artist click
    cy.get('[data-cy="artist-search-item"]').eq(0).click();
    cy.get('[data-cy="track-details-track"]').should('exist');

    //should refresh playlist
    cy.get('[data-cy="track-details-track"]').eq(0).invoke('html').then((content) => {
      previousArtistName = content;
    })
    cy.get('[data-cy="reload-button"]').click();
    cy.get('[data-cy="track-details-track"]').eq(0).invoke('html').then((content) => {
      expect(content).to.not.equal(previousArtistName)
    });
    
    //should save playlist
    cy.get('[data-cy="heart-button"]').click();
    cy.get('[data-cy="collection-artist-name"]').should('exist');

    //should open playlist in collections
    cy.get('[data-cy="collections-playlist-toggle"]').eq(0).click();
    cy.get('[data-cy="playlist-song-name"]').should('exist');

    //should delete playlist
    cy.get('[data-cy="collections-playlist-delete"]').eq(0).click();
    cy.get('[data-cy="playlist-toggle"]').should('not.exist');
  })
});
