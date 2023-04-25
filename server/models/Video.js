const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type:String,
        maxlength:50,
    },
    description: {
        type: String,
    },
    privacy: {
        type: Number,
    },
    filePath : {
        type: String,
    },
    catogory: {
        type: String,
    },
    views : {
        type: Number,
        default: 0 
    },
    thumbnail: {
        type: String
    }
}, { timestamps: true })


// 서치관련해서 추가

videoSchema.index({ 
    title:'text',
    description: 'text',
}, {
    weights: {
        title: 5,
        description: 1,
    }
})
const Video = mongoose.model('Video', videoSchema);

module.exports = { Video }