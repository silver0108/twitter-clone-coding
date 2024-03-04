import Link from "next/link";
import styles from "./post.module.css";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import ActionButtons from "./ActionButtons";
import Image from "next/image";
import PostArticle from "./PostArticle";
import { faker } from '@faker-js/faker';

dayjs.locale('ko');
dayjs.extend(relativeTime);

type Props = {
  noImage?: boolean
}

export default function Post( {noImage} : Props) {
  const target = {
    postId: 1,
    User: {
      id: 'elonmusk',
      nickname: 'Elon Musk',
      image: '/yRsRRjGO.jpg'
    },
    content: '클론코딩 라이브로 하니 너무 힘들어요 ㅠㅠ',
    createdAt: new Date(),
    Images: [] as any[],
  }

  if (Math.random() > 0.5 && !noImage) {
    target.Images.push(
      { imageId: 1, link: faker.image.urlLoremFlickr() },
      // { imageId: 2, link: faker.image.urlLoremFlickr() },
      // { imageId: 3, link: faker.image.urlLoremFlickr() },
      // { imageId: 4, link: faker.image.urlLoremFlickr() }
    )
  }

  return (
    <PostArticle post={target}>
      <div className={styles.postWrapper}>
        <div className={styles.postUserSection}>
          <Link href={`/${target.User.id}`} className={styles.postUserImage}>
            <Image src={target.User.image} alt={target.User.nickname} width={40} height={40} />
            <div className={styles.postShade}></div>
          </Link>
        </div>
        <div className={styles.postBody}>
          <div className={styles.postMeta}>
            <Link href={`/${target.User.id}`}>
              <span className={styles.postUserName}>{target.User.nickname}</span>
              &nbsp;
              <span className={styles.postUserId}>@{target.User.id}</span>
              &nbsp;
              .
              &nbsp;
            </Link>
            <span className={styles.postDate}>{dayjs(target.createdAt).fromNow(true)}</span>
          </div>
          <div>{target.content}</div>
          <div className={styles.postImageSection}>
            { target.Images && target.Images.length > 0 && (
              <Link href={`/${target.User.id}/status/${target.postId}/photo/${target.Images[0].imageId}`}
                className={styles.postImageSection}
              >
                <img src={target.Images[0]?.link} alt=""></img>
              </Link>
            )}
          </div>
          <ActionButtons/>
        </div>
      </div>
    </PostArticle>
  )
}