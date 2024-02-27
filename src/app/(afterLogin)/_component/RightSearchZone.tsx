"use client";

import styles from './rightSearchZone.module.css';
import { usePathname } from "next/navigation";
import SearchForm from "./SearchForm";

export default function RightSearchZone() {
  const pathname = usePathname();

  const onChangeAll = () => {};
  const onChangeFollow = () => {};
  const onChangeEveryWhere = () => {};
  const onChangeArround = () => {};
  
  if(pathname === '/explore') {
    return null;
  }

  if(pathname === '/search') {
    return (
      <div>
        <h3 className={styles.filterTitle}>검색 필터</h3>
        <div className={styles.filterSection}>
          <div>
            <label>사용자</label>
            <div className={styles.radio}>
              <div>모든 사용자</div>
              <input type='radio' name='pf' defaultChecked onChange={onChangeAll} />
            </div>
            <div className={styles.radio}>
              <div>내가 팔로우하는 사람들</div>
              <input type='radio' name='pf' value="on" onChange={onChangeFollow} />
            </div>
          </div>
          <div>
            <label>위치</label>
            <div className={styles.radio}>
              <div>어디에서나</div>
              <input type='radio' name='lf' defaultChecked onChange={onChangeEveryWhere} />
            </div>
            <div className={styles.radio}>
              <div>현 위치 주변</div>
              <input type='radio' name='lf' value="on" onChange={onChangeArround} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.searchFormWrapper}>
      <div className={styles.searchFormZone}>
        <SearchForm />
      </div>
    </div>
    
  )
}