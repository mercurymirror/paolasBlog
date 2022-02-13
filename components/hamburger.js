import React, { useEffect, useRef } from "react";
import Link from "next/dist/client/link";
import gsap from "gsap";

const Hamburger = ({ state, categories }) => {
  //vars for our animated DOM nodes
  let menu = useRef(null);
  let revealMenu = useRef(null);
  let revealMenuBackground = useRef(null);

  useEffect(() => {
    if (state.clicked === false) {
      //close the menu
      gsap.to([revealMenu, revealMenuBackground], {
        duration: 0.8,
        width: 0,
        ease: "power3.inOut",
        stagger: {
          amount: 0.07,
        },
      });
      gsap.to(menu, {
        duration: 1,
        css: { display: "none" },
      });
    } else if (
      state.clicked === true ||
      (state.clicked === true && state.initial === null)
    ) {
      gsap.to(menu, {
        duration: 0,
        css: { display: "block" },
      });
      gsap.fromTo(
        [revealMenuBackground, revealMenu],
        {
          width: 0,
        },
        {
          duration: 0.8,
          opacity: 1,
          width: "100%",
          stagger: {
            amount: 0.07,
          },
        }
      );
      staggerReveal(revealMenuBackground, revealMenu);
    }
  }, [state]);

  const staggerReveal = (node1, node2) => {
    gsap.from([node1, node2], {
      duration: 0.8,
      transformOrigin: "right top",
      ease: "power3.inOut",
      stagger: {
        amount: 0.1,
      },
    });
  };

  const handleHover = (e) => {
    gsap.to(e.target, {
      duration: 0.3,
      y: 3,
      skewX: 4,
      ease: "power3.inOut",
    });
  };

  const handleHoverExit = (e) => {
    gsap.to(e.target, {
      duration: 0.3,
      y: -3,
      skewX: 0,
      ease: "power3.inOut",
    });
  };

  return (
    <div ref={(el) => (menu = el)} className="hamburger-menu">
      <div
        ref={(el) => (revealMenuBackground = el)}
        className="menu-secondary-background-color"
      ></div>
      <div ref={(el) => (revealMenu = el)} className="menu-layer">
        <div>
          <div className="wrapper">
            <div className="menu-links">
              <nav>
              <ul className="uk-nav">
                            {categories.map((category) => {
                                return (
                                    <li key={category.id}>
                                        <Link href={`/category/${category.attributes.slug}`}>
                                            <a className="uk-link-reset uk-text-capitalize"
                                            onMouseEnter={(e) => handleHover(e)}
                                            onMouseOut={(e) => handleHoverExit(e)}
                                            ref={category.attributes.id}>
                                              {category.attributes.name}</a>
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hamburger;