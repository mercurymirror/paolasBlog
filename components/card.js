import { React, useEffect } from "react"
import Link from "next/link"
import NextImage from "./image"
import gsap from "gsap";

const colorMap = {
  "animation": "#A72608",
  "decor": "#E0AFA0",
  "illustrations": "#32936F",
  "developpement-visuel": "#C2FCF7",
  "realisations": "#FEEA00",
  "croquis": "#9F6BA0"
};

const Card = ({ article, categories }) => {

  useEffect(() => {
gsap.fromTo('.card', {
  yPercent: 100
}, {
  duration: 2,
  yPercent: 0,
})
gsap.fromTo('.card img', {
  yPercent: -100
}, {
  duration: 2,
  yPercent: 0,
})
gsap.from('.overlay-color', {
  duration: 2,
  delay: 2,
  display: "none",
})
  })

  return (
    <Link href={`/article/${article.attributes.slug}`}>
      <a className="hover:no-underline">
        <div className="card relative grid mb-3 md:mb-0">
          <div className="media">
            <NextImage image={article.attributes.image} />
          </div>
        <div className="card-body flex items-end justify-center pb-5">
          <p className="text-xl px-2 uppercase text-center text-white font-light">
            {article.attributes.title}
          </p>
        </div>
        {article.attributes.categories.data.map((category) => {
              return (
          <div className="overlay-color hidden md:block"
          key={category.id}
            style=
              { { backgroundColor: colorMap[category.attributes.slug] } }
          ></div>
          )
        })}
      </div>
    </a>
    </Link >
  )
}

export default Card
