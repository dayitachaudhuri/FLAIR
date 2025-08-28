document.addEventListener('DOMContentLoaded', function () {
    fetch('data/publications.json')
        .then(response => response.json())
        .then(data => {
            function createPublicationItem(publication) {
                const awardBadge = publication.awards && publication.awards.trim() !== ''
                    ? `<span class="badge badge-warning ml-2">${publication.awards}</span>`
                    : '';
                return `
                    <div class="publication-item mb-4">
                        <h6 class="font-weight-bold">${publication.title}${awardBadge}</h6>
                        <p class="text-muted mb-1">${publication.venue}, ${publication.year}</p>
                        <p class="small">Authors: ${publication.authors}</p>
                    </div>
                `;
            }
            const latestPublications = data.publications.slice(0, 5);
            document.getElementById('publications-list').innerHTML = latestPublications.map(createPublicationItem).join('');
        })
        .catch(error => {
            console.error('Error loading publications:', error);
        });
});
