const mongoose = require('mongoose');

const AnalyticsSchema = mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    date: {
        type: Number,
        required: true,
    },
    ttfb: {
        type: Number,
        required: true,
    },
    fcp: {
        type: Number,
        required: true,
    },
    domLoad: {
        type: Number,
        required: true,
    },
    windowLoad: {
        type: Number,
        required: true,
    },
    resourceLoad: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model('Analytics', AnalyticsSchema);