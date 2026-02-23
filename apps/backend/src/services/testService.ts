import { usertest } from "generated/prisma/client";
import prisma from "../utils/prisma"

interface CreateUser {
    id: number;
    name: string;
    email: string;
}

class TestService {
    async findAll(): Promise<usertest[]> {
        return await prisma.usertest.findMany();
    }

    async create(userData: CreateUser): Promise<usertest> {
        return await prisma.usertest.create({ data: userData });
    }
}

export default new TestService();
