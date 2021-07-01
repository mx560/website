import React from 'react';
import css from './homePage.module.css';
import logo from '../../images/logo.svg';

const HomePage = () => {

    return (
        <>
            <div className={css.main}>
                <img src={logo} className={css.logo} alt="logo"/>
            </div>
            <div className={css.foot}>
                Copyright © 2014 9zcl.cn
                <a target="_blank" rel="noreferrer" className={css.link}
                   href="https://beian.miit.gov.cn/#/Integrated/index">浙ICP备14044212号-1</a>
            </div>
        </>
    );
};


export default HomePage;
