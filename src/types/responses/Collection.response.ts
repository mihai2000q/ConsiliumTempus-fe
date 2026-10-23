type CollectionResponse<TKey extends string, TItem> = {
  [K in TKey]: TItem[]
} & {
  totalCount: number
}

export default CollectionResponse
