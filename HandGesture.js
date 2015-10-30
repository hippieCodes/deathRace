function loader() {
  console.log("loaded");
  var canvas = document.getElementById("videoCanvas");
  var context = canvas.getContext("2d");
  var video = document.createElement("video");
  var oldFistPos;
  var detector;
  try {
      compatibility.getUserMedia({video:true}, function(stream) {
      try {
        video.src = compatibility.URL.createObjectURL(stream);
      } catch (error) {
        video.src = stream;
      }
      compatibility.requestAnimationFrame(play);
    }, function (error) {
      alert("WebRTC not available");
    });
  } catch (error) {
    alert(error);
  }

  // console.log ( video.readyState );

  function play ( ){
    compatibility.requestAnimationFrame ( play );
    if (video.paused) video.play();
    // console.log( video.videoWidth > 0 );
    if (video.readyState === video.HAVE_ENOUGH_DATA && video.videoWidth > 0) {

      /* Prepare the detector once the video dimensions are known: */
      if (!detector) {
          var width = ~~(80 * video.videoWidth / video.videoHeight);
          var height = 80;
          detector = new objectdetect.detector(width, height, 1.1, objectdetect.frontalface);
      }
      canvas.width = ~~(100 * video.videoWidth / video.videoHeight);
      canvas.height = 100;
      context.drawImage(video, 0, 0, canvas.clientWidth, canvas.clientHeight);

      var coords = detector.detect(video);
      // console.log ( coords );
      if (coords[0]) {
        var coord = coords[0];

        /* Rescale coordinates from detector to video coordinate space: */
        coord[0] *= video.videoWidth / detector.canvas.width;
        coord[1] *= video.videoHeight / detector.canvas.height;
        coord[2] *= video.videoWidth / detector.canvas.width;
        coord[3] *= video.videoHeight / detector.canvas.height;

        /* Find coordinates with maximum confidence: */
        var coord = coords[0];
        for (var i = coords.length - 1; i >= 0; --i)
          if (coords[i][4] > coord[4]) coord = coords[i];

        /* Scroll window: */
        var fistPos = [coord[0] + coord[2] / 2, coord[1] + coord[3] / 2];
        if (oldFistPos) {
          var dx = (fistPos[0] - oldFistPos[0]) / video.videoWidth,
              dy = (fistPos[1] - oldFistPos[1]) / video.videoHeight;

              if ( dx > 0 )
                {
                  moveBombLeft();
                  // console.log ( "left" );
                }
              else if ( dx < 0 ) {
                  moveBombRight();
              //  console.log ( "right" );
              }

              // if ( dy > 0 ) console.log ( "down" );
              // else if ( dy < 0 ) console.log ( "up" );
        }
        else oldFistPos = fistPos;

        /* Draw coordinates on video overlay: */
        context.beginPath();
        context.lineWidth = '2';
        context.fillStyle = 'rgba(0, 255, 255, 0.5)';
        context.fillRect(
          coord[0] / video.videoWidth * canvas.clientWidth,
          coord[1] / video.videoHeight * canvas.clientHeight,
          coord[2] / video.videoWidth * canvas.clientWidth,
          coord[3] / video.videoHeight * canvas.clientHeight);
        context.stroke();
      }
      else oldFistPos = null;

    }
  }
}

window.onload = loader;
