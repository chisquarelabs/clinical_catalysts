import { Answers } from "../entities/Answers";
import { dataSource } from '../index';

export const addAnsers = async (answers: Partial<Answers>): Promise<Answers> => {
    const userRepository = dataSource.getRepository(Answers);
    const data = userRepository.create(answers); 
    return userRepository.save(data);
  }

  export const getAnswersService = async () => {
    const answers = await dataSource.getRepository(Answers).find();
    return answers;
  };
  
  export const getAnswersByConditionService = async (condition: string) => {
    const conditions = [
      "stroke",
      "cancer",
      "cardiac",
      "functional_clothes",
      "behavioral_suicide_attempt",
      "behavioral_suicidal_thoughts",
      "behavioral_runaway",
      "cognitive_short_term"
    ];
  
    const results = await dataSource
      .getRepository(Answers)
      .createQueryBuilder("answers")
      .where("answers.questionId IN (:...conditions)", { conditions })
      .andWhere("answers.response != :response", { response: "No" })
      .getMany();
  
  
    return {
      stroke: results.filter((a) => a.questionId === "stroke").length,
      cancer: results.filter((a) => a.questionId === "cancer").length,
      cardiac: results.filter((a) => a.questionId === "cardiac").length,
      functional_clothes: results.filter(
        (a) => a.questionId === "functional_clothes"
      ).length,
      behavioral_suicidal_thoughts: results.filter(
        (a) => a.questionId === "behavioral_suicidal_thoughts"
      ).length,
      behavioral_runaway: results.filter(
        (a) => a.questionId === "behavioral_runaway"
      ).length,
      behavioral_suicide_attempt: results.filter(
        (a) => a.questionId === "behavioral_suicide_attempt"
      ).length,
      cognitive_short_term: results.filter(
        (a) => a.questionId === "cognitive_short_term"
      ).length
    };
  };