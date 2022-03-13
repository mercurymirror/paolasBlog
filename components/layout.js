import SideBar from "./sideBar"

const Layout = ({ children, categories, homepage }) => (
  <div className="flex flex-col md:flex-row">
    <SideBar categories={categories}
    homepage={homepage} />
    {children}
  </div>
)

export default Layout
