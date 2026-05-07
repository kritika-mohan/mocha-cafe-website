import { Link } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';
import './Home.css';

const Home = () => {
  return (
    <div className="page-transition">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h1 className="hero-title">Where Every Sip<br/>Tells A Story</h1>
          <p className="hero-subtitle">
            Experience artisan coffee and over 50 curated dishes inspired by high-end European cafe culture and warm Indian hospitality.
          </p>
          <div className="hero-actions">
            <Link to="/menu" className="btn btn-primary">Explore Menu</Link>
            <Link to="/about" className="btn btn-outline" style={{ color: '#fff', borderColor: '#fff' }}>Our Story</Link>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="history-section container">
        <div className="history-grid">
          <div className="history-text">
            <SectionHeading eyebrow="Our Heritage" title="A City Institution" />
            <p className="history-desc">
              Founded in 1998 in the heart of Udaipur by Priya and Arjun Mehra, Mocha Café started as a humble dream to bring world-class roasts to our local community. Over the last 25 years, we have grown into a beloved city institution.
            </p>
            <p className="history-desc">
              We source our beans directly from the lush estates of Coorg and Wayanad, ensuring every cup supports local farmers while delivering unparalleled flavor.
            </p>
            <blockquote className="history-quote">
              "Coffee is our love language"
              <cite>— Priya Mehra, Founder</cite>
            </blockquote>
          </div>
          <div className="history-image-panel">
            <img src="/history_img.png" alt="Mocha Cafe History" className="history-img" />
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section bg-soft">
        <div className="container">
          <SectionHeading eyebrow="The Journey" title="Our Timeline" centered={true} />
          <div className="timeline">
            {[
              { year: '1998', title: 'The First Cup' },
              { year: '2003', title: 'The Roastery' },
              { year: '2010', title: 'The Expansion' },
              { year: '2018', title: 'The Recognition', desc: 'Condé Nast Traveller Top 10' },
              { year: '2024', title: 'The Next Chapter' }
            ].map((item, index) => (
              <div className="timeline-item" key={item.year}>
                <div className="timeline-year text-accent">{item.year}</div>
                <div className="timeline-content">
                  <h3 className="timeline-title">{item.title}</h3>
                  {item.desc && <p className="timeline-desc text-muted">{item.desc}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
