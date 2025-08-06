import React from "react";
import { Link } from "react-router-dom";

function CareerCard({ id, title, company, type, experience, location, skills }) {
    return (
        <article className="mb-4 mx-4 sm:mx-40" aria-label={`${title} at ${company}`}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-6 py-4 bg-white rounded-md border border-black shadow-lg hover:border-blue-500 hover:translate-y-1 hover:scale-[1.03] transition-transform duration-200 ease-in-out">

                <section className="flex flex-col items-start gap-3">
                    <header>
                        <h2 className="text-lg font-semibold">
                            {title} - {company}
                        </h2>
                    </header>

                    <p className="text-sm">
                        {type} &#x2022; {experience} &#x2022; {location}
                    </p>

                    <section className="flex flex-wrap items-center gap-2" aria-label="Required Skills">
                        {skills.map((skill, i) => (
                            <span
                                key={i}
                                className="text-gray-500 py-1 px-2 rounded-md border border-black"
                            >
                                {skill}
                            </span>
                        ))}
                    </section>
                </section>

                <footer className="flex-shrink-0 mt-4 sm:mt-0">
                    <Link to={`/careers/${id}`}>
                        <button className="text-violet-600 border border-violet-600 px-10 py-2 rounded-md hover:bg-violet-50">
                            Apply
                        </button>
                    </Link>
                </footer>

            </div>
        </article>
    );
}

export default CareerCard;
