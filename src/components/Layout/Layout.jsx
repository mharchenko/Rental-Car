import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Heart } from 'lucide-react';
import FavoritesModal from '../FavoritesModal/FavoritesModal';
import { useFavorites } from '../../hooks/useFavorites';

import styles from './Layout.module.css';
import icons from '../../img/icons.svg';

export const Layout = () => {
  const { count } = useFavorites();
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false);
  const location = useLocation();

  const openFavoritesModal = () => {
    setIsFavoritesModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeFavoritesModal = () => {
    setIsFavoritesModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const isCatalogPage = location.pathname.includes('/catalog');

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <svg className={styles.logoIcon}>
            <use href={`${icons}#icon-Logo`} />
          </svg>
        </div>

        <div className={styles.navContainer}>
          <nav className={styles.nav}>
            <ul className={styles.navList}>
              <li className={styles.navItem}>
                <Link to="/" className={styles.navLink}>
                  Home
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link to="/catalog" className={styles.navLink}>
                  Catalog
                </Link>
              </li>
            </ul>
          </nav>

          {isCatalogPage && (
            <button
              className={styles.favoritesButton}
              onClick={openFavoritesModal}
              aria-label="Open favorite cars"
            >
              <Heart size={24} className={styles.heartIcon} />
              {count > 0 && (
                <span className={styles.favoritesCount}>{count}</span>
              )}
            </button>
          )}
        </div>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      {isFavoritesModalOpen && (
        <FavoritesModal
          onClose={closeFavoritesModal}
          key={`favorites-modal-${Date.now()}`}
        />
      )}
    </div>
  );
};
