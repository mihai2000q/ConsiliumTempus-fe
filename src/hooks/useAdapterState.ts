import { useEffect, useState } from 'react'

export default function useAdapterState<TResponse, TModel>(
  response: TResponse,
  adapt: (response: TResponse) => TModel
): TModel | undefined {
  const [project, setProject] = useState<TModel | undefined>(undefined)
  useEffect(() => {
    setProject(adapt(response))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response])

  return project
}
