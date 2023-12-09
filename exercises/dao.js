import exerciseModel from "./model.js";

export const searchExercises = (query) => exerciseModel.find(query);
  