import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import CareerCard from "../components/CareerCard";
import CareerForm from "../components/CareerForm";
import Navbar from "../components/Nav";
import Footer from "../components/Footer";

function CareerPage() {
  const [jobs, setJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);

  useEffect(() => {
    fetch("https://gutenberg-server-production.up.railway.app/api/job")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setAllJobs(data);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });
  }, []);

  const fetchJobsCustom = (criteria) => {
    const filtered = allJobs.filter((job) => {
      return (
        (criteria.title === "" || job.title === criteria.title) &&
        (criteria.location === "" || job.location === criteria.location) &&
        (criteria.experience === "" ||
          job.experience === criteria.experience) &&
        (criteria.type === "" || job.type === criteria.type)
      );
    });

    setJobs(filtered);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <main className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 max-w-[1200px] mx-auto my-5">
              <section className="mb-6">
                <h1 className="text-2xl font-bold">
                  Welcome to the available job opportunities at Trusted Systems
                  Company for Information Technology
                </h1>
              </section>

              <SearchBar fetchJobsCustom={fetchJobsCustom} />

              <section className="space-y-4 my-6">
                {jobs.length > 0 ? (
                  jobs.map((job) => (
                    <CareerCard key={job.jobId || job.id} {...job} />
                  ))
                ) : (
                  <p className="text-center text-gray-500">No jobs found.</p>
                )}
              </section>
            </main>
            <Footer />
          </>
        }
      />

      <Route
        path=":id"
        element={
          <main className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 max-w-[1200px] mx-auto">
            <CareerForm jobs={jobs} />
          </main>
        }
      />
    </Routes>
  );
}

export default CareerPage;
