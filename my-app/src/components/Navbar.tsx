import Link from 'next/link'
import styles from '@/styles/Navbar.module.css'

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.wrapper}>
        <Link className={styles.link} href="/">Sistema de estoque</Link>
        <div className={styles.links}>
          <Link className={styles.link} href="/products">Produtos</Link>
          <Link className={styles.link} href="/suppliers">Fornecedores</Link>
        </div>
      </div>
    </div>
  )
}
