const mongoose = require('mongoose');
const connection=mongoose.createConnection('mongodb://localhost:27017/backend-practice', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});