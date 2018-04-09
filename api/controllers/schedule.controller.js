var mongoose = require('mongoose'),
    Teacher = mongoose.model('User'),
    child = mongoose.model('Child'),
    Validations = require('../utils/validations');

module.exports.getTeacherSchedule = function(req, res, next) {

    if (!Validations.isObjectId(req.params.UserId)) {
        return res.status(422).json({
            err: null,
            msg: 'User parameter must be a valid ObjectId.',
            data: null
        });
    }


    Teacher.findById(req.params.UserId).exec(function(err, user) {


        if (err) {
            return next(err);
        }
        if (!user) {
            return res
                .status(404)
                .json({ err: null, msg: 'User not found.', data: null });
        }

        res.status(200).json({
            err: null,
            msg: 'Schedules retrieved successfully.',
            data: user.schedule
        });
    });
};
module.exports.createTeacherSchedule = function(req, res, next) {
    /* var valid = req.params._id && Validations.isString(req.params._id);
     if (!valid) {
         return res.status(422).json({
             err: null,
             msg: 'name(String) is a required field.',
             data: null
         });
     }*/
    //console.log(req.params.email);
    Teacher.findById(req.params.UserId).exec(function(err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res
                .status(404)
                .json({ err: null, msg: 'User not found.', data: null });
        }
        if(user.role !='Teacher'){
            return res
                .status(401)
                .json({ err: null, msg: 'Unauthorized Access.', data: null });
        }
        if(user.schedule.table.saturday.length ==0)
        for(var i=0; i< 8 ; i++){

            user.schedule.table.saturday.push({});
        }
        if(user.schedule.table.sunday.length ==0)
        for(var i=0; i< 8 ; i++){

            user.schedule.table.sunday.push({});
        }
        if(user.schedule.table.monday.length ==0)
        for(var i=0; i< 8 ; i++){

            user.schedule.table.monday.push({});
        }
        if(user.schedule.table.tuesday.length ==0)
        for(var i=0; i< 8 ; i++){

            user.schedule.table.tuesday.push({});
        }
        if(user.schedule.table.wednesday.length ==0)
        for(var i=0; i< 8 ; i++){

            user.schedule.table.wednesday.push({});
        }
        if(user.schedule.table.thursday.length ==0)
        for(var i=0; i< 8 ; i++){

            user.schedule.table.thursday.push({});
        }
        if(user.schedule.table.friday.length ==0)
        for(var i=0; i< 8 ; i++) {
            user.schedule.table.friday.push({});
        }
        user.save(function(err) {
            if (err) {
                return next(err);
            }
            res.status(201).json({
                err: null,
                msg: 'Schedule created successfully.',
                data: user.schedule.table
            });

        });
        // onsole.log(user.schedule.table);
    });
};

module.exports.getChildSchedule = function(req, res, next) {
    if (!Validations.isObjectId(req.params.ChildId)) {
        return res.status(422).json({
            err: null,
            msg: 'ChildId parameter must be a valid ObjectId.',
            data: null
        });
    }
    if(!req.decodedToken.user.username) {
        if (req.decodedToken.user.role !== 'Parent') {
            return res.status(401).json({
                err: null,
                msg: 'You must be a parent to view the schedule.',
                data: null
            });
        }
    }
    child.findById(req.params.ChildId).exec(function(err, user) {

        if (err) {
            return next(err);
        }
        if (!user) {
            return res
                .status(404)
                .json({ err: null, msg: 'User not found.', data: null });
        }
        if(user._id != req.decodedToken.user._id) {
            if (user.parent_id != req.decodedToken.user._id) {

                return res
                    .status(401)
                    .json({err: null, msg: 'you are not authorized to view the schedule', data: null});

            }
        }
        res.status(200).json({
            err: null,
            msg: 'Schedules retrieved successfully.',
            data: user.schedule.table
        });
    });
};



module.exports.createChildShcedule = function(req, res, next) {

  /*  var valid = req.params.ParentId && Validations.isString(req.params.ParentId);
    if (!valid) {
        return res.status(422).json({
            err: null,
            msg: 'name(String) is a required field.',
            data: null
        });

    }
    var valid = req.params.ChildId && Validations.isString(req.params.ChildId );
    if (!valid) {
        return res.status(422).json({
            err: null,
            msg: 'name(String) is a required field.',
            data: null
        });
    }*/
    child.findById(req.params.ChildId).exec(function(err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res
                .status(404)
                .json({ err: null, msg: 'User not found.', data: null });
        }
        if(user.parent_id !== req.params.ParentId ){

            return res
                .status(401)
                .json({ err: null, msg: '401 Unauthorized', data: null });
        }
        if(user.schedule.table.saturday.length ==0)
        for(var i=0; i< 8 ; i++){
            user.schedule.table.saturday.push({});
        }
        if(user.schedule.table.sunday.length ==0)
        for(var i=0; i< 8 ; i++){
            user.schedule.table.sunday.push({});
        }
        if(user.schedule.table.monday.length ==0)
        for(var i=0; i< 8 ; i++){
            user.schedule.table.monday.push({});
        }
        if(user.schedule.table.tuesday.length ==0)
        for(var i=0; i< 8 ; i++){
            user.schedule.table.tuesday.push({});
        }
        if(user.schedule.table.wednesday.length ==0)
        for(var i=0; i< 8 ; i++){
            user.schedule.table.wednesday.push({});
        }
        if(user.schedule.table.thursday.length ==0)
        for(var i=0; i< 8 ; i++){
            user.schedule.table.thursday.push({});
        }
        if(user.schedule.table.friday.length ==0)
        for(var i=0; i< 8 ; i++) {
            user.schedule.table.friday.push({});
        }

        user.save(function(err) {
            if (err) {
                return next(err);
            }
            res.status(201).json({
                err: null,
                msg: 'schedule is created ',
                data: user.schedule.table
            });
        });
    });
};

module.exports.updateTeacherSchedule = function(req, res, next) {
   //req.decodedToken.user._id
    if (!Validations.isObjectId(req.params.SlotId)) {
        return res.status(422).json({
            err: null,
            msg: 'SlotId parameter must be a valid ObjectId.',
            data: null
        });
    }

    Teacher.findById(req.decodedToken.user._id).exec(function(err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res
                .status(404)
                .json({ err: null, msg: 'User not found.', data: null });
        }
        if(user.role != 'Teacher'){
            return res
                .status(401)
                .json({ err: null, msg: 'Unauthorized action.', data: null });
        }

        var day = req.body.day;
        if(day != 'saturday' && day != 'sunday' && day != 'monday' && day != 'tuesday' &&
            day != 'wednesday' && day != 'thursday' && day != 'friday'){
            return res
                .status(401)
                .json({ err: null, msg: 'Unauthorized Action.', data: null });

        }
        //not sure why day has different color
        var slotsInweek;
        if(req.body.day ==  'saturday') {
            slotsInweek = user.schedule.table.saturday;
        }
        if(req.body.day ==  'sunday') {
            slotsInweek = user.schedule.table.sunday;
        }
        if(req.body.day ==  'monday') {
            slotsInweek = user.schedule.table.monday;
        }
        if(req.body.day ==  'tuesday') {
            slotsInweek = user.schedule.table.tuesday;
        }
        if(req.body.day ==  'wednesday') {
            slotsInweek = user.schedule.table.wednesday;
        }
        if(req.body.day ==  'thursday') {
            slotsInweek = user.schedule.table.thursday;
        }
        if(req.body.day ==  'friday') {
            slotsInweek = user.schedule.table.friday;
        }


        var slot = slotsInweek.id(req.params.SlotId);

        if (!slot) {
            return res
                .status(404)
                .json({ err: null, msg: 'Slot not found.', data: null });
        }

        slot.slot.url = req.body.url;
        slot.slot.description = req.body.description;
        slot.slot.title = req.body.title;


        user.save(function(err) {
            if (err) {
                return next(err);
            }
            res.status(200).json({
                err: null,
                msg: ' Schedule updated successfully.',
                data: slot
            });
        });
    });
};


module.exports.updateChildSchedule = function(req, res, next) {
    //req.decodedToken.user._id
    if (!Validations.isObjectId(req.params.SlotId)) {
        return res.status(422).json({
            err: null,
            msg: 'SlotId parameter must be a valid ObjectId.',
            data: null
        });
    }
    if (!Validations.isObjectId(req.params.ChildId)) {
        return res.status(422).json({
            err: null,
            msg: 'ChildId parameter must be a valid ObjectId.',
            data: null
        });
    }
    child.findById(req.params.ChildId).exec(function(err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res
                .status(404)
                .json({ err: null, msg: 'User not found.', data: null });
        }
        if (user.parent_id != req.decodedToken.user._id) {

            return res
                .status(401)
                .json({err: null, msg: 'you are not authorized to edit the schedule', data: null});

        }
        var day = req.body.day;
        if(day != 'saturday' && day != 'sunday' && day != 'monday' && day != 'tuesday' &&
            day != 'wednesday' && day != 'thursday' && day != 'friday'){
            return res
                .status(401)
                .json({ err: null, msg: 'Unauthorized Action.', data: null });

        }
        //not sure why day has different color
        var slotsInweek;
        if(req.body.day ==  'saturday') {
            slotsInweek = user.schedule.table.saturday;
        }
        if(req.body.day ==  'sunday') {
            slotsInweek = user.schedule.table.sunday;
        }
        if(req.body.day ==  'monday') {
            slotsInweek = user.schedule.table.monday;
        }
        if(req.body.day ==  'tuesday') {
            slotsInweek = user.schedule.table.tuesday;
        }
        if(req.body.day ==  'wednesday') {
            slotsInweek = user.schedule.table.wednesday;
        }
        if(req.body.day ==  'thursday') {
            slotsInweek = user.schedule.table.thursday;
        }
        if(req.body.day ==  'friday') {
            slotsInweek = user.schedule.table.friday;
        }


        var slot = slotsInweek.id(req.params.SlotId);

        if (!slot) {
            return res
                .status(404)
                .json({ err: null, msg: 'Slot not found.', data: null });
        }

        slot.slot.url = req.body.url;
        slot.slot.description = req.body.description;
        slot.slot.title = req.body.title;


        user.save(function(err) {
            if (err) {
                return next(err);
            }
            res.status(200).json({
                err: null,
                msg: ' Schedule updated successfully.',
                data: slot
            });
        });
    });
};