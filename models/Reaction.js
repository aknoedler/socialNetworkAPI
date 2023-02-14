const mongoose = require('mongoose');

function formatDate(date) {
    return `${date.toDateString()} at ${date.toLocaleTimeString()}`;
}

const reactionSchema = new mongoose.Schema(
    {
        reactionID: {
            type: mongoose.Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: formatDate
        },
    },
    {
        toJSON: {
            getters: true
        },
        id: false,
    }
)

module.exports = reactionSchema;