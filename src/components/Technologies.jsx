/* eslint-disable react/prop-types */
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import data from "../data/data.json";

const TechnologyItem = ({ name, imageSrc }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="flex items-center mb-4"
  >
    <img src={imageSrc} alt={`${name} Logo`} className="h-8 w-8 mr-2" />
    <span>{name}</span>
  </motion.div>
);

const Technologies = () => {
  const technologiesData = data.technologies;
  const controls = useAnimation();
  const sectionRef = useRef();
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY + window.innerHeight >= sectionRef.current.offsetTop) {
        setIsInView(true);
        controls.start({ opacity: 1, y: 0 });
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [controls]);

  return (
    <div id="technologies" className="max-w-3xl mx-auto py-16">
      <h1 className="text-4xl font-bold text-center text-blue-400 mb-8">
        Technologies 🚀
      </h1>

      <div
        ref={sectionRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-20 gap-y-20 justify-center pb-8 pl-5 pr-5"
      >
        {technologiesData.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }} // 👈 animates again when re-entering view
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <h2 className="text-lg font-semibold mb-4">{category.category}</h2>
            {category.technologies.map((tech, techIndex) => (
              <TechnologyItem key={techIndex} {...tech} />
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Technologies;
