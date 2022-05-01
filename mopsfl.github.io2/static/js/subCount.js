const request = new Request('https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCtJTqwX2h8MiuFWd6dsyzbw&key=AIzaSyAaMq2jR4LbDCatMrmhh5dcsx0Ae60MGOc')

function fetchStatistics() {
    fetch(request)
        .then(res => res.json())
        .then(data => {
            const statistics = data.items[0].statistics
            console.log(statistics)
            $(".subCount").text("Subscriber: " + statistics.subscriberCount)
            $(".viewCount").text("Views: " + statistics.viewCount)
            $(".vidCount").text("Videos: " + statistics.videoCount)
        })
        .catch(err => console.error(err))
}

function init() {
    fetchStatistics()

    setInterval(fetchStatistics, 60000)
}