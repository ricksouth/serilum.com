<!DOCTYPE HTML>
<html>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1" /> 
	<meta name="identifier-url" content="https://serilum.com/" />
	<meta name="description" content="" />
	<meta name="keywords" content="serilum, minecraft, mods, overview, curseforge" />
	<meta name="author" content="Rick South" />
	<link rel="shortcut icon" href="/assets/images/favicon.ico" type="image/x-icon">
	<title>Serilum.com | Mods</title>
	<link rel="stylesheet" href="/assets/css/global.css">
	<link rel="stylesheet" href="/assets/css/mods.css">
</head>
<body>
	<div class="main">
		<div class="navigation noselect">
			<div class="inside">
				<div class="serilum" hidden>
					<a href="/"><img src="/assets/images/serilum.png"></a>
				</div>
				<ul>
					<li><a href="/">Home</a></li>
					<li><a href="/about">About</a></li>
					<li><a href="/mods">Mods</a></li>
					<li><a href="https://github.com/ricksouth/serilum-mc-mods/" target=_blank>Github</a></li>
					<li class="togglewrapper">
						<img class="fabric" src="/assets/images/fabric_tiny.png">
						<div class="toggle checkcross">
							<input id="checkcross" type="checkbox" checked>
							<label class="toggle-item" for="checkcross">
								<div class="check"></div>
							</label>
						</div>
						<img class="forge" src="/assets/images/forge_tiny.png">
					</li>
				</ul>
			</div>
		</div>
		<div class="modwrapper noselect" hidden>
			<div class="selectorwrapper">
				<div id="versionselector" class="dropdown-check-list" tabindex="100">
					<span class="anchor">Visible Versions</span>
					<ul class="items">
						<li>
							<input id="cb1_19" type="checkbox">
							<p id="cb1_19label">1.19</p>
						</li>
						<li>
							<input id="cb1_18" type="checkbox">
							<p id="cb1_18label">1.18</p>
						</li>
						<li>
							<input id="cb1_17" type="checkbox">
							<p id="cb1_17label">1.17</p>
						</li>
						<li>
							<input id="cb1_16" type="checkbox">
							<p id="cb1_16label">1.16</p>
						</li>
						<li>
							<input id="cb1_15" type="checkbox">
							<p id="cb1_15label">1.15</p>
						</li>
						<li>
							<input id="cb1_14" type="checkbox">
							<p id="cb1_14label">1.14</p>
						</li>
						<li>
							<input id="cb1_13" type="checkbox">
							<p id="cb1_13label">1.13</p>
						</li>
						<li>
							<input id="cb1_12" type="checkbox">
							<p id="cb1_12label">1.12</p>
						</li>
						<li>
							<input id="cb1_11" type="checkbox">
							<p id="cb1_11label">1.11</p>
						</li>
					</ul>
				</div>
			</div>
			<table class="modlist">
				<tr class="modheader">
					<th class="logo"></th>
					<th class="name">Name</th>
					<th class="description">Description</th>
					<th class="versions">Fabric Versions</th>
					<th class="versions">Forge Versions</th>
					<th class="dependencies">Dependencies</th>
				</tr>
			</table>
		</div>
		<div class="toasterwrapper"></div>
	</div>
</body>
	<script type="text/javascript" src="/assets/external/js/jquery-3.2.1.min.js"></script>
	<script type="text/javascript" src="/assets/external/js/js-cookie.js"></script>
	<script type="text/javascript" src="/assets/js/global.js"></script>
	<script type="text/javascript" src="/assets/js/mods.js"></script>
</html>