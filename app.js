/* =========================================================
   CREATORFORGE — MAIN APP
   Navigation + Project State + Research + Script + Media
   ========================================================= */

const state = {
  projectName: "Untitled Video",
  channelNiche: "",
  subNiche: "",
  audience: "General Audience",
  niche: "",
  tone: "Documentary",
  script: "",
  thumbnail: "THE UNTOLD STORY",
  researchDone: false,
  scriptDone: false,
  mediaDone: false
};


/* =========================
   SAFE TEXT HELPER
   ========================= */

function escapeHTML(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


/* =========================
   NAVIGATION
   ========================= */

function showPage(page) {

  document.querySelectorAll(".page").forEach(function(section) {
    section.classList.remove("active");
  });

  const selected = document.getElementById(page);

  if (selected) {
    selected.classList.add("active");
  }

  document.querySelectorAll(".nav").forEach(function(button) {
    button.classList.remove("active");
  });

  document.querySelectorAll(".nav").forEach(function(button) {

    const text = button.textContent
      .toLowerCase()
      .replace(/[^a-z]/g, "");

    if (text.includes(page.toLowerCase())) {
      button.classList.add("active");
    }
  });

  const title = document.getElementById("pageTitle");

  if (title) {
    title.textContent =
      page.charAt(0).toUpperCase() + page.slice(1);
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* =========================
   NEW PROJECT
   ========================= */

function newProject() {

  state.projectName = "Untitled Video";
  state.channelNiche = "";
  state.subNiche = "";
  state.niche = "";
  state.script = "";
  state.researchDone = false;
  state.scriptDone = false;
  state.mediaDone = false;

  const fields = [
    ["projectName", "Untitled Video"],
    ["settingsName", "Untitled Video"],
    ["niche", ""],
    ["channelNiche", ""],
    ["subNiche", ""],
    ["scriptText", ""]
  ];

  fields.forEach(function(item) {

    const element = document.getElementById(item[0]);

    if (element) {
      element.value = item[1];
    }
  });

  const researchResult =
    document.getElementById("researchResult");

  if (researchResult) {
    researchResult.innerHTML =
      "Your research brief will appear here.";
  }

  updateProjectDisplay();

  showPage("research");
}


/* =========================
   PROJECT DISPLAY
   ========================= */

function updateProjectDisplay() {

  const name =
    document.getElementById("projectName");

  const meta =
    document.getElementById("projectMeta");

  if (name) {
    name.textContent =
      state.projectName || "Untitled Video";
  }

  if (meta) {

    if (state.mediaDone) {
      meta.textContent = "Media plan created";
    } else if (state.scriptDone) {
      meta.textContent = "Script created";
    } else if (state.researchDone) {
      meta.textContent = "Research completed";
    } else {
      meta.textContent = "Ready to start";
    }
  }
}


/* =========================
   CHANNEL NICHE
   ========================= */

function saveChannelNiche() {

  const nicheField =
    document.getElementById("channelNiche");

  const subField =
    document.getElementById("subNiche");

  if (nicheField) {
    state.channelNiche =
      nicheField.value.trim();
  }

  if (subField) {
    state.subNiche =
      subField.value.trim();
  }

  const result =
    document.getElementById("channelNicheResult");

  if (result) {

    if (!state.channelNiche) {

      result.innerHTML =
        "<p>Please enter your channel niche first.</p>";

      return;
    }

    result.innerHTML = `
      <strong>Channel niche saved ✓</strong>
      <p>${escapeHTML(state.channelNiche)}</p>

      ${
        state.subNiche
          ? `<small>Sub-niche: ${escapeHTML(state.subNiche)}</small>`
          : ""
      }

      <p class="muted">
        CreatorForge will use this niche when planning
        research, scripts, scenes and thumbnails.
      </p>
    `;
  }

  saveLocalProject();
}


/* =========================
   NICHE RESEARCH
   ========================= */

function research() {
  const nicheInput = document.getElementById("niche");
  const audienceInput = document.getElementById("audience");

  const niche = nicheInput ? nicheInput.value.trim() : "";
  const audience = audienceInput ? audienceInput.value : "General Audience";

  const topic = niche || "your chosen niche";

  document.getElementById("researchResult").innerHTML = `
    <h4>${topic}</h4>
    <p><b>Audience:</b> ${audience}</p>
    <p><b>Content direction:</b> curiosity-led storytelling with a strong opening.</p>
    <ul>
      <li>Lead with a surprising question or fact.</li>
      <li>Use clear story sections and visual changes.</li>
      <li>Build toward the strongest reveal.</li>
      <li>End with a memorable takeaway.</li>
    </ul>
    <p><b>Suggested formats:</b> explainer · list · timeline · mystery.</p>
    <button class="primary full" onclick="go('script')">
      Create Script →
    </button>
  `;

  localStorage.setItem("niche", topic);
  updateProgress(15);
}



/* =========================
   SCRIPT GENERATOR
   ========================= */

function generateScript() {

  const toneInput =
    document.getElementById("tone");

  const scriptBox =
    document.getElementById("scriptText");

  if (!scriptBox) return;

  state.tone =
    toneInput
      ? toneInput.value
      : "Documentary";

  const topic =
    state.niche ||
    state.channelNiche ||
    "your chosen topic";

  const channel =
    state.channelNiche
      ? `This video fits the ${state.channelNiche} channel niche.`
      : "";

  const script = `HOOK

What if everything you thought you knew about ${topic} was only part of the story?

INTRODUCTION

Today we're diving into ${topic}.

${channel}

We'll break down the most interesting ideas, the important context, and the part that makes this topic worth remembering.

SECTION 1 — THE SETUP

Before we get to the surprising part, let's understand the basics.

Introduce the important people, places, events, ideas, or background information the viewer needs.

SECTION 2 — THE STORY

Now we get to the interesting part.

Explain the main development clearly and keep the pacing moving. Every section should give the viewer a reason to keep watching.

SECTION 3 — THE TURNING POINT

Here's where things become more interesting.

Introduce the strongest discovery, unexpected detail, or major change connected to ${topic}.

SECTION 4 — WHY IT MATTERS

So why should anyone care?

Connect the information back to the bigger picture and explain what viewers should take away from the story.

ENDING

And that's the part of ${topic} that is easy to miss.

If you enjoyed this story, stay tuned for the next one.`;

  state.script = script;
  state.scriptDone = true;

  scriptBox.value = script;

  updateWordCount();
  updateProjectDisplay();
  saveLocalProject();
}


/* =========================
   WORD COUNT
   ========================= */

function updateWordCount() {

  const box =
    document.getElementById("scriptText");

  const counter =
    document.getElementById("wordcount");

  if (!box || !counter) return;

  const text =
    box.value.trim();

  const words =
    text
      ? text.split(/\s+/).length
      : 0;

  counter.textContent =
    words + " words";
}


/* =========================
   MEDIA WORKFLOW
   ========================= */

function prepareVoiceover() {

  const result =
    document.getElementById("mediaResult");

  if (!result) return;

  result.innerHTML = `
    <h3>🎙 Voiceover Plan Ready</h3>

    <p>
      Your narration has been prepared for voice generation.
    </p>

    <ul>
      <li>Opening hook</li>
      <li>Main narration</li>
      <li>Scene transitions</li>
      <li>Ending narration</li>
    </ul>

    <p>
      Real AI voice generation will be connected
      through an external AI service later.
    </p>
  `;
}


function prepareImages() {

  const result =
    document.getElementById("mediaResult");

  if (!result) return;

  const topic =
    state.niche ||
    state.channelNiche ||
    "your topic";

  result.innerHTML = `
    <h3>🖼 Image Generation Plan</h3>

    <p>
      CreatorForge created visual prompts for:
      <strong>${escapeHTML(topic)}</strong>
    </p>

    <div class="prompt-box">
      Scene 01 — Establishing shot of the topic<br><br>
      Scene 02 — Main subject and important details<br><br>
      Scene 03 — Turning point / dramatic moment<br><br>
      Scene 04 — Supporting visual explanation<br><br>
      Scene 05 — Final memorable image
    </div>

    <p>
      <strong>AI image generation:</strong>
      connection required.
    </p>
  `;
}


function prepareVideo() {

  const result =
    document.getElementById("mediaResult");

  if (!result) return;

  const topic =
    state.niche ||
    state.channelNiche ||
    "your topic";

  result.innerHTML = `
    <h3>🎬 Video Generation Plan</h3>

    <p>
      Scene-by-scene video instructions have been prepared.
    </p>

    <div class="prompt-box">

      <strong>Scene 01</strong><br>
      Hook visual — ${escapeHTML(topic)}<br><br>

      <strong>Scene 02</strong><br>
      Introduce the main subject<br><br>

      <strong>Scene 03</strong><br>
      Show the major development<br><br>

      <strong>Scene 04</strong><br>
      Visualize the turning point<br><br>

      <strong>Scene 05</strong><br>
      Closing visual and takeaway

    </div>

    <p>
      <strong>AI video generation:</strong>
      connection required.
    </p>
  `;

  state.mediaDone = true;

  updateProjectDisplay();
  saveLocalProject();
}


/* =========================
   THUMBNAIL
   ========================= */

function updateThumbnail() {

  const input =
    document.getElementById("thumbInput");

  const output =
    document.getElementById("thumbText");

  if (!input || !output) return;

  const value =
    input.value.trim() ||
    "YOUR VIDEO";

  output.innerHTML =
    escapeHTML(value)
      .replace(/\s+/g, "<br>");

  state.thumbnail =
    value;

  saveLocalProject();
}


function saveThumbnail() {

  state.thumbnail =
    document.getElementById("thumbInput")?.value ||
    state.thumbnail;

  alert("Thumbnail concept saved ✓");

  saveLocalProject();
}


/* =========================
   ASSEMBLY
   ========================= */

function buildPreview() {

  const result =
    document.getElementById("assemblyResult");

  if (result) {

    result.innerHTML = `
      <h3>▶ Preview Plan Ready</h3>

      <p>
        CreatorForge has arranged your production timeline.
      </p>

      <ol>
        <li>Hook</li>
        <li>Introduction</li>
        <li>Scene sequence</li>
        <li>Voiceover</li>
        <li>Thumbnail</li>
        <li>Ending</li>
      </ol>

      <p>
        Actual video rendering will be connected
        when the video-generation backend is added.
      </p>
    `;
  }

  state.mediaDone = true;
  updateProjectDisplay();
}


/* =========================
   SETTINGS
   ========================= */

function saveSettings() {

  const field =
    document.getElementById("settingsName");

  if (field) {

    state.projectName =
      field.value.trim() ||
      "Untitled Video";
  }

  updateProjectDisplay();
  saveLocalProject();

  alert("Project settings saved ✓");
}


/* =========================
   EXPORT
   ========================= */

function downloadBrief() {

  const text = `
CREATORFORGE PROJECT
====================

Project:
${state.projectName}

Channel Niche:
${state.channelNiche || "Not specified"}

Sub-Niche:
${state.subNiche || "Not specified"}

Audience:
${state.audience}

Topic:
${state.niche || "Not specified"}

Tone:
${state.tone}

THUMBNAIL
---------
${state.thumbnail}

PRODUCTION PIPELINE
-------------------
✓ Research
✓ Script
✓ Voiceover Plan
✓ Image Plan
✓ Video Plan
✓ Thumbnail
✓ Assembly
✓ Export

SCRIPT
------
${state.script || "No script created yet."}

This project was created with CreatorForge.
`;

  const blob =
    new Blob([text], {
      type: "text/plain;charset=utf-8"
    });

  const url =
    URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;
  link.download =
    (state.projectName || "creatorforge-project")
      .replace(/[^a-z0-9]/gi, "-")
      .toLowerCase() +
    ".txt";

  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(function() {
    URL.revokeObjectURL(url);
  }, 1000);
}


/* =========================
   LOCAL PROJECT STORAGE
   ========================= */

function saveLocalProject() {

  try {

    localStorage.setItem(
      "creatorforgeProject",
      JSON.stringify(state)
    );

  } catch (error) {

    console.log(
      "Local project storage unavailable."
    );
  }
}


function loadLocalProject() {

  try {

    const saved =
      localStorage.getItem(
        "creatorforgeProject"
      );

    if (!saved) return;

    const data =
      JSON.parse(saved);

    Object.assign(state, data);

  } catch (error) {

    console.log(
      "Could not load saved project."
    );
  }
}


/* =========================
   BUTTON EVENT FIX
   ========================= */

function setupNavigation() {

  document.querySelectorAll(".nav")
    .forEach(function(button) {

      button.addEventListener(
        "click",
        function(event) {

          event.preventDefault();

          const onclick =
            button.getAttribute("onclick");

          if (onclick) {

            const match =
              onclick.match(
                /showPage\(['"]([^'"]+)['"]\)/
              );

            if (match) {
              showPage(match[1]);
            }
          }
        }
      );
    });
}


/* =========================
   STARTUP
   ========================= */

document.addEventListener(
  "DOMContentLoaded",
  function() {

    loadLocalProject();

    setupNavigation();

    const scriptBox =
      document.getElementById("scriptText");

    if (scriptBox) {

      scriptBox.addEventListener(
        "input",
        function() {

          state.script =
            scriptBox.value;

          updateWordCount();
          saveLocalProject();
        }
      );
    }

    const thumbInput =
      document.getElementById("thumbInput");

    if (thumbInput) {

      thumbInput.addEventListener(
        "input",
        updateThumbnail
      );
    }

    const settingsName =
      document.getElementById("settingsName");

    if (settingsName) {
      settingsName.value =
        state.projectName;
    }

    const channelNiche =
      document.getElementById("channelNiche");

    if (channelNiche) {
      channelNiche.value =
        state.channelNiche;
    }

    const subNiche =
      document.getElementById("subNiche");

    if (subNiche) {
      subNiche.value =
        state.subNiche;
    }

    updateProjectDisplay();
    updateWordCount();
    updateThumbnail();
  function toggleSidebar(){
  document.querySelector(".sidebar").classList.toggle("open");
  }
