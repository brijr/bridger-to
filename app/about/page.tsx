import { Main, Section, Container } from "@/components/ds";
import { AnimatedContent } from "@/components/site/animated-content";
import { FeatImage } from "@/components/site/feat-image";
import { Hero } from "@/components/site/hero";

import Dolomite from "@/public/dolomite.webp";

export default function AboutPage() {
  return (
    <Main>
      <Section>
        <Container className="space-y-8">
          <Hero path="About" pathHref="/about" />
          <AnimatedContent>
            <AboutContent />
            <FeatImage
              src={Dolomite}
              alt="A photo I took while visiting the Dolomites in Italy"
            />
          </AnimatedContent>
        </Container>
      </Section>
    </Main>
  );
}

const AboutContent = () => {
  return (
    <div className="text-pretty space-y-3">
      <h2>
        I'm a software engineer and technical entrepreneur who builds at the
        intersection of design, AI, and human-computer interaction.
      </h2>
      <h3>
        Here's what I believe: AI is extraordinarily powerful, but most AI tools
        are extraordinarily bad at helping people actually use that power.
        They're built by engineers who understand the technology but not the
        people using it. And that's a problem.
      </h3>
      <h3>
        I come from a marketing and advertising background, which means I've
        spent years understanding what makes people click, what makes them
        frustrated, and what makes them come back. That perspective shapes
        everything I build.
      </h3>
      <h3>
        My focus is on closing the gap between what AI can do and what people
        need it to do. I design systems that feel simple and intuitive on the
        surface while running sophisticated technology underneath. No confusing
        interfaces. No fighting with prompts. Just tools that work the way you
        think.
      </h3>
      <h3>
        I'm interested in the hard problems: How do you make AI feel natural?
        How do you design interfaces that make complex technology accessible?
        How do you build software that actually solves problems instead of
        creating new ones?
      </h3>
      <h3>If you're working on similar questions, let's talk.</h3>
    </div>
  );
};
