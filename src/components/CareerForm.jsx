import React, { useState } from "react";
import { useParams } from "react-router-dom";

const CareerForm = ({ jobs }) => {
    const { id } = useParams();
    const career = jobs.find((job) => job.id === parseInt(id));

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        title: "",
        cv: null,
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const validate = () => {
        const err = {};
        if (!formData.name) err.name = "Name is required.";
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) err.email = "Valid email is required.";
        if (!formData.phone) err.phone = "Phone is required.";
        if (!formData.cv) err.cv = "Please upload your CV.";
        return err;
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({ ...formData, [name]: files ? files[0] : value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const err = validate();
        if (Object.keys(err).length) return setErrors(err);
        setErrors({});
        setSubmitted(true);
    };

    if (!career) {
        return (
            <main className="max-w-3xl mx-auto p-6 mt-10">
                <p className="text-red-500">Job not found.</p>
            </main>
        );
    }

    return (
        <main className="max-w-3xl mx-auto p-6 bg-white rounded shadow border mt-10">
            <article aria-label={`Apply for ${career.title}`}>
                <header>
                    <h2 className="text-xl font-bold mb-4">Apply for {career.title}</h2>
                </header>

                {submitted ? (
                    <section className="text-green-700">
                        Application sent! We'll contact you soon.
                    </section>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <fieldset className="space-y-4">
                            <legend className="sr-only">Applicant Information</legend>

                            <section>
                                <label htmlFor="name" className="block text-sm font-medium">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                            </section>

                            <section>
                                <label htmlFor="email" className="block text-sm font-medium">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </section>

                            <section>
                                <label htmlFor="phone" className="block text-sm font-medium">Phone</label>
                                <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                />
                                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                            </section>

                            <section>
                                <label htmlFor="cover" className="block text-sm font-medium">Cover Letter</label>
                                <textarea
                                    id="cover"
                                    name="cover"
                                    value={formData.cover}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                />
                            </section>

                            <section>
                                <label htmlFor="cv" className="block text-sm font-medium">Upload CV</label>
                                <input
                                    type="file"
                                    id="cv"
                                    name="cv"
                                    onChange={handleChange}
                                    className="w-full"
                                />
                                {errors.cv && <p className="text-red-500 text-sm">{errors.cv}</p>}
                            </section>
                        </fieldset>

                        <footer>
                            <button type="submit" className="bg-violet-500 text-white px-4 py-2 rounded hover:bg-violet-600 transition">
                                Submit Application
                            </button>

                        </footer>
                    </form>
                )}
            </article>
        </main>
    );
};

export default CareerForm;
