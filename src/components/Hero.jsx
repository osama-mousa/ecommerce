import React from 'react'

const Hero = () => {
    return (
        <section className="bg-gray-900 text-white">
            <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen ">
                <div className="mx-auto max-w-3xl text-center">
                    <h1
                        className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl pb-1 "
                    >
                        All Your Digital Products

                        <span className="sm:block"> Is One Click Away </span>
                    </h1>

                    <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
                        Start Exploring State of the Art Assets Now!
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <a
                            className="block w-full rounded border border-secondary bg-secondary px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                            href="/get-started"
                        >
                            Get Started
                        </a>

                        <a
                            className="block w-full rounded border border-primary px-12 py-3 text-sm font-medium text-white hover:bg-primary focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
                            href="/about"
                        >
                            Learn More
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero