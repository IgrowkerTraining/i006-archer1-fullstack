import prisma from "@/utils/prisma";
import {CreatePlotDTO} from "../DTOs/plot"

class PlotService {
  async create(data: CreatePlotDTO) {

    
    const exploitationExists = await prisma.exploitation.findUnique({
      where: { id: data.exploitation },
    });

    if (!exploitationExists) {
      throw new Error("Exploitation does not exist");
    }
    const plot = await prisma.plot.create({
      data: {
        name: data.name,
        exploitation: data.exploitation,
      },
    });

    return plot;
  }
}

export default new PlotService();