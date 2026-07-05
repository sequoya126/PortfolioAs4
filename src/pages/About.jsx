import '../styles/About.css';

function About() {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>About Fraye</h1>
        <p>
            Fraye is a simple, digital marketplace or e-commerce store, for game development assets,
             games, 3d models, sounds kits, UI elements, code templates and more.

        </p>
        <p>
            This project was build for a project in the course SEG3125. This high-fidelity prototype demonstrates a few key featues.
            Faceted search, a guided checkout flow, along with a confirmation message and survery post-purchase.
            This is a student project - not a real store.
          
        </p>
        <p className="about-accent">
          Made for creators, by creators.
        </p>
      </div>
    </div>
  );
}

export default About;