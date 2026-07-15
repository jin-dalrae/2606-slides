/** Deck/doc catalog from site-data.js (window.RJ_SITE). */
export function loadSiteCatalog() {
  const siteData = window.RJ_SITE || {};
  const home = {
    title: siteData.slidesTitle || "Web Slides",
    date: "Home",
    links: siteData.profileLinks || []
  };

  const projectMeta = siteData.projects || [];
  const presentations = (siteData.slides || []).map((item) => ({
    ...item,
    section: item.section || item.project || "Other",
    tagline:
      item.tagline ||
      projectMeta.find((project) => project.name === (item.section || item.project))?.tagline ||
      ""
  }));

  // Sort newest-first, stable for unparseable dates.
  const deckDateValue = (value) => {
    const time = new Date(value).getTime();
    return Number.isNaN(time) ? 0 : time;
  };
  presentations.forEach((item, index) => {
    item.order = index;
  });
  presentations.sort(
    (a, b) => deckDateValue(b.date) - deckDateValue(a.date) || a.order - b.order
  );

  const presentationSections = projectMeta
    .map((project) => project.name)
    .filter((name) => name !== "Reference");

  return { siteData, home, projectMeta, presentations, presentationSections };
}
