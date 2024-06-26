export default interface Workspace {
  name: string,
  isFavorite: boolean,
  isPersonal: boolean,
  owner: Owner
}

interface Owner {
  id: string,
  name: string,
  email: string,
}