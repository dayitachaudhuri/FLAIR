document.addEventListener('DOMContentLoaded', function () {
    fetch('data/news.json')
        .then(response => response.json())
        .then(data => {
            function linkify(text) {
                return text.replace(/(https?:\/\/[^\s]+)/g, function(url) {
                    return `<a href="${url}" target="_blank" rel="noopener">${url}</a>`;
                });
            }
            function createNewsItem(newsItem, index, array) {
                const borderClass = index < array.length - 1 ? 'border-bottom pb-3 mb-3' : '';
                return `
                    <div class="news-item ${borderClass}">
                        <span class="badge badge-${newsItem.badge_color || 'info'}">${newsItem.date}</span>
                        <h6 class="mt-2 font-weight-bold">${newsItem.title}</h6>
                        <p class="small">${linkify(newsItem.description)}</p>
                    </div>
                `;
            }
            document.getElementById('news-list').innerHTML = data.news.map(createNewsItem).join('');
        })
        .catch(error => {
            console.error('Error loading news:', error);
        });
});
