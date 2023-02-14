const mongoose = require('mongoose');
const reactionSchema = require('./Reaction.js');

function formatDate(date) {
    return `${date.toDateString()} at ${date.toLocaleTimeString()}`;
}

const thoughtSchema = new mongoose.Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: formatDate
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false,
    }
)

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})

const Thought = mongoose.model('thought', thoughtSchema);

module.exports = Thought;