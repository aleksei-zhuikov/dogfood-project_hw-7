import s from './index.module.css';
import cn from 'classnames';
import { ReactComponent as FavoriteIcon } from './img/favorites.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { CardContext } from '../../context/cardContext';
import { UserContext } from '../../context/userContext';
import api from '../../utils/api';



function Header({ children, user, onUpdateUser }) {
  const { favorites } = useContext(CardContext);
  // console.log('favorites From Header-jsx >>>', { favorites })
  const location = useLocation();
  const { user: currentUser } = useContext(UserContext);



  return (
    <header className={cn(s.header, 'cover')}>
      <div className="container">
        <div className={s.header__wrapper}>
          {children}

          <div className={s.iconsMenu}>
            <Link className={s.favoritesLink} to={{ pathname: "/favorites" }}>
              <FavoriteIcon />
              {favorites.length !== 0 && <span className={s.iconBubble}>{favorites.length}</span>}
            </Link>
            <Link to='/login' state={{ backgroundLocation: location, initialPath: location.pathname }} >Войти</Link>

          </div>
        </div>

        <div className={cn(s.userInfoContainer)}>
          {currentUser?.name && <span>{currentUser?.name}: {currentUser?.about}</span>}
          {currentUser?.email && <span>email: {currentUser?.email}</span>}
        </div>
      </div>
    </header>
  )
}

export default Header;
