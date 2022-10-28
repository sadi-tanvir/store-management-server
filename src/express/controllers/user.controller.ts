import { Request, Response } from "express"


// welcome route
export const welcomeController = (req: Request, res: Response) => {
    res.json({
        message: 'Welcome to our Website'
    })
}