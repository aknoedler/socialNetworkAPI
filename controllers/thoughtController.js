const { User, Thought } = require('../models');

// module.exports = {
//     getThoughts(req, res) {
//         User.find()
//             .then((users) => res.json(users))
//             .catch((err) => res.status(500).json(err));
//     },
//     getSingleTho(req, res) {
//         User.findOne({ _id: req.params.userId })
//             .then((user) =>
//                 !user
//                     ? res.status(404).json({ message: 'No user with this ID' })
//                     : res.json(user)
//             )
//             .catch((err) => res.status(500).json(err));
//     },
//     createUser(req, res) {
//         User.create(req.body)
//             .then((user) => res.json(user))
//             .catch((err) => {
//                 console.log(err);
//                 return res.status(500).json(err);
//             });
//     },
//     updateUser(req, res) {
//         User.findOneAndUpdate(
//             { _id: req.params.userId },
//             { $set: req.body },
//             { runValidators: true, new: true }
//         ).then((user) =>
//             !user
//                 ? res.status(404).json({ message: 'No user with this id!' })
//                 : res.json(user)
//         ).catch((err) => res.status(500).json(err));
//     },
//     deleteUser(req, res) {
//         User.findOneAndDelete({ _id: req.params.userId })
//             .then((user) =>
//                 !user
//                     ? res.status(404).json({ message: 'No user with this ID' })
//                     : Thought.deleteMany({ _id: { $in: user.thoughts } })
//             )
//             .then(() => res.json({ message: 'User deleted!' }))
//             .catch((err) => res.status(500).json(err));
//     },
//     createFriend(req, res) {
//         User.findOne({ _id: req.params.friendId })
//             .then((friend) => {
//                 !friend
//                     ? res.status(404).json({ message: 'No user with this ID' })
//                     : User.findOneAndUpdate(
//                         { _id: req.params.userId },
//                         { $push: { friends: friend._id } },
//                         { new: true }
//                     ).then((user) => {
//                         !user
//                             ? res.status(404).json({ message: 'No user with this id!' })
//                             : res.json(user)
//                     }
//                     ).catch((err) => res.status(500).json(err));
//             }
//             ).catch((err) => res.status(500).json(err));
//     },
//     deleteFriend(req, res) {
//         User.findOne({ _id: req.params.friendId })
//             .then((friend) => {
//                 !friend
//                     ? res.status(404).json({ message: 'No user with this ID' })
//                     : User.findOneAndUpdate(
//                         { _id: req.params.userId },
//                         { $pull: { friends: friend._id } },
//                         { new: true }
//                     ).then((user) =>
//                         !user
//                             ? res.status(404).json({ message: 'No user with this id!' })
//                             : res.json(user)
//                     ).catch((err) => res.status(500).json(err));
//             }
//             ).catch((err) => res.status(500).json(err));
//     }
// }