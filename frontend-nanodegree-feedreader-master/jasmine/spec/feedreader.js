/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
$(function () {

    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */

    describe('RSS Feeds', function() {

        //determines that allFeeds is defined and not empty
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        //this test confirms each feed has a URL and also that URL is not empty
        it('all urls are defined', function() {
          for (var i = 0; i < allFeeds.length; i++) {
            expect(allFeeds[i].url).toBeDefined();
            expect(allFeeds[i].url.length).not.toBe(0);
          }
        });

        //this test checks that each feed has a name and that the name is not empty
       it('all names are defined', function() {
          for (var i = 0; i < allFeeds.length; i++) {
            expect(allFeeds[i].name).toBeDefined();
            expect(allFeeds[i].name.length).not.toBe(0);
          }
        });
    });



    //New test suite for the Menu
    describe('Menu', function() {

        //this test checks that there is a class called 'menu-hidden'
        it('menu is hidden', function() {
          expect($('body').hasClass('menu-hidden')).toEqual(true);
        });

        //this test checks if the menu appears/disappears with click event
        it('does menu hide/unhide', function() {
          $('.menu-icon-link').trigger('click');
          expect($('body').hasClass('menu-hidden')).toBe(false);
          $('.menu-icon-link').trigger('click');
          expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });



    //New test suite for Initial Entries
    describe('Initial Entries', function() {
      //calls funtion to do async request
       beforeEach(function (done) {
         loadFeed(0, function() {
           done();
         });
       });

       //tests that each feed has a single entry
       it('does feed have single entry', function() {
         expect($('.feed .entry').length).toBeGreaterThan(0);
       });
    });


    //New test suite for New Feed Selection
    describe('New Feed Selection', function() {

       var firstFeed, secondFeed;

       beforeEach(function(done) {
         loadFeed(1, function() {
           //check the console to make sure First feed is loaded
           console.log('First feed loaded')

          firstFeed = $('.feed').html();
          loadFeed(2, function() {
            //check the console to make sure the Second feed is loaded
            console.log('Second feed loaded')
            done();
          });
        });
      });

       afterEach(function() {
         loadFeed(0);
       });
       //checks to make sure that feeds are not the same feed
       it('checks that feeds are different', function() {
         //checks second feed
         secondFeed = $('.feed').html();
         expect(firstFeed).not.toEqual(secondFeed);
       });
    });
}());
