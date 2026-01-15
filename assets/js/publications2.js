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
    fetch('data/publications.json')
        .then(response => response.json())
        .then(data => {
            // Group publications by year
            const pubsByYear = {};
            data.publications.forEach(pub => {
                const year = pub.year || 'Unknown';
                if (!pubsByYear[year]) {
                    pubsByYear[year] = [];
                }
                pubsByYear[year].push(pub);
            });

            // Sort years in descending order
            const sortedYears = Object.keys(pubsByYear).sort((a, b) => {
                if (a === 'Unknown') return 1;
                if (b === 'Unknown') return -1;
                return parseInt(b) - parseInt(a);
            });

            // Generate HTML
            let html = '';
            sortedYears.forEach(year => {
                const pubs = pubsByYear[year];
                const showViewMore = pubs.length > 3;
                
                html += `<div class="publication-year-section">`;
                html += `<h3 class="publication-year-header">${year}</h3>`;
                
                pubs.forEach((pub, index) => {
                    const links = [];
                    if (pub.pdf) links.push(`<a href="${pub.pdf}" target="_blank">PDF</a>`);
                    if (pub.code) links.push(`<a href="${pub.code}" target="_blank">Code</a>`);
                    if (pub.project) links.push(`<a href="${pub.project}" target="_blank">Project</a>`);
                    if (pub.video) links.push(`<a href="${pub.video}" target="_blank">Video</a>`);
                    if (pub.slides) links.push(`<a href="${pub.slides}" target="_blank">Slides</a>`);

                    const isHidden = index >= 3 ? 'hidden' : '';
                    
                    html += `
                        <div class="publication-item ${isHidden}" data-year="${year}">
                            <div class="publication-title">
                                ${pub.pdf ? `<a href="${pub.pdf}" target="_blank">${pub.title}</a>` : pub.title}
                            </div>
                            <div class="publication-authors">${pub.authors}</div>
                            <div class="publication-venue">${pub.venue}</div>
                            ${links.length > 0 ? `<div class="publication-links">${links.join('')}</div>` : ''}
                        </div>
                    `;
                });
                
                if (showViewMore) {
                    html += `
                        <div class="view-more-btn" data-year="${year}" onclick="toggleYearPublications('${year}')">
                            View More (${pubs.length - 3} more)
                        </div>
                    `;
                }
                
                html += `</div>`;
            });

            document.getElementById(targetId).innerHTML = html;
        })
        .catch(error => console.error('Error loading publications:', error));
}

function toggleYearPublications(year) {
    const hiddenPubs = document.querySelectorAll(`.publication-item.hidden[data-year="${year}"]`);
    const viewMoreBtn = document.querySelector(`.view-more-btn[data-year="${year}"]`);
    
    if (hiddenPubs.length > 0) {
        // Show all publications
        hiddenPubs.forEach(pub => pub.classList.remove('hidden'));
        if (viewMoreBtn) {
            viewMoreBtn.textContent = 'View Less';
            viewMoreBtn.setAttribute('data-expanded', 'true');
        }
    } else {
        // Hide publications beyond first 3
        const allPubs = document.querySelectorAll(`.publication-item[data-year="${year}"]`);
        allPubs.forEach((pub, index) => {
            if (index >= 3) {
                pub.classList.add('hidden');
            }
        });
        if (viewMoreBtn) {
            const totalPubs = allPubs.length;
            viewMoreBtn.textContent = `View More (${totalPubs - 3} more)`;
            viewMoreBtn.removeAttribute('data-expanded');
        }
    }
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

function renderRecentPublications(containerId, limit = 5) {
    fetch('data/publications.json')
        .then(response => response.json())
        .then(data => {
            const recentPubs = data.publications.slice(0, limit);
            const html = `
                <ul>
                    ${recentPubs.map(pub => `
                        <li>
                            <h6><a href="${pub.pdf}" target="_blank">${pub.title}</a></h6>
                            <p>${pub.authors}<br>
                            <em>${pub.venue}</em></p>
                        </li>
                    `).join('')}
                </ul>
            `;
            document.getElementById(containerId).innerHTML = html;
        })
        .catch(error => console.error('Error loading publications:', error));
}