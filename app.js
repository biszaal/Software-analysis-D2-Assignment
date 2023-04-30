document.addEventListener("DOMContentLoaded", () => {
  const uploadForm = document.getElementById("upload_form");
  if (uploadForm) {
    uploadForm.addEventListener("submit", (event) => {
      event.preventDefault();
      handleUpload();
    });
  }

  const studentView = document.querySelector(".student-view");
  if (studentView) {
    loadAssessments();
  }
});

async function handleUpload() {
  const formData = new FormData(document.getElementById("upload_form"));

  try {
    const response = await fetch("/upload_assessment", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      alert("Assessment uploaded successfully!");
    } else {
      alert("Failed to upload assessment");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function loadAssessments() {
  try {
    const response = await fetch("/get_assessments");
    const assessments = await response.json();

    const tableBody = document.querySelector("table tbody");
    assessments.forEach((assessment) => {
      const row = document.createElement("tr");

      row.innerHTML = `
                <td>${assessment.course}</td>
                <td>${assessment.name}</td>
                <td>${assessment.dueDate}</td>
                <td><a href="${assessment.fileURL}">Download</a></td>
            `;

      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}
