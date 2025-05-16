import React from 'react';
import { Outlet } from 'react-router-dom';

import styles from './Layout.module.css';
import icons from '../../img/icons.svg';

export const Layout = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <svg className={styles.logoIcon}>
          <use href={`${icons}#icon-Logo`} />
        </svg>
        <nav>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <a href="/" className={styles.navLink}>
                Home
              </a>
            </li>
            <li className={styles.navItem}>
              <a href="/catalog" className={styles.navLink}>
                Catalog
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};
