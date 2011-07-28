<?php
if (!isset($_SESSION)) session_start();
// ��� ����������� � �������� ������� PNG 
header("Content-Type: image/png");
 
// ������� �������� �������� 130X40
$img=imagecreatetruecolor(150, 50) or die('Cannot create image');
 
// ��������� ��� �������� ����� ������
imagefill($img, 0, 0, 0xFFFFFF);

/*$fon = imagecolorallocate($img, 255, 255, 255);
$color = imagecolorallocate($img, 120, 120, 120);
imagefill($img, 0, 0, $color);*/
//imageellipse($img,rand(0,220),rand(0,50),rand(1,220),rand(1,50),0x000);
//imagearc($img, rand(0,220),rand(0,50),rand(1,220),rand(1,50),0,50,0x000);

// ��������
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

// ������� ���� ����� �� ���� ������ ����� (����� 5-6 ����)
$count_num = rand(3,4);
while ($i++ <= $count_num)
{
$font = $fonts[rand(0, sizeof($fonts)-1)];
   // ������� ����� ������ ��������
   imagettftext(
   $img,          // ������������� �������
   rand(24,28),   // ������ ������ � ��������
   rand(-20,20),  // ���� �������� ������
   $x=$x+30, 25+rand(0,10), // ���������� (x,y), ��������������� ������ �������
                            // ���� ������� �������
   imagecolorallocate($img, rand(0,128), rand(0,128), rand(0,128)), // ���� ������
   $font, // ��� ����� �� �������
   $rnd=rand(0,9)); // ��������� ����� �� 0 �� 9
   // �������� � ���� ������ ��� ������� �� ��������
   $random_string = $random_string.(string)$rnd;
   $array[] = $rnd;
}
	$_SESSION['random_string'] = $random_string;
 
//�� �������� $sum �������� � ������� ��� STR1
 
// ������� ������� �������� � ������� PNG
imagepng($img);
// ����������� ������, ���������� ��� ��������
imagedestroy($img);
