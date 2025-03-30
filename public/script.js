document.getElementById("connectBtn").addEventListener("click", function () {
  const button = document.getElementById("connectBtn");
  button.disabled = true;
  button.innerText = "Finding room...";

  const userResponse = {
    gratitude: document.getElementById("gratitude").value.trim(),
    lesson: document.getElementById("lesson").value.trim(),
    affirmation: document.getElementById("affirmation").value.trim(),
    achievement: document.getElementById("achievement").value.trim(),
    delight: document.getElementById("delight").value.trim(),
    opportunity_better: document
      .getElementById("opportunity_better")
      .value.trim(),
    opportunity_help: document.getElementById("opportunity_help").value.trim(),
  };

  // Simulate light "AI" match (criteria-based hash)
  const concatenated = Object.values(userResponse).join(" ").toLowerCase();
  const hash = btoa(concatenated.slice(0, 50));

  // Redirect after short delay to show "Finding room..."
  setTimeout(() => {
    window.location.href = `video-conference.html?room=${hash}`;
  }, 1000);
});
