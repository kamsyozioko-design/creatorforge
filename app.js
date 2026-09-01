function showPage(page) {
  document.querySelectorAll(".page").forEach(function(section) {
    section.classList.remove("active");
  });

  const selected = document.getElementById(page);

  if (selected) {
    selected.classList.add("active");
  }

  document.getElementById("pageTitle").textContent =
    page.charAt(0).toUpperCase() + page.slice(1);

  window.scrollTo(0, 0);
}

function newProject() {
  document.getElementById("projectName").textContent = "Untitled Video";
  document.getElementById("projectMeta").textContent = "Ready to start";

  document.getElementById("niche").value = "";
  document.getElementById("scriptText").value = "";
  document.getElementById("researchResult").textContent =
    "Your research brief will appear here.";

  showPage("research");
}

function research() {
  const niche =
    document.getElementById("niche").value.trim() || "your chosen niche";

  document.getElementById("researchResult").innerHTML = `
    <h3>${niche}</h3>
    <p><strong>Content direction:</strong>
    curiosity-led storytelling with a strong opening.</p>

    <ul>
      <li>Start with a strong question or surprising fact.</li>
      <li>Use short sections and frequent visual changes.</li>
      <li>End with a memorable takeaway.</li>
    </ul>

    <p><strong>Suggested formats:</strong>
    Explainer · List · Timeline · Mystery</p>
  `;

  document.getElementById("projectMeta").textContent =
    "Research brief created";
}

function generateScript() {
  const niche =
    document.getElementById("niche").value.trim() ||
    "your chosen topic";

  const tone =
    document.getElementById("tone").value;

  const script = `HOOK

What if the story you thought you knew had another side?

INTRODUCTION

Today we're exploring ${niche}. In this ${tone.toLowerCase()} video, we'll break down the key ideas and the story behind them.

SECTION 1 — THE SETUP

Start with the essential background. Explain the people, places, events, or ideas involved so viewers understand the context.

SECTION 2 — THE TURNING POINT

Now introduce the most interesting development. Use clear examples and move naturally from one point to the next.

SECTION 3 — WHY IT MATTERS

Connect the story to the bigger picture and explain why viewers should remember it.

CONCLUSION

The most important takeaway is simple: good stories become more interesting when we look beyond the obvious version.

Thanks for watching.`;

  document.getElementById("scriptText").value = script;

  updateWordCount();

  document.getElementById("projectMeta").textContent =
    "Script created";
}

function updateWordCount() {
  const text =
    document.getElementById("scriptText").value.trim();

  const words = text
    ? text.split(/\s+/).length
    : 0;

  document.getElementById("wordcount").textContent =
    words + " words";
}

function updateThumbnail() {
  const value =
    document.getElementById("thumbInput").value.trim();

  document.getElementById("thumbText").innerHTML =
    value.replace(/\s+/g, "<br>");
}

function buildPreview() {
  alert(
    "Your video preview has been prepared. Real video rendering can be connected later."
  );

  document.getElementById("projectMeta").textContent =
    "Preview prepared";
}

function saveSettings() {
  const name =
    document.getElementById("settingsName").value.trim();

  document.getElementById("projectName").textContent =
    name || "Untitled Video";

  alert("Settings saved.");
}

function downloadBrief() {
  const name =
    document.getElementById("projectName").textContent;

  const niche =
    document.getElementById("niche").value ||
    "Not specified";

  const text =
`CREATORFORGE PROJECT

Project: ${name}

Niche:
${niche}

Production Pipeline:
Research
Script
Voiceover
Visuals
Thumbnail
Assembly
Export

This project was created with CreatorForge.
`;

  const file = new Blob([text], {
    type: "text/plain"
  });

  const link = document.createElement("a");

  link.href = URL.createObjectURL(file);
  link.download = "creatorforge-project.txt";

  link.click();

  URL.revokeObjectURL(link.href);
}

document.addEventListener("DOMContentLoaded", function() {
  const scriptBox =
    document.getElementById("scriptText");

  if (scriptBox) {
    scriptBox.addEventListener(
      "input",
      updateWordCount
    );
  }
});
