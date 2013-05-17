function sign (x) {
  if (x > 0) {return 1}
  else if (x < 0) {return -1}
  else {return 0};
};

// from: http://www.sitepoint.com/closures-and-executing-javascript-on-page-load/
function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      oldonload();
      func();
    }
  }
}

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

function testHelper () {
  console.log("testHelper");
}