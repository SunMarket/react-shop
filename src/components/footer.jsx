function Footer() {
    return (
    <footer className="page-footer green darken-3">
      <div className="footer-copyright">
        <div className="container">
        {new Date().getFullYear()} Copyright 
        <a href="https://github.com/SunMarket/react-shop" target="_blank">Repo</a>
        </div>
      </div>
    </footer>
    )
}
export {Footer};