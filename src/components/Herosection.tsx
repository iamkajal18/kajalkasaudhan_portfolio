import React from "react";

function Herosection() {
  return (
    <div>
      <section className="pt-12 pb-10 lg:pt-[80px] lg:pb-12 bg-white dark:bg-dark">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center -mx-4">
            <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[510px] text-center lg:mb-20">
  <h1 className="text-2xl font-bold mb-4">📘
  <span className="bg-gradient-to-r from-gray-500 to-black bg-clip-text text-transparent">
   Subject-Wise Breakdown for Competition
    </span>
    <span className="text-dark dark:text-white"> Placement Preparation & Tips</span>
  </h1>
</div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4 md:w-1/2 lg:w-1/3">
              <div className="w-full mb-10">
                <div className="mb-8 overflow-hidden rounded">
                <a href="/verbal">
  <img
    src="Verbal.png"
    alt="Verbal Ability Image"
    className="w-full"
  />
</a>

                </div>
                <div>
                  <h3>
                    <a
                      href="/verbal"
                      className="inline-block mb-4 text-xl font-semibold text-dark dark:text-white hover:text-primary sm:text-2xl lg:text-xl xl:text-2xl"
                    >
                     Verbal Ability
                    </a>
                  </h3>
                  <p className="text-base text-body-color dark:text-dark-6">
                  Unlock Verbal Excellence: Sharpen Your Mind, Speak with Confidence, and Master the Art of Effective Communication!...

                  </p>
                  <a href="/verbal">
                  <span className="inline-block px-4 py-1 mb-5 mt-5 text-xs font-semibold leading-loose text-center text-white rounded bg-primary">
                   View More
                  </span>
                  </a>
                </div>
              </div>
            </div>
            <div className="w-full px-4 md:w-1/2 lg:w-1/3">
              <div className="w-full mb-10">
                <div className="mb-8 overflow-hidden rounded">
                <a href="/reasoning">
  <img
    src="Reasoning.png"
    alt="Reasoning Ability Image"
    className="w-full"
  />
</a>

                </div>
                <div>
                  <h3>
                    <a
                      href="/reasoning"
                      className="inline-block mb-4 text-xl font-semibold text-dark dark:text-white hover:text-primary sm:text-2xl lg:text-xl xl:text-2xl"
                    >
                    Reasoning Ability 
                    </a>
                  </h3>
                  <p className="text-base text-body-color dark:text-dark-6">
                  Master the Mind Game: Crush Competitive Reasoning with Pattern-Breaking Logic Hacks!...
                  </p>
                  <a href="/reasoning">
                  <span className="inline-block px-4 py-1 mb-5 mt-5 text-xs font-semibold leading-loose text-center text-white rounded bg-primary">
                   View More
                  </span>
                  </a>
                </div>
              </div>
            </div>
            <div className="w-full px-4 md:w-1/2 lg:w-1/3">
              <div className="w-full mb-10">
                <div className="mb-8 overflow-hidden rounded">
                <a href="/numerical">
  <img
    src="NumericalAbility.jpg"
    alt="Numerical Ability Image"
    className="w-full"
  />
</a>

                </div>
                <div>
                  <h3>
                    <a
                      href="/numerical"
                      className="inline-block mb-4 text-xl font-semibold text-dark dark:text-white hover:text-primary sm:text-2xl lg:text-xl xl:text-2xl"
                    >
                     Numerial Ability
                    </a>
                  </h3>
                  <p className="text-base text-body-color dark:text-dark-6">
                  Possess strong numerical ability with excellent analytical and problem-solving skills.
                  
                  </p>
                  <a href="/numerical">
                  <span className="inline-block px-4 py-1 mb-5 mt-5 text-xs font-semibold leading-loose text-center text-white rounded bg-primary">
                   View More
                  </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Herosection;
