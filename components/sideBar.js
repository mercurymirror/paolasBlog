import { React, useEffect } from "react"
import Link from "next/link"
import Header from "./header"
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../lib/fontawesome';
import gsap from "gsap";



const SideBar = ({ categories, homepage }) => {

    const colorMap = {
        "animation": "#A72608",
        "decor": "#E0AFA0",
        "illustrations": "#32936F",
        "developpement-visuel": "#C2FCF7",
        "realisations": "#FEEA00",
        "croquis": "#9F6BA0"
    };

    return (
        <div className="md:h-screen md:max-w-xs relative">
            <Header
                categories={categories}
                homepage={homepage} />
            <div className="hidden md:block px-5 pt-10">
                <a className="hover:no-underline " href="/">
                    <h3 className="text-xl uppercase mb-4">{homepage.attributes.hero.title}</h3>
                </a>
                <h5 className="text-sm mb-10">{homepage.attributes.bio.text}</h5>
                <nav>
                    <ul>
                        {categories.map((category) => {
                            const mouseEnter = (e) => {
                                const catColor = category.attributes.slug;
                                const hoverColor = colorMap[catColor];
                                gsap.to(e.currentTarget, {
                                    duration: .4,
                                    color: hoverColor,
                                })
                            };
                            const mouseLeave = (e) => {
                                gsap.to(e.currentTarget, {
                                    duration: .4,
                                    color: '#000',
                                })
                            };
                            return (
                                <li key={category.id} className="mb-4">
                                    <Link href={`/category/${category.attributes.slug}`}>
                                        <a className="menu-cat uppercase font-light text-sm"
                                            onMouseEnter={mouseEnter}
                                            onMouseLeave={mouseLeave}
                                        >{category.attributes.name}</a>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
                <Link href={"/contacts"}>
                <h5 className="text-sm mt-20 uppercase font-light">Contact</h5>
                </Link>
            </div>
            <footer className="absolute bottom-8 w-full hidden md:grid grid-cols-footer gap-4 place-content-start pl-20">
                <FontAwesomeIcon icon="fa-brands fa-youtube" />
                <FontAwesomeIcon icon="fa-brands fa-vimeo-v" />
                <FontAwesomeIcon icon="fa-brands fa-linkedin" />
            </footer>
        </div>
    )
}

export default SideBar
