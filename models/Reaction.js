const mongoose = require('mongoose');

function formatDate(date) {
    return date.toDateString();
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
    }
)

module.exports = reactionSchema;