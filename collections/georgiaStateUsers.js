var o = {optional: true};

BrandedUserSchema = new SimpleSchema({
  userId: fields.string(),
  "_id": {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  crmId: fields.string({optional: false}), //gsu unique id
  created: fields.date(),
  enrollmentId: fields.string(o), //pantherId for gsu
  schoolEmail: fields.email(o),
  entryYear: fields.number(o),
  entryTerm: fields.string(o),
  studyGroupMember: fields.bool(o),
  email: fields.string(o),
  phone: fields.string(o),
  name: {type: new SimpleSchema({
    first: fields.string(o),
    last: fields.string(o),
    middleInitial: fields.string(o),
    full: fields.string(o),
    nickName: fields.string(o),
  }), optional: true},
  dob: fields.date(o),
  location: {type: new SimpleSchema({
    address1: fields.address(o),
    address2: fields.address(o),
    address3: fields.address(o),
    city: fields.string(o),
    county: fields.string(o),
    state: fields.state(o),
    zip: fields.zip_code(_.extend(o)),
    country: fields.string(o),
  }), optional: true},
  inStateStudent: fields.bool(o),
  application: {type: new SimpleSchema({
    status: fields.status(o), 
    statusExtended: fields.string(o)
  }), optional: true},
  profile: {type: new SimpleSchema({
    studentType: fields.student_type(o),
  }), optional: true},
  finAid: {type: new SimpleSchema({
    fafsaReceived: fields.bool(o), 
    finAidComplete: fields.bool(o), 
    fafsaComplete: fields.bool(o),
    finAidInterest: fields.bool(o),
    finAidInterestInternal: fields.bool(o),
    scholarshipAwarded: fields.bool(o),
    scholarshipAccepted: fields.bool(o),
    missingEntryLoan: fields.bool(o),
    missingPromissoryLoan: fields.bool(o),
    acceptedOfferInternal: fields.bool(o),
    offered: fields.bool(o),
  }),optional: true},
  housing: {type: new SimpleSchema({
    onCampus: fields.bool(o),
    preferenceType: fields.preference_type(o),
    depositPaid: fields.bool(o), 
    depositDate: fields.date(o), 
    internalResponse: fields.string(o),
  }),optional: true},
  orientation:{type: new SimpleSchema ({
    needsToRsvp: fields.bool(o), 
    attended: fields.bool(o), 
    attendedDate: fields.date(o), 
    registeredDate: fields.date(o),
    registeredYetInternal: fields.bool(o)
  }),optional: true},
  textSetting:{type: new SimpleSchema ({
    canText: fields.bool(o),
    wrongNumber: fields.bool(o),
    newPhone: fields.phone_number(o)
  }), optional: true},
  interest: {type: new SimpleSchema({
    crm: fields.number({min: 0, max: 5, optional: true}),
    admithub: fields.number({min: 0, max: 5, optional: true}),
  }), optional: true},
  intent: {type: new SimpleSchema({
    intendsToEnroll: fields.bool(o), 
    intendsToEnrollInternal: fields.bool(o),
    intentReceivedDate: fields.date(o), 
    whyNotAttending: fields.string(o),
    whyNotAttendingExtended: {type: String, max: 700, optional: true},
    whyUnsureExtended: {type: String, max: 700, optional: true},
    counselorCanContact: fields.bool(o),
    whyUnsure: fields.string(o),
    changedMind: fields.bool(o),
    followUpInternal: fields.attending(o), // second time around asking intent
  }), optional: true},
  presumedState: {type: new SimpleSchema({
    fafsaReceived: fields.bool(o), // finAid.fafsaReceived /
    finAidComplete: fields.bool(o), // finAid.finAidComplete /
    housingDepositPaid: fields.bool(o), // housing.depositPaid /
    orientationAttendedDate: fields.date(o), // orientation.attendedDate /
    orientationNeedsToRsvp: fields.bool(o), // orientation.needsToRsvp /
    intendsToEnroll: fields.bool(o) // intent.intendsToEnroll /
  }), optional: true},
  meta: {type: new SimpleSchema({
    pounceIntroBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    pounceIntentBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    orientationBot: {type: new SimpleSchema({
      skip: fields.bool(o),
       finished: fields.bool(o),
    }), optional: true},
    orientationDoneBot: {type: new SimpleSchema({
      skip: fields.bool(o),
       finished: fields.bool(o),
    }), optional: true},
    campusIdBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    emailSetUpBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    housingBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    scholarshipBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    pounceHousingBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    pounceNotAttendingBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    pounceNotSureBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    fafsaFollowUpTwoBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    acceptFinAidBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
  }), optional: true},
  abGroup: {type: Number, optional: true, max: 1, min: 0, decimal: true}
});

GeorgiaStateUsers = new Mongo.Collection('georgiaStateUsers');
GeorgiaStateUsers.attachSchema(BrandedUserSchema);
