Dialogs = new Mongo.Collection('dialogs')

Dialogs.attachSchema(new SimpleSchema({
  '_id': {type: String, optional: true},
  'name': {type: String, optional: true},
  'humanName': {type: String, optional: true},
  'description': {type: String, optional: true},
  'messagingService': {type: String, optional: true},
  'createdAt': {type: Date, optional: true},
  'updatedAt': {type: Date, optional: true},
  'hidden': {type: Boolean, optional: true},
  'sentToUsers': {type: Boolean, optional: true},
  'initialState': {type: String , optional: false},
  'states': {type: [String], optional: true},
  'expirationLength': {type: Number, optional: true},
  'reminders': {type: [Object], blackbox: true, optional: true},
  'converted': {type: Boolean, optional: true}, //a flag to show that the dialog was converted from a data workflow by script
  'isIntro': {type: Boolean, optional: true, defaultValue: false},
  'metadata': {type: new SimpleSchema({
    'createdBy': {type: String, optional: false},
    'createdVia': {type: String, optional: false}
  }), optional: true}
}))

DialogStates = new Mongo.Collection('dialogStates')

DialogStates.attachSchema(new SimpleSchema({
  '_id': {type: String, optional: true},
  'name': {type: String, optional: true},
  'promptType': {type: String, optional: false},
  'prompt': {type: String, optional: true},
  'skip': {type: new SimpleSchema({
      'query': {type: String}
    }), optional: true
  },
  'media': {type: String, optional: true},
  'parentDialog': {type: String, optional: false},
  'nextStates': {type: Object, blackbox: true},
  'enterActions': {type: [Object], blackbox: true, optional: true},
  'exitActions': {type: [Object], blackbox: true, optional: true},
  'range': {type: new SimpleSchema({
    min: {type: Number, optional: false},
    max: {type: Number, optional: false}
  }), optional: true},
  'multipleChoices': {type: [new SimpleSchema({
    prompt: {type: String, optional: false}
  })], optional: true},
  'pauseTime': {type: Number, optional: true},
  'converted': {type: String, optional: true},
  'createdAt': {type: Date, optional: true},
  'updatedAt': {type: Date, optional: true},
  'openingAiResponseState': {type: Boolean, optional: true}
}))