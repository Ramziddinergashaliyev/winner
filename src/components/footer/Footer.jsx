import React, { useState } from 'react'
import { PhoneInput } from 'react-international-phone'
import { NavLink } from 'react-router-dom'
import 'react-international-phone/style.css'
import Reveal from '../reveal/Reveal'
import './footer.scss'

const PRODUCT_LINKS = [
    { label: 'Antifreeze', href: '/catalog' },
    { label: 'Motor oils for passenger cars', href: '/catalog' },
    { label: 'Motor oils for diesel engines', href: '/catalog' },
    { label: 'Transmission oils', href: '/catalog' },
    { label: 'Hydraulic oils', href: '/catalog' },
]

const COMPANY_LINKS = [
    { label: 'About', href: '/about' },
    { label: 'Catalog', href: '/catalog' },
    { label: 'Distrbuter', href: '/distrbuter' },
    { label: 'Contact', href: '/contact' },
]

export default function Footer() {
    const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });

    const handleChange = (field) => (e) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Footer form submitted:", form);
    };

    return (
        <footer className="site-footer container">
            <Reveal as="div" className="site-footer__container site-footer__grid" variant="up">

                <nav className="site-footer__col" aria-label="Продукция">
                    <h3 className="site-footer__heading">Продукция</h3>
                    <ul>
                        {PRODUCT_LINKS.map((link) => (
                            <li key={link.label}>
                                <NavLink to={link.href}>{link.label}</NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                <nav className="site-footer__col" aria-label="Компания">
                    <h3 className="site-footer__heading">Компания</h3>
                    <ul>
                        {COMPANY_LINKS.map((link) => (
                            <li key={link.label}>
                                <NavLink to={link.href}>{link.label}</NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="site-footer__col">
                    <h3 className="site-footer__heading">Контакты</h3>

                    <div className="site-footer__group">
                        <span className="site-footer__label">Номер телефона</span>

                        <a className="site-footer__value" href="tel:+998712814930">
                            +998 71 281 49 30
                        </a>

                        <a className="site-footer__value" href="tel:+998712032031">
                            +998 71 203 20 31
                        </a>

                    </div>

                    <div className="site-footer__group">
                        <span className="site-footer__label">Адрес</span>
                        <p className="site-footer__address">
                            Yakkasaray district, MFY "Muhandislar", Muqimi street, house 2
                        </p>
                    </div>

                    <div className="site-footer__group">
                        <span className="site-footer__label">Электронная почта</span>
                        <a className="site-footer__value" href="mailto:info@gpggroup.uz">
                            info@gpggroup.uz
                        </a>
                    </div>
                </div>

                <div className="site-footer__col">
                    <h3 className="site-footer__heading">Оставить сообщение</h3>

                    <form className="site-footer__form" onSubmit={handleSubmit}>
                        <label className="site-footer__sr-only" htmlFor="footer-name">
                            Имя
                        </label>

                        <input
                            id="footer-name"
                            type="text"
                            placeholder="Имя"
                            value={form.name}
                            onChange={handleChange("name")}
                            required
                        />

                        <div className="site-footer__phone">
                            <label className="site-footer__sr-only" htmlFor="footer-phone">
                                Номер телефона
                            </label>

                            <PhoneInput
                                defaultCountry="uz"
                                value={form.phone}
                                onChange={(phone) => setForm((prev) => ({ ...prev, phone }))}
                                className="site-footer__phone-input"
                                inputProps={{ id: "footer-phone", name: "phone", required: true }}
                            />
                        </div>

                        <label className="site-footer__sr-only" htmlFor="footer-email">
                            Электронная почта
                        </label>

                        <input
                            id="footer-email"
                            type="email"
                            placeholder="Электронная почта"
                            value={form.email}
                            onChange={handleChange("email")}
                            required
                        />

                        <label className="site-footer__sr-only" htmlFor="footer-message">
                            Сообщение
                        </label>

                        <textarea
                            id="footer-message"
                            placeholder="Сообщение"
                            rows={3}
                            value={form.message}
                            onChange={handleChange("message")}
                        />

                        <button type="submit" className="site-footer__submit">
                            Отправить сейчас
                        </button>
                    </form>
                </div>
            </Reveal>
        </footer>
    );
}