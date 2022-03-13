import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Hamburger from "./hamburger";
import gsap from "gsap";


const Header = ({ homepage, categories }) => {

  //state for menu button
  const [state, setState] = useState({
    initial: false,
    clicked: null,
    menuName: "Menu",
  });

  //state for disabled button
  const [disabled, setDisabled] = useState(false);

  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      setState({ clicked: false, menuName: "Menu" });
    };

    router.events.on("routeChangeStart", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  const handleMenu = () => {
    disabledMenu();
    if (state.initial === false) {
      setState({
        initial: null,
        clicked: true,
        menuName: "Close",
      });
      gsap.to('.menu button', {
        duration: 1,
        rotate: '20deg',
        ease: "Power1.easeInOut",
      })
    } else if (state.clicked === true) {
      setState({
        clicked: !state.clicked,
        menuName: "Menu",
      });
      gsap.to('.menu button', {
        duration: 1,
        rotate: '-20deg',
        ease: "Power1.easeInOut",
      })
    } else if (state.clicked === false) {
      setState({
        clicked: !state.clicked,
        menuName: "Close",
      });
      gsap.to('.menu button', {
        duration: 1,
        rotate: '20deg',
        ease: "Power1.easeInOut",
      })
    }
  };

  // determine if our menu button should be disabled
  const disabledMenu = () => {
    setDisabled(!disabled);
    setTimeout(() => {
      setDisabled(false);
    }, 1200);
  };

  useEffect(() => {
    const hasPlayed = sessionStorage.getItem("hasMyAnimationPlayed");
 console.log(hasPlayed);
if (!hasPlayed) {

  gsap.from('.logo', {
    duration: 1,
    letterSpacing: '.6em',
    onComplete: function() {
      sessionStorage.setItem("hasMyAnimationPlayed", true);
    }
  });
}
}, []);

return (
    <header className="md:hidden">
      <div className="container-burger">
        <div className="wrapper">
          <div className="inner-header">
            <div className="menu">
              <button
                disabled={disabled}
                onClick={handleMenu}
                className="rounded-full bg-black"
              >
                <a className="menuBtn text-white text-xs">
{state.menuName}
                  </a>
              </button>
            </div>
            <a href="/">
            <h3 id="logo" className="logo text-xl uppercase mb-4">{homepage.attributes.hero.title}</h3>
            </a>
          </div>
        </div>
      </div>
      <Hamburger state={state}
      categories={categories} />
    </header>
  );
}


export default Header