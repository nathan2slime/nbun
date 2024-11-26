import { Question, QuestionOption, Quiz } from '@nbun/database'

import { api } from '~/api/server'

type Response = {
  questions: ({
    options: QuestionOption[]
  } & Question)[]
} & Quiz

export const getQuizFormQuery = async (quizId: string) => {
  const { data } = await api.get<Response>(`/quiz/form/${quizId}`)

  return data
}
