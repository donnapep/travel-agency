$(function() {
  var timeline = new TimelineLite({ delay: 1 }),
    $width = $(window).innerWidth() + "px",
    $london = $(".london"),
    $paris = $(".paris");

  // TODO: Grayscale won't work in IE.
  timeline
    .to($london.find(".description"), 3, { left: "12vw", autoAlpha: 1 })
    .to($london.find(".location"), 3, { left: "12vw", autoAlpha: 1 }, "-=1.5")
    .to($london, 3, { onUpdate: tweenGrayscale, onUpdateParams: ["{self}", 100, 0] }, "-=3")
    .to($london.find(".rectangle"), 2, { right: "2vw" })
    .from($paris, 2, { x: $width }, "+=7");

  function tweenGrayscale(timeline, start, end) {
    var progress = Math.floor(timeline.progress() * 100),
      value = start - progress;

    TweenMax.set(timeline.target, {'-webkit-filter': 'grayscale(' + value + '%)', 'filter': 'grayscale(' + value + '%)'});
  }
});
