document.addEventListener('DOMContentLoaded', function () {
    fetch('data/news.json')
        .then(response => response.json())
        .then(data => {
            function linkify(text) {
                return text.replace(/(https?:\/\/[^\s]+)/g, function(url) {
                    return `<a href="${url}" target="_blank" rel="noopener">${url}</a>`;
                });
            }
            function createNewsItem(newsItem) {
                return `
                    <div class="news-item">
                        <h6 class="bold">${newsItem.date} | ${newsItem.title}</h6>
                        <p>${linkify(newsItem.description)}</p>
                    </div>
                `;
            }
            document.getElementById('news-list').innerHTML = data.news.map(createNewsItem).join('');
        })
        .catch(error => {
            console.error('Error loading news:', error);
        });
});
