# jQuery Twitter Fetcher

A simple plugin to include some tweets to your html page.

## Simple usage:

Remember to include `jQuery` and the `jquery.twitter.fetcher` files on your page:

```javascript
jQuery('#tweets_holder').twitter_fetcher({user: 'jaysonsantos', limit: 10});
```
This will show user's tweets inside #tweets_holder.
If you want to display a user's list do this.

```javascript
jQuery('#tweets_holder').twitter_fetcher({user: 'jaysonsantos', limit: 10, list: 'test_list'});
```

Check example.html inside the repository to see it working or try the [project GitHub page](http://jaysonsantos.github.com/jquery-twitter-fetcher/).

## Other usages:

You can override some options like this:

```javascript
jQuery('#tweets_holder').twitter_fetcher({user:'jaysonsantos'}, limit:10,
    profile_name: true, profile_screen_name: false,
    format_date_callback: your_callback);
```

Where profile_name will show user real name, and format_date_callback will execute a custom callback to display dates for example, if you want to translate that information.

