// import gamestackTexture2Large from '~/assets/gamestack-list-large.jpg';
// import gamestackTexture2Placeholder from '~/assets/gamestack-list-placeholder.jpg';
// import gamestackTexture2 from '~/assets/gamestack-list.jpg';
// import gamestackTextureLarge from '~/assets/gamestack-login-large.jpg';
// import gamestackTexturePlaceholder from '~/assets/gamestack-login-placeholder.jpg';
// import gamestackTexture from '~/assets/gamestack-login.jpg';
// import sliceTextureLarge from '~/assets/slice-app-large.jpg';
// import sliceTexturePlaceholder from '~/assets/slice-app-placeholder.jpg';
// import sliceTexture from '~/assets/slice-app.jpg';
// import sprTextureLarge from '~/assets/spr-lesson-builder-dark-large.jpg';
// import sprTexturePlaceholder from '~/assets/spr-lesson-builder-dark-placeholder.jpg';
// import sprTexture from '~/assets/spr-lesson-builder-dark.jpg';
import sprTexturePlaceholder from '~/assets/Screenshot (618).png';
import gamestackTexture2 from '~/assets/Havens.png';
import meowChan from '~/assets/meowChan.png';
import sliceTexture from '~/assets/Orion.png';
import sprTexture from '~/assets/Screenshot (618).png';
import { Footer } from '~/components/footer';
import { baseMeta } from '~/utils/meta';
import { Intro } from './intro';
import { Profile } from './profile';
import { ProjectSummary } from './project-summary';
import { useEffect, useRef, useState } from 'react';
import config from '~/config.json';
import styles from './home.module.css';

// Prefetch draco decoader wasm
export const links = () => {
  return [
    {
      rel: 'prefetch',
      href: '/draco/draco_wasm_wrapper.js',
      as: 'script',
      type: 'text/javascript',
      importance: 'low',
    },
    {
      rel: 'prefetch',
      href: '/draco/draco_decoder.wasm',
      as: 'fetch',
      type: 'application/wasm',
      importance: 'low',
    },
  ];
};

export const meta = () => {
  return baseMeta({
    title: 'Designer + Developer',
    description: `Design portfolio of ${config.name} — a product designer working on web & mobile apps with a focus on motion, experience design, and accessibility.`,
  });
};

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const projectFour = useRef();
  const details = useRef();

  useEffect(() => {
    const sections = [intro, projectOne, projectTwo, projectThree, projectFour, details];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Intro
        id="intro"
        sectionRef={intro}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="BITYUVA | Designing the crypto in & out"
        description="Empowering the next gen of innovators in decentralized finance."
        buttonText="Check this out"
        buttonLink="/"
        model={{
          type: 'laptop',
          alt: 'BitYuva',
          textures: [
            {
              srcSet: `${sprTexture} 1280w, ${sprTexture} 2560w`,
              placeholder: sprTexturePlaceholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-2"
        alternate
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title="Havenz Home: Furnishing Dreams"
        description="Elevating home decor with a seamless online shopping experience, crafted with love"
        buttonText="View website"
        buttonLink="/"
        model={{
          type: 'laptop',
          alt: 'App login screen',
          textures: [
            {
              srcSet: `${gamestackTexture2} 375w, ${gamestackTexture2} 750w`,
              placeholder: gamestackTexture2,
            }
          ],
        }}
      />
      <ProjectSummary
        id="project-3"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={3}
        title="Orion | MLM Business Web App"
        description="Empower your network, elevate your income."
        buttonText="View project"
        buttonLink="/"
        model={{
          type: 'laptop',
          alt: 'Annotating a biomedical image in the Slice app',
          textures: [
            {
              srcSet: `${sliceTexture} 800w, ${sliceTexture} 1920w`,
              placeholder: sliceTexture,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-4"
        alternate
        sectionRef={projectFour}
        visible={visibleSections.includes(projectFour.current)}
        index={4}
        title="MeowChan | Mui Styled Social Media Frontend"
        description="A MUI styled social media frontend built with React"
        buttonText="View website"
        buttonLink="/"
        model={{
          type: 'laptop',
          alt: 'App login screen',
          textures: [
            {
              srcSet: `${meowChan} 375w, ${meowChan} 750w`,
              placeholder: meowChan,
            }
          ],
        }}
      />
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Footer />
    </div>
  );
};
