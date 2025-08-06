import React from "react";
import CareerCard from "./components/CareerCard";

const jobs = [
    {
        id: 1,
        title: "Frontend Developer",
        location: "Remote",
        type: "Full-time",
        description: "Build beautiful and responsive UI using React.",
    },
    {
        id: 2,
        title: "Backend Developer",
        location: "On-site",
        type: "Part-time",
        description: "Create secure APIs and manage databases.",
    },
];

const CareerList = ({ onSelect }) => (
    <section aria-label="Job Listings" className="space-y-4">
        <ul className="space-y-4 list-none p-0 m-0">
            {jobs.map((job) => (
                <li key={job.id}>
                    <CareerCard job={job} onApply={() => onSelect(job)} />
                </li>
            ))}
        </ul>
    </section>
);

export default CareerList;
