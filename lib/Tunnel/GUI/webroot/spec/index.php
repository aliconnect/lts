<?php
$path = $_SERVER['DOCUMENT_ROOT'].'/../node_modules/@aliconnect/sdk/api/tms';
if ($_GET['lib']) {
  $name = $_GET['lib'];
  $root = $path."/lib/".$name;
  $data = yaml_parse_file($root."/config.local.yaml");
  $data['ref'] = ["/api/tms/lib/$name/config.local.yaml"];

  $code = '';
  foreach ($data['components']['schemas'] as $schemaName => $schema) {
    if ($schema['operations']) {
      $paths=[];
      $operations = "
      /** @function AIM.operations.$schemaName
      * @constructor
      * @summary $schemaName
      * @description $schemaName object bla bla bla
      * @param *required* id Identifier of $schemaName
      */\n\t\t$schemaName: function(id) {\n\t\t\tconst $schemaName = AIM.ref[id];\n\t\t\treturn {";
      foreach ($schema['operations'] as $operationName => $operation) {
        $operations.="\n\n\t\t\t\t/** @function AIM.operations.$schemaName.$operationName";
        foreach (['stereotype','summary','description','bsttiName','bsttiNr','bsttiPath'] as $key) {
          if (empty($operation[$key])) continue;
          $value = wordwrap ($operation[$key],70,"\n\t\t\t\t\t* \t");
          $operations .= "\n\t\t\t\t\t* @$key $value";
        }
        $parstring = [];
        if (isset($operation['parameters'])) {
          foreach ($operation['parameters'] as $parameter) {
            $parstring[] = $parameter['name'];
            $operations .= "\n\t\t\t\t\t* @param ".implode(' ',[$parameter['name'],$parameter['description']]);
          }
        }
        $parstring = str_replace('id,','',implode(',',$parstring));
        $code .= $operation["js()"];
        $operations .= "\n\t\t\t\t\t*/\n\n\t\t\t\t$operationName($parstring) {\n\t\t\t\t\t".str_replace("\n","\n\t\t\t\t\t",trim($operation["js()"]))."\n\t\t\t\t},";
        $paths["/$schemaName(id)/$operationName($parstring)"]=[
          "operationId"=>"$schemaName(id).$operationName($parstring)",
          "parameters"=>$operation['parameters'],
        ];
      }
      preg_match_all ('/\b[A-Z]+\b/', $code, $matches);
      $const = "";
      if ($matches[0]) {
        // var_dump(array_unique ($matches[0]));
        foreach (array_unique ($matches[0]) as $key) {
          $const .= "\nconst $key = '".strtolower($key)."';";
        }
      }
      // fprint($matches);
      $content .= "(function(){ $const\nAIM.extend({\n\toperations:{ $operations\n\t\t\t}\n\t\t}\n\t}\n})()";
      // $content = "(function(){ $const\nAIM.extend({\n\tpaths: ".str_replace("\n","\n  ",str_replace("    ","  ",json_encode($paths, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT))).",\n\toperations:{ $operations\n\t\t\t}\n\t\t}\n\t}\n})()";

      // $md = "# $schemaName\n";
      // file_put_contents($_SERVER['DOCUMENT_ROOT']."/sites/aliconnect/docs/index/2-Learn/6-Libraries/TMS/$schemaName.md",$md);

      // echo "<a href='../lib/$schemaName.js' target='source'>$schemaName.js</a><br>";
    }
  }
  file_put_contents($root."/js/control.js",str_replace("\t","  ",$content));

  $refs = [
    'index.js',
    'js/control.js',
    'js/hmi.js',
    'css/hmi.css',
  ];
  foreach($refs as $filename) {
    if (is_file($fname = $root."/".$filename)) {
      $data['ref'][] = "/api/tms/lib/$name/$filename";//file_get_contents($fname);
    }
  }
} else {
  $files = array_values(array_filter(scandir($path.'/lib'), function($file){return $file[0]!=='.';}));
  foreach($files as $key) {
    echo "<li><a target='doc' href='?lib=$key'>$key</a></li>";
    // $val = yaml_parse_file($path."/lib/$key/config.local.yaml");
    // // $val = ['components'=>['schemas'=>$val]];
    // // yaml_emit_file($path."/lib/$key/config.local.yaml", $val);
    // // $val = [$key => $val];
    // // die($key);
    // // die(json_encode($val));
    // // mkdir($path."/schemas/$key", 0777, true);
    // // yaml_emit_file($path."/schemas/$filename", $val);
    // $tms = array_replace_recursive($tms,$val);
  }
  die();
}
readfile('index.html');
echo "<script>data=".json_encode($data)."</script>";
