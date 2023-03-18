import express, { Express, Request, Response } from 'express';

const register = async(req: Request, res: Response) => {
const {login, password } = req.body;
}
const login = async(req: Request, res: Response) => {
    const {login, password } = req.body;
}

module.exports = {register, login}