document.addEventListener("DOMContentLoaded", function () {
  var framesId = "#scrollframes"
  
  $(framesId).mousewheel(function(event, delta, deltaX, deltaY) {
      console.log(delta, deltaX, deltaY); 
      $(framesId)
				.fps(deltaY);        
  });
  
  (function($) {
		$(document).ready(function() {

			$('#bird')
				.sprite({fps: 9, no_of_frames: 3})
        .spRandom({top: 50, bottom: 200, left: 300, right: 320})
				.isDraggable()
        .activeOnClick()
        .active();               
		  $('#scrollframes')
				.sprite({fps: 6, no_of_frames: 10})
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
