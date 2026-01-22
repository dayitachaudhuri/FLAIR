function loadNavbar() {
    const navbarHTML = `
        <nav class="navbar navbar-expand-lg navbar-light fixed-top" data-spy="affix" data-offset-top="0">
            <div class="container">
                <a class="navbar-brand" href="index2.html"><img src="assets/imgs/logo2.png" alt="FLAIR Lab"></a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ml-auto align-items-center">
                        <li class="nav-item"><a class="nav-link" href="index2.html#home">Home</a></li>
                        <li class="nav-item"><a class="nav-link" href="index2.html#news">News</a></li>
                        <li class="nav-item"><a class="nav-link" href="index2.html#people">People</a></li>
                        <li class="nav-item"><a class="nav-link" href="publications2.html">Publications</a></li>
                        <li class="nav-item"><a class="nav-link" href="">Blog</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    `;
    
    document.getElementById('navbar-placeholder').innerHTML = navbarHTML;
}

document.addEventListener('DOMContentLoaded', loadNavbar);
