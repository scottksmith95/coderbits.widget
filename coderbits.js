;(function(window, document, undefined) {
	"use strict";

	var addCommas = function(nStr) {
		nStr += '';
		var x = nStr.split('.');
		var x1 = x[0];
		var x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		return x1 + x2;
	};

	var buildSummary = function(data) {
		var content = '';
			content += '<div id="coderbits-summary">';
			content += '<div id="coderbits-avatar">';
			content += '<a href="' + data.link + '" target="_parent">';
			content += '<img alt="' + data.name + '" class="avatar" src="https://secure.gravatar.com/avatar/' + data.gravatar_hash + '?d=https%3A%2F%2Fcoderbits.com%2Fimages%2Fgravatar.png&r=PG&s=48">';
			content += '</a>';
			content += '</div>';
			content += '<div id="coderbits-overview">';
			content += '<h1>';
			content += '<a href="' + data.link + '" target="_parent" title="' + data.name + '">' + data.name + '</a>';
			content += '</h1>';
			content += '<p>';
			content += '<span>' + data.title + '</span>';
			content += '</p>';
			content += '</div>';
			content += '</div>';
		return content;
	};

	var buildSkills = function(data) {
		var content = '', items;
			content += '<div id="coderbits-skills">';
			if(data.top_skills.length > 0) {
				content += '<h2>Top Skills</h2>';
				items = data.top_skills;
			} else if(data.top_interests.length > 0) {
				content += '<h2>Top Interests</h2>';
				items = data.top_interests;
			} else if(data.top_traits.length > 0) {
				content += '<h2>Top Traits</h2>';
				items = data.top_traits;
			} else if(data.top_areas.length > 0) {
				content += '<h2>Top Areas</h2>';
				items = data.top_areas;
			} else {
				return '';
			}
			content += '<p>';
			for(var i = 0; i < items.length; i++) {
				content += items[i].name;
				if(i < items.length - 1) {
					content += ', ';
				}
			}
			content += '</p>';
			content += '</div>';
		return content;
	};

	var buildStats = function(data) {
		var total = 0;
		for(var i = 0; i < data.badges.length; i++) {
			if(data.badges[i].earned) {
				total++
			}
		}
		var content = '';
			content += '<div id="coderbits-stats">';
			content += '<ul id="coderbits-stats-list">';
			content += '<li>';
			content += '<p>';
			content += '<strong>' + addCommas(total) + '</strong>';
			content += '<span> badges</span>';
			content += '</p>';
			content += '<p>';
			content += '<strong>' + addCommas(data.follower_count) + '</strong>';
			content += '<span> followers</span>';
			content += '</p>';
			content += '</li>';
			content += '<li class="last">';
			content += '<p>';
			content += '<strong>' + addCommas(data.views) + '</strong>';
			content += '<span> views</span>';
			content += '</p>';
			content += '<p>';
			content += '<strong>' + addCommas(data.following_count) + '</strong>';
			content += '<span> friends</span>';
			content += '</p>';
			content += '</li>';
			content += '</ul>';
			content += '</div>';
		return content;
	};

	var buildBadges = function(data) {
		var content = '', count = 0, total = 0;
			content += '<div id="coderbits-awards">';
			content += '<p id="coderbits-badges">'

		for(var i = 0; i < data.badges.length; i++) {
			var badge = data.badges[i];
			if(badge.earned) {
				total++
				if(count < 11 && badge.level === 1) {
					content += '<img src="' + badge.image_link + '" title="' + badge.name + ' - ' + badge.description + '" alt="' + badge.level + ' bit ' + badge.name + ' - ' + badge.description + '">';
					count++
				}
			}
		}

		content += '<a href="' + data.link + '/badges">view all ' + total + '</a>';
		content += '</p>';
		content += '</div>';

		return content;
	};

	var request = function(url) {
		var script = document.getElementsByTagName("script")[0];
		var handler = document.createElement("script");
			handler.src = url;
		script.parentNode.insertBefore(handler, script);
	};

	var global = "coderbits", element = document.getElementById(global);
	if(element) {
		window[global] = function(data) {
			var content = '';
				content += buildSummary(data);
				content += buildSkills(data);
				content += buildStats(data);
				content += buildBadges(data);
			document.getElementById(global).innerHTML = content;
			delete window[global];
		};
		var username = element.getAttribute("data-coderbits-username");
		request("https://coderbits.com/" + username + ".json?callback=" + global);
	}
})(window, document);
