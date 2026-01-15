let publicationsData = [];

// Helper to render a publication item
function createPublicationItem(pub) {
    const awardBadge = pub.awards && pub.awards.trim() !== ''
        ? `<span class="pub-award">${pub.awards}</span>`
        : '';
    const codeBtn = pub.code
        ? `<a href="${pub.code}" target="_blank">[code]</a>`
        : '';
    const paperBtn = pub.url
        ? `<a href="${pub.url}" target="_blank">[paper]</a>`
        : '';
    return `
        <li>
            <h6 class="bold">${pub.title}</h6>
            <p>${pub.venue}, ${pub.year} <br/>
            ${pub.authors}
            ${codeBtn} ${paperBtn}
            </p>
        </li>
    `;
}

// Render all publications
function renderAllPublications(targetId) {
    const pubs = publicationsData.slice().sort((a, b) => b.year - a.year);
    document.getElementById(targetId).innerHTML =
        `<ul>${pubs.map(createPublicationItem).join('')}</ul>`;
}

// Render latest N publications
function renderLatestPublications(targetId, count = 5) {
    const pubs = publicationsData.slice().sort((a, b) => b.year - a.year).slice(0, count);
    document.getElementById(targetId).innerHTML =
        `<ul>${pubs.map(createPublicationItem).join('')}</ul>`;
}

// Load data and render on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
    fetch('data/publications.json')
        .then(response => response.json())
        .then(data => {
            publicationsData = data.publications;
            if (document.getElementById('publications-list')) {
                renderLatestPublications('publications-list', 5);
            }
            if (document.getElementById('all-publications-list')) {
                renderAllPublications('all-publications-list');
            }
        })
        .catch(error => {
            if (document.getElementById('publications-list')) {
                document.getElementById('publications-list').innerHTML = "<p>Error loading publications.</p>";
            }
            if (document.getElementById('all-publications-list')) {
                document.getElementById('all-publications-list').innerHTML = "<p>Error loading publications.</p>";
            }
        });
});