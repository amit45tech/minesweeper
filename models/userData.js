const mongoose = require('mongoose');

const userDataSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        require: true,
    },
    betHistory: [
        {
            roundId: String,
            betTime: String,
            cashoutTime: String,
            amountBet: Number,
            winning: Number,
        }
    ]



});

const UserData = mongoose.model('userData', userDataSchema);
module.exports = UserData;