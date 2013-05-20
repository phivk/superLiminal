/*!
 * imageloader : a jquery plugin for preloading images
 * Version: 0.2.0
 * Original author: @nick-jonas
 * Website: http://www.workofjonas.com
 * Licensed under the MIT license
 */

;(function ( $, window, document, undefined ) {

    $.imageloader = function(userOptions){
        var options = $.extend({
                urls: [],
                onComplete: function(){},
                onUpdate: function(image, ratio){},
                onError: function(err){}
            }, userOptions),
            loadCount = 0,
            completedUrls = [],
            len = options.urls.length;

        options.urls.forEach(function(item, i){
            var img = new Image(),
                error = false;
            img.src = options.urls[i];
            img.onerror = function(){
                loadCount++;
                options.onError('Sorry, but there was an error loading: ' + options.urls[i]);
            };
            $('<img/>').attr('src', options.urls[i]).load(function(response){
                loadCount++;
                options.onUpdate(loadCount / len, options.urls[loadCount-1]);
                if(loadCount === len){
                    options.onComplete();
                }
            });
        });


    };

})( jQuery, window, document );