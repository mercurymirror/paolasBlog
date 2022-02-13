import React from "react"
import Link from "next/link"

const Nav = ({ categories }) => {
  return (
    <div>
      <div class="uk-navbar-container" uk-navbar>
    <div class="uk-navbar-left">
        <a class="uk-navbar-toggle" uk-navbar-toggle-icon href="">
        <ul className="uk-nav">
            {categories.map((category) => {
              return (
                <li key={category.id}>
                  <Link href={`/category/${category.attributes.slug}`}>
                    <a className="uk-link-reset uk-text-capitalize">{category.attributes.name}</a>
                  </Link>
                </li>
              )
            })}
          </ul>
        </a>
    </div>
</div>
         
        </div>
  )
}

export default Nav
