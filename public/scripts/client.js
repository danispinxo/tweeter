/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const calculateDaysAgo = function(created_at) {
  let today = new Date();
  let createdOn = new Date(created_at);
  let msInDay = 24 * 60 * 60 * 1000;

  createdOn.setHours(0,0,0,0);
  today.setHours(0,0,0,0)

  let diff = (+today - +createdOn)/msInDay
  return diff;
};

const createDistanceMessage = function(daysAgo) {
  if (daysAgo < 365) {
    return `${daysAgo} days ago`;
  } else if (daysAgo >= 365 && daysAgo < 730) {
    return `1 year ago`;
  } else {
    const yearsAgo = Math.floor(daysAgo / 365);
    return `${yearsAgo} years ago`;
  }
};

const renderTweets = function(tweets) {
  // loops through tweets
  for (const tweetData of tweets) {
    const $tweet = createTweetElement(tweetData);
    // console.log($tweet);
    $(document).ready(function() {
      $('#tweets-container').append($tweet);
    });
  }
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
};

const createTweetElement = function(tweet) {
  const daysAgo = calculateDaysAgo(tweet.created_at);
  const distanceMessage = createDistanceMessage(daysAgo);

  return `
    <article class="tweet">
      <header>
        <div>
          <img src="${tweet.user.avatars}">
          <name>${tweet.user.name}</name> 
        </div>
        <address>${tweet.user.handle}</address>
      </header>

      <section class="existing-tweet">
        <p>${tweet.content.text}</p>
      </section>

      <footer>
        <date>${distanceMessage}</date>
        <div class="icons">
          <i class="fa-solid fa-flag" id="flag"></i>
          <i class="fa-solid fa-retweet" id="retweet"></i>
          <i class="fa-solid fa-heart" id="like"></i>
        </div>
      </footer>
    </article>`;
};

$(document).ready(function() {
  $(function() {
    const $form = $('#tweet-form');
    $form.submit(function(event) {
      event.preventDefault();
      const tweetText = $(this).serialize();      
      $.ajax({
        type: "POST",
        url: '/tweets/',
        data: tweetText,
        success: function(res) {
          console.log(res);
        }
      });      
    });
  });
});

const loadTweets = function() {
  $(document).ready(function() {
    $.ajax( {
      type: 'GET',
      url: '/tweets/',
      success: function(res) {
        $('#tweets-container').append(renderTweets(res));
      }
    })
  });
};

loadTweets();