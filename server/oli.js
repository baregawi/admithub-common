/**
 * Oli API
 */
Oli = {
  getTwilioSignature: function(authToken, url, params) {
    Object.keys(params).sort().forEach(function(key, i) {
      url = url + key + params[key];
    });
    return Npm.require('crypto').createHmac('sha1', authToken)
                                .update(new Buffer(url, 'utf-8'))
                                .digest('Base64');
  },
  _callEndpoint: function(method, endpoint, params) {
    var authToken = dotGet(Meteor, 'settings.twilio.auth_token');

    var headers = {
      'X-Twilio-Signature': Oli.getTwilioSignature(
        authToken, endpoint, params)
    };

    var syncPost = Meteor.wrapAsync(HTTP.call);
    try {
      return syncPost('POST', endpoint, {
        params: params,
        headers: headers
      });
    }
    catch (e) {
      logger.error('Error calling ' + endpoint + ':\n  params: ', params,'\n',e);
      throw e;
    }
  },
  // Parameter schema for ``Oli.initiate``
  initiateParams: new SimpleSchema({
    userId: {type: String, regEx: SimpleSchema.RegEx.Id},
    // FIXME: remove transport once oli doesn't epend on it.
    transport: {type: String, allowedValues: ["twilio", "web"], optional: false},
    body: {type: String, optional: true},
    media: {type: String, regEx: SimpleSchema.RegEx.Url, optional: true},
    workflow: {type: String, optional: true},
    persona: {type: String, optional: true},
    forceRevalidate: {type: Boolean, optional: true},
    prefix: {type: String, optional: true}
  }),
  /**
   * Tell Oli to start workflow processing for the given userId in its current
   * state.
   * @param {Object} params - Parameters as defined in ``Oli.initiateParmas``
   * schema.
   */
  initiate: function(params) {
    check(params, Oli.initiateParams);
    return Oli._callEndpoint(
      'POST',
      dotGet(Meteor, 'settings.oli.initiate'),
      params
    );
  },
  // parameter schema for ``Oli.handleWebMessage``
  handleWebMessageParams: new SimpleSchema({
    userId: {type: String, regEx: SimpleSchema.RegEx.Id},
    body: {type: String, optional: true},
    media: {type: String, regEx: SimpleSchema.RegEx.Url, optional: true},
    workflow: {type: String, optional: true},
    persona: {type: String, optional: true}
  }),
  /**
   * Forward a message posted via the web on to Oli.
   * @param {Object} params - Parameters as defined in
   * ``Oli.handleWebMessageParams`` schema
   */
  handleWebMessage: function(params) {
    check(params, Oli.handleWebMessageParams);
    return Oli._callEndpoint(
      'POST',
      dotGet(Meteor, 'settings.oli.handleWebMessage'),
      params
    );
  },
  // parameter schema for ``Oli.coldSMS``
  coldSmsParams: new SimpleSchema({
    userId: {type: String, regEx: SimpleSchema.RegEx.Id},
    body: {type: String, optional: true},
    media: {type: String, regEx: SimpleSchema.RegEx.Url, optional: true},
    workflow: {type: String, optional: true},
    persona: {type: String, optional: true},
    forceRevalidate: {type: Boolean, optional: true}
  }),
  /**
   * Fire off an SMS to Oli, bypassing any usual workflow processing.
   * @param {Object} params - Parameters as defined in ``coldSmsParams`` schema
   */
  coldSMS: function(params) {
    check(params, Oli.coldSmsParams);
    return Oli._callEndpoint('POST',
      dotGet(Meteor, 'settings.oli.coldSMS'),
      params
    );
  },
  /**
   * Express middleware to authenticate requests using twilio's authentication
   * strategy. See https://www.twilio.com/docs/security
   */
  authenticateTwilio: function(req, res, next) {
    var twilio = Meteor.npmRequire('twilio');
    var valid = twilio.validateRequest(
      dotGet(Meteor, "settings.twilio.auth_token") || '1234',
      dotGet(req, "headers.x-twilio-signature"),
      Meteor.absoluteUrl(req.url.substring(1)), // strip leading "/"
      req.body
    );

    if (valid) {
      next();
    } else {
      if (Meteor.isDevelopment) {
        logger.error("Twilio auth failed.");
        next();
      } else {
        res.writeHead(401, {"Content-Type": "text/plain"});
        res.end("Authentication failed");
      }
    }
  },
};