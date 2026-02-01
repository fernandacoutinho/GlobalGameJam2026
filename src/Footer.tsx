import './Footer.css';

type FooterProps = {
  nomes: string;
};

export default function Footer({ nomes }: FooterProps) {
  return (
    <footer className="footer">
      <span className="footer-text">
        {nomes}
      </span>
    </footer>
  );
}
