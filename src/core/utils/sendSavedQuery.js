var Query = require('../query');
var request = require('superagent');
var responseHandler = require('../helpers/superagent-handle-response');
var sendQuery = require('./sendQuery');

module.exports = function(path, params, callback){
  var url = this.client.url(path) + '/' + params.query_name + '/result';
  var _this = this;
  var key;

  if (this.client.readKey()) {
    key = this.client.readKey()
  }
  else if (this.client.masterKey()) {
    key = this.client.masterKey()
  }

  request
    .get(url)
    .set('Content-Type', 'application/json')
    .set('Authorization', key)
    .timeout(this.timeout())
    .send(params || {})
    .end(handleSavedQueryResponse);

  function handleSavedQueryResponse(err, res) {
    responseHandler(err, res, callback);
    callback = null;
  }

  return;
}
