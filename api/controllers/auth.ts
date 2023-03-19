import express, { Express, Request, Response } from 'express';
const User = require('../models/User')

const register = async(req: Request, res: Response) => {
    const user = await User.create({...req.body})
}
const login = async(req: Request, res: Response) => {
    const {login, password } = req.body;
    console.log("LOGIN LOGIN LOGIN")
    res.status(200).json({data: "LOGIN"});
}

module.exports = {register, login}