var mongoose = require('mongoose');

const UniqueUserSchema = new mongoose.Schema({});

const ChildSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
      type: String,
      default: 'Child'
    },
    name: {
        firstName: {type: String, required: true},
        middleName: {type: String},
        lastName: {type: String, required: true}
    },
    birthday: Date,
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    photo: String,
    parent_id: {
        type: String,
        required: true
    },
    schedule: {
        table: {
            saturday: [{
                slot: {
                    title: {
                        type: String,
                        default: 'title'
                    },
                    description: {
                        type: String,
                        default: 'description'
                    },
                    url: {
                        type: String,
                        default: 'url'
                    }
                }
            }],
            sunday: [{
                slot: {
                    title: {
                        type: String,
                        default: 'title'
                    },
                    description: {
                        type: String,
                        default: 'description'
                    },
                    url: {
                        type: String,
                        default: 'url'
                    }
                }
            }],
            monday: [{
                slot: {
                    title: {
                        type: String,
                        default: 'title'
                    },
                    description: {
                        type: String,
                        default: 'description'
                    },
                    url: {
                        type: String,
                        default: 'url'
                    }
                }
            }],
            tuesday: [{
                slot: {
                    title: {
                        type: String,
                        default: 'title'
                    },
                    description: {
                        type: String,
                        default: 'description'
                    },
                    url: {
                        type: String,
                        default: 'url'
                    }
                }
            }],
            wednesday: [{
                slot: {
                    title: {
                        type: String,
                        default: 'title'
                    },
                    description: {
                        type: String,
                        default: 'description'
                    },
                    url: {
                        type: String,
                        default: 'url'
                    }
                }
            }],
            thursday: [{
                slot: {
                    title: {
                        type: String,
                        default: 'title'
                    },
                    description: {
                        type: String,
                        default: 'description'
                    },
                    url: {
                        type: String,
                        default: 'url'
                    }
                }
            }],
            friday: [{
                slot: {
                    title: {
                        type: String,
                        default: 'title'
                    },
                    description: {
                        type: String,
                        default: 'description'
                    },
                    url: {
                        type: String,
                        default: 'url'
                    }
                }
            }],

            //  validate: [arrayLimit,'{PATH} exceeds the limit of 8']

        },
        updatedAt: {type: Date, default: Date.now},
    },
    score: Number,
    //IDs :
    allowedArticles: [String],
    enrolledActivities: [String]
});


const UserSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
        enum: ['Admin', 'Parent', 'Teacher']
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true //Will be trimmed in the frontend as well while sending the request.
    },
    name: {
        firstName: {type: String, required: true},
        middleName: {type: String},
        lastName: {type: String, required: true}
    },
    birthday: Date,
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    photo: String,
    phone: String,
    address: {
        street: String,
        city: String,
        state: String,
        zip: Number
    },

    joinedAt: {
        type: Date,
        default: Date.now()
    },

    myItems: [String],
    cart: [String],

    //------ Teacher ------ //

    isVerified: {
        type: Boolean,
        default: false
    },
    fees: Number,
    schedule: {
        table: {
            saturday: [{
                slot: {
                    title: {
                        type: String,
                        default: 'title'
                    },
                    description: {
                        type: String,
                        default: 'description'
                    },
                    url: {
                        type: String,
                        default: 'url'
                    }
                }
            }],
            sunday: [{
                slot: {
                    title: {
                        type: String,
                        default: 'title'
                    },
                    description: {
                        type: String,
                        default: 'description'
                    },
                    url: {
                        type: String,
                        default: 'url'
                    }
                }
            }],
            monday: [{
                slot: {
                    title: {
                        type: String,
                        default: 'title'
                    },
                    description: {
                        type: String,
                        default: 'description'
                    },
                    url: {
                        type: String,
                        default: 'url'
                    }
                }
            }],
            tuesday: [{
                slot: {
                    title: {
                        type: String,
                        default: 'title'
                    },
                    description: {
                        type: String,
                        default: 'description'
                    },
                    url: {
                        type: String,
                        default: 'url'
                    }
                }
            }],
            wednesday: [{
                slot: {
                    title: {
                        type: String,
                        default: 'title'
                    },
                    description: {
                        type: String,
                        default: 'description'
                    },
                    url: {
                        type: String,
                        default: 'url'
                    }
                }
            }],
            thursday: [{
                slot: {
                    title: {
                        type: String,
                        default: 'title'
                    },
                    description: {
                        type: String,
                        default: 'description'
                    },
                    url: {
                        type: String,
                        default: 'url'
                    }
                }
            }],
            friday: [{
                slot: {
                    title: {
                        type: String,
                        default: 'title'
                    },
                    description: {
                        type: String,
                        default: 'description'
                    },
                    url: {
                        type: String,
                        default: 'url'
                    }
                }
            }],

            //  validate: [arrayLimit,'{PATH} exceeds the limit of 8']

        },
        updatedAt: {type: Date, default: Date.now},
    },
    about: String,
    qualifications: [String],
    students: [String]

});

// Override the transform function of the schema to delete the password before it returns the object

if (!UserSchema.options.toObject) {
    UserSchema.options.toObject = {};
}

UserSchema.options.toObject.transform = function (document, transformedDocument) {
    delete transformedDocument.password;
    return transformedDocument;
};

if (!ChildSchema.options.toObject) {
    ChildSchema.options.toObject = {};
}

ChildSchema.options.toObject.transform = function (document, transformedDocument) {
    delete transformedDocument.password;
    return transformedDocument;
};

mongoose.model('Child', ChildSchema);
mongoose.model('User', UserSchema);
mongoose.model('UniqueUser', UniqueUserSchema);
