import AISection from "../components/AISection";
import Footer from "../components/Footer";
import Header from "../components/Header/Header";
import Heading from "../components/Heading";
import PhotoEditorSection from "../components/PhotoEditorSection";
import QuickLinkSection from "../components/QuickLinkSection";

const Home = () => {
  return (
    <>
      <Heading title='PIXTIT' description='' keywords='' icon='../../public/favicon.ico' />
      <Header />
      <PhotoEditorSection />
      <QuickLinkSection />
      <AISection />
      <Footer />
    </>
  );
};

export default Home;
