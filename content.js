(function() {
  console.log("Academic Organizer: Extracting homework...");
  
  // Scrape visible study guide items / assignments from Somtoday page
  const items = document.querySelectorAll('.studiewijzer-item, [class*="studiewijzer"], tr, .card');
  let extracted = [];

  items.forEach(el => {
    const text = el.innerText || "";
    if (text.length > 5 && !text.includes("Inloggen")) {
      extracted.push(text.trim());
    }
  });

  if (extracted.length === 0) {
    alert("No tasks visible on current screen. Make sure you are on the Huiswerk / Agenda tab!");
    return;
  }

  // Display raw structured result in console and alert status
  console.log("Extracted Tasks:", extracted);
  alert(`Successfully fetched ${extracted.length} items from Somtoday! Check DevTools console for raw output.`);
})();
