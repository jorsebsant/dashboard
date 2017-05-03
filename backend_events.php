<?php
require_once '_db.php';

$json = file_get_contents('php://input');
$params = json_decode($json);
    
$stmt = $db->prepare('SELECT * FROM [events] WHERE NOT ((end <= :start) OR (start >= :end))');
$stmt->bindParam(':start', $params->start);
$stmt->bindParam(':end', $params->end);
$stmt->execute();
$result = $stmt->fetchAll();

class Event {}
$events = array();

foreach($result as $row) {
  $e = new Event();
  $e->id = $row['id'];
  $e->text = $row['name'];
  $e->start = $row['start'];
  $e->end = $row['end'];
  $e->resource = $row['resource_id'];
  $events[] = $e;
}

header('Content-Type: application/json');
echo json_encode($events);

?>
