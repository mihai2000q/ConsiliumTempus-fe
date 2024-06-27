export default interface Workspace {
  id: string,
  name: string,
  description: string,
  isFavorite: boolean,
  isPersonal: boolean,
  owner: Owner
}

interface Owner {
  id: string,
  name: string,
  email: string
}