const searchParams = new URLSearchParams(`?${window.location.href.split("?")[1]}`);

document.getElementById("new").addEventListener("click", getAllNewStories);
document.getElementById("top").addEventListener("click", getAllTopStories);
document.getElementById("best").addEventListener("click", getAllBestStories);
document.getElementById("ask").addEventListener("click", getAllAskStories);
document.getElementById("show").addEventListener("click", getAllShowStories);

function timeDifference(timestamp) {
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;
    var current = new Date().getTime();
    var elapsed = current - timestamp;

    if (elapsed < msPerMinute) {
        if (1 < Math.round(elapsed/1000)) {
            return `${Math.round(elapsed/1000)} seconds ago`; 
        } else {
            return "just now";
        }  
    } else if (elapsed < msPerHour) {
        if (1 < Math.round(elapsed/msPerMinute)) {
            return `${Math.round(elapsed/msPerMinute)} minutes ago`;
        } else {
            return `${Math.round(elapsed/msPerMinute)} minute ago`;
        }  
    } else if (elapsed < msPerDay) {
        if (1 < Math.round(elapsed/msPerHour)) {
            return `${Math.round(elapsed/msPerHour)} hours ago`; 
        } else {
            return `${Math.round(elapsed/msPerHour)} hour ago`;
        }  
    } else if (elapsed < msPerMonth) {
        if (1 < Math.round(elapsed/msPerDay)) {
            return `${Math.round(elapsed/msPerDay)} days ago`;
        } else {
            return `${Math.round(elapsed/msPerDay)} day ago`;
        }
    } else if (elapsed < msPerYear) {
        if (1 < Math.round(elapsed/msPerMonth)) {
            return `${Math.round(elapsed/msPerMonth)} months ago`;
        } else {
            return `${Math.round(elapsed/msPerMonth)} month ago`;
        }
    } else {
        if (1 < elapsed/msPerYear) {
            return `${Math.round(elapsed/msPerYear)} years ago`;
        } else {
            return `${Math.round(elapsed/msPerYear)} year ago`;
        }
    }
}

async function getNewStories(num) {
    var stories = await fetch("https://hacker-news.firebaseio.com/v0/newstories.json").then((response) => response.json());
    var story = await fetch(`https://hacker-news.firebaseio.com/v0/item/${stories[num]}.json`).then((response) => response.json());
    var date = timeDifference(story.time * 1000);
    document.getElementById(`story${num}`).innerHTML = `
        <div class="rounded border m-2 ps-2 pt-1 bg-light">
            <h4><span class="text-muted">${num + 1}</span> ${story.url ? `<a href="${story.url}" target="_blank">` : ""}${story.title}</a></h4>
            <small class="text-muted mb-2"><i class="bi bi-calendar3"></i> ${date} <i class="bi bi-hand-thumbs-up"></i> ${1 < story.score ? `${story.score} points` : `${story.score} point`} <i class="bi bi-person"></i> ${story.by} <i class="bi bi-chat"></i> ${story.kids ? `${1 < story.kids.length ? `${story.kids.length} comments` : `${story.kids.length} comment`}` : "0 comments"}</small>
            ${story.text ? `<p>${story.text}</p>` : ""}
        </div>
    `;
}

async function getTopStories(num) {
    var stories = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json").then((response) => response.json());
    var story = await fetch(`https://hacker-news.firebaseio.com/v0/item/${stories[num]}.json`).then((response) => response.json());
    var date = timeDifference(story.time * 1000);
    document.getElementById(`story${num}`).innerHTML = `
        <div class="rounded border m-2 ps-2 pt-1 bg-light">
            <h4><span class="text-muted">${num + 1}</span> ${story.url ? `<a href="${story.url}" target="_blank">` : ""}${story.title}</a></h4>
            <small class="text-muted mb-2"><i class="bi bi-calendar3"></i> ${date} <i class="bi bi-hand-thumbs-up"></i> ${1 < story.score ? `${story.score} points` : `${story.score} point`} <i class="bi bi-chat"></i> ${story.kids ? `${1 < story.kids.length ? `${story.kids.length} comments` : `${story.kids.length} comment`}` : "0 comments"}</small>
            ${story.text ? `<p>${story.text}</p>` : ""}
        </div>
    `;
}

async function getBestStories(num) {
    var stories = await fetch("https://hacker-news.firebaseio.com/v0/beststories.json").then((response) => response.json());
    var story = await fetch(`https://hacker-news.firebaseio.com/v0/item/${stories[num]}.json`).then((response) => response.json());
    var date = timeDifference(story.time * 1000);
    document.getElementById(`story${num}`).innerHTML = `
        <div class="rounded border m-2 ps-2 pt-1 bg-light">
            <h4><span class="text-muted">${num + 1}</span> ${story.url ? `<a href="${story.url}" target="_blank">` : ""}${story.title}</a></h4>
            <small class="text-muted mb-2"><i class="bi bi-calendar3"></i> ${date} <i class="bi bi-hand-thumbs-up"></i> ${1 < story.score ? `${story.score} points` : `${story.score} point`} <i class="bi bi-person"></i> ${story.by} <i class="bi bi-chat"></i> ${story.kids ? `${1 < story.kids.length ? `${story.kids.length} comments` : `${story.kids.length} comment`}` : "0 comments"}</small>
            ${story.text ? `<p>${story.text}</p>` : ""}
        </div>
    `;
}

async function getAskStories(num) {
    var stories = await fetch("https://hacker-news.firebaseio.com/v0/askstories.json").then((response) => response.json());
    var story = await fetch(`https://hacker-news.firebaseio.com/v0/item/${stories[num]}.json`).then((response) => response.json());
    var date = timeDifference(story.time * 1000);
    document.getElementById(`story${num}`).innerHTML = `
        <div class="rounded border m-2 ps-2 pt-1 bg-light">
            <h4><span class="text-muted">${num + 1}</span> ${story.url ? `<a href="${story.url}" target="_blank">` : ""}${story.title}</a></h4>
            <small class="text-muted mb-2"><i class="bi bi-calendar3"></i> ${date} <i class="bi bi-hand-thumbs-up"></i> ${1 < story.score ? `${story.score} points` : `${story.score} point`} <i class="bi bi-person"></i> ${story.by} <i class="bi bi-chat"></i> ${story.kids ? `${1 < story.kids.length ? `${story.kids.length} comments` : `${story.kids.length} comment`}` : "0 comments"}</small>
            ${story.text ? `<p>${story.text}</p>` : ""}
        </div>
    `;
}

async function getShowStories(num) {
    var stories = await fetch("https://hacker-news.firebaseio.com/v0/showstories.json").then((response) => response.json());
    var story = await fetch(`https://hacker-news.firebaseio.com/v0/item/${stories[num]}.json`).then((response) => response.json());
    var date = timeDifference(story.time * 1000);
    document.getElementById(`story${num}`).innerHTML = `
        <div class="rounded border m-2 ps-2 pt-1 bg-light">
            <h4><span class="text-muted">${num + 1}</span> ${story.url ? `<a href="${story.url}" target="_blank">` : ""}${story.title}</a></h4>
            <small class="text-muted mb-2"><i class="bi bi-calendar3"></i> ${date} <i class="bi bi-hand-thumbs-up"></i> ${1 < story.score ? `${story.score} points` : `${story.score} point`} <i class="bi bi-person"></i> ${story.by} <i class="bi bi-chat"></i> ${story.kids ? `${1 < story.kids.length ? `${story.kids.length} comments` : `${story.kids.length} comment`}` : "0 comments"}</small>
            ${story.text ? `<p>${story.text}</p>` : ""}
        </div>
    `;
}

function getAllNewStories(showLoading=true) {
    if (showLoading) {
        loading();
    }

    for (let i = 0; i < 30; i++) {
        getNewStories(i);
    }
}

function getAllTopStories(showLoading=true) {
    if (showLoading) {
        loading();
    }

    for (let i = 0; i < 30; i++) {
        getTopStories(i);
    }
}

function getAllBestStories(showLoading=true) {
    if (showLoading) {
        loading();
    }

    for (let i = 0; i < 30; i++) {
        getBestStories(i);
    }
}

function getAllAskStories(showLoading=true) {
    if (showLoading) {
        loading();
    }

    for (let i = 0; i < 30; i++) {
        getAskStories(i);
    }
}

function getAllShowStories(showLoading=true) {
    if (showLoading) {
        loading();
    }

    for (let i = 0; i < 30; i++) {
        getShowStories(i);
    }
}

function loading() {
    for (let i = 0; i < 30; i++) {
        document.getElementById(`story${i}`).innerHTML = `
            <div class="rounded border m-2 ps-2 pt-1 bg-light placeholder-glow">
                <h4><span class="text-muted">${i + 1}</span> <span class="placeholder col-6"></span></h4>
                <small><span class="placeholder col-6 mb-2"></span></small>
            </div>
        `;
    }
}

if (searchParams.has("new")) {
    getAllNewStories();
} else if (searchParams.has("top")) {
    getAllTopStories();
} else if (searchParams.has("best")) {
    getAllBestStories();
} else if (searchParams.has("ask")) {
    getAllAskStories();
} else if (searchParams.has("show")) {
    getAllShowStories();
} else {
    window.location.replace("?new");
}
