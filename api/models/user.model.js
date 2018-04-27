var mongoose = require('mongoose');
const Message = require('./message.model');

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
    name: {
        firstName: { type: String, required: true },
        middleName: { type: String },
        lastName: { type: String, required: true }
    },
    birthday: Date,
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    photo: {
        type: String,
        default: 'lam3i'
    },
    coverPhoto: {
        type: String,
        default: 'coverPhoto'
    },
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
        updatedAt: { type: Date, default: Date.now },
    },
    score: Number,
    //IDs :
    allowedArticles: [String],
    favorites: {
        items: [String],
        resources: [String],
        activities: [String]
    }
});

const SessionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    grade: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    fees: {
        type: Number,
        required: true
    }
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
        firstName: { type: String, required: true },
        middleName: { type: String },
        lastName: { type: String, required: true }
    },
    birthday: Date,
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    photo: {
        type: String,
        default: 'lam3i'
    },
    coverPhoto: {
        type: String,
        default: 'coverPhoto'
    },
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

    mailToken: {
        id: String,
        expires: Date
    },

    mailActivated: {
        type: Boolean,
        required: true,
        default: false
    },

    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],

    myItems: [String],
    cart: [String],
    interests: [String],

    //------ Teacher ------ //

    isVerified: {
        type: Boolean,
        default: false
    },
    isReviewed: {
        type: Boolean,
        default: false
    },
    fees: Number,
    sessions: [SessionSchema],
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
        updatedAt: { type: Date, default: Date.now },
    },
    about: String,
    qualifications: [String],
    students: [String],
    favorites: {
        items: [String],
        resources: [String],
        activities: [String]
    }
});


// Override the transform function of the schema to delete the password before it returns the object

if (!UserSchema.options.toObject) {
    UserSchema.options.toObject = {};
}

UserSchema.options.toObject.transform = function (document, transformedDocument) {
    delete transformedDocument.password;
    return transformedDocument;
}
    ;

if (!ChildSchema.options.toObject) {
    ChildSchema.options.toObject = {};
}

ChildSchema.options.toObject.transform = function (document, transformedDocument) {
    delete transformedDocument.password;
    return transformedDocument;
};

mongoose.model('Child', ChildSchema);
const User = mongoose.model('User', UserSchema);
mongoose.model('UniqueUser', UniqueUserSchema);