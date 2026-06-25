import { useState } from "react";
import { NavLink } from "react-router-dom";
import { MENU } from "../../constants"
import "./header.scss"
import { IoSearch, IoChevronDown } from "react-icons/io5";
import logo from "../../assets/icons/logo.webp"

const LANGUAGES = [
    { code: "uz", label: "UZ", flag: "https://flagcdn.com/w40/uz.png" },
    { code: "ru", label: "RU", flag: "https://flagcdn.com/w40/ru.png" },
    { code: "en", label: "EN", flag: "https://flagcdn.com/w40/gb.png" },
];

function Header() {
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [activeLang, setActiveLang] = useState(LANGUAGES[0]);

    const handleSelectLang = (lang) => {
        setActiveLang(lang);
        setIsLangOpen(false);
    };

    return (
        <div className="header">
            <div className="header__container container">
                <div className="header-logo">
                    <img src={logo} alt="Header Logo" />
                </div>

                <nav className="header__nav">
                    {MENU.map((item) => (
                        <NavLink
                            key={item.id}
                            to={item.path}
                            className="header__nav-link"
                        >
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
                </div>
            </div>
        </div>
    );

}

export default Header;

// import { useState, useRef, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import { MENU } from "../../constants"
// import "./header.scss"
// import { IoSearch } from "react-icons/io5";
// import { IoChevronDown } from "react-icons/io5";
// import logo from "../../assets/icons/logo.webp"

// const LANGUAGES = [
//     { code: "uz", label: "UZB" },
//     { code: "ru", label: "RUS" },
//     { code: "en", label: "ENG" },
// ];

// function Header() {
//     const [isLangOpen, setIsLangOpen] = useState(false);
//     const [activeLang, setActiveLang] = useState(LANGUAGES[0]);
//     const langRef = useRef(null);

//     useEffect(() => {
//         function handleClickOutside(e) {
//             if (langRef.current && !langRef.current.contains(e.target)) {
//                 setIsLangOpen(false);
//             }
//         }
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, []);

//     function handleSelectLang(lang) {
//         setActiveLang(lang);
//         setIsLangOpen(false);
//     }

//     return (
//         <div className="header">
//             <div className="header__container container">
//                 <div className="header-logo">
//                     <img src={logo} alt="Header Logo" />
//                 </div>

//                 <nav className="header__nav">
//                     {MENU.map((item) => (
//                         <NavLink
//                             key={item.id}
//                             to={item.path}
//                             className="header__nav-link"
//                         >
//                             {item.title}
//                         </NavLink>
//                     ))}
//                 </nav>

//                 <div className="header-right">
//                     <div className="header-right-lang" ref={langRef}>
//                         <button
//                             className={`header-right-lang__toggle ${isLangOpen ? "active" : ""}`}
//                             onClick={() => setIsLangOpen((prev) => !prev)}
//                             aria-haspopup="listbox"
//                             aria-expanded={isLangOpen}
//                         >
//                             <span>{activeLang.label}</span>
//                             <IoChevronDown className="header-right-lang__icon" />
//                         </button>

//                         {isLangOpen && (
//                             <ul className="header-right-lang__dropdown" role="listbox">
//                                 {LANGUAGES.map((lang) => (
//                                     <li key={lang.code}>
//                                         <button
//                                             className={`header-right-lang__option ${lang.code === activeLang.code ? "is-active" : ""}`}
//                                             onClick={() => handleSelectLang(lang)}
//                                             role="option"
//                                             aria-selected={lang.code === activeLang.code}
//                                         >
//                                             {lang.label}
//                                         </button>
//                                     </li>
//                                 ))}
//                             </ul>
//                         )}
//                     </div>
//                     <div className="header-right-search">
//                         <input placeholder="Search" type="text" />
//                         <button><IoSearch /></button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );

// }

// export default Header;