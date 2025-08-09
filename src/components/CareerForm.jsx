import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CareerForm = ({ jobs }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cover: "",
    cv: null,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isJobLoading, setIsJobLoading] = useState(true);
  const { id } = useParams();

  // Mock authentication context - replace with your actual auth
  const user = { id: 1 }; // استبدل هذا بـ useAuth() hook

  useEffect(() => {
    if (jobs && jobs.length > 0) {
      setIsJobLoading(false);
    }
  }, [jobs]);

  if (isJobLoading) {
    return (
      <div className="max-w-3xl mx-auto p-6 mt-10">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!jobs || jobs.length === 0) {
    return (
      <div className="max-w-3xl mx-auto p-6 mt-10 text-center">
        <p className="text-gray-500">جاري تحميل تفاصيل الوظيفة...</p>
      </div>
    );
  }

  const career = jobs.find(
    (job) => job.id === parseInt(id) || job.jobId === parseInt(id)
  );

  if (!career) {
    return (
      <div className="max-w-3xl mx-auto p-6 mt-10 text-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-red-600 font-medium">الوظيفة غير موجودة</p>
          <p className="text-red-500 text-sm mt-2">
            تأكد من صحة الرابط أو اختر وظيفة أخرى
          </p>
        </div>
      </div>
    );
  }

  const validate = () => {
    const err = {};

    // Name validation
    if (!formData.name.trim()) {
      err.name = "الاسم مطلوب";
    } else if (formData.name.trim().length < 2) {
      err.name = "الاسم قصير جداً (على الأقل حرفان)";
    }

    // Email validation
    if (!formData.email.trim()) {
      err.email = "البريد الإلكتروني مطلوب";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      err.email = "البريد الإلكتروني غير صحيح";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      err.phone = "رقم الهاتف مطلوب";
    } else if (
      !/^[\d\s\+\-\(\)]{10,}$/.test(formData.phone.replace(/\s/g, ""))
    ) {
      err.phone = "رقم الهاتف غير صحيح";
    }

    // CV validation
    if (!formData.cv) {
      err.cv = "يرجى رفع السيرة الذاتية";
    } else {
      // File size check (2MB max for base64)
      if (formData.cv.size > 2 * 1024 * 1024) {
        err.cv = "حجم الملف كبير جداً (الحد الأقصى 2 ميجابايت)";
      }

      // File type check
      const allowedTypes = [".pdf", ".doc", ".docx"];
      const fileName = formData.cv.name.toLowerCase();
      const isValidType = allowedTypes.some((type) => fileName.endsWith(type));

      if (!isValidType) {
        err.cv = "نوع الملف غير مدعوم (PDF, DOC, DOCX فقط)";
      }
    }

    return err;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });

    // Clear specific error when user starts typing/selecting
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      // تحديد حد أقصى لحجم الملف للـ base64 (2MB)
      if (file.size > 2 * 1024 * 1024) {
        reject(new Error("الملف كبير جداً للمعالجة. حاول برفع ملف أصغر."));
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // إزالة الـ data:mime;base64, prefix
        const base64 = reader.result.split(",")[1];
        resolve(base64);
      };
      reader.onerror = (error) => {
        console.error("Base64 conversion error:", error);
        reject(new Error("فشل في معالجة الملف"));
      };
    });
  };

  const uploadWithProgress = (file) => {
    return new Promise((resolve, reject) => {
      setUploadProgress(10);

      setTimeout(async () => {
        try {
          setUploadProgress(50);
          const base64 = await convertFileToBase64(file);
          setUploadProgress(90);
          resolve(base64);
        } catch (error) {
          reject(error);
        }
      }, 300);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const err = validate();
    if (Object.keys(err).length) {
      setErrors(err);
      return;
    }

    setErrors({});
    setSubmitting(true);
    setUploadProgress(0);

    try {
      // Upload file with progress
      const base64CV = await uploadWithProgress(formData.cv);

      const payload = {
        userId: user?.id || 1,
        jobId: career.jobId || career.id,
        attachment: base64CV,
      };

      const response = await fetch(
        "https://gutenberg-server-production.up.railway.app/api/application",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      // Log response for debugging
      console.log("Response status:", response.status);
      console.log("Response headers:", [...response.headers.entries()]);

      if (!response.ok) {
        let errorMessage = "Unexpected error!";

        try {
          const errorData = await response.json();
          console.log("Error response:", errorData);
          errorMessage = errorData.message || errorData.title || errorMessage;
        } catch (parseError) {
          console.log("Could not parse error response:", parseError);
          try {
            const errorText = await response.text();
            console.log("Error text:", errorText);
            errorMessage = errorText || errorMessage;
          } catch (textError) {
            console.log("Could not get error text:", textError);
          }
        }

        if (response.status === 400) {
          throw new Error(errorMessage || " Data is incorrect!");
        } else if (response.status === 404) {
          throw new Error("The job isn't Available yet");
        } else if (response.status === 409) {
          throw new Error("You've just Applied!");
        } else {
          throw new Error(errorMessage);
        }
      }

      setSubmitted(true);
      setUploadProgress(100);

      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          cover: "",
          cv: null,
        });
      }, 2000);
    } catch (error) {
      console.error("Error submitting application:", error);
      setErrors({
        general: error.message,
      });
    } finally {
      setSubmitting(false);
      setTimeout(() => setUploadProgress(0), 2000);
    }
  };

  return (
    <main className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg border mt-10">
      <article aria-label={`التقديم للوظيفة: ${career.title}`}>
        <header className="border-b pb-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            التقديم للوظيفة: {career.title}
          </h1>
          <p className="text-gray-600 text-sm">
            املأ النموذج أدناه لإرسال طلب التوظيف
          </p>
        </header>

        {/* General Error Message */}
        {errors.general && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            <p className="font-medium">خطأ:</p>
            <p>{errors.general}</p>
          </div>
        )}

        {submitted ? (
          <section className="bg-green-50 border border-green-200 text-green-700 px-6 py-8 rounded-lg text-center">
            <div className="text-4xl mb-4">✅</div>
            <h2 className="text-xl font-bold mb-2">تم إرسال طلبك بنجاح!</h2>
            <p className="text-green-600">
              سيتم التواصل معك قريباً عبر البريد الإلكتروني أو الهاتف
            </p>
          </section>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            aria-label="نموذج التقديم للوظيفة"
            noValidate
          >
            <fieldset className="space-y-6">
              <legend className="sr-only">معلومات المتقدم</legend>

              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  الاسم الكامل <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg transition-colors ${
                    errors.name
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:border-violet-500 focus:ring-violet-200"
                  } focus:outline-none focus:ring-2`}
                  placeholder="أدخل اسمك الكامل"
                  aria-describedby={errors.name ? "name-error" : undefined}
                  disabled={submitting}
                />
                {errors.name && (
                  <p
                    id="name-error"
                    className="text-red-500 text-sm mt-1"
                    role="alert"
                  >
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  البريد الإلكتروني <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg transition-colors ${
                    errors.email
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:border-violet-500 focus:ring-violet-200"
                  } focus:outline-none focus:ring-2`}
                  placeholder="example@email.com"
                  aria-describedby={errors.email ? "email-error" : undefined}
                  disabled={submitting}
                />
                {errors.email && (
                  <p
                    id="email-error"
                    className="text-red-500 text-sm mt-1"
                    role="alert"
                  >
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  رقم الهاتف <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg transition-colors ${
                    errors.phone
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:border-violet-500 focus:ring-violet-200"
                  } focus:outline-none focus:ring-2`}
                  placeholder="+970 59 123 4567"
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                  disabled={submitting}
                />
                {errors.phone && (
                  <p
                    id="phone-error"
                    className="text-red-500 text-sm mt-1"
                    role="alert"
                  >
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Cover Letter Field */}
              <div>
                <label
                  htmlFor="cover"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  خطاب التقديم (اختياري)
                </label>
                <textarea
                  id="cover"
                  name="cover"
                  value={formData.cover}
                  onChange={handleChange}
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-violet-500 focus:ring-2 focus:ring-violet-200 focus:outline-none transition-colors resize-vertical"
                  placeholder="أخبرنا لماذا تعتبر نفسك مناسباً لهذه الوظيفة..."
                  disabled={submitting}
                />
              </div>

              {/* CV Upload Field */}
              <div>
                <label
                  htmlFor="cv"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  السيرة الذاتية <span className="text-red-500">*</span>
                </label>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
                    errors.cv
                      ? "border-red-300 bg-red-50"
                      : formData.cv
                      ? "border-green-300 bg-green-50"
                      : "border-gray-300 hover:border-violet-400"
                  }`}
                >
                  <input
                    type="file"
                    id="cv"
                    name="cv"
                    onChange={handleChange}
                    className="sr-only"
                    accept=".pdf,.doc,.docx"
                    aria-describedby={errors.cv ? "cv-error" : "cv-help"}
                    disabled={submitting}
                  />
                  <label
                    htmlFor="cv"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <svg
                      className="w-12 h-12 text-gray-400 mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    <span className="text-violet-600 font-medium">
                      {formData.cv
                        ? formData.cv.name
                        : "اختر ملف السيرة الذاتية"}
                    </span>
                    <span className="text-gray-500 text-sm mt-1">
                      PDF, DOC, DOCX - حتى 2 ميجابايت
                    </span>
                  </label>
                </div>
                {errors.cv && (
                  <p
                    id="cv-error"
                    className="text-red-500 text-sm mt-1"
                    role="alert"
                  >
                    {errors.cv}
                  </p>
                )}
                {!errors.cv && (
                  <p id="cv-help" className="text-gray-500 text-xs mt-1">
                    الأنواع المدعومة: PDF, DOC, DOCX (الحد الأقصى: 2 ميجابايت)
                  </p>
                )}
              </div>
            </fieldset>

            {/* Progress Bar */}
            {submitting && uploadProgress > 0 && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    جاري الإرسال...
                  </span>
                  <span className="text-sm text-gray-500">
                    {uploadProgress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-violet-500 h-2 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <footer className="border-t pt-6">
              <button
                type="submit"
                disabled={submitting}
                className={`w-full md:w-auto px-8 py-3 rounded-lg font-medium transition-all ${
                  submitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-violet-500 hover:bg-violet-600 focus:bg-violet-600"
                } text-white focus:outline-none focus:ring-2 focus:ring-violet-300`}
              >
                {submitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    جاري الإرسال...
                  </span>
                ) : (
                  "إرسال الطلب"
                )}
              </button>

              {!submitting && (
                <p className="text-gray-500 text-sm mt-3">
                  بالضغط على "إرسال الطلب"، فإنك توافق على شروط الاستخدام وسياسة
                  الخصوصية
                </p>
              )}
            </footer>
          </form>
        )}
      </article>
    </main>
  );
};

export default CareerForm;
