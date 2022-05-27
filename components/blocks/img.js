import useImage from 'use-image'
import { Image } from 'react-konva'

export const Img = ({ url, ...props }) => {
  const [image] = useImage(url)
  return <Image image={image} {...props} />
}
