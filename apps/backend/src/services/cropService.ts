import prisma from "@/utils/prisma";

import {CreateCropDTO} from "../DTOs/crop"

class CropService {
  async create(data: CreateCropDTO) {
    const plotExists = await prisma.plot.findUnique({
      where: { id: data.plot },
    });

    if (!plotExists) {
      throw new Error("Plot does not exist");
    }

    const crop = await prisma.crop.create({
      data: {
        name: data.name,
        plot: data.plot,
      },
    });

    return crop;
  }
}

export default new CropService();