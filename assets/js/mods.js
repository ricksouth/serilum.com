var versionurlsuffix = { "1.19" : "3A73407", "1.18" : "3A73250", "1.17" : "3A73242", "1.16" : "3A70886", "1.15" : "3A68722", "1.14" : "3A64806", "1.13" : "3A55023", "1.12" : "3A628", "1.11" : "3A599", "1.7" : "3A5"}
var defaultenabled = ["1_19", "1_18", "1_16", "1_12"];
var ignoredversions = ["1.17", "1.15", "1.14", "1.13", "1.11", "1.7"]
var logofiletypes = {}

$(document).ready(function(e) { 
	console.log("Loading https://serilum.com/mods")

	setVersionSelector();
	loadModData();

	checkForChangelogParameter();
});

function setVersionSelector() {
	var checkList = document.getElementById('versionselector');
	checkList.getElementsByClassName('anchor')[0].onclick = function(evt) {
		if (checkList.classList.contains('visible')) {
			checkList.classList.remove('visible');
		}
		else {
			checkList.classList.add('visible');
		}
	}

	for (const version of defaultenabled) {
		$("#cb" + version).prop('checked', 'true')
	}
}

function loadModData() {
	preloadImage("/assets/images/changelog.png");
	for (var version in versionurlsuffix) {
		preloadImage("/assets/data/logo/" + version.replace(".", "_") + ".png");
	}

	$.ajax({
		url: "/assets/data/mod_data.json",
		type: "GET",
		dataType: 'json',
		success: function(data){
			var modlistcontent = '<tr class="modheader">';
			modlistcontent += '	<th class="logo"></th>';
			modlistcontent += '	<th class="name">Name</th>';
			modlistcontent += '	<th class="description">Description</th>';
			modlistcontent += '	<th class="changelog">Changelog</th>';
			modlistcontent += '	<th class="versions">Fabric</th>';
			modlistcontent += '	<th class="versions">Forge</th>';
			modlistcontent += '	<th class="dependencies">Dependencies</th>';
			modlistcontent += '</tr>';

			var ishidden = "";
			for (const [modname, moddata] of Object.entries(data)) {
				if (!moddata["published"]) {
					continue;
				}

				var packageid = modname.replaceAll(" ", "-").replace("'", "").toLowerCase();
				var imagename = packageid + moddata["logo_file_type"];
				logofiletypes[packageid] = moddata["logo_file_type"]

				preloadImage("/assets/data/logo/" + imagename);

				var hasfabric = moddata["fabric_versions"].length > 0;
				var hasforge = moddata["forge_versions"].length > 0;

				var extrarowclasses = "";
				if (hasfabric) {
					extrarowclasses += " hasfabric"
				}
				if (hasforge) {
					extrarowclasses += " hasforge"
				}

				modrowcontent = '<tr class="modrow' + extrarowclasses + '">';
				modrowcontent += '	<td class="logo"><img src="/assets/data/logo/' + imagename + '"></a></td>';
				modrowcontent += '	<td class="name">' + modname + '</a></td>';
				modrowcontent += '	<td class="description">' + moddata["description"] + '</td>';

				modrowcontent += '	<td class="changelog"><a href="#changelog"><img class="climage" src="/assets/images/changelog.png" value="' + packageid + '"></a></td>';

				modrowcontent += '	<td class="versions fabricver">';
				for (const fabric_version of moddata["fabric_versions"]) {
					ishidden = "";
					if (ignoredversions.includes(fabric_version)) {
						ishidden = " hidden";
					}

					modrowcontent += '<a class="v' + fabric_version.replace(".", "_") + '" href="' + moddata["fabric_url"] + '/files/all?filter-status=1&filter-game-version=1738749986%' + versionurlsuffix[fabric_version] + '" target=_blank' + ishidden + '><img src="/assets/images/versions/' + fabric_version.replaceAll(".", "_") + '.png"></a>';
				}
				modrowcontent += '</td>';

				modrowcontent += '	<td class="versions forgever">';
				for (const forge_version of moddata["forge_versions"]) {
					ishidden = "";
					if (ignoredversions.includes(forge_version)) {
						ishidden = " hidden";
					}

					modrowcontent += '<a class="v' + forge_version.replace(".", "_") + '" href="' + moddata["forge_url"] + '/files/all?filter-status=1&filter-game-version=1738749986%' + versionurlsuffix[forge_version] + '" target=_blank' + ishidden + '><img src="/assets/images/versions/' + forge_version.replaceAll(".", "_") + '.png"></a>';
				}
				modrowcontent += '</td>';

				modrowcontent += '	<td class="dependencies">';
				for (const dependency of moddata["dependencies"]) {
					ishidden = "";
					var depurlsuffix = "";
					if ($("body").hasClass("defaultfabric") && dependency == "collective") {
						depurlsuffix = "-fabric";

						if (!hasfabric) {
							ishidden = " hidden";
						}
					}

					modrowcontent += '<a class="dependency_' + dependency + '" href="https://curseforge.com/minecraft/mc-mods/' + dependency + depurlsuffix + '" target=_blank' + ishidden + '><img src="/assets/data/logo/' + dependency + '.png"></a>';
				}
				if (hasfabric) {
					ishidden = "";
					if ($("body").hasClass("defaultforge")) {
						ishidden = " hidden"
					}

					modrowcontent += '<a class="dependency_fabricapi" href="https://curseforge.com/minecraft/mc-mods/fabric-api" target=_blank' + ishidden + '><img src="/assets/data/logo/fabric-api.png"></a>';
				}
				modrowcontent += '</td>';

				modrowcontent += '</tr>';

				modlistcontent += modrowcontent;
			}

			$("table.modlist").html(modlistcontent);

			$(".modwrapper").delay(300).fadeIn(500);
		},
		error: function(data) { }
	});
}

function checkForChangelogParameter() {
	var url = document.URL;

	if (url.includes("?changelog=")) {
		var mod = url.split("?changelog=")[1];

		setChangelog(mod);
	}
}

function setChangelog(mod) {
	console.log("Setting changelog for " + mod + ".")

	$("body").addClass("prompt");

	$.ajax({
		url: "https://raw.githubusercontent.com/ricksouth/serilum-mc-mods/master/changelog/" + mod + ".txt",
		type: "GET",
		dataType: 'text',
		success: function(data){
			var content = wrapURL(data.replaceAll("\n", "<br>"), true);

			if (logofiletypes[mod] == undefined) {
				$.get("https://serilum.com/assets/data/logo/" + mod + ".png")
					.done(function() { 
						content = '<img src="/assets/data/logo/' + mod + '.png"><br><br>' + content;
						setRestChangelog(mod, content);
					}).fail(function() {
						console.log("Mod data not loaded yet and mod image is not a png.");
						console.log("Expect a 404 Not Found error in the console.");
						console.log("Don't worry. All is well!");

						content = '<img src="/assets/data/logo/' + mod + '.gif"><br><br>' + content;
						setRestChangelog(mod, content);
				})

				return;
			}

			content = '<img src="/assets/data/logo/' + mod + logofiletypes[mod] + '"><br><br>' + content;
			setRestChangelog(mod, content);
		},
		error: function(data) {
			closeChangelog();
			console.log("Mod " + mod + " not found.");
		}
	});
}

function setRestChangelog(mod, content) {
	$(".changelogwrapper .changelogcontent").html(content);
	$('.changelogwrapper .changelogcontent').scrollTop(0);

	$(".changelogwrapper").fadeIn(100);

	if (window.history.replaceState) {
		window.history.replaceState("mods", "Serilum.com | Mods", "/mods?changelog=" + mod);
	}
}

$(document).on('mouseup', 'a', function(e) {
	if (!(e.which === 1)) {
		return;
	}

	e.stopImmediatePropagation();
});

$(document).on('mouseup', '.modrow', function(e) {
	if (!(e.which === 1)) {
		return;
	}

	var modrow = $(this);
	var modname = modrow.children('.name').html();

	var urlsuffix = "";
	var forgedefault = $(".navigation .toggle input").is(":checked");
	if (!forgedefault) {
		urlsuffix = "-fabric";

		if (modname == "GUI Clock" || modname == "GUI Compass" || modname == "Villager Names") {
			urlsuffix += "-version";
		}
	}

	if (forgedefault) {
		var forgeversions = modrow.children('.forgever').html();
		if (forgeversions == "") {
			return;
		}
	}
	else {
		var fabricversions = modrow.children('.fabricver').html();
		if (fabricversions == "") {
			return;
		}
	}
	
	window.open("https://curseforge.com/minecraft/mc-mods/" + modname.replaceAll(" ", "-").toLowerCase() + urlsuffix, '_blank').focus();
});

$("#versionselector input").change(function() {
	var version = $(this).attr('id').replace("cb", "");

	if ($(this).is(":checked")) {
		$(".v" + version).show();
	}
	else {
		$(".v" + version).hide();	
	}
});
$(document).on('mouseup', '#versionselector .items p', function(e) {
	if (!(e.which === 1)) {
		return;
	}

	var id = $(this).attr('id');
	$("#" + id.replace("label", "")).click();
});

$(document).on('mouseup', '.climage', function(e) {
	if (!(e.which === 1)) {
		return;
	}

	var mod = $(this).attr('value');
	setChangelog(mod);
});

$(document).on('mouseup', '.changelogwrapper .insidechangelog .closewrapper p', function(e) {
	closeChangelog();
});
$(document).on('mouseup', '.changelogwrapper', function(e) {
	if (e.target == this) {
		closeChangelog();
	}
});
$(document).on('keyup', function(e) {
	if (e.key == "Escape") {
		if ($(".changelogwrapper").is(":visible")) {
			closeChangelog();
		}
	}
});

function closeChangelog() {
	$(".changelogwrapper").hide();
	$("body").removeClass("prompt");

	if (window.history.replaceState) {
		window.history.replaceState("mods", "Serilum.com | Mods", "/mods");
	}
}

function preloadImage(url) {
	var img = new Image();
	img.src = url;
}

function wrapURL(text) {
	let urlPattern = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\z`!()\[\]{};:'".,<>?????????????????]))/ig;

	let result = text.replace(urlPattern, function(url){
		return `<a href="${url.trim()}" target=_blank>${url.trim()}</a>`;
	});

	return result;
}