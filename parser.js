function cleanHtml(html) {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').trim();
}

function processAssignments(rawAssignments) {
  return rawAssignments
    .map(item => ({
      id: item.links?.[0]?.id,
      date: new Date(item.datumTijd),
      subject: item.additionalObjects?.lesgroep?.vak?.naam || "Algemeen",
      subjectCode: item.additionalObjects?.lesgroep?.vak?.afkorting || "",
      title: item.studiewijzerItem?.onderwerp || "Geen onderwerp",
      description: cleanHtml(item.studiewijzerItem?.omschrijving),
      completed: item.swigemaaktVinkjes?.items?.some(v => v.gemaakt) || false
    }))
    .sort((a, b) => a.date - b.date); // Strict chronological order (soonest first)
}

module.exports = { processAssignments };
