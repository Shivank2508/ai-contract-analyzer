import { Request, Response } from "express";
import userModel from "../modals/user.model";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

export const loginApi = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email });

        if (!user) {
            throw new Error("Invalid Credentials");
        }

        const matched = await bcrypt.compare(
            password,
            user.password
        );

        if (!matched) {
            throw new Error("Invalid Credentials");
        }
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET as string,
            {
                expiresIn: (process.env.JWT_EXPIRES_IN || "7d") as any
            }
        )
        res.status(201).json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            token,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error,
        });
    }
}

export const signupController = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body

        const exist = await userModel.findOne({ email })
        if (exist) {
            res.json({
                message: "user is alredy exist"
            })
        }
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds)
        const user = await userModel.create({
            name,
            email,
            password: hashPassword,
        })

        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET as string,
            {
                expiresIn: (process.env.JWT_EXPIRES_IN || "7d") as any
            }
        )

        res.status(201).json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            token,
        });
    } catch (error) {
        console.log(error)
    }
}
