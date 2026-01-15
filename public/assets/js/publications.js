let publicationsData = [];

// Helper to render a publication item
function createPublicationItem(pub) {
    const awardBadge = pub.awards && pub.awards.trim() !== ''
        ? `<span class="inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded mt-2">${pub.awards}</span>`
        : '';
    const codeBtn = pub.code
        ? `<a href="${pub.code}" target="_blank" class="text-blue-600 hover:text-blue-800 transition-colors mr-2">[code]</a>`
        : '';
    const paperBtn = pub.url
        ? `<a href="${pub.url}" target="_blank" class="text-blue-600 hover:text-blue-800 transition-colors">[paper]</a>`
        : '';
    return `
        <li class="mb-6 pb-6 border-b border-gray-200 last:border-b-0">
            <h6 class="text-lg font-semibold text-gray-800 mb-2">${pub.title}</h6>
            <p class="text-gray-700 text-sm">
                <span class="font-medium">${pub.venue}, ${pub.year}</span><br/>
                <span class="text-gray-600">${pub.authors}</span><br/>
                ${codeBtn} ${paperBtn}
                ${awardBadge}
            </p>
        </li>
    `;
}

// Render all publications
function renderAllPublications(targetId) {
    const pubs = publicationsData.slice().sort((a, b) => b.year - a.year);
    document.getElementById(targetId).innerHTML =
        `<ul class="space-y-4">${pubs.map(createPublicationItem).join('')}</ul>`;
}

// Render latest N publications
function renderLatestPublications(targetId, count = 5) {
    const pubs = publicationsData.slice().sort((a, b) => b.year - a.year).slice(0, count);
    document.getElementById(targetId).innerHTML =
        `<ul class="space-y-4">${pubs.map(createPublicationItem).join('')}</ul>`;
}

// Load data and render on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
    fetch('/data/publications.json')
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
            console.error('Error loading publications:', error);
            if (document.getElementById('publications-list')) {
                document.getElementById('publications-list').innerHTML = "<p class='text-red-600'>Error loading publications.</p>";
            }
            if (document.getElementById('all-publications-list')) {
                document.getElementById('all-publications-list').innerHTML = "<p class='text-red-600'>Error loading publications.</p>";
            }
        });
});