var mongoose = require('mongoose');

const blogschema = mongoose.Schema({
    title: { type: 'string', required: true },
    body: { type: 'string', required: true },
    description: { type: 'string', required: true },
    slug: { type: 'string', required: true, unique: true },
    username: { type: 'string', required: true },
    userid: { type: 'string', required: true },
    image: { type: 'string', required: true }
}, { timestamps: true });

const blogmodel = mongoose.model('blogs', blogschema)

module.exports = blogmodel;