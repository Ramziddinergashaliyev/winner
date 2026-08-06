import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { IoSearch, IoChevronDown } from "react-icons/io5";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useTranslation } from "react-i18next";

import { MENU } from "../../constants";
import logo from "../../assets/icons/logo.webp";

import "./header.scss";

const LANGUAGES = [
    {
        code: "en",
        label: "EN",
        flag: "https://flagcdn.com/w40/gb.png",
    },
    {
        code: "ru",
        label: "RU",
        flag: "https://flagcdn.com/w40/ru.png",
    },
];

function Header() {
    const { t, i18n } = useTranslation();

    const [isLangOpen, setIsLangOpen] = useState(false);
    const [hide, setHide] = useState(false);

    const [activeLang, setActiveLang] = useState(
        LANGUAGES.find((item) => item.code === i18n.language) || LANGUAGES[1]
    );

    useEffect(() => {
        const current =
            LANGUAGES.find((item) => item.code === i18n.language) ||
            LANGUAGES[1];

        setActiveLang(current);
    }, [i18n.language]);

    const handleSelectLang = (lang) => {
        i18n.changeLanguage(lang.code);
        localStorage.setItem("i18nextLng", lang.code);
        setActiveLang(lang);
        setIsLangOpen(false);
    };

    return (
        <header className="header">
            <div className="header__container container">

                <NavLink to="/" className="header-logo">
                    <img src={logo} alt="Winner Logo" />
                </NavLink>

                <nav
                    className={`header__nav ${hide ? "header__nav-hide" : ""
                        }`}
                >
                    <button
                        onClick={() => setHide(false)}
                        className="header__nav-search"
                    >
                        <AiOutlineClose />
                    </button>

                    {MENU.map((item) => (
                        <NavLink
                            key={item.id}
                            to={item.path}
                            className="header__nav-link"
                        >
                            {t(item.title)}
                        </NavLink>
                    ))}
                </nav>

                <div className="header-right">

                    <div
                        className={`header-right-lang ${isLangOpen ? "open" : ""
                            }`}
                    >
                        <button
                            className="header-right-lang__btn"
                            onClick={() =>
                                setIsLangOpen(!isLangOpen)
                            }
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
                                        className={
                                            lang.code === activeLang.code
                                                ? "active"
                                                : ""
                                        }
                                        onClick={() =>
                                            handleSelectLang(lang)
                                        }
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
                        <input
                            type="text"
                            placeholder={t("search")}
                        />

                        <button>
                            <IoSearch />
                        </button>
                    </div>

                    <button
                        onClick={() => setHide(true)}
                        className="header-right-btns-menu"
                    >
                        <AiOutlineMenu />
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;