<section class="slider">
	
	{IF (!{ISSET:categoryId})}
		<h1>Slider Kategory</h1>
		<select class="cmt-slect-gallery" name="">
			<option value="0">--- Galerie wählen ---</option>
			{LOOP VAR(categories)}
				<option value="{VAR:id}">{VAR:gallery_category_title} ({VAR:imagesInCategory} Bilder)</option>
			{ENDLOOP VAR}
		</select>

		<script type="text/javascript">
			$(document).ready(function() {
				$('.cmt-element-head-1').each(function(index) {
					var cmtObject = $(this).parents('.cmt-object').attr('data-cmt-object-id');
					$('[data-cmt-object-id='+ cmtObject +'] .cmt-slect-gallery').val($(this).html());
				});
			});
			

			$('.cmt-slect-gallery').on('change', function(event) {
				var gallery = $(this).val();
				var cmtObject = $(this).parents('.cmt-object').attr('data-cmt-object-id');
				var head = $('[data-cmt-object-id='+ cmtObject +'] .cmt-element-head-1').html(gallery);
				console.log(gallery);
			});
		</script>
	{ELSE}
		
		<div class="slider__wrapper">
			{LOOP VAR(images)}
			<figure class="slider__figure figure">
				<img class="slider__image image" src="/{VAR:imagePath}{VAR:gallery_image_internal_filename}" alt="{VAR:gallery_image_title}">
				<figcaption class="slider__caption">
					<div class="slider__article inner-bound">
						<h2>{VAR:gallery_image_title}</h2>
						<p>{VAR:gallery_image_description}</p>
					</div>
				</figcaption>
			</figure>
			{ENDLOOP VAR}
		</div>
		
	{ENDIF}
</section>