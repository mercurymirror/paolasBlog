import ReactMarkdown from "react-markdown"
import Moment from "react-moment"
import { fetchAPI } from "../../lib/api"
import Layout from "../../components/layout"
import NextImage from "../../components/image"
import Seo from "../../components/seo"
import { getStrapiMedia } from "../../lib/media"

const Article = ({ article, categories, homepage }) => {
  const imageUrl = getStrapiMedia(article.attributes.image)

  const seo = {
    metaTitle: article.attributes.title,
    metaDescription: article.attributes.description,
    shareImage: article.attributes.image,
    article: true,
  }

  return (
    <Layout
      categories={categories.data}
      homepage={homepage}
    >
      <Seo seo={seo} />
      <div className="container flex-column pb-10 px-4">
        <div className="pt-10">
          <h1 className="uppercase text-xl">{article.attributes.title}</h1>
        </div>
        <div className="mt-3">
          <div className="">
            <ReactMarkdown
              source={article.attributes.content}
              escapeHtml={false}
            />
            </div>
        </div>
        <div className="md:w-1/2 mx-auto mt-5">
              {article.attributes.image.data.attributes.url && (
                <NextImage image={article.attributes.image} />
              )}
            </div>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const articlesRes = await fetchAPI("/articles", { fields: ["slug"] })

  return {
    paths: articlesRes.data.map((article) => ({
      params: {
        slug: article.attributes.slug,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const articlesRes = await fetchAPI("/articles", {
    filters: {
      slug: params.slug,
    },
    populate: "*",
  })
  const [categoriesRes, homepageRes] = await Promise.all([
    fetchAPI("/categories"),
    fetchAPI("/homepage", {
      populate: {
        hero: "*",
        bio: "*",
        seo: { populate: "*" },
      },
    }),
  ])
  return {
    props: {
      article: articlesRes.data[0],
      categories: categoriesRes,
      homepage: homepageRes.data,
    },
    revalidate: 1,
  }
}

export default Article
