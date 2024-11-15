import { api } from '~/api/client'
import { OptionResponse } from '~/types/quiz.types'

type GetOptionsQuery = {
  questionId: string
  quizId: string
}

export const getOptionsQuery = async ({
  questionId,
  quizId
}: GetOptionsQuery) => {
  const { data } = await api.get<OptionResponse[]>(
    '/question/option/paginate',
    {
      headers: {
        ['quiz-id']: quizId,
        ['question-id']: questionId
      }
    }
  )

  return data
}
