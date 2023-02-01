const express = require('express');
const UserData = require('../models/userData');
const router = express.Router();

//on game opens call this api to check if user with userid exist if not create it  in DB
router.post("/checkUser", async (req, res) => {
    const uid = req.body.UserId;
    const bal = req.body.Balance;
    try {
        const newUser = new UserData({
            userId: uid,
            balance: bal,
        });
        const user = await UserData.findOne({ 'userId': uid });

        if (user === null) {
            // console.log(newUser);
            const u = await newUser.save();

            res.status(200).json(u);
        } else {
            res.status(200).json(user);
        }

    } catch (error) {
        res.status(500).json(error);
    }
});

// get and update balance -----------------------------------
router.put("/updateBalance", async (req, res) => {
    try {
        const uid = req.body.UserId;
        const newBal = req.body.Balance;

        // console.log(id, newBal);
        const update = await UserData.updateOne({ 'userId': uid }, { '$set': { 'balance': newBal } });

        res.status(200).json(update);

    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/getBalance/:uid", async (req, res) => {
    try {
        const id = req.params.uid;

        const user = await UserData.findOne({ 'userId': id });

        res.status(200).json(user.balance);

    } catch (error) {
        res.status(500).json(error);
    }
});





// bet place api
/// Player history  and  round create
router.put("/updateRoundHistory", async (req, res) => {
    try {
        const uid = req.body.UserId;
        const roundid = req.body.RoundID;
        const bTime = req.body.BetTime
        const coutTime = req.body.CashoutTime
        const amtBet = req.body.AmountBet;
        let winAmt = req.body.AmountWin;

       

        const update = await UserData.updateOne({ 'userId': uid }, {
            $push: {
                betHistory: {
                    "roundId": roundid,
                    "betTime": bTime,
                    "cashoutTime": coutTime,
                    "amountBet": amtBet,
                    "winning": winAmt,
                }
            }
        });

        

        res.status(200).json(update);

    } catch (error) {
        res.status(500).json(error);
    }
});


module.exports = router;