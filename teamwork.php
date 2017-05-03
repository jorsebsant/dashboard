<?php

class Teamwork{
	
	private static $key="udder452cache";				
	private static $company = "coloralcuadrado";
	
	public $companies;

	public function __construct(){
		$this->companies = [];
	}

	public function index(){

		$this->getCompanies();
		$this->getProyectsPerCompany();

	}

	private function curlApi($action){

		$channel = curl_init();	

		curl_setopt( $channel, CURLOPT_URL, "https://". self::$company .".teamwork.com/". $action );
		curl_setopt( $channel, CURLOPT_RETURNTRANSFER, 1 ); 				
		curl_setopt( $channel, CURLOPT_HTTPHEADER, 
		    array( "Authorization: BASIC ". base64_encode( self::$key .":udder452cache" ))
		);
		curl_setopt($channel, CURLOPT_ENCODING, '');	

		$json = curl_exec ( $channel );	
		$obj = json_decode($json, true );			
		curl_close ( $channel );

		return $obj;
	}

	public function getCompanies(){	
		$action = "companies.json";
		$companies = $this->curlApi($action)["companies"];
		$this->companies = $companies;
		return $companies;
	}

	private function getProyectsPerCompany(){
		$projects = [];
		foreach ($this->companies as $key => $company) {
			$action = "companies/{$company['id']}/projects.json";
			$projects[$company['id']] = $this->curlApi($action)["projects"];
		}
		echo json_encode($projects);
	}

	private function getTasksListPerProyect(){

		$action="companies/projects.json";

		$json=$this->curlApi($action);

		$projects=array();

		foreach ($json['projects'] as $key => $value) {
			if($value['name']!='BLOG VIRTUAL'){
				$projects[$value['id']]=$value['name'];
			}
			
		}
		return $projects;

	}

	private function taskPerProject($projects){
		$result=array();
		foreach ($projects as $key => $value) {
			$action="projects/$key/tasks.json";
			$tasks=$this->curlApi($action);
			$result=array_merge($tasks['todo-items'],$result);
		}

		return $result;
		
	}

	public function getProjectNames(){
		$projects=$this->getCompanyProjects();
		echo json_encode($projects);
	}


}
?>