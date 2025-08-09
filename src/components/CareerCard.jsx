import React from "react";
import { Link } from "react-router-dom";

function CareerCard({
  jobId,
  title,
  description,
  postedDate,
  deadline,
  postedBy,
}) {
  return (
    <>
      <article className="mx-40 mb-4" aria-label={`${title} by ${postedBy}`}>
        <div className="flex justify-between items-center px-6 py-4 bg-white rounded-md border border-black shadow-lg hover:border-blue-500 hover:translate-y-1 hover:scale-103">
          <section className="flex flex-col items-start gap-3">
            <header>
              <h2 className="text-lg font-semibold">{title}</h2>
            </header>

            <p className="text-sm text-gray-600">{description}</p>

            <p className="text-sm">
              <span className="font-medium">Posted:</span>{" "}
              {new Date(postedDate).toLocaleDateString()} &nbsp;|&nbsp;
              <span className="font-medium">Deadline:</span>{" "}
              {new Date(deadline).toLocaleDateString()}
            </p>
          </section>

          <footer className="flex items-center gap-4">
            <Link to={`/careers/${jobId}`}>
              <button className="text-violet-600 border border-violet-600 px-10 py-2 rounded-md hover:bg-violet-50">
                Apply
              </button>
            </Link>
          </footer>
        </div>
      </article>
    </>
  );
}

export default CareerCard;
