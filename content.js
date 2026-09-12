(function() {
  console.log("Academic Organizer: Fetching homework...");

  // Extract task elements from the current page
  const items = document.querySelectorAll('.studiewijzer-item, [class*="studiewijzer"], tr, .card');
  let tasks = [];

  items.forEach((el, index) => {
    const text = el.innerText ? el.innerText.trim() : "";
    if (text.length > 5 && !text.includes("Inloggen")) {
      const lines = text.split('\n').filter(l => l.trim().length > 0);
      
      tasks.push({
        id: index,
        subject: lines[0] || "General",
        title: lines[1] || text.substring(0, 40),
        description: lines.slice(2).join(" ") || "",
        date: new Date().toLocaleDateString('nl-NL') // Default to today if date parsing isn't explicit
      });
    }
  });

  if (tasks.length === 0) {
    alert("No tasks visible on current screen. Open your Somtoday Huiswerk/Agenda page!");
    return;
  }

  // Save to Chrome Local Storage and notify user
  chrome.storage.local.set({ somtodayTasks: tasks, lastUpdated: new Date().toLocaleTimeString() }, () => {
    alert(`Fetched ${tasks.length} tasks! Opening dashboard...`);
    
    // Open or refresh the local dashboard
    const dashboardUrl = chrome.runtime.getURL("index.html");
    window.open(dashboardUrl, "_blank");
  });
})();
