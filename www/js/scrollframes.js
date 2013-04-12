// TODO
// * fullscreen
// * reverse
// * hi res images
// * layout progressbar
var myFrameScroller;
var myScrollController;
var options;

document.addEventListener("DOMContentLoaded", function () {  
  start();
}, false);


function start () {
  // console.log("body before: ", $("body").children());
  var wrapperId = "wrapper";
  var framesId = "scrollframes";
  var progressClass = "progressDiv";

  options = {
    progress: true,
  }
  
  // setup
  setupDOM(wrapperId, framesId, progressClass);
  setupHandlers();
  
  // init FrameScroller & Controller objects
  myFrameScroller = new FrameScroller(framesId, 7, progressClass);
  myScrollController = new ScrollController(framesId, myFrameScroller);
  myKeyController = new KeyController (myFrameScroller);

  myFrameScroller.setFrameCSS();
}

function setupDOM (wrapperId, framesId, progressClass) {  
  // Frames
  loadFrames(wrapperId, framesId);
  // setFrameCSS(framesId);

  // Progress bar
	if( options.progress ) {
		loadProgress(wrapperId, progressClass);
	}
}

function setupHandlers () {
  // window.resize handler
  $(window).resize(function() {
    console.log('$(window).width(): ', $(window).width());
    scaleFrames();
  });
}

function loadFrames (wrapperId, framesId) {
  // $(wrapperId).prepend('<div id="'+framesId+'"></div>');
  $("#"+wrapperId).prepend('<div id="scrollframes"></div>');
}

function loadProgress (wrapperId, progressClass) {
  // $("#"+wrapperId).append('<div class="'+progressClass+'"><span></span></div>');
  $("#"+wrapperId).append('<div class="'+progressClass+'"><span></span></div>');
}

// reset size of frame div to fit window width
function scaleFrames() {
  var wrapperId = "wrapper";
  var framesId = "scrollframes";
  var progressClass = "progressDiv";

  // destroy sprite animation
  $("#"+framesId).destroy();
  
  // Frames
  myFrameScroller.setFrameCSS();
  myFrameScroller.constructSprite();

  // Progress bar
  if( options.progress ) {
    console.log("found progress");
    // loadProgress to reset progress bar
    loadProgress(wrapperId, progressClass);
  };  

  // deprecated: not necessary
  // init FrameScroller object
  // myFrameScroller = new FrameScroller(framesId, 7, progressClass);
  // init ScrollController object
  // myScrollController = new ScrollController(framesId, myFrameScroller);
}


// define FrameScoller prototype
function FrameScroller (targetId, no_of_frames, progressClass) {
  _self = this;
  this.targetId = targetId;
  // TODO
  // this.sprite =  $._spritely.instances[el_id]

  // this.frameTarget = $(targetId);
  this.no_of_frames = no_of_frames;
  this.frameNumber = 0;
  this.progress = $("#"+progressClass);
  this.fps = 0;
  this.getOnFrameEvents = getOnFrameEvents;
  this.getEventFunction = getEventFunction;
  this.constructSprite = constructSprite;
  this.getFrameNumber = getFrameNumber;
  this.setFrameNumber = setFrameNumber;
  this.preloadSeqs = preloadSeqs;
  this.preloadSeq = preloadSeq;
  this.setFrameCSS = setFrameCSS;

  this.sequences = {
    1: {
      spriteFolder: "img/pilot_sequence/sprites/seq_01_7x15_low_res/",
      spritePrefix: "seq_01_7x15_low_res-",
      spriteExtension: ".jpg",
      no_of_sprites: 3,
      // TODO add end frame property
    }
  };

  this.preloadSeqs();

  // addLoadEvent(preloadSeqs);
  this.constructSprite();
  // this.setFrameNumber(0);
  
  console.log("FrameScroller initiated");
  
  // http://www.techrepublic.com/article/preloading-and-the-javascript-image-object/5214317
  // preload all sequences by passing them to preloadSeq(seq)
  function preloadSeqs () {
    // var cssContentString = "";
    for (var seqNumber in _self.sequences) {
      var seq = _self.sequences[seqNumber];
      preloadSeq(seq);
    };
    console.log("preload finished");
  }

  // preload all sprite images for sequence [seq]
  function preloadSeq (seq) {
    imageObj = new Image();
    imageSources = new Array();
    for (var i = 0; i < seq.no_of_sprites; i++) {
      var imgSrcString = seq.spriteFolder + seq.spritePrefix + i + seq.spriteExtension;
      // set images source list
      imageSources[i] = imgSrcString;
      // preload image
      imageObj.src = imageSources[i];
    };
  };

  function setFrameSprite (spriteSrc) {
    $("#"+framesId).css("background", "transparent url("+spriteSrc+") 0 0 no-repeat");
    // TODO make bg-size percentage dynamic to num_of_frames
    $("#"+framesId).css("background-size", "1000%, 1000%");
  }

  function loadSequenceFrames (wrapperId, framesId) {


    $("#"+wrapperId).prepend('<div id="scrollframes"></div>');
    console.log("prepended: ", '<div id="'+framesId+'"></div>');
  };

  function constructSprite () {
    this.frameTarget = $("#"+_self.targetId);
    this.frameTarget.sprite({
      fps: _self.fps,
      no_of_frames: _self.no_of_frames,
      on_frame: _self.getOnFrameEvents()
    });
  };

  function getOnFrameEvents () {
    var on_frame = {};
    for (var i = 0; i < this.no_of_frames; i++) {
      on_frame[i.toString()] = this.getEventFunction(i);
    };
    return on_frame;
  };
  
  function getEventFunction (i) {
    return function (obj) {
      // TODO change spState to cascade through sprite levels vertically
      // if (i == 5 ) {
      //   obj.spState(2); // change to state 2 (row 2) on frame 8
      // };
      _self.updateFrameNumber(i);
    };
  };

  // get current frameNumber of sprite
  function getFrameNumber () {
    if ($._spritely.instances[_self.targetId]) {
      var frameNumber = $._spritely.instances[_self.targetId]['current_frame'];
      var realFrameNumber = frameNumber + 1;
      if (realFrameNumber > _self.no_of_frames - 1) {
        realFrameNumber = 0;
      };
      return realFrameNumber;
    };
  };

  // set current frameNumber of sprite
  function setFrameNumber (n) {
    if ($._spritely.instances[_self.targetId]) {
      $._spritely.instances[_self.targetId]['current_frame'] = n-1;
    };    
  };

  function setFrameCSS () {
    // setting background image can be disabled, but leads to half visible frames
    // during resizing
    // $("#"+framesId).css("background", "transparent url(img/pilot_sequence/sprites/10x_128_72_ball.png) 0 0 no-repeat");
    $("#"+_self.targetId).css("background", "transparent url(img/pilot_sequence/sprites/seq_01_7x15_low_res/seq_01_7x15_low_res-0.jpg) 0 0 no-repeat");
    // TODO make bg-size percentage dynamic to num_of_frames
    var bgSizeValueString = String(_self.no_of_frames*100) + "%, " + String(_self.no_of_frames*100) + "%"
    $("#"+_self.targetId).css("background-size", bgSizeValueString);
  }
  
  // TODO consider deleting; instead use $._spritely.instances[_self.targetId]['current_frame']
  this.updateFrameNumber = function (frameNumber) {
    this.frameNumber = frameNumber;
    // TODO FIX this doesn't get called for advance from last frame to first frame
    this.updateProgress(frameNumber);
  };
  
  this.updateProgress = function (currentFrameNumber) {
    if ( this.progress ) {
      // calc new width of progressbar
      // console.log("this.getFrameNumber(): ", this.getFrameNumber());
      if (this.getFrameNumber() >= 0) {
        var new_width = ( this.getFrameNumber() / ( _self.no_of_frames - 1) ) * window.innerWidth + 'px';      
        // update progressbar width
        $(".progressDiv span").css( "width", new_width );  
      };
    };
  };  

  // Start and then stop sprite to show updated view
  this.updateView = function () {
    var curFrame = _self.getFrameNumber();
    _self.frameTarget.spStart();
    setTimeout(function () {
      _self.frameTarget.spStop();
      // set back frame to prevent unwanted advance
      _self.setFrameNumber(curFrame);
    }, 10);
  }

  
  this.gettargetId = function () {
    return this.targetId;
  };
  
  this.getFPS = function () {
    return this.fps;
  };
  
  this.setFPS = function (fps) {
    // console.log("setting fps: ", fps);
    if (fps < 0) {
      $._spritely.instances[_self.targetId]['options'].rewind = true;
    }
    else {
      $._spritely.instances[_self.targetId]['options'].rewind = false;
    }
    this.fps = fps;
    // TODO set sprite direction
    this.frameTarget.fps(Math.abs(this.fps));
    // console.log("fps set:", fps);
  };

  // advance sprite by n frames (n can be negative)
  this.advance = function (n) {
    if ($._spritely.instances[_self.targetId]) {
      _self.setFPS(0);
      var nextFrame = _self.getFrameNumber() + n;
      if (nextFrame > _self.no_of_frames - 1) {
        nextFrame = 0;
      }
      else if (nextFrame < 0 ) {
        nextFrame = _self.no_of_frames - 1;
      };

      _self.setFrameNumber(nextFrame);
      this.updateView();
    };
  };  
};

// define ScrollController prototype
function ScrollController (controlId, targetFrameScroller) {
  // construct ScrollController
  var _self = this;
  this.controlId = controlId;
  this.targetFrameScroller = targetFrameScroller;
  this.delta = 0;
  this.deltaX = 0;
  this.deltaY = 0;
  // wheelToScroll parameters
  this.scrollMax = 30;
  // smoothing parameters
  this.scrollOutDelay = 500;
  this.decayFactor = 0.6;
  
  $("#"+_self.controlId).mousewheel(function(event, delta, deltaX, deltaY) {
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
    // console.log(delta, deltaX, deltaY);
    var scrollSpeed = this.wheelToScroll(delta, deltaX, deltaY);
    this.setScrollOut();
    this.targetFrameScroller.setFPS(scrollSpeed);
  };
  
  this.setScrollOut = function () {
    this.lastWheelStamp = new Date().getTime();
    // console.log("this.lastWheelStamp in setScrollOut: ", this.lastWheelStamp);
    var scrollTimeoutID = window.setTimeout(_self.scrollOut, _self.scrollOutDelay);      
  };
  
  this.scrollOut = function () {
    var nowStamp = new Date().getTime();
    // console.log("this.lastWheelStamp: ", _self.lastWheelStamp);
    // console.log("nowStamp: ", nowStamp);
    // console.log("deltatime: ", nowStamp - _self.lastWheelStamp);
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
    // console.log('scrollspeed: ', scrollSpeed);
    return scrollSpeed;
  };
   
};


// define KeyController prototype
function KeyController (targetFrameScroller) {
  // construct ScrollController
  var _self = this;
  this.targetFrameScroller = targetFrameScroller;
  
  // $(window).bind('keypress', function(e) {
  //   _self.keydownHandler(e);
  // });

  $(window).keydown(function(e) {
    _self.keydownHandler(e);
  });

  this.keydownHandler = function (e) {
    
    var code = (e.keyCode ? e.keyCode : e.which);
    console.log("KEY pressed in handler: ", code);
    if(code == 39 || code == 40) { // "RIGHT ARROW or DOWN ARROW"
      _self.targetFrameScroller.advance(1);
    };
    if(code == 37 || code == 48) { // "LEFT ARROW or UP ARROW"
      _self.targetFrameScroller.advance(-1);
    };

    if(code == 70) { // "f"
      console.log(_self.targetFrameScroller.getFrameNumber());
    };


  };   
};
