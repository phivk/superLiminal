var myFrameScroller;
var myScrollController;
var options;

document.addEventListener("DOMContentLoaded", function () {  
  options = {
    progress:   true,
    decayFactor: 0.8, // decay factor for animation speed and audio volume
    wholeprogress: true, // whether progress is displayed per whole project
    wrapperId: "wrapper",
    framesId: "scrollframes",
    controllerId: "scrollcontroller",
    progressClass: "progressDiv",
    fillersId: "fillers",
    jpId: "jpId",
    audio_supplied: "mp3, oga, webma",
    loadingId: "preloadBar",
    instructionsId: "instructions",
  };

  var media = {
    mp3: "audio/sound.mp3",
    oga: "audio/sound.ogg",
    webma: "audio/sound.webm",
  };

  sequences = {
    1: {
      idx: 1,
      spriteFolder: "img/sprites_final/",
      spritePrefix: "seq_08_7x15_",
      spriteExtension: ".jpg",
      hdFolder: "img/1280_720_final/seq_08/",
      hdPrefix: "seq_08_1280x720_",
      hdExtension: ".jpg",
      fillerFolder: "img/filler_final/seq_08/",
      fillerPrefix: "seq_08_384x216_",
      fillerExtension: ".jpg",
      no_of_columns: 7,
      no_of_rows: 15,
      no_of_sprites: 5,
      frameWidth: 384,
      frameHeight: 216,
    },
    2: {
      idx: 2,
      spriteFolder: "img/sprites_final/",
      spritePrefix: "seq_09_7x15_",
      spriteExtension: ".jpg",
      hdFolder: "img/1280_720_final/seq_09/",
      hdPrefix: "seq_09_1280x720_",
      hdExtension: ".jpg",
      fillerFolder: "img/filler_final/seq_09/",
      fillerPrefix: "seq_09_384x216_",
      fillerExtension: ".jpg",
      no_of_columns: 7,
      no_of_rows: 15,
      no_of_sprites: 1,
      frameWidth: 384,
      frameHeight: 216,
    },
    3: {
      idx: 3,
      spriteFolder: "img/sprites_final/",
      spritePrefix: "seq_02_7x15_",
      spriteExtension: ".jpg",
      hdFolder: "img/1280_720_final/seq_02/",
      hdPrefix: "seq_02_1280x720_",
      hdExtension: ".jpg",
      fillerFolder: "img/filler_final/seq_02/",
      fillerPrefix: "seq_02_384x216_",
      fillerExtension: ".jpg",
      no_of_columns: 7,
      no_of_rows: 15,
      no_of_sprites: 2,
      frameWidth: 384,
      frameHeight: 216,
    },
    4: {
      idx: 4,
      spriteFolder: "img/sprites_final/",
      spritePrefix: "seq_03_7x15_",
      spriteExtension: ".jpg",
      hdFolder: "img/1280_720_final/seq_03/",
      hdPrefix: "seq_03_1280x720_",
      hdExtension: ".jpg",
      fillerFolder: "img/filler_final/seq_03/",
      fillerPrefix: "seq_03_384x216_",
      fillerExtension: ".jpg",
      no_of_columns: 7,
      no_of_rows: 15,
      no_of_sprites: 5,
      frameWidth: 384,
      frameHeight: 216,
    },
    5: {
      idx: 5,
      spriteFolder: "img/sprites_final/",
      spritePrefix: "seq_05_7x15_",
      spriteExtension: ".jpg",
      hdFolder: "img/1280_720_final/seq_05/",
      hdPrefix: "seq_05_1280x720_",
      hdExtension: ".jpg",
      fillerFolder: "img/filler_final/seq_05/",
      fillerPrefix: "seq_05_384x216_",
      fillerExtension: ".jpg",
      no_of_columns: 7,
      no_of_rows: 15,
      no_of_sprites: 7,
      frameWidth: 384,
      frameHeight: 216,
    },
    6: {
      idx: 6,
      spriteFolder: "img/sprites_final/",
      spritePrefix: "seq_07_7x15_",
      spriteExtension: ".jpg",
      hdFolder: "img/1280_720_final/seq_07/",
      hdPrefix: "seq_07_1280x720_",
      hdExtension: ".jpg",
      fillerFolder: "img/filler_final/seq_07/",
      fillerPrefix: "seq_07_384x216_",
      fillerExtension: ".jpg",
      no_of_columns: 7,
      no_of_rows: 15,
      no_of_sprites: 3,
      frameWidth: 384,
      frameHeight: 216,
    },
  };
  
  // setup all html elements in DOM
  setupDOM(options);
  
  // create JPlayer, FrameScroller & Controller objects
  myJPlayer = new JPlayer(options, media);
  myFrameScroller = new FrameScroller(options, sequences, myJPlayer);
  myScrollController = new ScrollController(options, myFrameScroller);
  myKeyController = new KeyController (myFrameScroller, myJPlayer);

  myFrameScroller.setFrameCSS();

  // preload images
  preloadSprites(options, sequences);
  preloadFillerFrames(options, sequences);
  
}, false);

function setupDOM (options) {  
  // Frames
  loadFrames(options);

  // ScrollController
  loadScrollController(options);

  // loading bar
  loadLoadingBar(options);

  // instructions
  loadInstructions(options);

  // Progress bar
	if( options.progress ) {
		loadProgress(options);
	};

  $(window).resize(function() {
    scaleFrames(options);
  });
};

function loadFrames (options) {
  $("#"+options.wrapperId).prepend('<div id="'+options.framesId+'"></div>');  
};

function loadScrollController (options) {
  $("#"+options.wrapperId).prepend('<div id="'+options.controllerId+'" class="overlay"></div>');  
};

function loadProgress (options) {
  $("#"+options.wrapperId).append('<div class="'+options.progressClass+'"><span></span></div>');
};

function loadLoadingBar (options) {
  $("#"+options.wrapperId).append('<div id="'+options.loadingId+'"><span></span></div>');
};

function loadInstructions (options) {
  var instrStr = '<span>Get Ready to Scroll... <br/> Some more Instructions...</span>'

  $("#"+options.wrapperId).append('<div id="'+options.instructionsId+'">'+instrStr+'</div>');
};

// reset size of frame div to fit window width
function scaleFrames(options) {
  // destroy sprite animation
  $("#"+options.framesId).destroy();
  // reset current row
  // myFrameScroller.resetSpriteFrame();
  _self.spriteRow = 1;
  
  
  // Frames
  myFrameScroller.setFrameCSS();
  // construct sprite anew
  myFrameScroller.constructSprite();

  // fit hd images to window
  _self.windowFit($(".hd"), 1280, 720);
}

// preload all sprite images constituting [sequences]
function preloadSprites (options, sequences) {
  // form array of sprite image urls
  var imgurls = [];
  for (var seqNumber in sequences) {
    var seq = sequences[seqNumber];
    for (var i = 1; i <= seq.no_of_sprites; i++) {
      var imgSrcString = seq.spriteFolder + seq.spritePrefix + i + seq.spriteExtension;
      imgurls.push(imgSrcString);
    };
  };

  $.imageloader({
    urls: imgurls,
    onComplete: function(images){
      // when load is complete
      console.log("Sprites Loaded");
      setTimeout(function() {
        $("#"+options.loadingId).css( "bottom", "0" );
      }, 800); // NB: 800ms to equal CSS transition duration of width

      // set handlers to remove instructions upon first interaction
      setTimeout(function() {
        // hide instructions on scroll or keypress interaction
        $(window).on('mousewheel keypress', function() { 
          $("#"+options.instructionsId).hide();
          $(window).off('mousewheel keypress');
        });
      }, 800);
    },
    onUpdate: function(ratio, image){
      // ratio: the current ratio that has been loaded
      // image: the URL to the image that was just loaded
      // console.log("now loaded: ", ratio*100, "%");
      var new_width = ratio * window.innerWidth + 'px';
      // set progressbar width
      $("#"+options.loadingId + " span").css( "width", new_width );  
    },
    onError: function(err){
      // err: error message if images couldn't be loaded
      console.log("error in imgloader: ",   err);  
    }
  });
}

// preload fillerFrames and insert into hidden img elements
function preloadFillerFrames (options, sequences) {
  $("#"+options.wrapperId).append('<div id="'+options.fillersId+'"></div>');
  // form array of fillerFrame image urls
  var imgurls = [];
  var imgurlsFillerIdDict = {};
  for (var seqNumber in sequences) {
    var seq = sequences[seqNumber];
    for (var i = 1; i <= seq.no_of_sprites; i++) {
      // add first frame url
      var firstIdx = (i - 1) * seq.no_of_columns * seq.no_of_rows + 1;
      var paddedFirstIdx = pad(firstIdx, 3);
      var fillerSrcStringFirst = seq.fillerFolder+seq.fillerPrefix+paddedFirstIdx+seq.fillerExtension;
      // console.log("now pushing first: ", fillerSrcStringFirst);
      imgurls.push(fillerSrcStringFirst);
      imgurlsFillerIdDict[fillerSrcStringFirst] = "fillerFrame_"+"seq_"+seq.idx+"_"+i+"_first";

      // add last frame url
      var lastIdx = i * 105;
      var paddedLastIdx = pad(lastIdx, 3);
      var fillerSrcStringLast = seq.fillerFolder+seq.fillerPrefix+paddedLastIdx+seq.fillerExtension;
      
      // console.log("now pushing last: ", fillerSrcStringLast);
      imgurls.push(fillerSrcStringLast);
      imgurlsFillerIdDict[fillerSrcStringLast] = "fillerFrame_"+"seq_"+seq.idx+"_"+i+"_last";
    };
  };

  $.imageloader({
    urls: imgurls,
    onComplete: function(images){
      // when load is complete
      console.log("fillerFrames Loaded");
    },
    onUpdate: function(ratio, image){
      // ratio: the current ratio that has been loaded
      // image: the URL to the image that was just loaded
      // insert loaded fillerFrame into DOM
      var curFillerFrameId = imgurlsFillerIdDict[image];
      $("#"+options.fillersId).append('<img id="'+curFillerFrameId+'" class="fillerFrame hide" src="'+image+'">');
    },
    onError: function(err){
      // err: error message if images couldn't be loaded
      console.log("error in imgloader: ",   err);  
    }
  });
}

// define JPlayer prototype
function JPlayer (options, media) {
  var _self = this;
  this.jpId = options.jpId;
  this.toggle = toggle;
  this.setVolume = setVolume;

  $("#"+_self.jpId).jPlayer( {
    ready: function () {
      $(this).jPlayer("setMedia", media).jPlayer("play"); // Attempt to auto play the media
      $("#"+_self.jpId).jPlayer("volume", 0);
    },
    ended: function() { // The $.jPlayer.event.ended event
      // just '.jPlayer("play")' doesnt work in Firefox, so also use setMedia
      $(this).jPlayer("setMedia", media).jPlayer("play"); // Attempt to auto play the media
      // $(this).jPlayer("play", 0); // Attempt to auto play the media
    },
    supplied: options.audio_supplied,
    loop: true,
    swfPath: "js/vendor/jQuery.jPlayer.2.3.0/"
  });

  console.log("initialised jPlayer");
  
  function toggle () {
    if ( $("#"+_self.jpId).jPlayer("option", "muted") ) {
      $("#"+_self.jpId).jPlayer("unmute");  
      console.log("unmute");
    }
    else {
      $("#"+_self.jpId).jPlayer("mute");
      console.log("mute");
    };
  };

  function setVolume (volume) {
    $("#"+_self.jpId).jPlayer("volume", volume);
  };
}

// define FrameScoller prototype
// function FrameScroller (targetId, no_of_frames, progressClass) {
function FrameScroller (options, sequences, jPlayerObject) {
  _self = this;
  this.targetId = options.framesId;
  this.wholeprogress = options.wholeprogress;
  this.frameTarget;

  this.progress = $("#"+options.progressClass);
  this.fps = 0;
  // current state (row) of sprite
  this.spriteRow = 1;
  this.displayWidth;
  this.displayHeight;

  this.bShowingHD = false;
  this.bPlayingForward = true;

  this.jPlayer = jPlayerObject;

  /// Methods
  // Setup
  this.getOnFrameEvents = getOnFrameEvents;
  this.getEventFunction = getEventFunction;
  this.constructSprite = constructSprite;
  this.setFrameCSS = setFrameCSS;
  this.windowFit = windowFit;
  // this.resetSpriteFrame = resetSpriteFrame;

  this.calcTotalFrames = calcTotalFrames;
  this.total_no_of_frames = calcTotalFrames();

  // sprite animation
  this.getFrameNumber = getFrameNumber;
  this.setFrameNumber = setFrameNumber;
  this.isPlayingForward = isPlayingForward;
  this.loadSprite = loadSprite;

  this.showHDImage = showHDImage;

  this.sequences = sequences
  this.curSequence = this.sequences[1];
  this.curSprite = 1;

  // TODO delete global var for dynamic var (available from sequences)
  this.no_of_frames = this.curSequence.no_of_columns;
  
  this.constructSprite();
  this.showHDImage(1);

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
      // i's are inaccurate for framenumbers, better use _self.getFrameNumber()      
      if (_self.isPlayingForward()) {
        _self.bPlayingForward = true;
        // playing forward
        if ( (_self.getFrameNumber()) % _self.curSequence.no_of_columns == 0 ) {
          // end of spriteRow: swich to next spriteRow
          if (_self.spriteRow < _self.curSequence.no_of_rows ) {
            // advance to next row within current Sprite
            var nextRow = _self.spriteRow + 1;
          }
          else {
            // advance to next Sprite from last row of current Sprite
            var nextRow = 1;
            // set & load next sprite
            _self.setNextSprite();
            _self.setFrameCSS();
          }
          obj.spStateHeight(nextRow, _self.displayHeight);
          _self.spriteRow = nextRow;
        }
      }
      else {
        _self.bPlayingForward = false;
        // playing backward
        if ( (_self.getFrameNumber() + 1 ) % _self.curSequence.no_of_columns == 0 ) {
          // reached beginning of spriteRow: swich to previous spriteRow
          if (_self.spriteRow > 1 ) {
            // recede to previous row within Sprite
            var prevRow = _self.spriteRow - 1;
          }
          else {
            // recede to last row of previous Sprite
            var prevRow = _self.curSequence.no_of_rows;
            // set & load prev sprite
            _self.setPrevSprite();
            _self.setFrameCSS();
          }
          obj.spStateHeight(prevRow, _self.displayHeight);
          _self.spriteRow = prevRow;  
        }
      };
      _self.updateProgress();
    };
  };

  // calc total number of frames in all sequences for progress per whole project
  function calcTotalFrames () {
    var totalFrames = 0;
    for (var seqNumber in this.sequences) {
      var seq = sequences[seqNumber];
      totalFrames += seq.no_of_sprites * seq.no_of_columns * seq.no_of_rows;
    };
    return totalFrames;
  }

  // get current frameNumber of sprite
  // TODO debug
  function getFrameNumber () {
    if ($._spritely.instances[_self.targetId]) {
      // NB ['current_frame'] returns some faulty values on scrolling backwards in full screen
      var frameNumber = $._spritely.instances[_self.targetId]['current_frame'];

      // correct for 1 frame advanced/behind depending on playback direction
      if (_self.isPlayingForward()) {
        var realFrameNumber = frameNumber + 1;
      }
      else {
        var realFrameNumber = frameNumber - 1;
      };
      // loop forward
      if (realFrameNumber > _self.no_of_frames - 1) {
        realFrameNumber = 0;
      }
      // loop backward
      else if (realFrameNumber < 0) {
        realFrameNumber = _self.no_of_frames - 1;
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

  function isPlayingForward () {
    return ! $._spritely.instances[_self.targetId]['options'].rewind;
  };

  function setFrameCSS () {
    // load current Sprite image
    // console.log("bForward: ", _self.isPlayingForward());
    _self.loadSprite(_self.curSprite);

    // windowfit
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    var frameWidth = _self.curSequence.frameWidth;
    var frameHeight = _self.curSequence.frameHeight;

    var frameRatio = frameWidth / frameHeight;
    var windowRatio = windowWidth / windowHeight;

    if (windowRatio > frameRatio) {
      // scale to fit width
      var bgSizeValueString = String(_self.curSequence.no_of_columns*100) + "% " + "auto"
      $("#"+_self.targetId).css("background-size", bgSizeValueString);

      // set display dimensions
      _self.displayHeight = _self.curSequence.frameHeight * $(window).width() / _self.curSequence.frameWidth;
      _self.displayWidth = $(window).width();
    }
    else{
      // scale to fit height
      var bgSizeValueString = "auto " + String(_self.curSequence.no_of_rows * 100) + "%" //, " + String(scalePercentage) + "%"
      $("#"+_self.targetId).css("background-size", bgSizeValueString);

      // set display dimensions
      _self.displayHeight = $(window).height();
      _self.displayWidth = _self.curSequence.frameWidth * $(window).height() / _self.curSequence.frameHeight;
    };
  }

  // fit img size to window size
  function windowFit (jQueryImg, frameWidth, frameHeight) {
    // windowfit
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    
    var frameRatio = frameWidth / frameHeight;
    var windowRatio = windowWidth / windowHeight;

    if (windowRatio > frameRatio) {
      // scale to fit width
      jQueryImg.css("width", "100%");
      jQueryImg.css("height", "auto");
    }
    else{
      // scale to fit height
      jQueryImg.css("height", "100%");
      jQueryImg.css("width", "auto");
    };
  }

  // load current sprite with index [idx] into the target scrollFrames element
  function loadSprite (idx) {
    /// insert fillerFrame for transition between sprites
    // make sure all fillerFrames are transparent
    $(".fillerFrame").addClass("hide");
    if ( _self.bPlayingForward ) {
      // transition animation to next sprite

      // display last frame of current sprite as filler
      // console.log("now toggling: ", "#fillerFrame_seq"+_self.curSequence.idx+"_"+idx+"_first");
      $("#fillerFrame_seq_"+_self.curSequence.idx+"_"+idx+"_first").toggleClass("hide");
    }
    else {
      // transition animation to previous sprite

      // display first frame of current sprite as filler
      // console.log("now toggling: ", "#fillerFrame_seq_"+_self.curSequence.idx+"_"+idx+"_last");
      $("#fillerFrame_seq_"+_self.curSequence.idx+"_"+idx+"_last").toggleClass("hide");
    };

    $("#"+_self.targetId).css("background", "transparent url("+_self.curSequence.spriteFolder+_self.curSequence.spritePrefix+String(idx)+_self.curSequence.spriteExtension+") 0 0 no-repeat");
  }

  // display HD image overlay on top of current sprite frame
  function showHDImage (frameInSequence) {   
    if (_self.HDFrameShown !== frameInSequence) {
      // show HD Image version of current frame

      // add padding
      var paddedFrameNum = pad(frameInSequence, 3);
      // format src string
      var hdSrcString = _self.curSequence.hdFolder+_self.curSequence.hdPrefix+paddedFrameNum+_self.curSequence.hdExtension;

      $('<img src="'+ hdSrcString +'" id="hdbox" class="hd transparent">').load(function() {
        thisImg = this;
        // TODO remove hardcoded '#wrapper' for dynamic wrapperId stored in Framescroller
        $(thisImg).appendTo('#wrapper');
        // fit hd img to window
        _self.windowFit($(thisImg), 1280, 720);
        // fade in hd image (doesnt transition without timeout)
        window.setTimeout(function () {
          $(thisImg).toggleClass("transparent");
        }, 50);
      });

      _self.bShowingHD = true;  
      _self.HDFrameShown = frameInSequence;
    };
  }

  // update Animation Dimensions to reflect window fit resizing
  // for now only width matters
  this.updateAnimationDims = function () {
    if (_self.getAnimationWidth != _self.displayWidth) {
      _self.setAnimationWidth(_self.displayWidth);  
    };
  };
  
  // update progress bar to reflect progress within sequence
  this.updateProgress = function () {
    if ( _self.progress ) {
      if (_self.getFrameNumber() >= 0) {
        // calc new width of progressbar
        if (_self.wholeprogress) {
          // per all frames in sequences
          var full = _self.total_no_of_frames;
          var sofar = _self.getCurFrameInTotal();
        }
        else {
          // per sequence
          var full = _self.curSequence.no_of_sprites * _self.curSequence.no_of_columns * _self.curSequence.no_of_rows;
          var sofar = _self.getCurFrameInSeq();
        };
        var new_width = ( sofar / full ) * window.innerWidth + 'px';

        // set progressbar width
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

  // return number of current frame within sequence
  this.getCurFrameInSeq = function () {
    var curSprite = _self.curSprite;
    var no_of_rows = _self.curSequence.no_of_rows;
    var no_of_columns = _self.curSequence.no_of_columns;
    var curSpriteRow = _self.spriteRow;
    var curFrame = _self.getFrameNumber();

    return (curSprite - 1) * no_of_rows * no_of_columns
      + (curSpriteRow - 1) * no_of_columns
      + curFrame + 1;
  }

  // return number of current frame all total sequences
  this.getCurFrameInTotal = function () {
    var curFrameInSequence =  _self.getCurFrameInSeq();
    var totalFramesSoFar = curFrameInSequence;
    for (var i = 1; i < _self.curSequence.idx; i++) {
      var seq = sequences[i];
      totalFramesSoFar += seq.no_of_sprites * seq.no_of_columns * seq.no_of_rows;
    };
    return totalFramesSoFar;
  }
  
  this.gettargetId = function () {
    return this.targetId;
  };
  
  this.getFPS = function () {
    return this.fps;
  };
  
  this.setFPS = function (fps) {
    // update Animation Dims (not sure why ...['options'] is undefined in scaleFrames() )
    // hack for now: works when called from here
    _self.updateAnimationDims();
    if (fps < 0) {
      $._spritely.instances[_self.targetId]['options'].rewind = true;
    }
    else {
      $._spritely.instances[_self.targetId]['options'].rewind = false;
    }
    this.fps = fps;
    this.frameTarget.fps(Math.abs(this.fps));

    var scrollVolume = this.scrollToVolume(Math.abs(this.fps));
    this.jPlayer.setVolume(scrollVolume);
  };

  // normalize non-negative scrollSpeed to scroll volume for jPlayer
  this.scrollToVolume = function (scrollSpeed) {
    // speeds over topSpeed will result in max volume
    var topSpeed = 40.0;
    if (scrollSpeed < topSpeed) {
      return scrollSpeed / topSpeed;
    }
    else {
      return 1;
    };
  }

  this.setAnimationWidth = function (width) {
    $._spritely.instances[_self.targetId]['options']['width'] = width;
  };
  
  this.getAnimationWidth = function () {
    return $._spritely.instances[_self.targetId]['options']['width'];
  };
  

  // advance sprite by n frames (n can be negative)
  // triggered by keypress
  this.advance = function (n) {
    if ($._spritely.instances[_self.targetId]) {
      _self.setFPS(0);

      var curFrame = _self.getFrameNumber();
      var nextFrame = curFrame + n;

      var deltaColumn = n % _self.no_of_frames
      var nextColumn = _self.getFrameNumber() + deltaColumn;

      var deltaRow = Math.floor(nextFrame / _self.no_of_frames);
      var nextRow = _self.spriteRow + deltaRow;

      // loop column forward
      if (nextColumn > _self.curSequence.no_of_columns - 1) {
        nextColumn = nextColumn - _self.curSequence.no_of_columns;
      }
      // loop row forward
      // NB for now, Rows start at 1, while columns start at 0
      if (nextRow > _self.curSequence.no_of_rows) {
        // reached end of sprite
        // loop row to beginning of sprite
        nextRow = nextRow - _self.curSequence.no_of_rows;
        // set & load next sprite
        _self.setNextSprite();
        _self.setFrameCSS();
      }

      // loop column backward
      if (nextColumn < 0 ) {
        nextColumn = _self.curSequence.no_of_columns + nextColumn;
      };
      // loop row backward
      // NB for now Rows start at 1, while columns start at 0
      if (nextRow < 1 ) {
        // reached beginning of sprite: redece to previous sprite

        // loop row to end of sprite
        nextRow = _self.curSequence.no_of_rows + nextRow;
        // set & load prev sprite
        _self.setPrevSprite();
        _self.setFrameCSS();
      };

      // set sprite column
      _self.setFrameNumber(nextColumn);
      
      // set sprite row
      _self.frameTarget.spStateHeight(nextRow, _self.displayHeight);
      _self.spriteRow = nextRow;

      this.updateView();
    };
    _self.updateProgress();
    
    // show HD image of current frame in sequence
    var curFrameInSequence = _self.getCurFrameInSeq();    
    _self.showHDImage(curFrameInSequence);
  };

  this.setNextSprite = function () {
    // if end of non-last sprite: advance to next sprite within sequence
    if ( _self.curSprite < _self.curSequence.no_of_sprites ) {
      // advance to next Sprite in current Sequence
      _self.curSprite += 1;
    }
    else {
      // advance to next Sequence
      _self.setNextSequence();
    }
  };

  this.setPrevSprite = function () {
    if ( _self.curSprite > 1 ) {
      // recede to previous Sprite in current Sequence
      _self.curSprite -= 1;
    }
    else {
      // recede to last Sprite in previous Sequence
      _self.setPrevSequence();
    };
  };

  this.setNextSequence = function () {
    var nextSequenceIdx;
    if (_self.curSequence.idx < Object.keys(_self.sequences).length) {
      // advance to next Sequence in line
      nextSequenceIdx = _self.curSequence.idx + 1;
    }
    else {
      // loop to first Sequence
      nextSequenceIdx = 1
    };
    _self.curSequence = _self.sequences[nextSequenceIdx];
    _self.curSprite = 1;
  };

  this.setPrevSequence = function () {
    var prevSequenceIdx;
    if (_self.curSequence.idx > 1) {
      // recede to end of previous Sequence
      prevSequenceIdx = _self.curSequence.idx - 1;
    }
    else {
      // recede to end of last Sequence
      prevSequenceIdx = Object.keys(_self.sequences).length;
    };
    
    _self.curSequence = _self.sequences[prevSequenceIdx];
    _self.curSprite = _self.curSequence.no_of_sprites;
  };

  this.hideHDImage = function () {
    if(_self.bShowingHD){
      $(".hd").remove();  
      _self.bShowingHD = false;
    }
  }

  
};

// define ScrollController prototype
function ScrollController (options, targetFrameScroller, jPlayerObject) {
  // construct ScrollController
  var _self = this;
  this.controlId = options.controllerId;
  this.targetFrameScroller = targetFrameScroller;
  this.jPlayer = jPlayerObject;

  this.delta = 0;
  this.deltaX = 0;
  this.deltaY = 0;
  // wheelToScroll parameters
  this.scrollMax = 30;
  // smoothing parameters
  this.scrollOutDelay = 500;
  this.decayFactor = options.decayFactor;
  
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
    
    // hide HD image
    this.targetFrameScroller.hideHDImage();

    // set sprite fps
    this.targetFrameScroller.setFPS(scrollSpeed);
  };
  
  this.setScrollOut = function () {
    this.lastWheelStamp = new Date().getTime();
    // console.log("this.lastWheelStamp in setScrollOut: ", this.lastWheelStamp);
    var scrollTimeoutID = window.setTimeout(_self.scrollOut, _self.scrollOutDelay);      
  };
  
  this.scrollOut = function () {
    var nowStamp = new Date().getTime();

    if ((nowStamp - _self.lastWheelStamp) >= 0.95 * _self.scrollOutDelay) {
      
      if (_self.targetFrameScroller.getFPS() > 1) {
        var decayed = _self.targetFrameScroller.getFPS() * _self.decayFactor;
        _self.targetFrameScroller.setFPS(decayed);
        window.setTimeout(_self.scrollOut, 100);
      }
      else {
        // stop sprite frame advancement
        _self.targetFrameScroller.setFPS(0);
        // show HD image

        // get number of current frame in sequence
        var curFrameInSequence = _self.targetFrameScroller.getCurFrameInSeq() - 1;
        // TODO fix issue getCurFrameInSeq() returning 1 row too less on final column
        // Hack for now: add no_of_columns if {0,7,14,...}
        if (curFrameInSequence % _self.targetFrameScroller.curSequence.no_of_columns == 0) {
          curFrameInSequence += _self.targetFrameScroller.curSequence.no_of_columns;
        };
        _self.targetFrameScroller.showHDImage(curFrameInSequence);
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
function KeyController (targetFrameScroller, jPlayerObject) {
  // construct ScrollController
  var _self = this;
  this.targetFrameScroller = targetFrameScroller;
  this.jPlayer = jPlayerObject;

  $(window).keydown(function(e) {
    _self.keydownHandler(e);
  });

  this.keydownHandler = function (e) {
    
    var code = (e.keyCode ? e.keyCode : e.which);
    // console.log("KEY pressed in handler: ", code);
    if(code == 39 || code == 40) { // "RIGHT ARROW or DOWN ARROW"
      _self.targetFrameScroller.advance(1);
    };
    if(code == 37 || code == 38) { // "LEFT ARROW or UP ARROW"
      _self.targetFrameScroller.advance(-1);
    };
    if(code == 77 ) { // "m"
      console.log("toggle mute");
      _self.jPlayer.toggle();
    };

    if(code == 70) { // "f"
      // console.log(_self.targetFrameScroller.getFrameNumber());
      console.log("f pressed");
      console.log("curFrameInSequence: ", _self.targetFrameScroller.getCurFrameInSeq());     
      // $("img.hd").toggleClass("transparent");
      // _self.targetFrameScroller.hideHDImage();
    };
  };   
};
