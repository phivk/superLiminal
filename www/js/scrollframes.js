// TODO
// contact Sebastian re reverse sprite direction

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
      // TODO set sprite direction
      // contact Sebastian re sprites with two directions
      $(this.targetDiv).fps(Math.abs(this.fps));
      console.log("fps set:", fps);
    };
    
  };
  
  // define ScrollController class
  function ScrollController (controlDiv, targetFrameScroller) {
    // construct ScrollController
    var _self = this;
    this.controlDiv = controlDiv;
    this.targetFrameScroller = targetFrameScroller;
    this.delta = 0;
    this.deltaX = 0;
    this.deltaY = 0;
    // wheelToScroll parameters
    this.scrollMax = 30;
    // smoothing parameters
    this.scrollOutDelay = 500;
    this.decayFactor = 0.6;
    
    
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
      console.log(delta, deltaX, deltaY);
      var scrollSpeed = this.wheelToScroll(delta, deltaX, deltaY);
      this.setScrollOut();
      this.targetFrameScroller.setFPS(scrollSpeed);
    };
    
    this.setScrollOut = function () {
      this.lastWheelStamp = new Date().getTime();
      console.log("this.lastWheelStamp in setScrollOut: ", this.lastWheelStamp);
      var scrollTimeoutID = window.setTimeout(_self.scrollOut, _self.scrollOutDelay);      
    };
    
    this.scrollOut = function () {
      var nowStamp = new Date().getTime();
      console.log("this.lastWheelStamp: ", _self.lastWheelStamp);
      console.log("nowStamp: ", nowStamp);
      console.log("deltatime: ", nowStamp - _self.lastWheelStamp);
      if ((nowStamp - _self.lastWheelStamp) >= 0.95 * _self.scrollOutDelay) {
        
        if (_self.targetFrameScroller.getFPS() > 1) {
          // var decayFactor = 0.6;
          var decayed = _self.targetFrameScroller.getFPS() * _self.decayFactor;
          // console.log("*********DECAYING LOG!!!!");
          _self.targetFrameScroller.setFPS(decayed);
          window.setTimeout(_self.scrollOut, 100);
        }
        else {
          // console.log("*********KILLING LOG!!!!");
          _self.targetFrameScroller.setFPS(0);
        };
        // _self.targetFrameScroller.setFPS(0);
      };
    };
    
    // normalize mousewheel delta to frame scroll speed
    this.wheelToScroll = function (delta, deltaX, deltaY) {
      // pick greatest mousewheelDelta
      var controlDelta;
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        controlDelta = deltaX;
      }
      else {
        // inverse deltaY so downward mousewheel is forward scroll
        controlDelta = -deltaY;
      };
      
      // transform mousewheel speed to scroll speed
      
      // using inverse hyperbolic sine function sinh^-1(x) == log(x+sqrt(x^2 + 1))
      // http://www.wolframalpha.com/input/?i=y+%3D+15+*+log%28x%2Bsqrt%28x%5E2+%2B+1%29%29+%28x+from+-500+to+500%29
      var scrollSpeed = ( this.scrollMax / 6 ) * Math.log(controlDelta+Math.sqrt(Math.pow(controlDelta,2) + 1));
      
      // using double logistic sigmoid function
      // http://www.wolframalpha.com/input/?i=plot+y%3D+100+*+sgn%28x%29*%281+-+e%5E%28-%280.02x%29%5E2%29%29+%28x+from+-300+to+300%29
      // var scrollSpeed = 100 * sign(controlDelta) * (1 - Math.exp( - Math.pow( 0.02 * controlDelta, 2)));
      // *not responsive enough on start of scroll
      console.log('scrollspeed: ', scrollSpeed);
      return scrollSpeed;
    };
     
  };
  
  // init FrameScroller object
  var myFrameScroller = new FrameScroller("#scrollframes", 10);
  console.log(myFrameScroller.getTargetDiv());
  var myScrollController = new ScrollController("#scrollframes", myFrameScroller);
  
  var framesId = "#scrollframes";
  
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
