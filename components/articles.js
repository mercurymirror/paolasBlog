import React from "react"
import Card from "./card"

const Articles = ({ articles, categories}) => {
 
  return (
    <>
      <div className="md:grid grid-cols-3 gap-5 justify-center place-content-center">
            {articles.map((article, i) => {
              return (
                <Card
                  article={article}
                  categories={categories}
                  key={article.attributes.slug}
                />
              )
            })}
          </div>
    </>
  )
}

export default Articles
