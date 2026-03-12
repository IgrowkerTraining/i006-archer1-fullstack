import { Request, Response } from "express";
import testService from "../services/testService";

class TestController {
    async findAll(req: Request, res: Response) {
        const users = await testService.findAll();
        console.log(req.user);
        res.json(users);
    }

    async create(req: Request, res: Response) {
        const user = await testService.create(req.body);
        res.json(user);
    }
}

export default new TestController();