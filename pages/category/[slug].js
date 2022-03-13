import Articles from "../../components/articles"
import { fetchAPI } from "../../lib/api"
import Layout from "../../components/layout"
import Seo from "../../components/seo"

const Category = ({ category, categories, homepage }) => {
  const seo = {
    metaTitle: category.attributes.name,
    metaDescription: `All ${category.attributes.name} articles`,
  }

  return (
    <Layout 
    categories={categories.data}
    homepage={homepage}
    >
      <Seo seo={seo} />
      <div>
        <div className="container p-10">
          <h2 className="text-xl mb-3 uppercase">{category.attributes.name}</h2>
          <Articles articles={category.attributes.articles.data} />
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const categoriesRes = await fetchAPI("/categories", { fields: ["slug"] })

  return {
    paths: categoriesRes.data.map((category) => ({
      params: {
        slug: category.attributes.slug,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const matchingCategories = await fetchAPI("/categories", {
    filters: { slug: params.slug },
    populate: {
      articles: {
        populate: "*",
      },
    },
  })
  const [allCategories, homepageRes] = await Promise.all ([ 
    fetchAPI("/categories"),
    fetchAPI("/homepage", {
      populate: {
        hero: "*",
        bio: "*",
        seo: { populate: "*" },
      },
    })
  ])
  return {
    props: {
      category: matchingCategories.data[0],
      categories: allCategories,
      homepage: homepageRes.data,
    },
    revalidate: 1,
  }
}

export default Category
