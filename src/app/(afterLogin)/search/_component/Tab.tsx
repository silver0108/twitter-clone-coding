"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import styles from '../search.module.css';
import { useState } from 'react';

export default function Tab() {
  const [current, setCurrent] = useState('hot');
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get('q');


  const onClickTab = (filter: string) => {
    setCurrent(filter);

    if(filter === 'hot') router.replace(`/search?q=${q}`);
    else router.replace(`/search?q=${q}&f=${filter}`);
  }
  

  return (
    <div className={styles.homeFixed}>
      <div className={styles.homeTab}>
        <div onClick={() => onClickTab('hot')}>
          인기
          <div className={styles.tabIndicator} hidden={current !== 'hot'}></div>
        </div>
        <div onClick={() => onClickTab('new')}>
          최신
          <div className={styles.tabIndicator} hidden={current !== 'new'}></div>
        </div>
        <div onClick={() => onClickTab('user')}>
          사용자
          <div className={styles.tabIndicator} hidden={current !== 'user'}></div>
        </div>
        <div onClick={() => onClickTab('media')}>
          미디어
          <div className={styles.tabIndicator} hidden={current !== 'media'}></div>
        </div>
        <div onClick={() => onClickTab('list')}>
          리스트
          <div className={styles.tabIndicator} hidden={current !== 'list'}></div>
        </div>
      </div>
    </div>
  )
}