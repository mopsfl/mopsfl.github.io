const apiKey = 'ndWVoh3UCxmayEjeIRHVXF2Zt1Ca5IUMGZWSrtEZvdkQ5NVY6lUQ', channelID = 'UCtJTqwX2h8MiuFWd6dsyzbw', statistics = new Request(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${ channelID }&key=${ atob(apiKey.split('').reverse().join('')) }`), snippet = new Request(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${ channelID }&key=${ atob(apiKey.split('').reverse().join('')) }`), streams = new Request(`https://www.googleapis.com/youtube/v3/search?type=video&eventType=live&part=snippet&channelId=${ channelID }&key=${ atob(apiKey.split('').reverse().join('')) }`), debug = !0;
let $_ = !0, channelName = '';
const messages = {
	'1mil': '\uD83C\uDF89 CSYON hat 1.000.000 Abbonenten erreicht. \uD83C\uDF89',
	live: '\uD83D\uDD34 CSYON ist live! \uD83D\uDD34'
};
function htmlDecode(e) {
	return new DOMParser().parseFromString(e, 'text/html').documentElement.textContent;
}
function fetchAll(e) {
	!0 === e && ($('.fa-refresh').toggleClass('fa-spin'), setTimeout(() => {
		$('.fa-refresh').toggleClass('fa-spin');
	}, 1000));
	const t = Date.now();
	if ($_ && t - $_ < 50000)
		return console.warn('Fetching too fast');
	console.warn('Fetched at ' + t), $('._ld').show(), $('.section-main').hide(), fetch(statistics).then(e => e.json()).then(e => {
		const t = e.items[0].statistics;
		console.log(e), $('.subCount').text('Subscriber: ' + t.subscriberCount), $('.viewCount').text('Views: ' + t.viewCount), $('.vidCount').text('Videos: ' + t.videoCount), $('._ld').hide(), $('.news').hide(), $('._l').hide(), $('.section-main').show(), t.subscriberCount >= 1000000 && !(t.subscriberCount > 1000000) && ($('.news').text(messages['1mil']), $('.news').show());
	}).catch(e => {
		$('._ld').hide(), $('._l').show(), $('.section-main').hide(), console.error(e);
	}), fetch(snippet).then(e => e.json()).then(e => {
		const t = e.items[0].snippet;
		channelName = t.title, console.log(e), $('.channelThumbnail').attr('src', t.thumbnails.high.url), $('.channelName').text(t.title);
	}).catch(e => {
		$('._ld').hide(), $('._l').show(), $('.section-main').hide(), console.error(e);
	}), fetch(streams).then(e => e.json()).then(e => {
		console.log(e), e.items.length > 0 ? (console.log(e.items), $('.livestream').show(), $('.livestreamLink').attr('href', 'https://www.youtube.com/watch?v=' + e.items[0].id.videoId), $('.livestreamTitle').text(`Livestream: ${ htmlDecode(`${ e.items[0].snippet.title }`) }`), $('.livestreamThumbnail').attr('src', e.items[0].snippet.thumbnails.high.url), $('.news').text(messages.live), $('.news').show()) : console.warn('CSYON not live');
	}).catch(e => {
		$('._ld').hide(), $('._l').show(), $('.section-main').hide(), console.error(e);
	}), $_ = t;
}
function init() {
	$('._ld').show(), setTimeout(fetchAll, 500), $('.title').click(() => {
		window.open('https://www.youtube.com/channel/UCtJTqwX2h8MiuFWd6dsyzbw', '_blank');
	}), $('.csyon-refresh').click(() => {
		fetchAll(!0);
	}), particlesJS('particles-js', {
		particles: {
			number: {
				value: 100,
				density: {
					enable: !0,
					value_area: 800
				}
			},
			color: { value: '#ffffff' },
			shape: {
				type: 'circle',
				stroke: {
					width: 0,
					color: '#000000'
				},
				polygon: { nb_sides: 5 },
				image: {
					src: 'img/github.svg',
					width: 100,
					height: 100
				}
			},
			opacity: {
				value: 0.5,
				random: !1,
				anim: {
					enable: !1,
					speed: 1,
					opacity_min: 0.1,
					sync: !1
				}
			},
			size: {
				value: 3,
				random: !0,
				anim: {
					enable: !1,
					speed: 40,
					size_min: 0.1,
					sync: !1
				}
			},
			line_linked: {
				enable: !1,
				distance: 30,
				color: '#ffffff',
				opacity: 0.4,
				width: 1
			},
			move: {
				enable: !0,
				speed: 2,
				direction: 'none',
				random: !1,
				straight: !1,
				out_mode: 'out',
				bounce: !1,
				attract: {
					enable: !1,
					rotateX: 600,
					rotateY: 1200
				}
			}
		},
		interactivity: {
			detect_on: 'window',
			events: {
				onhover: {
					enable: !0,
					mode: 'grab'
				},
				onclick: {
					enable: !0,
					mode: 'repulse'
				},
				resize: !0
			},
			modes: {
				grab: {
					distance: 100,
					line_linked: { opacity: 0.8 }
				},
				bubble: {
					distance: 400,
					size: 40,
					duration: 2,
					opacity: 8,
					speed: 3
				},
				repulse: {
					distance: 150,
					duration: 0.1
				},
				push: { particles_nb: 4 },
				remove: { particles_nb: 2 }
			}
		},
		retina_detect: !0
	});
}
