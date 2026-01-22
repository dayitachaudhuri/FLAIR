document.addEventListener('DOMContentLoaded', function () {
    fetch('data/news.json')
        .then(response => response.json())
        .then(data => {
            function displayNews(newsItems) {
                const newsList = document.getElementById('news-list');
                
                if (!newsItems || newsItems.length === 0) {
                    newsList.innerHTML = '<p>No news available at the moment.</p>';
                    return;
                }

                // Function to convert markdown-style links [text](url) to HTML links
                function convertMarkdownLinks(text) {
                    // Match markdown-style links: [text](url)
                    const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
                    
                    return text.replace(markdownLinkRegex, (match, linkText, url) => {
                        return `<a href="${url}" target="_blank">${linkText}</a>`;
                    });
                }

                const newsHTML = newsItems.map(item => {
                    const description = convertMarkdownLinks(item.description);
                    
                    return `
                        <div class="news-item">
                            <h6>${item.title}</h6>
                            <p class="news-date">${item.date}</p>
                            <p>${description}</p>
                        </div>
                    `;
                }).join('');

                newsList.innerHTML = newsHTML;
            }

            // Sort news by date in descending order (latest first)
            const sortedNews = [...data.news].sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateB - dateA; // Descending order
            });
            
            displayNews(sortedNews);
        })
        .catch(error => {
            console.error('Error loading news:', error);
        });
});
