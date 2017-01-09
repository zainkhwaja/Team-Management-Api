var Attachment = require('./attachment.model.js');
var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;

var AWS = require('aws-sdk');
//AWS.config.loadFromPath('config/aws.json');
var s3Bucket = new AWS.S3({params: {Bucket: ''}});

var Card = require('./../cards/card.model.js');

exports.listAll = function (req, res, next) {
    Attachment.find({}, function (err, attachments) {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Something went wrong. Please try again.',
                data: err
            });
        }
        res.status(200).json({
            success: true,
            message: 'All attachments fetched successfully.',
            data: attachments
        });
    });
};

exports.addAttachment = function (req,res,next) {
    log('Uploading attachment..');
    if (req.file) {
        var filename = req.params.id+'_'+Date.now()+ file;
       // var buf = new Buffer(req.body.file.replace(/^data:image\/\w+;base64,/, ""), 'base64');
        var data = {
            Key: 'attachment/'+filename,
            Body: buf,
          //  ContentEncoding: 'base64',
            ContentType: req.file.file.type
        };
        s3Bucket.putObject(data, function (err, data) {
            if (err) {
                console.log(err);
                console.log('Error uploading data: ', data);
            } else {
                console.log(data);
                console.log('succesfully uploaded the image!');
                Card.findById(req.params.id, function (err, card) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Something went wrong while getting card on upload',
                            success: false,
                            data: null
                        });
                    }

                    //log(user);
                    var tempObj = {
                        name : filename ,
                        src : 'https://s3-' + config.s3.region + '.amazonaws.com/' + config.s3.imageBucket + '/attachments/' + filename,
                        type : req.file.file.type
                    };
                    var attachment = new Attachment(tempObj);
                    card.attachment.push(attachment._id);
                    card.save(function (err, savedCard) {
                        if (err) {
                            return res.status(500).json({
                                message: 'Something went wrong while saving user',
                                success: false,
                                data: null
                            });
                        }

                        attachment.save(function (err,savedAttachment) {
                            if (err) {
                                return res.status(500).json({
                                    message: 'Something went wrong while adding attachment',
                                    success: false,
                                    data: err
                                });
                            }
                            return res.status(200).json({
                                message: 'Attachment uploaded',
                                success: true,
                                data: savedAttachment
                            });


                        });


                    });
                });
            }
        });
    }
    else {
        return res.status(500).json({
            message: 'no file',
            success: false,
            data: null
        });
    }
};
