<!DOCTYPE html>
<html lang="{LANG}">
	{INCLUDE:PATHTOWEBROOT.'templates/partials/head.tpl'}
	
	<body>
		<a class="visualy-hidden" href="#main">zum Inhalt</a>
		{INCLUDE:PATHTOWEBROOT.'templates/partials/header.tpl'}
		
		<main id="main" role="main" class="main-content">
			{LOOP CONTENT(1)}{ENDLOOP CONTENT}
		</main>
		
		{INCLUDE:PATHTOWEBROOT.'templates/partials/footer.tpl'}
		{LAYOUTMODE_ENDSCRIPT}
	</body>
</html>