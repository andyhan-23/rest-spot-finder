import apiClient from "./client";

const loadData = async (path: string) => {
  try {
    const result = await apiClient.get(path);
    return result.data;
  } catch (error: unknown) {
    if (import.meta.env.DEV) {
      console.error(`${path}에 해당하는 에러 메시지 출력: ${error}`);
    }
    return null;
  }
};

export default loadData;
