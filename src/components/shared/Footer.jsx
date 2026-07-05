import "../../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <span className="footer-brand">Fraye</span>
        <span className="footer-tagline">Curated assets for creators</span>
      </div>
      <div className="footer-right">
        <span className="footer-creator-teaser">
          Want to sell your assets here?{' '}
          <span className="footer-creator-highlight">Creator program — coming soon</span>
        </span>
        <span className="footer-copyright">© 2026 Fraye. School project, not a real store.</span>
      </div>
    </footer>
  );
}

export default Footer;