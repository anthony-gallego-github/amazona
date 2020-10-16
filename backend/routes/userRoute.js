import express from 'express';
import User from '../models/userModel';
import { getToken, isAuth } from '../util';

const router = express.Router();

router.post('/signin', async (req, res) => {
    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password,
    });
    if(signinUser) {
        res.send({
            _id: signinUser.id,
            name: signinUser.name,
            email: signinUser.email,
            isAdmin: signinUser.isAdmin,
            token: getToken( signinUser ),
        });
    }else {
        res.status(401).send({ message:'Invalid Email or Password.'});
    }
});

router.post('/register', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    const newUSer = await user.save();
    if (newUSer){
        res.send({
            _id: newUSer.id,
            name: newUSer.name,
            email: newUSer.email,
            isAdmin: newUSer.isAdmin,
            token: getToken( newUSer ),
        })
    } else {
        res.status(401).send({ message:'Invalid User Data.'});
    }
})

router.get("/createadmin", async (req, res) => {
    try {
        const user = new User({
            name: 'Antho',
            email: 'a.gallego@live.fr',
            password: '122112' ,
            isAdmin: true
        });    
        const newUser = await user.save();
        res.send(newUser);
    } catch (error) {
        res.send({ message: error.message });
    }
});

export default router;
