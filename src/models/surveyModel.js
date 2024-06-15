import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class SurveyModel {

    static async getAllSurveys() {
        return await prisma.survey.findMany();
    }

    static async createSurvey(data) {
        return await prisma.survey.create({ data });
    }

    static async getSurveyById(id) {
        return await prisma.survey.findUnique({ where: { id } });
    }

    static async updateSurvey(id, data) {
        return await prisma.survey.update({ where: { id }, data });
    }

    static async deleteSurveyById(id) {
        return await prisma.survey.delete({ where: { id } })
    }

}

module.exports = SurveyModel;