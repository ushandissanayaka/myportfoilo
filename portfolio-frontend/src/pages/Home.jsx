import React from 'react';
import Hero from './sub-components/Hero';
import MyWorks from './sub-components/MyWorks';
import About from './sub-components/About';
import Skills from './sub-components/Skills';
import Portfolio from './sub-components/Portfolio';
import Apps from './sub-components/Apps';
import Contact from './sub-components/Contact';
import ScrollReveal from '../components/ScrollReveal';

import BlobCursor from '../components/ui/BlobCursor';

const Home = () => {
  return (
    <div className="w-full min-h-screen">
      <BlobCursor
        blobType="circle"
        fillColor="#5227FF"
        trailCount={3}
        sizes={[60,125,75]}
        innerSizes={[20,35,25]}
        innerColor="rgba(255,255,255,0.8)"
        opacities={[0.6,0.6,0.6]}
        shadowColor="rgba(0,0,0,0.75)"
        shadowBlur={5}
        shadowOffsetX={10}
        shadowOffsetY={10}
        filterStdDeviation={30}
        useFilter={true}
        fastDuration={0.1}
        slowDuration={0.5}
        zIndex={100}
      />
      <article className="w-full">
        <Hero />
        <ScrollReveal direction="up" delay={100}>
          <MyWorks />
        </ScrollReveal>
        <ScrollReveal direction="up" delay={100}>
          <About />
        </ScrollReveal>
        <ScrollReveal direction="up" delay={100}>
          <Skills />
        </ScrollReveal>
        <ScrollReveal direction="up" delay={100}>
          <Portfolio />
        </ScrollReveal>
        <ScrollReveal direction="up" delay={100}>
          <Apps />
        </ScrollReveal>
        <ScrollReveal direction="up" delay={100}>
          <Contact />
        </ScrollReveal>
      </article>
    </div>
  );
};

export default Home;