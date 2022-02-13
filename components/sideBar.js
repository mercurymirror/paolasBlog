import React from "react"
import Link from "next/link"
import Header from "./header"

const SideBar = ({ categories, homepage }) => {
    return (
        <div>
            <Header
                categories={categories}
                homepage={homepage} />
            <div className="hidden md:block px-5 pt-10">
                <a className="hover:no-underline " href="/">
                    <h3 className="text-xl uppercase tracking-widest mb-4">{homepage.attributes.hero.title}</h3>
                </a>
                <h5 className="text-sm mb-10">{homepage.attributes.bio.text}</h5>
                <nav>
                    <ul>
                        {categories.map((category) => {
                            return (
                                <li key={category.id} className="mb-4">
                                    <Link href={`/category/${category.attributes.slug}`}>
                                        <a className="uppercase font-light text-sm">{category.attributes.name}</a>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default SideBar
