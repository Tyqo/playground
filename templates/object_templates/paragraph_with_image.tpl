<section class="inner-bound">
	<div class="main-grid p-with-image">
		{IF({LAYOUTMODE})}
			{IMAGE:1:media}
		{ELSE}
			<figure class="figure">
				<img class="image" src="{IMAGESRC:1}" alt="">
			</figure>
		{ENDIF}
		<article class="article">
			<h1 class="headline">{HEAD:1}</h1>
			<div class="copy-text">
				{TEXT:1}
			</div>
		</article>
	</div>
</section>