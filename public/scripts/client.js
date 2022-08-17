/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const safetyCheck = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const renderTweets = function(tweets) {
  // loops through tweets
  tweets = tweets.reverse();

  for (const tweetData of tweets) {
    const $tweet = createTweetElement(tweetData);
    $(document).ready(function() {
      $('#tweets-container').append($tweet);
    });
  }
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
};

const createTweetElement = function(tweet) {

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
        <p>${safetyCheck(tweet.content.text)}</p>
      </section>

      <footer>
        <date>${timeago.format(tweet.created_at)}</date>
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
      const submittedText = document.getElementById('tweet-text').value;

      if (submittedText.length <= 0) {
        $('#long-tweet-msg').hide();
        $('#empty-tweet-msg').show("slow");
        return;
      } else if (submittedText.length > 140) {
        $('#empty-tweet-msg').hide();
        $('#long-tweet-msg').show("slow");
        return;
      }

      $('#empty-tweet-msg').hide();
      $('#long-tweet-msg').hide();

      const tweetText = $(this).serialize();
      $.ajax({
        type: "POST",
        url: '/tweets/',
        data: tweetText,
        success: function(res) {
          console.log(res);
          location.reload();
        }
      })
        // .then(this.reset());
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