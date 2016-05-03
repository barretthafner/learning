// litebox
// next features:
// use "data-litebox" instead of "data-youtube-id" requires RegEx fun times
// do other things in litebox: img, html, vimeo


;(function() {

  // wait for DOM content to load before you do anything
  document.addEventListener('DOMContentLoaded', function(){


    //  -------------------------------------------------------------------
    // Document Event Listener
    //
    // adds an event listener to the entire body
    // onclick traverses the DOM to looking any element on the event with data-youtube-id attribute
    // shows first one found in the lightbox
    document.addEventListener('click', function (event) {

      if (event.which === 1) { // left click
        var target = event.target;
        while (target) {
          if (target.dataset.youtubeId) {
            event.preventDefault();
            showVideo(target.dataset.youtubeId);
            return;
          } else if (target.parentElement) {
            target = target.parentElement;

          // if no parent, at body, exit while loop
          } else {
            target = false;
          }
        }
      }
    });

    //  -------------------------------------------------------------------
    // Append css from litebox.css to head

    var liteboxCSS = document.createElement("link");
    liteboxCSS.href = "litebox.css";
    liteboxCSS.type = "text/css";
    liteboxCSS.rel = "stylesheet";
    document.getElementsByTagName("head")[0].appendChild(liteboxCSS);

    //  -------------------------------------------------------------------
    //    Append litebox html at the end of the body
    //
    //    <div id="litebox-overlay" style="display: none;">
    //      <div id="litebox-content">
    //      </div>
    //      <span id="litebox-close"></span>
    //    </div>

    var htmlTemplate = '<div id="litebox-overlay" style="display: none;"><div id="litebox-content"></div><span id="litebox-close"></span></div>';

    document.body.insertAdjacentHTML('beforeend', htmlTemplate);

    //  -------------------------------------------------------------------
    //  Get litebox html elements

    var liteboxOverlay = document.querySelector('#litebox-overlay');
    var liteboxContent = document.querySelector('#litebox-content');
    var liteboxCloseButton = document.querySelector('#litebox-close');

    //  -------------------------------------------------------------------
    //  Add event listeners

    //  Hide litebox when liteboxContent is clicked
    //  liteboxContent fills the litebox
    //  doesn't trigger when the video is clicked since the event.target is the iframe
    liteboxContent.addEventListener('click', function(event) {
      if (event.target === liteboxContent) {
        hideLitebox();
      }
    });

    //  Hide litebox when "X" close div is clicked
    //  Should be changed to a button
    liteboxCloseButton.addEventListener('click', hideLitebox);

    //  Hide litebox when "esc" key is pressed
    document.addEventListener('keydown', function(event) {
      if (event.keyCode === 27) { // esc key
        hideLitebox();
      }
    });


    //  -------------------------------------------------------------------
    //  Functions

    // showVideo
    // requires a youtube ID

    function showVideo(youtubeID) {

      // creat YouTube iframe template
      var iframe = '<iframe width="560" height="315" src="https://www.youtube.com/embed/{youtubeID}" frameborder="0" allowfullscreen></iframe>';

      // inject html and show litebox
      liteboxContent.innerHTML = iframe.replace('{youtubeID}', youtubeID);
      liteboxOverlay.style.display = 'block';
    }

    // hideLitebox
    // hide overlay and erase innerHTML of content
    function hideLitebox() {
      liteboxOverlay.style.display = 'none';
      liteboxContent.innerHTML = '';
    }
  }, false); // DOMContentLoaded event listener
}()); // end of IIFE
