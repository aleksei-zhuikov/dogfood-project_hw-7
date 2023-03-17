
import React from 'react';
import s from './NoAuth.module.css'

export const NotAuth = (children) => {

    return (
        <>
            <div className={s.noAuth__container}>
                <div className={s.noAuth__title}>Пожалуйста авторизуйтесь</div>
            </div>
            {/* {children} */}
        </>
    )
}