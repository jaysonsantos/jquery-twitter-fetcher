curl -d output_info=compiled_code \
  -d compilation_level=SIMPLE_OPTIMIZATIONS \
  -d code_url=https://github.com/jaysonsantos/jquery-twitter-fetcher/raw/master/jquery.twitter.fetcher.js \
  http://closure-compiler.appspot.com/compile > jquery.twitter.fetcher.min.js
