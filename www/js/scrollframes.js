document.addEventListener("DOMContentLoaded", function () {
  
  // define FrameScoller class
  function FrameScroller (targetDiv, no_of_frames) {
    // construct FrameScroller
    this.targetDiv = targetDiv;
    this.no_of_frames = no_of_frames;
    this.fps = 0;
    $(this.targetDiv)
			.sprite({fps: this.fps, no_of_frames: this.no_of_frames})
    
    console.log("FrameScroller initiated");
    
    // define methods
    this.getTargetDiv = function () {
      return this.targetDiv;
    };
    
    this.getFPS = function () {
      return this.fps;
    };
    
    this.setFPS = function (fps) {
      this.fps = fps;
    };
    
  };
  
  // define ScrollController class
  function ScrollController (controlDiv) {
    // construct ScrollController
    var _self = this;
    this.controlDiv = controlDiv;
    this.delta = 0;
    this.deltaX = 0;
    this.deltaY = 0;
    
    $(this.controlDiv).mousewheel(function(event, delta, deltaX, deltaY) {
        _self.mousewheelHandler(event, delta, deltaX, deltaY);
    });
    
    // Get and set Delta (X and Y)
    this.getDelta = function () {
      return this.delta;
    };
    this.setDelta = function (delta) {
      this.delta = delta;
    };
    
    this.getDeltaX = function () {
      return this.deltaX;
    };
    this.setDeltaX = function (deltaX) {
      this.deltaX = deltaX;
    };
    
    this.getDeltaY = function () {
      return this.deltaY;
    };
    this.setDeltaY = function (deltaY) {
      this.deltaY = deltaY;
    };
    
    this.mousewheelHandler = function (event, delta, deltaX, deltaY) {
      this.setDelta(delta);
      this.setDeltaX(deltaX);
      this.setDeltaY(deltaY);
    };
     
  };
  
  // init FrameScroller object
  var myFrameScroller = new FrameScroller("#scrollframes", 10);
  console.log(myFrameScroller.getTargetDiv());
  
  
  var myScrollController = new ScrollController("#scrollframes");
  // $("#scrollframes").mousewheel(function(event, delta, deltaX, deltaY) {
  //       myScrollController.setDelta(delta);
  //       myScrollController.setDeltaX(deltaX);
  //       myScrollController.setDeltaY(deltaY);

  //   });
  
  var framesId = "#scrollframes";
  
  // $(framesId).mousewheel(function(event, delta, deltaX, deltaY) {
  //     console.log(delta, deltaX, deltaY); 
  //     $(framesId)
  //        .fps(deltaY);        
  // });
  
  (function($) {
		$(document).ready(function() {

			$('#bird')
				.sprite({fps: 9, no_of_frames: 3})
        .spRandom({top: 50, bottom: 200, left: 300, right: 320})
				.isDraggable()
        .activeOnClick()
        .active();               
      // $('#scrollframes')
      //        .sprite({fps: 6, no_of_frames: 10})
        // .activeOnClick()
        // .active();
			window.actions = {
			  
				fly_slowly_forwards: function() {
					$('#bird')
						.fps(10)
						.spState(1);
				},
				fly_slowly_backwards: function() {
					$('#bird')
						.fps(10)
						.spState(2);
				},
				fly_quickly_forwards: function() {
					$('#bird')
						.fps(20)
						.spState(1);
				},
				fly_quickly_backwards: function() {
					$('#bird')
						.fps(20)
						.spState(2);
				},
				fly_like_lightning_forwards: function() {
					$('#bird')
						.fps(25)
						.spState(1);
				},
				fly_like_lightning_backwards: function() {
					$('#bird')
						.fps(25)
						.spState(2);
				}
			};

			window.page = {
				hide_panels: function() {
					$('.panel').hide(300);
				},
				show_panel: function(el_id) {
					this.hide_panels();
					$(el_id).show(300);
				}
			}

		});
	})(jQuery);
	
	
}, false);
