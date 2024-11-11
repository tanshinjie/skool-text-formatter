console.log("Skool Text Formatter Content script initialised.");

// async function getBuildId() {
//   const buildId = fetch("https://www.skool.com/discovery")
//     .then((response) => response.text())
//     .then((text) => {
//       const doc = new DOMParser().parseFromString(text, "text/html");
//       const pagePropsStr = doc.getElementById("__NEXT_DATA__").innerText;
//       const pageProps = JSON.parse(pagePropsStr);
//       return pageProps.buildId;
//     });
//   return buildId;
// }

// async function main() {
//   console.log("[Skool Group Count] main");
//   const buildId = await getBuildId();
//   console.log("buildId", buildId);

//   const pagePropsList = raw.pageProps.categories.map((category) =>
//     fetch(
//       `https://www.skool.com/_next/data/${buildId}/discovery.json?c=${category.id}`
//     )
//   );

//   Promise.all(pagePropsList)
//     .then((responses) => {
//       return Promise.all(responses.map((response) => response.json()));
//     })
//     .then((jsons) => {
//       jsons.forEach((json) => {
//         const el = document.getElementById(
//           `chip-filter-chip-${json.pageProps.categoryParam}`
//         );
//         el.innerText += ` (${json.pageProps.numGroups})`;
//       });
//     });
// }

// Add this event listener at the end of content.js
chrome.runtime.onMessage.addListener((request) => {
  console.log("Message received in content script", request);
  if (request.toggle) {
    main();
  }
});

function main() {
  console.log("[Skool Text Formatter] main");
  const toolbar = document.getElementsByClassName(
    "styled__PostAdditionsWrapper-sc-41pcfm-35 CEEMa"
  );
  if (toolbar.length === 0) {
    console.log("Toolbar not found");
    alert(
      "Unable to active Skool Text Formatter. Please use <link> as a workaround."
    );
    return;
  }

  const boldBtn = document.createElement("button");
  boldBtn.innerText = "B";
  boldBtn.onclick = () => {
    const text = getSelectedText();
    if (text) {
      const boldText = toMathematicalBold(text);
      getSelectionBoundaryElement(true).innerText = boldText;
    }
  };
  toolbar[0].appendChild(boldBtn);
  const italicBtn = document.createElement("button");
  italicBtn.innerText = "I";
  italicBtn.onclick = () => {
    const text = getSelectedText();
    if (text) {
      const italicText = toItalic(text);
      getSelectionBoundaryElement(true).innerText = italicText;
    }
  };
  toolbar[0].appendChild(italicBtn);
  const underlineBtn = document.createElement("button");
  underlineBtn.innerText = "U";
  underlineBtn.onclick = () => {
    const text = getSelectedText();
    if (text) {
      const underlineText = toItalic(text);
      getSelectionBoundaryElement(true).innerText = underlineText;
    }
  };
  toolbar[0].appendChild(underlineBtn);
}

function getSelectedText() {
  var text = "";
  if (typeof window.getSelection != "undefined") {
    text = window.getSelection().toString();
  } else if (
    typeof document.selection != "undefined" &&
    document.selection.type == "Text"
  ) {
    text = document.selection.createRange().text;
  }
  return text;
}

function doSomethingWithSelectedText() {
  var selectedText = getSelectedText();
  if (selectedText) {
    alert("Got selected text " + selectedText);
  }
}

function toMathematicalBold(text) {
  const offsetUpper = 0x1d400; // Unicode offset for bold uppercase A (𝐀)
  const offsetLower = 0x1d41a; // Unicode offset for bold lowercase a (𝐚)
  const offsetDigit = 0x1d7ce; // Unicode offset for bold digit 0 (𝟎)

  return text
    .split("")
    .map((char) => {
      if (char >= "A" && char <= "Z") {
        // Convert uppercase letters
        return String.fromCodePoint(
          char.charCodeAt(0) - "A".charCodeAt(0) + offsetUpper
        );
      } else if (char >= "a" && char <= "z") {
        // Convert lowercase letters
        return String.fromCodePoint(
          char.charCodeAt(0) - "a".charCodeAt(0) + offsetLower
        );
      } else if (char >= "0" && char <= "9") {
        // Convert digits
        return String.fromCodePoint(
          char.charCodeAt(0) - "0".charCodeAt(0) + offsetDigit
        );
      } else {
        // Leave other characters unchanged
        return char;
      }
    })
    .join("");
}

function toUnderlined(text) {
  const underline = "\u0332"; // Combining low line

  return text
    .split("")
    .map((char) => char + underline)
    .join("");
}

function toItalic(input) {
  const italicMap = {
    A: "\u{1D608}",
    B: "\u{1D609}",
    C: "\u{1D60A}",
    D: "\u{1D60B}",
    E: "\u{1D60C}",
    F: "\u{1D60D}",
    G: "\u{1D60E}",
    H: "\u{1D60F}",
    I: "\u{1D610}",
    J: "\u{1D611}",
    K: "\u{1D612}",
    L: "\u{1D613}",
    M: "\u{1D614}",
    N: "\u{1D615}",
    O: "\u{1D616}",
    P: "\u{1D617}",
    Q: "\u{1D618}",
    R: "\u{1D619}",
    S: "\u{1D61A}",
    T: "\u{1D61B}",
    U: "\u{1D61C}",
    V: "\u{1D61D}",
    W: "\u{1D61E}",
    X: "\u{1D61F}",
    Y: "\u{1D620}",
    Z: "\u{1D621}",
    a: "\u{1D622}",
    b: "\u{1D623}",
    c: "\u{1D624}",
    d: "\u{1D625}",
    e: "\u{1D626}",
    f: "\u{1D627}",
    g: "\u{1D628}",
    h: "\u{1D629}",
    i: "\u{1D62A}",
    j: "\u{1D62B}",
    k: "\u{1D62C}",
    l: "\u{1D62D}",
    m: "\u{1D62E}",
    n: "\u{1D62F}",
    o: "\u{1D630}",
    p: "\u{1D631}",
    q: "\u{1D632}",
    r: "\u{1D633}",
    s: "\u{1D634}",
    t: "\u{1D635}",
    u: "\u{1D636}",
    v: "\u{1D637}",
    w: "\u{1D638}",
    x: "\u{1D639}",
    y: "\u{1D63A}",
    z: "\u{1D63B}",
    " ": " ", // space remains as is
  };

  return input
    .split("")
    .map((char) => italicMap[char] || char)
    .join("");
}

function getSelectionBoundaryElement(isStart) {
  var range, sel, container;
  if (document.selection) {
    range = document.selection.createRange();
    range.collapse(isStart);
    return range.parentElement();
  } else {
    sel = window.getSelection();
    if (sel.getRangeAt) {
      if (sel.rangeCount > 0) {
        range = sel.getRangeAt(0);
      }
    } else {
      // Old WebKit
      range = document.createRange();
      range.setStart(sel.anchorNode, sel.anchorOffset);
      range.setEnd(sel.focusNode, sel.focusOffset);

      // Handle the case when the selection was selected backwards (from the end to the start in the document)
      if (range.collapsed !== sel.isCollapsed) {
        range.setStart(sel.focusNode, sel.focusOffset);
        range.setEnd(sel.anchorNode, sel.anchorOffset);
      }
    }

    if (range) {
      container = range[isStart ? "startContainer" : "endContainer"];

      // Check if the container is a text node and return its parent if so
      return container.nodeType === 3 ? container.parentNode : container;
    }
  }
}
