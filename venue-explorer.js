import { venueData } from "./venue-data.js";
import { places } from "./places.js";
import { venuePhotos } from "./venue-photos.js";
import { avatarSVG } from "./avatar-studio.js";
const safe = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const clean = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
const money = (n) => (n === 0 ? "Free idea" : "$" + n + " allowance");
export const venues = venueData.map((v) => {
  const known = Object.values(places).find(
    (p) =>
      p.city === v.city &&
      (clean(p.name) === clean(v.name) || p.source === v.source),
  );
  const p = venuePhotos[v.id] || known;
  if (!p) throw new Error(`Missing venue cover photo: ${v.id}`);
  return {
    ...v,
    image: p.image,
    photoCredit: p.photoCredit,
    photoSource: p.photoSource,
    illustrated: false,
  };
});
export const venueQuests = venues.flatMap((v) =>
  v.quests.map((q, i) => ({
    id: v.id + "--" + i,
    venueId: v.id,
    choiceIndex: i,
    key: v.type,
    city: v.city,
    title: q.title,
    category: v.category,
    perPerson: q.budget,
    fixed: 0,
    duration: q.minutes,
    min: 1,
    max: 12,
    description: q.description,
    venue: v.name,
    address: v.address,
    steps: q.steps,
    source: v.source,
    image: v.image,
    photoCredit: v.illustrated ? "Original Off 99 illustration" : v.photoCredit,
    photoSource: v.photoSource || v.source,
    visitNote: v.visitNote,
    checked: "October 24, 2026",
    seated: ["library", "food", "museum"].includes(v.type),
    quieter: v.type === "library" || v.type === "museum",
    setting: ["park"].includes(v.type) ? "Outdoor" : "Indoor",
    accessNote:
      "Check step-free entry, accessible restrooms, seating, sensory conditions and any support you need with the venue before visiting. Venue access has not been independently assessed.",
  })),
);
export function venueCard(v) {
  return `<article class="venue-card"><a href="#place/${v.id}" class="venue-card-image" aria-label="Explore ${safe(v.name)}"><img src="${v.image}" alt="Photo of ${safe(v.name)}" width="660" height="440" loading="lazy"><span class="venue-category">${v.category}</span><span class="venue-image-label">${safe(v.city.toUpperCase())}</span></a><div class="venue-card-copy"><span class="venue-city">⌖ ${v.city}</span><h3><a href="#place/${v.id}">${safe(v.name)} <span>↗</span></a></h3><p>${safe(v.description)}</p><div class="venue-card-address">${safe(v.address)}</div><a class="venue-card-footer" href="#place/${v.id}"><span><b>3</b> little ways to make a story</span><span>Choose your quest ↗</span></a></div></article>`;
}
function sourceInfo(v) {
  return `<div class="venue-source-line"><a href="${v.source}" target="_blank" rel="noopener noreferrer">Official venue / location source ↗</a><span>Address checked October 24, 2026</span></div>`;
}
function inviteText(v, q, name, when) {
  return `You have been invited by ${name} to go to ${v.name} for ${q.title}.\n\nWHAT THE SIDE QUEST IS\n${q.description}\n\nHOW IT WORKS\n${q.steps.map((step, i) => `${i + 1}. ${step}`).join("\n")}\n\nWHERE\n${v.address}\n${v.city}, Central Valley\n${when ? "\nWHEN\n" + when + "\n" : ""}\nPLAN\n${q.minutes} minutes · ${money(q.budget)} per person.\n\nOff 99 — Take the local exit.\nCheck hours, access and current prices with the venue before you go.`;
}
const dateText = (value) => {
  if (!value) return "";
  const d = new Date(value);
  return Number.isNaN(d.getTime())
    ? ""
    : new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(d);
};
export function createVenueExplorer() {
  let context = null,
    activeURL = null,
    token = 0;
  const drafts = new Map();
  function view(v, ctx) {
    context = ctx;
    let d = drafts.get(v.id);
    if (!d) {
      d = {
        choice: -1,
        name: ctx.name === "Explorer" ? "" : ctx.name,
        when: "",
      };
      drafts.set(v.id, d);
    }
    if (d.name === null || d.name === undefined)
      d.name = ctx.name === "Explorer" ? "" : ctx.name;
    return `<section class="venue-page" id="venue-page"><a class="back-link" href="#city/${v.city.toLowerCase()}">← Back to ${v.city}</a><div class="venue-detail-hero"><div class="venue-detail-copy"><span class="eyebrow">${v.city.toUpperCase()} / YOUR NEXT LOCAL EXIT</span><h1>${safe(v.name)}</h1><p>${safe(v.description)}</p><div class="venue-address"><span>⌖</span><div><b>Meet you here</b><p>${safe(v.address)}</p></div></div><div class="venue-links"><a class="primary" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v.name + " " + v.address)}" target="_blank" rel="noopener noreferrer">Get directions ↗</a><a class="text-link" href="${v.source}" target="_blank" rel="noopener noreferrer">Hours & venue details ↗</a></div></div><figure><img src="${v.image}" alt="Photo of ${safe(v.name)}" width="660" height="440"><figcaption>Photo: <a href="${v.photoSource}" target="_blank" rel="noopener noreferrer">${safe(v.photoCredit)} ↗</a></figcaption></figure></div>${v.visitNote ? `<aside class="venue-visit-note"><span>BEFORE YOU GO</span><p>${safe(v.visitNote)}</p></aside>` : ""}${sourceInfo(v)}<div class="venue-quest-heading"><div><span class="eyebrow">SAME PLACE. THREE DIFFERENT STORIES.</span><h2>What’s the <em>side quest?</em></h2><p>Pick one little mission. Make the afternoon yours.</p></div><span>01 / CHOOSE A QUEST</span></div><div class="venue-choices" role="radiogroup" aria-label="Choose one of three side quests">${v.quests.map((q, i) => `<label class="venue-choice"><input type="radio" name="venueQuest" value="${i}" ${d.choice === i ? "checked" : ""}><span class="venue-choice-top"><b>0${i + 1}</b><i aria-hidden="true">✓</i></span><h3>${safe(q.title)}</h3><p>${safe(q.description)}</p><ol>${q.steps.map((s) => `<li>${safe(s)}</li>`).join("")}</ol><div class="venue-choice-meta"><span>◷ ${q.minutes} min</span><span>${money(q.budget)} / person</span></div></label>`).join("")}</div><p class="venue-planning-note">Budgets are optional planning allowances, not quoted venue prices. Check current fees, hours and access. Any purchases, reservations and travel are arranged by your crew.</p><section class="invite-builder"><div class="invite-builder-copy"><span class="eyebrow">02 / MAKE THE GROUP CHAT PLAN OFFICIAL</span><h2>A little invite.<br> <em>A big “let’s go.”</em></h2><p>We’ll turn your chosen quest into a photo invitation that explains the challenge and how it works. Add your name, pick a time if you like, and give the group chat a plot twist.</p><span class="invite-copy-note">Made to download and share with your people.</span></div><form id="invitation-form" novalidate><label class="field">Invited by<input type="text" name="inviter" autocomplete="given-name" maxlength="35" placeholder="Your name" value="${safe(d.name)}" aria-describedby="invite-error" required></label><label class="field">When? <span class="optional-label">Optional</span><input type="datetime-local" name="when" value="${safe(d.when)}"></label><div class="invite-current-choice" aria-live="polite">${d.choice < 0 ? "↑ Choose one of the three quests above." : "Your quest: <strong>" + safe(v.quests[d.choice].title) + "</strong>"}</div><p id="invite-error" class="welcome-error" role="alert"></p><button class="primary" id="make-invitation" type="submit" ${d.choice < 0 ? "disabled" : ""}>Make the invitation <span>↗</span></button><small>Creates an image on your device. Nothing is sent automatically.</small></form></section><section class="invite-result" id="invite-result" aria-label="Your invitation" hidden><div class="invite-result-heading"><div><span class="eyebrow">YOUR NEXT STORY, READY TO SHARE</span><h2>Consider them <em>invited.</em></h2></div><span>OFF 99 / INVITATION STUDIO</span></div><div class="invite-result-layout"><div class="invite-image-frame"><img id="invitation-image" alt="" width="1080" height="1350"></div><div class="invite-share"><span class="eyebrow">A PLAN WORTH PASSING AROUND</span><h3>Your people.<br> Your next story.</h3><p>Save the image and send it in your group chat. It includes who invited them, the real venue, what the side quest is, and the basic plan.</p><a class="primary" id="download-invitation" download>Download invitation PNG ↓</a><button type="button" class="secondary" id="copy-invitation">Copy detailed invite text ↗</button>${typeof navigator !== "undefined" && navigator.canShare ? '<button type="button" class="secondary" id="share-invitation">Share image ↗</button>' : ""}<details class="invite-text-details"><summary>Read the full invitation details</summary><textarea id="invitation-text" readonly aria-label="Invitation text"></textarea></details><p class="invite-source-note">Invitation cover: the real ${safe(v.name)} venue photo shown above.</p></div></div></section></section>`;
  }
  function mount(v, ctx) {
    context = ctx;
    const root = document.querySelector("#venue-page"),
      d = drafts.get(v.id),
      currentToken = ++token;
    let imageBlob = null,
      plainText = "",
      revision = 0;
    const invalidate = () => {
      revision++;
      root.querySelector("#invite-result").hidden = true;
      root.querySelector("#make-invitation").textContent =
        "Make the invitation ↗";
      if (activeURL) {
        URL.revokeObjectURL(activeURL);
        activeURL = null;
      }
    };
    root.onchange = (e) => {
      if (e.target.name === "venueQuest") {
        d.choice = Number(e.target.value);
        root.querySelector(".invite-current-choice").innerHTML =
          "Your quest: <strong>" + safe(v.quests[d.choice].title) + "</strong>";
        root.querySelector("#make-invitation").disabled = false;
        root.querySelector("#invite-error").textContent = "";
        invalidate();
      }
    };
    root.oninput = (e) => {
      if (e.target.name === "inviter") {
        d.name = e.target.value;
        root.querySelector("#invite-error").textContent = "";
        e.target.removeAttribute("aria-invalid");
        invalidate();
      }
      if (e.target.name === "when") {
        d.when = e.target.value;
        invalidate();
      }
    };
    root.querySelector("form").onsubmit = async (e) => {
      e.preventDefault();
      const err = root.querySelector("#invite-error"),
        button = root.querySelector("#make-invitation");
      if (d.choice < 0) return;
      if (!d.name.trim()) {
        err.textContent =
          "Add your name so your friends know who’s inviting them.";
        const input = root.querySelector("[name=inviter]");
        input.setAttribute("aria-invalid", "true");
        input.focus();
        return;
      }
      button.disabled = true;
      button.textContent = "Making your invitation…";
      button.setAttribute("aria-busy", "true");
      err.textContent = "";
      try {
        const q = v.quests[d.choice],
          name = d.name.trim(),
          when = dateText(d.when);
        plainText = inviteText(v, q, name, when);
        const job = revision;
        imageBlob = await paintInvitation({
          v,
          q,
          name,
          when,
          avatar: ctx.avatar,
        });
        if (currentToken !== token || job !== revision || !root.isConnected)
          return;
        if (activeURL) URL.revokeObjectURL(activeURL);
        activeURL = URL.createObjectURL(imageBlob);
        const image = root.querySelector("#invitation-image");
        image.src = activeURL;
        image.alt = plainText;
        root.querySelector("#invitation-text").value = plainText;
        const dl = root.querySelector("#download-invitation");
        dl.href = activeURL;
        dl.download = "off99-" + v.id + "-invitation.png";
        root.querySelector("#invite-result").hidden = false;
        root
          .querySelector("#invite-result")
          .scrollIntoView({
            behavior:
              document.body.classList.contains("reduce-motion") ||
              matchMedia("(prefers-reduced-motion: reduce)").matches
                ? "instant"
                : "smooth",
            block: "start",
          });
        button.textContent = "Make it again ↻";
      } catch (error) {
        err.textContent =
          "The invitation could not be created. Please try again.";
        button.textContent = "Try making the invitation again ↗";
      } finally {
        if (root.isConnected) {
          button.disabled = false;
          button.removeAttribute("aria-busy");
        }
      }
    };
    root.querySelector("#copy-invitation").onclick = async () => {
      try {
        await navigator.clipboard.writeText(plainText);
        ctx.toast("Invitation text copied. Ready for the group chat.");
      } catch {
        root.querySelector(".invite-text-details").open = true;
        root.querySelector("#invitation-text").select();
        ctx.toast("Select and copy the invitation text below.");
      }
    };
    const share = root.querySelector("#share-invitation");
    if (share)
      share.onclick = async () => {
        const file = new File([imageBlob], "off99-invitation.png", {
          type: "image/png",
        });
        try {
          if (navigator.canShare({ files: [file] })) {
            await navigator.share({
              title: "You’re invited · Off 99",
              files: [file],
            });
          } else
            ctx.toast(
              "Download the PNG and share it from your photos or files.",
            );
        } catch (e) {
          if (e.name !== "AbortError")
            ctx.toast(
              "Download the PNG and share it from your photos or files.",
            );
        }
      };
    return () => {
      token++;
      if (activeURL) {
        URL.revokeObjectURL(activeURL);
        activeURL = null;
      }
    };
  }
  return {
    view,
    mount,
    choose(id, index) {
      const d = drafts.get(id) || { name: undefined, when: "" };
      d.choice = index;
      drafts.set(id, d);
    },
  };
}
function loadImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image(),
      timer = setTimeout(() => reject(Error("Image timeout")), 6000);
    image.onload = () => {
      clearTimeout(timer);
      resolve(image);
    };
    image.onerror = () => {
      clearTimeout(timer);
      reject(Error("Image unavailable"));
    };
    image.src = url;
  });
}
function roundRect(c, x, y, w, h, r, fill) {
  c.beginPath();
  c.roundRect(x, y, w, h, r);
  c.fillStyle = fill;
  c.fill();
}
function writeLines(c, text, x, y, maxWidth, lineHeight) {
  const words = String(text).split(/\s+/);
  let line = "";
  for (const word of words) {
    if (c.measureText(line + word).width > maxWidth && line) {
      c.fillText(line.trim(), x, y);
      y += lineHeight;
      line = "";
    }
    if (c.measureText(word).width > maxWidth) {
      for (const char of word) {
        if (c.measureText(line + char).width > maxWidth) {
          c.fillText(line, x, y);
          y += lineHeight;
          line = "";
        }
        line += char;
      }
      line += " ";
    } else line += word + " ";
  }
  if (line.trim()) {
    c.fillText(line.trim(), x, y);
    y += lineHeight;
  }
  return y;
}
function writeLimitedLines(c, text, x, y, maxWidth, lineHeight, maxLines) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let line = "";
  for (let i = 0; i < words.length; i++) {
    const next = line ? `${line} ${words[i]}` : words[i];
    if (c.measureText(next).width <= maxWidth) {
      line = next;
      continue;
    }
    if (line) lines.push(line);
    line = words[i];
    if (lines.length === maxLines - 1) {
      const rest = [line, ...words.slice(i + 1)].join(" ");
      let clipped = rest;
      while (clipped && c.measureText(clipped + "…").width > maxWidth)
        clipped = clipped.slice(0, -1);
      lines.push(clipped.trimEnd() + (clipped.length < rest.length ? "…" : ""));
      line = "";
      break;
    }
  }
  if (line && lines.length < maxLines) lines.push(line);
  lines.forEach((value) => {
    c.fillText(value, x, y);
    y += lineHeight;
  });
  return y;
}
async function paintInvitation({ v, q, name, when, avatar }) {
  await Promise.race([
    document.fonts.ready,
    new Promise((r) => setTimeout(r, 2500)),
  ]);
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1350;
  const c = canvas.getContext("2d");
  if (!c) throw Error("Canvas unavailable");
  const bg = c.createLinearGradient(0, 0, 1080, 1350);
  bg.addColorStop(0, "#eef8ff");
  bg.addColorStop(1, "#bdd9ef");
  c.fillStyle = bg;
  c.fillRect(0, 0, 1080, 1350);
  try {
    const photo = await loadImage(v.image);
    c.save();
    c.beginPath();
    c.rect(0, 0, 1080, 410);
    c.clip();
    const scale = Math.max(1080 / photo.width, 410 / photo.height);
    c.drawImage(
      photo,
      (1080 - photo.width * scale) / 2,
      (410 - photo.height * scale) / 2,
      photo.width * scale,
      photo.height * scale,
    );
    c.restore();
  } catch {
    const g = c.createLinearGradient(0, 0, 1080, 410);
    g.addColorStop(0, "#83aecb");
    g.addColorStop(1, "#345f7e");
    c.fillStyle = g;
    c.fillRect(0, 0, 1080, 410);
    c.strokeStyle = "#d4ebfc50";
    c.lineWidth = 2;
    for (let i = 0; i < 8; i++) {
      c.beginPath();
      c.arc(850, 180, 60 + i * 35, 0, Math.PI * 2);
      c.stroke();
    }
  }
  const shade = c.createLinearGradient(0, 0, 0, 410);
  shade.addColorStop(0, "#0e2c4a30");
  shade.addColorStop(1, "#0e2c4a90");
  c.fillStyle = shade;
  c.fillRect(0, 0, 1080, 410);
  c.fillStyle = "#fff";
  c.font = '700 63px "Bricolage Grotesque", sans-serif';
  c.fillText("off 99", 70, 100);
  c.font = '500 17px "DM Sans", sans-serif';
  c.fillText("TAKE THE LOCAL EXIT", 720, 80);
  c.font = '500 19px "DM Sans", sans-serif';
  c.fillText(v.city.toUpperCase() + " / YOUR NEXT LITTLE ADVENTURE", 74, 278);
  roundRect(c, 55, 335, 970, 910, 35, "#f8fcfff5");
  c.strokeStyle = "#ffffff";
  c.lineWidth = 2;
  c.stroke();
  c.fillStyle = "#668ca9";
  c.font = '600 17px "DM Sans", sans-serif';
  c.fillText("YOU’RE INVITED", 106, 395);
  try {
    const image = await loadImage(
      "data:image/svg+xml;charset=utf-8," +
        encodeURIComponent(avatarSVG(avatar || {}, "invitation")),
    );
    c.save();
    c.beginPath();
    c.roundRect(864, 367, 105, 105, 26);
    c.clip();
    c.drawImage(image, 864, 367, 105, 105);
    c.restore();
  } catch {}
  let y = 452;
  c.fillStyle = "#698aa2";
  c.font = '400 23px "DM Sans", sans-serif';
  y = writeLines(c, "You have been invited by", 106, y, 700, 33);
  c.fillStyle = "#315d7d";
  c.font = '600 46px "Bricolage Grotesque", sans-serif';
  y = writeLines(c, name, 106, y + 27, 700, 53);
  c.fillStyle = "#7394ab";
  c.font = '400 21px "DM Sans", sans-serif';
  y = writeLines(c, "To go to", 106, y + 26, 870, 30);
  c.fillStyle = "#315d7d";
  c.font = '600 45px "Bricolage Grotesque", sans-serif';
  y = writeLines(c, v.name, 106, y + 22, 860, 51);
  c.fillStyle = "#7394ab";
  c.font = '400 21px "DM Sans", sans-serif';
  y = writeLines(c, "For", 106, y + 22, 860, 30);
  c.fillStyle = "#4b7a9c";
  c.font = '500 32px "Bricolage Grotesque", sans-serif';
  y = writeLines(c, q.title, 106, y + 15, 860, 41);
  c.fillStyle = "#668ca9";
  c.font = '600 15px "DM Sans", sans-serif';
  c.fillText("WHAT WE’RE DOING", 106, y + 24);
  c.fillStyle = "#496f8c";
  c.font = '400 20px "DM Sans", sans-serif';
  y = writeLimitedLines(c, q.description, 106, y + 56, 850, 28, 2);
  c.fillStyle = "#668ca9";
  c.font = '600 15px "DM Sans", sans-serif';
  c.fillText("START HERE", 106, y + 15);
  c.fillStyle = "#5e8098";
  c.font = '400 17px "DM Sans", sans-serif';
  y = writeLimitedLines(c, q.steps[0], 106, y + 42, 850, 23, 2);
  const footerY = Math.max(1015, Math.min(1080, y + 35));
  c.strokeStyle = "#bfd5e5";
  c.beginPath();
  c.moveTo(106, footerY - 20);
  c.lineTo(970, footerY - 20);
  c.stroke();
  c.fillStyle = "#496f8c";
  c.font = '500 21px "DM Sans", sans-serif';
  writeLimitedLines(c, v.address, 106, footerY + 15, 840, 28, 1);
  c.font = '400 19px "DM Sans", sans-serif';
  c.fillStyle = "#6d8da5";
  writeLimitedLines(
    c,
    (when || "Pick a time with your crew.") +
      " · " +
      q.minutes +
      " min · " +
      money(q.budget) +
      " / person",
    106,
    footerY + 56,
    840,
    28,
    1,
  );
  c.fillStyle = "#708fa6";
  c.font = '400 15px "DM Sans", sans-serif';
  c.fillText(
    "A plan from a friend. Confirm venue hours, fees and access before you go.",
    106,
    1205,
  );
  c.fillStyle = "#527b99";
  c.font = '500 18px "DM Sans", sans-serif';
  c.fillText("LESS “WHAT NOW?”  MORE “REMEMBER WHEN?”", 80, 1303);
  return new Promise((resolve, reject) =>
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(Error("PNG export unavailable"))),
      "image/png",
    ),
  );
}
