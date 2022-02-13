import { React, useEffect } from "react"
import Link from "next/link"
import NextImage from "./image"

const animColor = "#FF006E";
const decorColor = "#FFBE0B";
const illuColor = "#3A86FF";

const Card = ({ article, categories }) => {

  useEffect(() => {
    const overlay = document.getElementById("overlay");

    article.attributes.categories.data.forEach(category => {
        console.log(category.attributes.slug)
        if (category.attributes.slug === "animation") {
          overlay.style.backgroundColor = animColor;
        }
        if (category.attributes.slug === "decor") {
          overlay.style.backgroundColor = decorColor;
        }
        if (category.attributes.slug === "illustrations") {
          overlay.style.backgroundColor = illuColor;

        }

    });

  }, []);

  return (
    <Link href={`/article/${article.attributes.slug}`}>
      <a className="hover:no-underline">
        <div className="card relative grid mb-3 md:mb-0">
          <div className="media">
            <NextImage image={article.attributes.image} />
          </div>
          <div id="overlay" className="overlay-color"></div>
          <div className="card-body flex items-end justify-center pb-5">
            <p className="text-xl px-2 uppercase text-center text-white">
              {article.attributes.title}
            </p>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default Card
