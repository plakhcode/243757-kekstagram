'use strict';

require(['./upload', './pictures'], function(upload, pictures) {
  upload();
  pictures();
});
