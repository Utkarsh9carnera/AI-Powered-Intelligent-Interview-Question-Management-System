import LandingHeader from "../../components/landing/LandingHeader";
import HeroSection from "../../components/landing/HeroSection";
import AuthorizedCard from "../../components/landing/AuthorizedCard";
import FeaturesSection from "../../components/landing/FeaturesSection";
import LandingFooter from "../../components/landing/LandingFooter";

import "../../styles/landing.css";

function LandingPage() {
  return (
    <div className="landing-container">
      {/* Decorative Background */}
      <div className="bg-circle-large"></div>
      <div className="bg-circle-small"></div>
      <div className="bg-purple-dot"></div>

      {/* Full Width Header */}
      <LandingHeader />

      {/* Page Content */}
      <div className="landing-content">
        <HeroSection />

        <AuthorizedCard />

        <FeaturesSection />

        <LandingFooter />
      </div>
    </div>
  );
}

export default LandingPage;