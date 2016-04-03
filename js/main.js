$(function() {
  "use strict";

  /* Show the next slide of the slideshow. */
  function animate() {
    var $activeSlide = $(".active"),
      $nextSlide = ($activeSlide.next().length > 0) ? $activeSlide.next() : $("#slides .slide:first"),
      timeline = new TimelineLite({ onComplete: onComplete, onCompleteParams: ["{self}", $activeSlide, $nextSlide], delay: 1 });

    // Create the timeline animation.
    timeline.set($nextSlide, { css: { zIndex: 3 } })
      .to($activeSlide.find(".description"), 3, { left: "12vw", autoAlpha: 1 })
      .to($activeSlide.find(".sub-description"), 3, { left: "12vw", autoAlpha: 1 }, "-=1.5")
      // TODO: Grayscale won't work in IE.
      .to($activeSlide, 3, { onUpdate: tweenGrayscale, onUpdateParams: ["{self}", 100, 0] }, "-=3")
      .to($activeSlide.find(".rectangle"), 2, { right: "4vw" })
      .fromTo($nextSlide, 2, { left: "100vw" }, { left: "0vw" }, "+=7");
  }

  /* Fired when the timeline has completed. */
  function onComplete(timeline, $previousSlide, $activeSlide) {
    $activeSlide.css("z-index", 2).addClass("active");

    resetSlide(timeline, $previousSlide);
    animate();
  }

  /* Reset the previous slide. */
  function resetSlide(timeline, $slide) {
    timeline.set($slide, { css: { zIndex: 1 } })
      .set($slide.find(".description"), { css: { left: "0vw", autoAlpha: 0 } })
      .set($slide.find(".sub-description"), { css: { left: "0vw", autoAlpha: 0 } })
      .set($slide, { "-webkit-filter": "grayscale(100%)", filter: "grayscale(100%)" })
      .set($slide.find(".rectangle"), { css: { right: -$slide.find(".rectangle").width() } });

    $slide.removeClass("active");
  }

  /* Tween the grayscale value. */
  function tweenGrayscale(timeline, start, end) {
    var progress = Math.floor(timeline.progress() * 100),
      value = start - progress;

    TweenLite.set(timeline.target, { "-webkit-filter": "grayscale(" + value + "%)", filter: "grayscale(" + value + "%)" });
  }

  function init() {
    // Workaround for being unable to set the position of the rectangles in CSS as it breaks mobile.
    $(".rectangle").each(function() {
      $(this).css("right", -$(this).width()).show();
    });

    animate();
  }

  init();

});
