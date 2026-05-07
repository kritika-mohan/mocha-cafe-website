import SectionHeading from '../components/SectionHeading';
import './About.css';

const About = () => {
  return (
    <div className="page-transition about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1 className="about-title">More Than Just Coffee</h1>
          <p className="about-subtitle">We believe in crafting experiences that linger long after the last drop.</p>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section container">
        <SectionHeading eyebrow="Our Ethos" title="What Drives Us" centered={true} />
        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon">🌱</div>
            <h3 className="value-title">Sustainability</h3>
            <p className="value-desc">We work directly with Indian farmers to ensure ethical sourcing, fair wages, and environmentally conscious farming practices.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">✦</div>
            <h3 className="value-title">Craft Excellence</h3>
            <p className="value-desc">From our in-house roastery to the meticulous preparation by our baristas, we obsess over every detail of the brewing process.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">🤝</div>
            <h3 className="value-title">Community</h3>
            <p className="value-desc">Mocha Café was built to be a sanctuary—a place where ideas are shared, friendships are forged, and everyone is welcome.</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section bg-soft">
        <div className="container">
          <SectionHeading eyebrow="The Masters" title="Meet Our Team" centered={true} />
          <div className="team-grid">
            <div className="team-card">
              <div className="team-avatar">
                <span>PM</span>
              </div>
              <h3 className="team-name">Priya Mehra</h3>
              <p className="team-role text-accent">Founder & Head Roaster</p>
            </div>
            <div className="team-card">
              <div className="team-avatar">
                <span>AM</span>
              </div>
              <h3 className="team-name">Arjun Mehra</h3>
              <p className="team-role text-accent">Co-Founder & Pastry Chef</p>
            </div>
            <div className="team-card">
              <div className="team-avatar">
                <span>RK</span>
              </div>
              <h3 className="team-name">Riya Kapoor</h3>
              <p className="team-role text-accent">Lead Barista & Trainer</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
