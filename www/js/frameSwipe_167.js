(function(window, PhotoSwipe){

	document.addEventListener('DOMContentLoaded', function(){
		var options = {
      captionAndToolbarHide: true,
      enableDrag: false,
      // How images will fit onto the screen. Either "fit", "fitNoUpscale" or "zoom"
      imageScaleMethod: "zoom",
      // The margin between each image in pixels.
      margin: 0,
      // The maximum a user can zoom into an image. Default = 5.0 (set to zero for this to be ignored)
      maxUserZoom: 3,
      // The min a user can zoom into an image. Default = 0.5 (set to zero for this to be ignored)
      minUserZoom: 1,
      // mouseWheelSpeed: How responsive the mouse wheel is. Default = 500
      // 6 fps: 1000 / 6 = 167 ms
      mouseWheelSpeed: 167,
      // nextPreviousSlideSpeed: How fast images are displayed when the next/previous buttons are clicked in milliseconds. Default = 0 (immediately)
      nextPreviousSlideSpeed: 167,
      // prevent user from closing photoSwipe (e.g. by ESC)
      preventHide: true,
      // Prevents the slideshow being activated. Also hides the "play" button from the toolbar. Default = false
      preventSlideshow: true,
      // Easing function used when sliding. Default = "ease-out". "step-start" jumps immediately to the end state of the animation
      slideTimingFunction: "step-start",
      // DOM Target for PhotoSwipe. By default "window" which will mean PhotoSwipe runs "fullscreen". Value must be a valid DOM element.
      // target: "frames",
      // target: window.document.querySelectorAll('#frames')[0],
			getImageSource: function(obj){
				return obj.url_full;
			},
			getImageCaption: function(obj){
				return obj.caption;
			}
		};					
	  // construct list of photoSwipe img objects
    function getImgObjList(folder, fileNameStart, extension, indexStart, indexEnd) {
      imgList = []
      for (var i = indexStart; i < indexEnd + 1; i++) {
        img = {
          url_full: folder + fileNameStart + ('000' + i).substr(-3) + extension,
          caption: 'Image '+ ('000' + i).substr(-3)
        };
        imgList.push(img);
      };
      return imgList;
    };
    // img file range options
    var folder = "img/pilot_sequence/1280_720/";
    var fileNameStart = "superLiminal_1280x720_";
    var extension = ".jpg";
    var indexStart = 1;
    var indexEnd = 20;
    imgList = getImgObjList(folder, fileNameStart, extension, indexStart, indexEnd);
    
		instance = PhotoSwipe.attach(imgList, options);
		instance.show(0);
		
	}, false);
}(window, window.Code.PhotoSwipe));

// format of imgList
// [              
//   { url_full: 'img/pilot_sequence/1280_720/superLiminal_1280x720_001.jpg', caption: 'Image 001'},
//   { url_full: 'img/pilot_sequence/1280_720/superLiminal_1280x720_002.jpg', caption: 'Image 002'},
//   { url_full: 'img/pilot_sequence/1280_720/superLiminal_1280x720_003.jpg', caption: 'Image 003'},
// ]