import { useState, useEffect, useCallback } from 'react';
import Footer from '../Footer/footer';
import Header from '../Header/header';
import Logo from '../Logo/logo';
import Search from '../Search/search';
import './index.css';
// import data from '../../assets/data.json';
import SeachInfo from '../SeachInfo';
import api from '../../utils/api';
import useDebounce from '../../hooks/useDebounce';
import { isLiked } from '../../utils/product';
import { CatalogPage } from '../../pages/CatalogPage/catalog-page';
import { ProductPage } from '../../pages/ProductPage/product-page';
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { NotFoundPage } from '../../pages/NotFoundPage/not-found-page';
import { UserContext } from '../../context/userContext';
import { CardContext } from '../../context/cardContext';
import { FaqPage } from '../../pages/FAQPage/faq-page';
import { FavoritePage } from '../../pages/FavoritePage/favorite-page';
import Form from '../Form/form';
import RegistrationForm from '../Form/registration-form';
import Modal from '../Modal/modal';
import { FromModal } from '../FormModal/form-modal';
import { Register } from '../Register/register';
import { Login } from '../Login/login';
import { ResetPassword } from '../ResetPassword/reset-password';
import { NotAuth } from '../NoAuth/NoAuth';
import { ReNameUser } from '../ReNameUser/re-name-user';


function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  const debounceSearchQuery = useDebounce(searchQuery, 300);
  const [favorites, setFavorites] = useState([]);
  const [currentSort, setCurrentSort] = useState("");
  const [isOpenModalForm, setIsOpenModalForm] = useState(false);
  const [isAuth, setIsAuth] = useState(false)

  const location = useLocation()

  const backgroundLocation = location.state?.backgroundLocation;
  const initialPath = location.state?.initialPath;

  const navigate = useNavigate()
  const handleRequest = useCallback(() => {
    setIsLoading(true);
    api.search(searchQuery)
      .then((searchResult) => {
        setCards(searchResult)
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false);
      })
  }, [searchQuery])

  useEffect(() => {
    if (localStorage.getItem('token')) {
      api._token = localStorage.getItem('token')
      // setIsLoading(true);
      Promise.all([api.getProductList(), api.getUserInfo()])
        .then(([productsData, userData]) => {
          setCurrentUser(userData);
          setCards(productsData.products);
          const favoriteProducts = productsData.products.filter(item => isLiked(item.likes, userData._id));
          setFavorites(prevSate => favoriteProducts)
        })
        .catch(err => console.log(err))
        .finally(() => {
          setIsLoading(false);
        })
    }
  }, [localStorage.getItem('token')]);

  useEffect(() => {
    if (api._token) {
      handleRequest()
    }
  }, [debounceSearchQuery])

  const handleFormSubmit = (inputText) => {
    navigate('/');
    setSearchQuery(inputText);
    handleRequest();
  }

  const handleInputChange = (inputValue) => {
    setSearchQuery(inputValue);
  }

  function handleUpdateUser(userUpdateData) {
    api.setUserInfo(userUpdateData)
      .then((newUserData) => {
        setCurrentUser(newUserData)
      })
  }

  const handleProductLike = useCallback((product) => {
    const liked = isLiked(product.likes, currentUser._id)
    return api.changeLikeProduct(product._id, liked)
      .then((updateCard) => {
        const newProducts = cards.map(cardState => {
          return cardState._id === updateCard._id ? updateCard : cardState
        })

        if (!liked) {
          setFavorites(prevState => [...prevState, updateCard])
        } else {
          setFavorites(prevState => prevState.filter(card => card._id !== updateCard._id))
        }

        setCards(newProducts);
        return updateCard;
      })
  }, [currentUser, cards])

  const sortedData = (currentSort) => {
    console.log(currentSort);
    switch (currentSort) {
      case 'low': setCards(cards.sort((a, b) => b.price - a.price)); break;
      case 'cheap': setCards(cards.sort((a, b) => a.price - b.price)); break;
      case 'sale': setCards(cards.sort((a, b) => b.discount - a.discount)); break;
      default: setCards(cards.sort((a, b) => a.price - b.price));
    }
  }


  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuth((ps) => !isAuth)
      // setIsAuth(true)
      navigate('/')
    }
  }, [localStorage.getItem('token')])

  return (
    <UserContext.Provider value={{ user: currentUser, isLoading }}>
      {/* {console.log('currentUser from app-jx>>', { currentUser })} */}
      <CardContext.Provider value={{ cards, favorites, currentSort, handleLike: handleProductLike, onSortData: sortedData, setCurrentSort }}>
        <Header>
          <>
            <Logo className="logo logo_place_header" href="/" />
            <Routes>
              <Route path='/' element={
                <Search
                  onSubmit={handleFormSubmit}
                  onInput={handleInputChange}
                />
              } />
            </Routes>
          </>
        </Header>
        {isAuth ?
          (<main className='content'>
            <SeachInfo searchText={searchQuery} />
            <Routes location={(backgroundLocation && { ...backgroundLocation, pathname: initialPath }) || location}>
              <Route index element={
                // api._token &&
                <CatalogPage />
              } />
              <Route path='/product/:productId'
                element={
                  // api._token &&
                  <ProductPage
                    isLoading={isLoading}
                  />
                } />
              <Route path='/faq' element={<FaqPage />} />
              <Route path='/favorites' element={
                <FavoritePage />
              } />
              <Route path='/login' element={
                <Login />
              } />
              <Route path='/register' element={
                <Register />
              } />
              <Route path='/reset-password' element={
                <ResetPassword />
              } />
              {/* Добавил Переименовать пользователя */}
              {/* <Route path='/re-name-user' element={
                <ReNameUser />
              } /> */}
              <Route path='*' element={<NotFoundPage />} />
            </Routes>

            {backgroundLocation && (
              <Routes>
                <Route path='/login' element={
                  <Modal>
                    <Login />
                  </Modal>
                } />

                <Route path='/register' element={
                  <Modal>
                    <Register />
                  </Modal>
                } />
                <Route path='/reset-password' element={
                  <Modal>
                    <ResetPassword />
                  </Modal>
                } />
                {/* Добавил Переименовать пользователя */}
                <Route path='/re-name-user' element={
                  <Modal>
                    <ReNameUser />
                  </Modal>
                } />
              </Routes>
            )}

          </main>)
          :
          (<div className='not__auth'>Пожалуйста, авторизуйтесь
            <Routes>
              <Route path='/login' element={
                <Modal>
                  <Login />
                </Modal>
              } />

              <Route path='/register' element={
                <Modal>
                  <Register />
                </Modal>
              } />
              <Route path='/reset-password' element={
                <Modal>
                  <ResetPassword />
                </Modal>
              } />
            </Routes>

          </div>)}
        < Footer />
      </CardContext.Provider>
    </UserContext.Provider>
  )
}

export default App;
