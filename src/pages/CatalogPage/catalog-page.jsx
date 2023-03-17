import { useContext } from "react";
import CardList from "../../components/CardList/card-list"
import Sort from "../../components/Sort/sort"
import Spinner from "../../components/Spinner"
import { CardContext } from "../../context/cardContext";

export const CatalogPage = () => {
    const {cards} = useContext(CardContext);
    return (
        <div className="container container_inner">
            <Sort/>
            <div className='content__cards'>
                <CardList cards={cards}/>
            </div>
        </div>
    )
}