$(document).ready(function() {
  $("#scroll-circle").hide();
// Turn counter red if tweet is too long
  let counter = 140;
  let outputText = document.getElementById("counter");
  outputText.textContent = counter;

  $("#tweet-text").on("keydown", function() {
// counter tracks the length of the input textarea and subtracts it from 140 to calculate remaining character count
    let tweetText = document.getElementById("tweet-text").value;
    if (tweetText.length === 0) {
      counter = 140;
    }

    counter = 140 - tweetText.length;
    outputText.textContent = counter;

    if (counter < 0) {
      outputText.classList.add("negative-warning");
      return counter;
    }

    outputText.classList.remove("negative-warning");
    return counter;
  });

  // Hide nav on scroll, hide scroll circle if at top of page
  $(window).scroll(function() {
    $("#scroll-circle").hide();
    const body = $("body, html").scrollTop();
    if (body === 0) {
      $("nav").show();
      $("#scroll-circle").hide();
    } else {
      $("nav").hide();
      $("#scroll-circle").show();
    }
  });

  // Toggle compose tweet box with btn in nav
  $("#toggle-btn").on("click", function() {
    $("#compose-tweet-box").toggle("slow");
    $("#tweet-text").focus();
  });

  // Toggle compose tweet box with btn in scroll circle
  $("#scroll-up-btn").on("click", function() {
    $("#compose-tweet-box").toggle("slow");
    $("#tweet-text").focus();
  });

});
