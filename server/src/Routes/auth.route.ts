import express from "express"
import { loginApi, signupController } from "../controller/auth.controller"
const route = express.Router()
route.post("/signup", signupController)
route.post("/login", loginApi)

export default route