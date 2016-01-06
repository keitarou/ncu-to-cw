#!/usr/bin/env node

var _ = require('lodash');
var ncu = require('npm-check-updates');
var postChatworkMessage = require('post-chatwork-message');

var PACKAGE_FILE = process.env.PACKAGE_FILE || 'package.json';
var API_KEY      = process.env.API_KEY;
var ROOM_ID      = process.env.ROOM_ID;

ncu.run({
  packageFile: PACKAGE_FILE
}).then(function(upgraded) {

  var template = _.template('[info][title]バージョンアップデートを待っているパッケージたちがいます。対応してあげてください。[/title]<%= body %>[/info]');
  var body = '';

  for (var pkg in upgraded)
  {
    var version = upgraded[pkg];

    body += pkg + ':' + version + '\n';
  }

  return postChatworkMessage(API_KEY, ROOM_ID, template({body: body}));
});
