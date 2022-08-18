/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const safetyCheck = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const renderTweets = function(tweets) {
  // loops through tweets
  tweets = tweets.reverse();
  for (const tweetData of tweets) {
    // calls createTweetElement for each tweet
    const $tweet = createTweetElement(tweetData);
    $(document).ready(function() {
      // takes return value and appends it to the tweets container
      $("#tweets-container").append($tweet);
    });
  }
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
    const $form = $("#tweet-form");
    $form.submit(function(event) {
      // prevents default post activity (navigating to /tweets/)
      event.preventDefault();
      const submittedText = document.getElementById("tweet-text").value;
      // posting error messages for empty or too-long tweets
      if (submittedText.length <= 0) {
        $("#long-tweet-msg").hide();
        $("#empty-tweet-msg").show("slow");
        return;
      } else if (submittedText.length > 140) {
        $("#empty-tweet-msg").hide();
        $("#long-tweet-msg").show("slow");
        return;
      }
      // toggling the tweet messages
      $("#empty-tweet-msg").hide();
      $("#long-tweet-msg").hide();
      // serializing the input for post request
      const tweetText = $(this).serialize();
      $.ajax({
        type: "POST",
        url: "/tweets/",
        data: tweetText,
        success: function(res) {
          console.log(res);
          renderTweets(res);
        },
        error: function(error) {
          console.error(error);
        },
      })
        // once post request completes, reset counter, close tweet box, and reload the tweets container to incldue the newly-added tweet without reloading the page
        .then(() => {
          this.reset();
          $("#counter").val(140);
          $("#compose-tweet-box").toggle();
          $("#tweets-container").empty();
          loadTweets();
        });
    });
  });
});

const loadTweets = function() {
  $.ajax({
    type: "GET",
    url: "/tweets/",
    success: function(res) {
      $("#tweets-container").append(renderTweets(res));
    },
  });
};

$(document).ready(function() {
  loadTweets();
});
