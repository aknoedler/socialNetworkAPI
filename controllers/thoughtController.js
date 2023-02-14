const { User, Thought } = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    createThought(req, res) {
        User.findOne({ username: req.body.username })
            .then((user) => {
                !user
                    ? res.status(404).json({ message: 'No user with this id!' })
                    : Thought.create(req.body)
                        .then((thought) => {
                            user.thoughts.push(thought._id);
                            user.save();
                            res.json(thought)
                        })
                        .catch((err) => {
                            return res.status(500).json(err);
                        });
            })
            .catch((err) => res.status(500).json(err));
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, returnOriginal: true }
        ).then((thought) => {
            if (!thought) {
                res.status(404).json({ message: 'No thought with this id!' })
            } else {
                if (req.body.username != thought.username) {
                    User.findOneAndUpdate(
                        { username: req.body.username },
                        { $push: thought._id }
                    );
                    User.findOneAndUpdate(
                        { username: thought.username },
                        { $pull: thought._id }
                    )
                }
            }
            Thought.findOne({ _id: req.params.thoughtId })
                .then((thought) =>
                    !thought
                        ? res.status(404).json({ message: 'No thought with this id!' })
                        : res.json(thought)
                )
                .catch((err) => res.status(500).json(err));
        }
        ).catch((err) => res.status(500).json(err));
    },
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) => {
                if (!thought) {
                    res.status(404).json({ message: 'No thought with this id!' })
                } else {
                    User.findOneAndUpdate(
                        { username: thought.username },
                        { $pull: thought._id }
                    );
                    res.json({ message: 'Thought deleted!' });
                }
            })
            .catch((err) => res.status(500).json(err));
    },
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { new: true }
        ).then((thought) => {
            !thought
                ? res.status(404).json({ message: 'No thought with this id!' })
                : res.json(thought)
        }
        ).catch((err) => res.status(500).json(err));
    },
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: {_id: req.params.reactionId} } },
            { new: true }
        ).then((thought) => {
            !thought
                ? res.status(404).json({ message: 'No thought with this id!' })
                : res.json(thought)
        }
        ).catch((err) => res.status(500).json(err));
    }
}