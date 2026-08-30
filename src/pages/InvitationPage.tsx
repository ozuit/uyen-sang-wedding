import FigmaCanvas from "../components/FigmaCanvas";
import { invitationVi } from "../content/invitation.vi";
import CoupleIntro from "../sections/CoupleIntro";
import Events from "../sections/Events";
import Footer from "../sections/Footer";
import Gallery from "../sections/Gallery";
import Hero from "../sections/Hero";
import RSVP from "../sections/RSVP";

export default function InvitationPage() {
  return (
    <main className="min-h-dvh">
      <FigmaCanvas>
        <Hero content={invitationVi} />
        <div className="px-4 py-[50px] md:px-10 lg:px-16">
          <CoupleIntro content={invitationVi} />
        </div>
        <div className="px-4 py-[50px] md:px-10 lg:px-16">
          <Events content={invitationVi} />
        </div>
        <div className="px-4 py-[50px] md:px-10 lg:px-16">
          <Gallery content={invitationVi} />
        </div>
        <div className="px-4 py-[50px] md:px-10 lg:px-16">
          <RSVP content={invitationVi} />
        </div>
        <div className="px-4 py-[50px] md:px-10 lg:px-16">
          <Footer />
        </div>
      </FigmaCanvas>
    </main>
  );
}
