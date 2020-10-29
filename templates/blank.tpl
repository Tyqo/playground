<!DOCTYPE html>
<html lang="{LANG}">
	{INCLUDE:PATHTOWEBROOT.'templates/partials/head.tpl'}
	<body>
		<main id="main" role="main" class="main-content">
			{LOOP CONTENT(1)}{ENDLOOP CONTENT}
		</main>
		{LAYOUTMODE_ENDSCRIPT}
	</body>
</html>