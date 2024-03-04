import { faker } from '@faker-js/faker';
import styles from './PhotoModal.module.css';
import ActionButtons from '@/app/(afterLogin)/_component/ActionButtons';
import Post from '@/app/(afterLogin)/_component/Post';
import CommentForm from '@/app/(afterLogin)/[username]/status/[id]/_component/CommentForm';
import PhotoModalCloseButton from './_component/PhotoModalCloseButton';

export default function PhotoModal() {
  const photo = {
    imageId: 1,
    link: faker.image.urlLoremFlickr(),
    Post: {
      content: faker.lorem.text()
    }
  }
  return (
    <div className={styles.container}>
      <PhotoModalCloseButton />
      <div className={styles.imageZone}>
        <img src={photo.link} alt={photo.Post?.content}/>
        <div className={styles.image} style={{backgroundImage: `url(${photo.link})`}}></div>
        <div className={styles.buttonZone}>
          <div className={styles.buttonInner}>
            <ActionButtons white />
          </div>
        </div>
      </div>
      <div className={styles.commentZone}>
        <Post noImage />
        <CommentForm/>
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  )
}