/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// const moment      = require("moment");

$(() => {

  $('.newtweet').on('submit', function(event) {
    $('.error').remove();

    event.preventDefault(); //don't refresh the page which is the default
    const text = $(this.text).val();
    const data = $(this).serialize();
    const charlength = 140;

    if (text.length > charlength) {
      const $tweetError = `<article class="error">
                            <p>You're much too wordy my friend. Take it down a notch, mmmK? </p>
                          </article>`;
   
      $('.newtweet').prepend($tweetError);
      $('.error').slideDown(5000, () => {
      });
    } else if (!text) {
      const $tweetError = `<article class="error">
                              <p>More wordiness this time.</p>
                           </article>`;
   
      $('.newtweet').prepend($tweetError);
      $('.error').slideDown(5000, () => {
      });
    } else {
      $.post('/tweets', data);
      loadTweets();
    }
  });


  const createTweetElement = (data) => {
    let date = new Date(data.created_at);
    // let date = moment(data.created_at).fromNow(); //saved for in case get moment to work
    const $tweet =
                `<article class="tweet-wrapper">
                    <div class="name-handle">
                    <div class="avatar-wrapper">
                      <img class="avatars" src="${data.user.avatars}"> </img>
                      <div class="name-handle"> ${data.user.name} </div>
                    </div>
                      <p class="handle" > ${data.user.handle} </p>
                    </div>
                  <div class="tweet">
                    <p> ${escape(data.content.text)} </p>
                  </div>
                    <div class="bottom">
                      <p class="date">${date}</p>
                      <div> 
                       <i class="fas fa-flag"></i>
                       <i class="fas fa-retweet"></i>
                       <i class="fas fa-heart"></i>
                      </div>
                    </div> 
                  </div>
                  </article>`;


    return $tweet;
  };

  const escape = function(string) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(string));
    return div.innerHTML;
  };

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      let $tweetElement = createTweetElement(tweet);
    
      $('#tweet-section').prepend($tweetElement);
    }
  };


  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];


  const loadTweets = () => {
    $.ajax('/tweets', {method: 'GET' })
      .then(function(data) {
        console.log("Data in the loadTweets is ", data);
        renderTweets(data);

      });
  };




  loadTweets();
});