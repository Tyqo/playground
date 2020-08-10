<section class="content-breaker">
	<div class="inner-bound main-grid">
		<article class="article">
			<h2 class="headline">{HEAD:1}</h2>
			<div class="copy-text">
				{HTML:1}
			</div>
		</article>
		{IF({LAYOUTMODE})}
			{IMAGE:1:media}
		{ELSE}
			<figure class="figure">
				<img class="image" src="{IMAGESRC:1}" alt="">
			</figure>
		{ENDIF}
	</div>
</section>
