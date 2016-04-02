$(function() {
  var $london = $(".london"),
    $description = $(".description"),
    $location = $(".location"),
    $price = $(".price"),
    timeline = new TimelineLite({ "delay": 1 });

  // Animation duration = 7.5 seconds
  timeline.to($description, 3, { left: "3em", autoAlpha: 1 });
  timeline.to($location, 3, { left: "3em", autoAlpha: 1 }, "-=1.5");
  timeline.to($price, 2, { autoAlpha: 1 });
  timeline.to($(".container"), 2, { top: "5em" });

  // Slide duration = 12 seconds. Transition slide up after 5 seconds.


  // Gray to full colour.
  $(".container").removeClass("grayscale");
});
