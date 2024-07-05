import { apiClient } from "@/apis";
import { URL } from "@/apis";

interface SurveyRequest {
  email: string;
  text: string;
}

const usePostSurvey = async (surveyRequest: SurveyRequest) => {
  await apiClient.post(`${URL.survey}`, surveyRequest);
};

export default usePostSurvey;
