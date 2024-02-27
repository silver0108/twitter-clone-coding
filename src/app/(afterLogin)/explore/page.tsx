import SearchForm from '../_component/SearchForm';
import Trend from '../_component/Trend';
import styles from './explore.module.css';

export default function Explore() {
  return (
    <main className={styles.main}>
      <div className={styles.formZone}>
        <SearchForm/>
      </div>
      <div className={styles.trend}>
        <Trend/>
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
      </div>
    </main>
  )
}