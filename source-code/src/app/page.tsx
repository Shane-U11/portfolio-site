"use client";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
// import TextBlock from "./textBlock";
import "./homeStyles.css";

const Home = () => {
  return (
    <div>
      <Parallax pages={2} className="animation">
        <ParallaxLayer offset={0} speed={0.25}>
          <div className="animation_layer parallax" id="artback"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.3}>
          <div className="animation_layer parallax" id="mountain"></div>
        </ParallaxLayer>
       
        <ParallaxLayer offset={0} speed={0.3}>
          <div className="animation_layer parallax" id="jungle1"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.35}>
          <div className="animation_layer parallax" id="jungle2"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.5}>
          <div className="animation_layer parallax" id="jungle3"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.45}>
          <div className="animation_layer parallax" id="jungle4"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.4}>
          <div className="animation_layer parallax" id="manonmountain"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.35}>
          <div className="animation_layer parallax" id="jungle5"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={-0.1}>
          <div
            style={{ display: "flex", justifyContent: "center" }}
            className="animation_layer parallax"
          >
            {/* <video width="600" style={{zIndex: 5000}} autoPlay muted loop>
              <source src="/WhiteBG.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video> */}
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={0.25}>
          {/* <TextBlock /> */}
        </ParallaxLayer>
      </Parallax>
    </div>
  );
};

export default Home;