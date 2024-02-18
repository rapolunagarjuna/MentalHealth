const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
    GroupName: {
        type:'string',
        required:true,
    }, 
    Description:{
        type:'string',
    }, 
    Keywords: {
        tags:[String],
    },
    CreatedAt:{
        type: Date,
        defaultValue:Date.now()
    },
    UpdatedAt:{
        type: Date,
    }
    
});
module.exports = mongoose.model('Group', GroupSchema);
