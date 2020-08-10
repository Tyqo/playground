<?php
namespace BKA;

use \Contentomat\PsrAutoloader;
use \Contentomat\Controller;
use \Contentomat\Gallery\Gallery;


class GalleryController extends Controller {

  /**
  * @var \Contentomat\Gallery
  *
  **/
  protected $Gallery;


  public function init() {
		$this->Gallery = new Gallery();
    $this->templatesPath = PATHTOWEBROOT.'templates/gallery/';
    $this->imagePath = PATHTOWEBROOT.'media/gallery/';
		$this->categories = $this->Gallery->getCategories();
  }

  public function actionDefault() {
		if ($this->cmt != null) {
			$contentData = $this->cmt->getVar('cmtContentData');
			$categoryId = $contentData['head1'];
			$this->parser->setParserVar('categoryId', $categoryId);
			
			$images = $this->Gallery->getImagesInCategory($categoryId);
			$this->parser->setParserVar('images', $images);
			$this->parser->setParserVar('imagePath', $this->imagePath);
			
		}


		$this->parser->setParserVar('categories', $this->categories);
    $this->content = $this->parser->parseTemplate($this->templatesPath.'slider.tpl');
  }
}

$autoload = new PsrAutoloader();
$autoload->addNamespace('Contentomat', INCLUDEPATHTOADMIN.'classes');
$autoload->addNamespace('Contentomat\Gallery', INCLUDEPATHTOADMIN.'classes/app_gallery');
$autoload->addNamespace('BKA', PATHTOWEBROOT.'phpincludes/classes');
$ctl = new GalleryController();
$content = $ctl->work();
?>
