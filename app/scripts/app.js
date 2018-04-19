/*
Instructions:
(1) Use Promise.all to refactor the .map code by passing Promise.all an array of Promises.
  (a) Each Promise will be executed in parallel.
  (b) The return values will be returned in the same order as the Promises were created.
Hint: you'll probably still need to use .map.
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
    return fetch(url);
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
    
      //history code
      //work but planets do not display in same order as URLs - parallel requests
      /*getJSON('../data/earth-like-results.json')
      .then(function(response){
          addSearchHeader(response.query);
          response.results.forEach(function(url){
              getJSON(url).then(createPlanetThumb);
          });          
      });*/
      
      //works but planets do not display in same order as URLs - parallel requests
      /*getJSON('../data/earth-like-results.json')
      .then(function(response){
          addSearchHeader(response.query);
          response.results.map(function(url){
              getJSON(url).then(createPlanetThumb);
          });          
      });*/
      
      //works and data is in same order as URLs but series requests
      /*getJSON('../data/earth-like-results.json')
      .then(function(response){
          addSearchHeader(response.query);
          
          var sequence = Promise.resolve();
          response.results.forEach(function(url){
              sequence = sequence.then(function(){
                  return getJSON(url);
              }).then(createPlanetThumb);
          });          
      });*/
      
      /*
    Refactor this code with Promise.all!
     */
    //data is in same order as URLs and parallel requests
    getJSON('../data/earth-like-results.json')
    .then(function(response) {
      addSearchHeader(response.query);
      
    //commented code below does not work
     /* var arrayOfPromises = response.results.map(function(url) {          
          getJSON(url);       
      });  
    
        return Promise.all(arrayOfPromises);*/
        
        return Promise.all(response.results.map(getJSON));
    })
    .then(function(planetData){
        planetData.forEach(function(planet){
          createPlanetThumb(planet);  
        })
    })
    .catch(function(error){
           console.log(error);
    });
  });
})(document);
