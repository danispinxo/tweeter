$(document).ready(function() {

  let counter = 140;
  let outputText = document.getElementById("counter");
  outputText.textContent = counter;

  $("#tweet-text").on("keydown", function() {
    let tweetText = document.getElementById("tweet-text").value;

    counter = 140 - (tweetText.length + 1);
    outputText.textContent = counter;

    if (counter < 0) {
      outputText.classList.add("negative-warning");
      return counter;
    }

    outputText.classList.remove("negative-warning");
    return counter;

  });

});