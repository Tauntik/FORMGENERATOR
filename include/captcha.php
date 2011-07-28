<?php
if (!isset($_SESSION)) session_start();
// Тип содержимого – картинка формата PNG 
header("Content-Type: image/png");
 
// создаем картинку размером 130X40
$img=imagecreatetruecolor(150, 50) or die('Cannot create image');
 
// заполняем фон картинки белым цветом
imagefill($img, 0, 0, 0xFFFFFF);

/*$fon = imagecolorallocate($img, 255, 255, 255);
$color = imagecolorallocate($img, 120, 120, 120);
imagefill($img, 0, 0, $color);*/
//imageellipse($img,rand(0,220),rand(0,50),rand(1,220),rand(1,50),0x000);
//imagearc($img, rand(0,220),rand(0,50),rand(1,220),rand(1,50),0,50,0x000);

// Черночки
for($i = 0; $i < 30; $i++) {
	$ink = imagecolorallocate($img, rand(0,255), rand(1,255), rand(1,255));
	$x = rand(1,149);
	$x2 = rand(1,149);
	$y = rand(1,49);
	$y2 = rand(1,49);
	//imageline($img, 0, $y, 219, $y,$ink);
	imageline($img, $x, $y, $x2, $y2,$ink);
}
/*
imagearc($img,20,rand(0,5),rand(1,220),50,rand(0,50),rand(50,100),0x000);
imagearc($img,50,rand(14,19),rand(1,220),50,rand(50,100),rand(0,50),0x000);
imagearc($img,rand(70,100),rand(20,25),rand(1,220),50,0,100,0x000);
*/

$x=0;
$i = 1;
$sum = "";
$fonts = array(
'../static/fonts/BIRCH_C.TTF', 
'../static/fonts/43131.TTF', 
'../static/fonts/43137.TTF', 
'../static/fonts/EASTSIDE.TTF',
'../static/fonts/OLGA_C.TTF', 
'../static/fonts//popone.ttf', 
'../static/fonts/VIKINGX3.TTF'
);
 
//$font = './BIRCH_C.TTF';

// выводим одну цифру за один проход цикла (всего 5-6 цифр)
$count_num = rand(3,4);
while ($i++ <= $count_num)
{
$font = $fonts[rand(0, sizeof($fonts)-1)];
   // выводим текст поверх картинки
   imagettftext(
   $img,          // идентификатор ресурса
   rand(24,28),   // размер шрифта в пикселях
   rand(-20,20),  // угол поворота текста
   $x=$x+30, 25+rand(0,10), // координаты (x,y), соответствующие левому нижнему
                            // углу первого символа
   imagecolorallocate($img, rand(0,128), rand(0,128), rand(0,128)), // цвет шрифта
   $font, // имя файла со шрифтом
   $rnd=rand(0,9)); // случайная цифра от 0 до 9
   // Собираем в одну строку все символы на картинке
   $random_string = $random_string.(string)$rnd;
   $array[] = $rnd;
}
	$_SESSION['random_string'] = $random_string;
 
//Не забудьте $sum записать в таблицу как STR1
 
// выводим готовую картинку в формате PNG
imagepng($img);
// освобождаем память, выделенную для картинки
imagedestroy($img);
