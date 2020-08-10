<section class="content-teaser inner-bound">
	<div class="main-grid">
		<div class="divider">
			{IF({LAYOUTMODE})}
				{IMAGE:1:media}
				{IMAGE:2:media}
				{IMAGE:3:media}
			{ELSE}
				<figure class="divider__part figure">
					<img class="image" src="{IMAGESRC:1}" alt="">
				</figure>
				<figure class="divider__part figure">
					<img class="image" src="{IMAGESRC:2}" alt="">
				</figure>
				<figure class="divider__part figure">
					<img class="image" src="{IMAGESRC:3}" alt="">
				</figure>
			{ENDIF}
		</div>
		<article class="article">
			<h2 class="headline">{HEAD:1}</h2>
			<div class="copy-text">
				{HTML:1}
			</div>
		</article>
	</div>
</section>
