import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';

export const Layout = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <a href="/" className={styles.navLink}>
                Головна
              </a>
            </li>
            <li className={styles.navItem}>
              <a href="/catalog" className={styles.navLink}>
                Каталог
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <p>&copy; 2025 RentalCar. Всі права захищено.</p>
      </footer>
    </div>
  );
};
