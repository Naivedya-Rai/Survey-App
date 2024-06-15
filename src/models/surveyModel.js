const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class SurveyModel {

    static async getAllSurveys() {
        return await prisma.survey.findMany();
    }

    static async createSurvey(data) {
        return await prisma.survey.create({
            data: {
                title: data.title,
                questions: {
                    create: data.questions.map(question => ({
                        text: question.text,
                        options: {
                            create: question.options.map(option => ({
                                text: option.text
                            }))
                        }
                    }))
                }
            }
        });
    }

    static async getSurveyById(id) {
        return await prisma.survey.findUnique({ 
            where: { id },
            include: {
                questions: {
                  include: {
                    options: true // Include options for each question
                  }
                }
              }
         });
    }

    static async updateSurvey(id, data) {
        return await prisma.survey.update({
            where: { id: parseInt(id, 10) }, // Ensure id is parsed as integer
            data: {
              title: data.title,
              questions: {
                update: data.questions.map(question => ({
                  where: { id: question.id },
                  data: {
                    text: question.text,
                    options: {
                      update: question.options.map(option => ({
                        where: { id: option.id },
                        data: { text: option.text, votes: option.votes }
                      }))
                    }
                  }
                }))
              }
            },
            include: {
              questions: {
                include: {
                  options: true // Include options for each question
                }
              }
            }
          });
        }

    static async deleteSurveyById(id) {
        return await prisma.survey.delete({ where: { id } })
    }

}

module.exports = SurveyModel;