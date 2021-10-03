import Header from './Header'
import Head_custom from './Head_custom'

const Layout = ({ children }) => {
    return (
        <>
            <div className="body mx-auto relative">
                <Header />
                <main>{children}</main>
            </div>
        </>
    )
}
export default Layout
