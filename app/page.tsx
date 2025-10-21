import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <Link href="/">
              <Image src="/logo.jpg" alt="Navieros Logo" width={120} height={40} />
            </Link>
          </div>
          <Link
            href="/start-leave-application"
            className="nav-button bg-black text-white px-5 py-2 rounded hover:bg-gray-800 transition-colors"
          >
            Leave Application
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Navieros Transportation portal</h1>
          <p>Your gateway to safe and reliable transportation solutions, clean energy with precision and care
</p>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>We are "Fueling Progress, Navigating the Future." Navieros Transportations</h2>
              <p>
                At Navieros, we know the challenges of navigating both the seas and the complexities of global energy
                needs. As sailors and industry leaders, we bring unmatched expertise to deliver cleaner energy across
                the world. Every voyage is a testament to our commitment to sustainability and innovation, bridging the
                gap between energy demands and environmental responsibility. Our purpose is clear: to connect
                communities and industries with efficient, reliable, and environmentally-friendly Liquid Gas solutions,
                all while honoring the dedication and expertise of the sailors who make it possible.
              </p>
            </div>
            <div className="about-image">
              <Image src="/hero-bg.jpg" alt="Navieros Operations" width={600} height={400} />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <div className="container">
          <div className="services-grid">
            <div className="service-card">
              <Image src="/hero-bg.jpg" alt="Maritime Transport" width={300} height={200} />
              <h3>Maritime Transport</h3>
            </div>
            <div className="service-card">
              <Image src="/hero-bg.jpg" alt="Cargo Handling" width={300} height={200} />
              <h3>Cargo Handling</h3>
            </div>
            <div className="service-card">
              <Image src="/hero-bg.jpg" alt="Logistics Services" width={300} height={200} />
              <h3>Logistics Services</h3>
            </div>
          </div>
        </div>
      </section>

      <section className="kb-section-x821">
        <h2 className="kb-title-tx32">Know before you go</h2>
        <div className="kb-cards-wrap-p923">
          <div className="kb-card-ppp9">
            <h3>Advanced Fleet Management</h3>
            <p>
              Real-time tracking and monitoring of Navieros carriers. Optimized routing systems to ensure timely and
              efficient deliveries. Fleet equipped with GPS and IoT technology for transparency and accountability.
            </p>
          </div>
          <div className="kb-card-ppp9">
            <h3>Safety &amp; Compliance</h3>
            <p>
              Adherence to international safety standards for Navieros transportation. Regular inspection and
              maintenance of vehicles and storage tanks. Compliance with regional and global regulations, including ADR,
              IMO, and ISO standards.
            </p>
          </div>
          <div className="kb-card-ppp9">
            <h3>State-of-the-Art Storage Solutions</h3>
            <p>
              Pressurized and refrigerated Navieros storage facilities. Secure loading and unloading stations with
              automated systems. Real-time inventory tracking with digital platforms. Have questions?
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="bg-wrap-xzy893">
          <div className="overlay-box-qwe123">
            <h1 className="main-heading-nmn557">Stay up to date</h1>
            <p className="subtext-kel429">Get regular updates about upcoming trips.</p>
            <form className="form-area-zyx778">
              <input type="email" placeholder="Your email" className="input-email-dfa654" required />
              <button type="submit" className="btn-subscribe-mzx441">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
