'use strict';

require(['./upload', './resizer', './pictures'], function(upload, resizer, pictures) {
  upload();
//  resizer();
  pictures();
});
