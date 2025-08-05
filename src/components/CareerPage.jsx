import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import SearchBar from "./SearchBar";
import CareerCard from "./CareerCard";
import CareerForm from "./CareerForm";

const dummyJobs = [
    {
        id: 1,
        title: "Frontend Developer",
        company: "Tech Corp",
        location: "Remote",
        experience: "Junior Level",
        type: "Full Time",
        skills: ["React", "JavaScript", "CSS"],
        postedOn: new Date("2025-08-01"),
    },
    {
        id: 2,
        title: "Backend Developer",
        company: "Code Inc",
        location: "On-site",
        experience: "Mid Level",
        type: "Part Time",
        skills: ["Node.js", "Express", "MongoDB"],
        postedOn: new Date("2025-07-30"),
    },
    {
        id: 3,
        title: "iOS Developer",
        company: "Apple Systems",
        location: "Remote",
        experience: "Fresher",
        type: "Contract",
        skills: ["Swift", "UIKit"],
        postedOn: new Date("2025-07-29"),
    },
];

function CareerPage() {
    const [jobs, setJobs] = useState(dummyJobs);

    const fetchJobsCustom = (criteria) => {
        const filtered = dummyJobs.filter((job) => {
            return (
                (criteria.title === "" || job.title === criteria.title) &&
                (criteria.location === "" || job.location === criteria.location) &&
                (criteria.experience === "" || job.experience === criteria.experience) &&
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
                    <main className="px-10">
                        <section className="mb-6">
                            <h1 className="text-2xl font-bold">
                                Welcome to the available job opportunities at Trusted Systems Company for Information Technology
                            </h1>
                        </section>

                        <SearchBar fetchJobsCustom={fetchJobsCustom} />

                        <section className="space-y-4 my-6">
                            {jobs.length > 0 ? (
                                jobs.map((job) => <CareerCard key={job.id} {...job} />)
                            ) : (
                                <p className="text-center text-gray-500">No jobs found.</p>
                            )}
                        </section>
                    </main>
                }
            />

            <Route
                path="/careers/:id"
                element={
                    <main className="px-10">
                        <CareerForm jobs={jobs} />
                    </main>
                }
            />
        </Routes>
    );
}

export default CareerPage;
