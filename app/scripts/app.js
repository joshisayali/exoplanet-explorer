/*
Instructions:
(1) Get the planet data and add the search header.
(2) Create the first thumbnail with createPlanetThumb(data)
(3) Handle errors!
  (a) Pass 'unknown' to the search header.
  (b) console.log the error.
 */

// Inline configuration for jshint below. Prevents `gulp jshint` from failing with quiz starter code.
/* jshint unused: false */

(function(document) {
  'use strict';

  var home = null;

  /**
   * Helper function to show the search query.
   * @param {String} query - The search query.
   */
  function addSearchHeader(query) {
    home.innerHTML = '<h2 class="page-title">query: ' + query + '</h2>';
  }

  /**
   * Helper function to create a planet thumbnail.
   * @param  {Object} data - The raw data describing the planet.
   */
  function createPlanetThumb(data) {
    var pT = document.createElement('planet-thumb');      
    for (var d in data) {
      pT[d] = data[d];        
    }
    home.appendChild(pT);
  }

  /**
   * XHR wrapped in a promise
   * @param  {String} url - The URL to fetch.
   * @return {Promise}    - A Promise that resolves when the XHR succeeds and fails otherwise.
   */
  function get(url) {
    return fetch(url, {
      method: 'get'
    });
  }

  /**
   * Performs an XHR for a JSON and returns a parsed JSON response.
   * @param  {String} url - The JSON URL to fetch.
   * @return {Promise}    - A promise that passes the parsed JSON response.
   */
  function getJSON(url) {
    return get(url).then(function(response) {
      return response.json();
    });
  }

  window.addEventListener('WebComponentsReady', function() {
    home = document.querySelector('section[data-route="home"]');
    /*
    Uncomment the next line and start here when you're ready to add the first thumbnail!

    Your code goes here!
     */
      
      /*
    //Syntax 1 - working code
    getJSON('../data/earth-like-results.json')
      .then(function(response){
            addSearchHeader(response.query);
        console.log(response);
        return response.results[0];
    })
      .then(function(response){
        return getJSON(response);
    })
      .then(function(response){
        createPlanetThumb(response);
        console.log(response);
    })
      .catch(function(error){
        addSearchHeader('unknown');
        console.log(error);
    })*/
      
      /*//Syntax 2
      getJSON('../data/earth-like-results.json')
        .then(function(response){
             addSearchHeader(response.query);
          return getJSON(response.results[0]);
      })
        .catch(function(error){
          throw Error('Search request error');
      })
        .then(function(response){
          createPlanetThumb(response);
      })
        .catch(function(error){
          addSearchHeader('unknown');
            console.log(error);
      })*/
      
      //syntax 3
      getJSON('../data/earth-like-results.json')
        .then(function(response){
             addSearchHeader(response.query);
          return getJSON(response.results[0]);
      })
        .catch(function(error){
          throw Error('Search request error'); //this catch catches any error in the first getJSON
      })
        .then(createPlanetThumb)
        .catch(function(error){
          addSearchHeader('unknown');
            console.log(error);
      })
      
      /*//testing promises in loop - works but not recommended way - see next assignment
      getJSON('../data/earth-like-results.json')
        .then(function(response){
          addSearchHeader(response.query);
          response.results.forEach(function(url){
              getJSON(url).then(createPlanetThumb);
          })
      })
      .catch(function(error){
          addSearchHeader('unknown');
            console.log(error);
      })*/
      
      
      /*//testing promises in loop - does not work
      getJSON('../data/earth-like-results.json')
        .then(function(response){
          addSearchHeader(response.query);
          response.results.forEach(function(url){
              console.log(url);
              return getJSON(url);
          })
      })
      .then(function(response){
          
          createPlanetThumb(response);
          console.log(response);
      })
      .catch(function(error){
          addSearchHeader('unknown');
            console.log(error);
      })*/
      
      
  });
})(document);
