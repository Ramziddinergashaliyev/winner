import { useState } from "react";
import { NavLink } from "react-router-dom";
import { MENU } from "../../constants"
import { IoSearch, IoChevronDown } from "react-icons/io5";
import logo from "../../assets/icons/logo.webp"

import "./header.scss"
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

const LANGUAGES = [
    { code: "uz", label: "UZ", flag: "https://flagcdn.com/w40/uz.png" },
    { code: "en", label: "EN", flag: "https://flagcdn.com/w40/gb.png" },
    { code: "ru", label: "RU", flag: "https://flagcdn.com/w40/ru.png" },
];

function Header() {
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [activeLang, setActiveLang] = useState(LANGUAGES[1]);
    const [hide, setHide] = useState(false)

    const handleSelectLang = (lang) => {
        setActiveLang(lang);
        setIsLangOpen(false);
    };

    return (
        <div className="header">
            <div className="header__container container">
                <NavLink to={"/"} className="header-logo">
                    <img src={logo} alt="Header Logo" />
                </NavLink>

                <nav className={`header__nav ${hide ? "header__nav-hide" : ""}`}>
                    <button onClick={() => setHide(false)} className="header__nav-search"><AiOutlineClose /></button>
                    {MENU.map((item) => (
                        <NavLink
                            key={item.id}
                            to={item.path}
                            className="header__nav-link">
                            {item.title}
                        </NavLink>
                    ))}
                </nav>

                <div className="header-right">
                    <div className={`header-right-lang ${isLangOpen ? "open" : ""}`}>
                        <button
                            className="header-right-lang__btn"
                            onClick={() => setIsLangOpen((prev) => !prev)}
                        >
                            <img
                                src={activeLang.flag}
                                alt={activeLang.label}
                                className="header-right-lang__flag"
                            />
                            <span>{activeLang.label}</span>
                            <IoChevronDown className="header-right-lang__chevron" />
                        </button>

                        {isLangOpen && (
                            <ul className="header-right-lang__list">
                                {LANGUAGES.map((lang) => (
                                    <li
                                        key={lang.code}
                                        className={lang.code === activeLang.code ? "active" : ""}
                                        onClick={() => handleSelectLang(lang)}
                                    >
                                        <img
                                            src={lang.flag}
                                            alt={lang.label}
                                            className="header-right-lang__flag"
                                        />
                                        <span>{lang.label}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="header-right-search">
                        <input placeholder="Search" type="text" />
                        <button><IoSearch /></button>
                    </div>

                    <button onClick={() => setHide(true)} className="header-right-btns-menu"><AiOutlineMenu /></button>
                </div>
            </div>
        </div>
    );

}

export default Header;