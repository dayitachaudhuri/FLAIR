let publicationsData = [];
let activeFilters = new Set();
let searchQuery = '';
let currentPage = 1;
const ITEMS_PER_PAGE = 10;

// Extract all unique tags from publications
function getAllTags(publications) {
    const tagsSet = new Set();
    publications.forEach(pub => {
        if (pub.tags && Array.isArray(pub.tags)) {
            pub.tags.forEach(tag => tagsSet.add(tag));
        }
    });
    return Array.from(tagsSet).sort();
}

// Filter publications by multiple tags (OR logic)
function filterPublications(publications, activeTags) {
    if (activeTags.size === 0) return publications;
    return publications.filter(pub => {
        if (!pub.tags || !Array.isArray(pub.tags)) return false;
        // Return true if publication has ANY of the active tags
        return pub.tags.some(tag => activeTags.has(tag));
    });
}

// Search publications by title, authors, or venue
function searchPublications(publications, query) {
    if (!query || query.trim() === '') return publications;
    
    const lowerQuery = query.toLowerCase().trim();
    return publications.filter(pub => {
        const title = (pub.title || '').toLowerCase();
        const authors = (pub.authors || '').toLowerCase();
        const venue = (pub.venue || '').toLowerCase();
        
        return title.includes(lowerQuery) || 
               authors.includes(lowerQuery) || 
               venue.includes(lowerQuery);
    });
}

// Apply all filters (search + tags)
function applyAllFilters() {
    let filtered = publicationsData;
    filtered = searchPublications(filtered, searchQuery);
    filtered = filterPublications(filtered, activeFilters);
    return filtered;
}

// Sort publications by year (descending)
function sortPublicationsByYear(publications) {
    return [...publications].sort((a, b) => {
        const yearA = a.year ? parseInt(a.year) : 0;
        const yearB = b.year ? parseInt(b.year) : 0;
        return yearB - yearA;
    });
}

// Render filter buttons
function renderFilterButtons(targetId, tags) {
    const html = `
        <div class="publication-filters" style="margin-bottom: 30px; display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;">
            <button class="filter-btn ${activeFilters.size === 0 ? 'active' : ''}" 
                    onclick="clearFilters()" 
                    data-tag="all">
                All Papers
            </button>
            ${tags.map(tag => `
                <button class="filter-btn ${activeFilters.has(tag) ? 'active' : ''}" 
                        onclick="toggleFilter('${tag}')" 
                        data-tag="${tag}">
                    ${tag}
                </button>
            `).join('')}
        </div>
    `;
    
    const filtersContainer = document.getElementById(targetId);
    if (filtersContainer) {
        filtersContainer.innerHTML = html;
    }
}

// Render publications with pagination
function renderPublications(targetId, publications) {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedPubs = publications.slice(startIndex, endIndex);
    const hasMore = endIndex < publications.length;
    
    let html = '';
    
    paginatedPubs.forEach(pub => {
        const links = [];
        if (pub.pdf) links.push(`<a href="${pub.pdf}" target="_blank">PDF</a>`);
        if (pub.code) links.push(`<a href="${pub.code}" target="_blank">Code</a>`);
        if (pub.project) links.push(`<a href="${pub.project}" target="_blank">Project</a>`);
        if (pub.video) links.push(`<a href="${pub.video}" target="_blank">Video</a>`);
        if (pub.slides) links.push(`<a href="${pub.slides}" target="_blank">Slides</a>`);
        
        const awardBadge = pub.awards && pub.awards.trim() !== ''
            ? `<span class="pub-award" style="display: block; margin-top: 8px; color: var(--color-primary-red); font-size: 0.9rem; font-weight: 600;">🏆 ${pub.awards}</span>`
            : '';
        
        const tags = pub.tags && pub.tags.length > 0
            ? `<div class="pub-tags" style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px;">
                ${pub.tags.map(tag => 
                    `<span class="pub-tag" style="font-size: 0.8rem; padding: 3px 10px; background: var(--color-bg-cream); border: 1px solid var(--color-border-light); color: var(--color-text-medium);">${tag}</span>`
                ).join('')}
               </div>`
            : '';
        
        // Make title clickable if URL exists, otherwise use PDF link or plain text
        const titleHTML = pub.url && pub.url.trim() !== ''
            ? `<a href="${pub.url}" target="_blank">${pub.title}</a>`
            : (pub.pdf ? `<a href="${pub.pdf}" target="_blank">${pub.title}</a>` : pub.title);
        
        html += `
            <div class="publication-item">
                <div class="publication-title">
                    ${titleHTML}
                </div>
                <div class="publication-authors">${pub.authors}</div>
                <div class="publication-venue">
                    ${pub.venue}${pub.year ? ` (${pub.year})` : ''}
                </div>
                ${awardBadge}
                ${links.length > 0 ? `<div class="publication-links">${links.join('')}</div>` : ''}
                ${tags}
            </div>
        `;
    });
    
    // Add "See More" button if there are more publications
    if (hasMore) {
        html += `
            <div style="text-align: center; margin-top: 30px;">
                <button class="view-more-btn" onclick="loadMore()" style="cursor: pointer;">
                    See More (${publications.length - endIndex} more)
                </button>
            </div>
        `;
    }
    
    document.getElementById(targetId).innerHTML = html;
}

// Toggle a filter on/off
function toggleFilter(tag) {
    if (activeFilters.has(tag)) {
        activeFilters.delete(tag);
    } else {
        activeFilters.add(tag);
    }
    
    currentPage = 1; // Reset to first page when filter changes
    
    // Re-render filter buttons to update active states
    const tags = getAllTags(publicationsData);
    renderFilterButtons('publication-filters-container', tags);
    
    // Re-render publications
    const filtered = filterPublications(publicationsData, activeFilters);
    const sorted = sortPublicationsByYear(filtered);
    renderPublications('all-publications-list', sorted);
}

// Clear all filters
function clearFilters() {
    activeFilters.clear();
    currentPage = 1;
    
    // Re-render filter buttons
    const tags = getAllTags(publicationsData);
    renderFilterButtons('publication-filters-container', tags);
    
    // Re-render publications
    const sorted = sortPublicationsByYear(publicationsData);
    renderPublications('all-publications-list', sorted);
}

// Load more publications
function loadMore() {
    currentPage++;
    const filtered = filterPublications(publicationsData, activeFilters);
    const sorted = sortPublicationsByYear(filtered);
    renderPublications('all-publications-list', sorted);
}

// Render all publications with filters
function renderAllPublications(targetId) {
    fetch('data/publications.json')
        .then(response => response.json())
        .then(data => {
            publicationsData = data.publications;
            
            // Get all unique tags
            const tags = getAllTags(publicationsData);
            
            // Render filter buttons above the list
            const listContainer = document.getElementById(targetId);
            if (listContainer) {
                // Create a container for filters and publications
                const parentDiv = listContainer.parentElement;
                
                // Check if filters already exist
                let filtersDiv = document.getElementById('publication-filters-container');
                if (!filtersDiv) {
                    filtersDiv = document.createElement('div');
                    filtersDiv.id = 'publication-filters-container';
                    parentDiv.insertBefore(filtersDiv, listContainer);
                }
                
                renderFilterButtons('publication-filters-container', tags);
            }
            
            // Sort and render publications
            const sorted = sortPublicationsByYear(publicationsData);
            renderPublications(targetId, sorted);
        })
        .catch(error => {
            console.error('Error loading publications:', error);
            document.getElementById(targetId).innerHTML = "<p>Error loading publications.</p>";
        });
}

// Render recent publications (for homepage)
function renderRecentPublications(containerId, limit = 5) {
    fetch('data/publications.json')
        .then(response => response.json())
        .then(data => {
            const sorted = sortPublicationsByYear(data.publications);
            const recentPubs = sorted.slice(0, limit);
            const html = `
                <ul>
                    ${recentPubs.map(pub => {
                        // Use URL if available, otherwise fall back to PDF or #
                        const link = pub.url && pub.url.trim() !== '' ? pub.url : (pub.pdf || '#');
                        return `
                            <li>
                                <h6><a href="${link}" target="_blank">${pub.title}</a></h6>
                                <p>${pub.authors}<br>
                                <em>${pub.venue}${pub.year ? ` (${pub.year})` : ''}</em></p>
                            </li>
                        `;
                    }).join('')}
                </ul>
            `;
            document.getElementById(containerId).innerHTML = html;
        })
        .catch(error => console.error('Error loading publications:', error));
}