/* eslint-disable */
import React from 'react'

const Contact = (props) => (
    <section id="contact">
        <div className="inner">
            <section>
                <form method="post" name="contact" method="post" data-netlify="true" data-netlify-honeypot="bot-field" action="/bedankt">
                    <input type="hidden" name="bot-field" />
                    <div className="field half first">
                        <label htmlFor="name">Naam</label>
                        <input type="text" name="name" id="name" />
                    </div>
                    <div className="field half">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" id="email" />
                    </div>
                    <div className="field">
                        <label htmlFor="message">Bericht</label>
                        <textarea name="message" id="message" rows="6"></textarea>
                    </div>
                    <ul className="actions">
                        <li><input type="submit" value="Verstuur" className="special" /></li>
                        {/*<li><input type="reset" value="Clear" /></li>*/}
                    </ul>
                </form>
            </section>
            <section className="split">
                <section>
                    <div className="contact-method">
                        <span className="icon alt fa-envelope"></span>
                        <h3>Email</h3>
                        <a href="#">info@elgentos.nl</a>
                    </div>
                </section>
                <section>
                    <div className="contact-method">
                        <span className="icon alt fa-phone"></span>
                        <h3>Telefoon</h3>
                        <span><a href="tel:0031507001515">(+31) (0)50 700 15 15</a></span>
                    </div>
                </section>
                <section>
                    <div className="contact-method">
                        <span className="icon alt fa-home"></span>
                        <h3>Adres</h3>
                        <span>Hereweg 120<br />
                        9725 KL Groningen<br />
                        Nederland</span>
                    </div>
                </section>
            </section>
        </div>
    </section>
)

export default Contact
