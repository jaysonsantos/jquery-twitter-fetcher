;(function ($) {
    var holder;
    
    format_date = function (date) {
        var created_hours = (new Date() - new Date(date)) / 1000 / 60 / 60;
        
        if (created_hours < 1) {
            var minutes = Math.round(created_hours * 60);
            if (minutes < 1) {
                return 'just now';
            } else if (minutes == 1) {
                return '1 minute ago';
            } else {            
                return  minutes + ' minutes ago';
            }
        } else if (created_hours < 24)  {
            var hours = Math.round(created_hours);
            if (hours == 1) {
                return '1 hour ago';
            } else {
                return  + hours + ' hours ago';
            }
        } else {
            var days = Math.round(created_hours / 24);
            if (days == 1) {
                return  '1 day ago';
            } else {
                return days + ' days ago';
            }
        }
    }
    
    var options = {
        limit: 10,
        profile_name: true,
        profile_screen_name: false,
        profile_image: true,
        user: null,
        list: null,
        show_time: true,
        format_date_callback: format_date
    }
    var list_url = 'https://api.twitter.com/1/lists/statuses.json?callback=?'
    var user_url = 'https://api.twitter.com/1/statuses/user_timeline.json?callback=?'
    
    var format_text = function (text) {
        text = text.replace(/(http[s]?.\S*)/gi, '<a href="$1">$1</a>');
        text = text.replace(/#(.[^\s,]*)/g, '#<a href="http://twitter.com/search?q=%23$1">$1</a>');
        text = text.replace(/@(.[a-z0-9-_]*)/gi, '@<a href="http://twitter.com/$1">$1</a>');
        return text
    }

    var process_data = function(data) {
        for (var i in data) {
            var tweet = $('<li>');

            if (options.profile_name) {
                tweet.append($('<span>').text(data[i].user.name));
            }

            if (options.profile_screen_name) {
                tweet.append($('<span>').text('@' + data[i].user.screen_name));
            }

            if (options.profile_image) {
                tweet.append($('<img>').attr('src',
                    data[i].user.profile_image_url)
                );
            }
            
            tweet.append($('<p>').html(
                format_text(data[i].text)
            ));

            if (options.show_time) {
                tweet.append($('<span>').addClass('date').text(
                    options.format_date_callback(data[i].created_at))
                );
            }
            
            holder.removeClass('loading').find('ul').append(tweet);
        }
    }

    var methods = {
        init: function (custom_options) {
            $.extend(options, custom_options);
            holder = $(this[0]);
            holder.twitter_fetcher('update');
        },
        update: function () {
            if (!options.user) {
                $.error('User is a mandatory option.');
            }
            
            holder.empty().addClass('loading').append($('<ul>'));
            
            if (options.list) {
                $.getJSON(list_url, {slug: options.list,
                    owner_screen_name: options.user, count: options.limit},
                    process_data
                );
            } else {
                $.getJSON(user_url, {screen_name: options.user,
                    count: options.limit}, process_data
                );
            }
        }
    }
    
    $.fn.twitter_fetcher = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || ! method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' +  method + ' does not exist on jQuery.twitter.fetcher');
        }
    };

})(jQuery);
