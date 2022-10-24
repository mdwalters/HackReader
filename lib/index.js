const searchParams = new URLSearchParams(`?${window.location.href.split("?")[1]}`);

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
            return `${Math.round(elapsed/msPerDay)} days ago`;
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
            <small class="text-muted mb-2"><i class="bi bi-calendar3"></i> ${date} <i class="bi bi-hand-thumbs-up"></i> ${1 < story.score ? `${story.score} points` : `${story.score} point`} <i class="bi bi-person"></i> ${story.by} <i class="bi bi-chat-left-text"></i> ${story.kids ? `${1 < story.kids.length ? `${story.kids.length} comments` : `${story.kids.length} comment`}` : "0 comments"}</small>
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
            <small class="text-muted mb-2"><i class="bi bi-calendar3"></i> ${date} <i class="bi bi-hand-thumbs-up"></i> ${1 < story.score ? `${story.score} points` : `${story.score} point`} <i class="bi bi-chat-left-text"></i> ${story.kids ? `${1 < story.kids.length ? `${story.kids.length} comments` : `${story.kids.length} comment`}` : "0 comments"}</small>
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
            <small class="text-muted mb-2"><i class="bi bi-calendar3"></i> ${date} <i class="bi bi-hand-thumbs-up"></i> ${1 < story.score ? `${story.score} points` : `${story.score} point`} <i class="bi bi-person"></i> ${story.by} <i class="bi bi-chat-left-text"></i> ${story.kids ? `${1 < story.kids.length ? `${story.kids.length} comments` : `${story.kids.length} comment`}` : "0 comments"}</small>
            ${story.text ? `<p>${story.text}</p>` : ""}
        </div>
    `;
}

if (searchParams.has("new")) {
    for (let i = 0; i < 30; i++) {
        getNewStories(i);
    }
} else if (searchParams.has("top")) {
    for (let i = 0; i < 30; i++) {
        getTopStories(i);
    }
} else if (searchParams.has("best")) {
    for (let i = 0; i < 30; i++) {
        getBestStories(i);
    }
 } else {
    window.location.replace("?new");
}