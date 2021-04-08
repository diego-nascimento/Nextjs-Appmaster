import { PostData, PostInfra } from './Protocols'

export const PostFactory = () => {
  const Post_INfra = new PostInfra()
  return new PostData(Post_INfra)
}