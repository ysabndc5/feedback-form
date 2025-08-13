document.addEventListener("DOMContentLoaded", function () {

  // ===== Date/Time Display =====
  function updateDateTimeDisplay() {
    const now = new Date();
    const date = now.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    const time = now.toLocaleTimeString();
    const dtElement = document.getElementById("dateTimeDisplay");
    if (dtElement) dtElement.textContent = `${date} | ${time}`;
  }

  updateDateTimeDisplay();           // Initial call
  setInterval(updateDateTimeDisplay, 1000); // Update every second

  // ===== Form Submission =====
  const surveyForm = document.getElementById("surveyForm");

  if (surveyForm) {
    surveyForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // Gather form data
      const form = event.target;
      const formData = new FormData(form);

      const now = new Date();
      const submissionDateTime = now.toLocaleString();

      // Get checked ratings
      const staffRating = form.querySelector('input[name="staffRating"]:checked');
      const overallRating = form.querySelector('input[name="overallRating"]:checked');

      // Create survey object
      const surveyData = {
        visitorType: formData.get("visitorType") || "",
        name: formData.get("name") || "",
        purpose: formData.get("purpose") || "",
        date: submissionDateTime,
        staffRating: staffRating ? staffRating.value : "",
        concernAddressed: formData.get("concernAddressed") || "",
        overallRating: overallRating ? overallRating.value : "",
        recommend: formData.get("recommend") || "",
        comments: formData.get("comments") || "",
        email: formData.get("email") || ""
      };

      // Save to localStorage
      const surveyList = JSON.parse(localStorage.getItem("surveyList") || "[]");
      surveyList.push(surveyData);
      localStorage.setItem("surveyList", JSON.stringify(surveyList));

      // Save last survey for thankyou.html
      localStorage.setItem("lastSurvey", JSON.stringify(surveyData));

      // Save just the name for quick thankyou.html personalization
      localStorage.setItem("feedbackName", surveyData.name);

      // Redirect to thank you page
      window.location.href = "thankyou.html";
    });
  }

});
