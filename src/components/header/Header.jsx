import { NavLink } from "react-router-dom";
import { MENU } from "../../constants"
import "./header.scss"

function Header() {

    return (
        <div className="header container">
            <div className="header__container">
                <div className="header-logo">
                    <h2 className="header-logo-title">Logo</h2>
                </div>

                <nav className="header__nav">
                    {MENU.map((item) => (
                        <NavLink
                            key={item.id}
                            to={item.path}
                        >
                            {item.title}
                        </NavLink>
                    ))}
                </nav>

                <div className="header-right">
                    <button className="header__nav-right-btn">Contact</button>
                </div>
            </div>
        </div>
    );

}

export default Header;