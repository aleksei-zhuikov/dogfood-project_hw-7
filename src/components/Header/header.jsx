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
  // console.log('currentUser from header-jsx >>', currentUser)

  const navigate = useNavigate()

  function hendlLogout(e) {
    e.preventDefault();
    localStorage.removeItem('token')
    navigate('/')

  }


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

            {!currentUser ?
              <Link to='/login' state={{ backgroundLocation: location, initialPath: location.pathname }} >Войти</Link>
              :
              <button className={s.btnLogout} onClick={hendlLogout}>Выход</button>
            }

          </div>
        </div>

        <div className={cn(s.userInfoContainer)}>
          <div className={s.wrapUserInfo}>
            {currentUser?.name && <span><b>{currentUser?.name}:</b> {currentUser?.about}</span>}
            {currentUser && <span>{'|'}</span>}
            {currentUser?.email && <span> <b>email:</b> {currentUser?.email}</span>}
          </div>
          {currentUser &&
            <Link className={s.btnHeaderRename} to='/re-name-user' state={{ backgroundLocation: location, initialPath: location.pathname }} >изменить данные</Link>
            // <button className={s.btnHeaderRename}>изменить данные</button>
          }
        </div>
      </div>
    </header >
  )
}

export default Header;
