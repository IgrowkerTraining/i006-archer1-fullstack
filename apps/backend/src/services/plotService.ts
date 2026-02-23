import { plot } from "generated/prisma/client";
import prisma from "../utils/prisma";

interface CreatePlot {
    name: string;
    totalSurface: number;
    exploitationId: string;
}

class PlotService {
    async findAll(): Promise<plot[]> {
        return await prisma.plot.findMany();
    }

    async create(plotData: CreatePlot): Promise<plot> {
        const { name, totalSurface, exploitationId } = plotData;
        return await prisma.plot.create({
            data: {
                name,
                totalsurface: totalSurface,
                exploitation_plot_exploitationToexploitation: {
                    connect: { id: exploitationId },
                },
            },
        });
    }
}

export default new PlotService();