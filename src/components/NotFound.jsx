import { useState, useEffect } from "react";
import "../App.css";

function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    setIsAnimated(true);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleGoHome = () => {
    console.log("Navigating to home...");
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const handleReportProblem = () => {
    console.log("Reporting problem...");
    alert("شكراً لك! تم إرسال التقرير.");
  };

  return (
    <div className="notfound-container">
      <div className="notfound-background">
        <div
          className="notfound-gradient-orb notfound-orb-1"
          style={{
            transform: `translate(${mousePosition.x * 0.1}px, ${
              mousePosition.y * 0.1
            }px)`,
          }}
        ></div>
        <div
          className="notfound-gradient-orb notfound-orb-2"
          style={{
            transform: `translate(${mousePosition.x * -0.05}px, ${
              mousePosition.y * 0.08
            }px)`,
          }}
        ></div>
        <div
          className="notfound-gradient-orb notfound-orb-3"
          style={{
            transform: `translate(${mousePosition.x * 0.08}px, ${
              mousePosition.y * -0.06
            }px)`,
          }}
        ></div>
      </div>

      <div
        className={`notfound-content ${isAnimated ? "notfound-animated" : ""}`}
      >
        <div className="notfound-number-container">
          <h1 className="notfound-number">404</h1>
          <div className="notfound-number-shadow">404</div>
        </div>

        <div className="notfound-message">
          <h2 className="notfound-title">عذراً! الصفحة غير موجودة</h2>
          <p className="notfound-subtitle"></p>
        </div>

        <div className="notfound-actions">
          <button
            className="notfound-btn notfound-primary-btn"
            onClick={handleGoHome}
          >
            <span className="notfound-btn-icon">🏠</span>
            العودة للرئيسية
          </button>

          <button
            className="notfound-btn notfound-secondary-btn"
            onClick={handleGoBack}
          >
            <span className="notfound-btn-icon">←</span>
            الصفحة السابقة
          </button>
        </div>

        {/* معلومات إضافية */}
        <div className="notfound-help">
          <p className="notfound-help-text">
            هل تواجه مشكلة؟
            <button className="notfound-link-btn" onClick={handleReportProblem}>
              أبلغنا عن المشكلة
            </button>
          </p>

          <div className="notfound-suggestions">
            <h3 className="notfound-suggestions-title">يمكنك أيضاً:</h3>
            <ul className="notfound-suggestions-list">
              <li>تحقق من صحة الرابط المكتوب</li>
              <li>استخدم شريط البحث للعثور على ما تريد</li>
              <li>تصفح أقسامنا الرئيسية</li>
            </ul>
          </div>
        </div>

        {/* عداد تنازلي للتوجيه التلقائي (اختياري) */}
        <div className="notfound-auto-redirect">
          <p className="notfound-redirect-text">
            <span className="notfound-redirect-icon">⏱️</span>
            أو انتظر قليلاً وسنوجهك للصفحة الرئيسية تلقائياً
          </p>
        </div>
      </div>

      {/* جسيمات متحركة في الخلفية */}
      <div className="notfound-particles">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`notfound-particle notfound-particle-${i + 1}`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default NotFound;
