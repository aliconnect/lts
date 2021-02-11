<?php
$config = yaml_parse_file('tms.yaml');

// $hoortbij = json_decode(file_get_contents('old/hoortbij.json'), true);
// foreach ($hoortbij as $key => $val) {
//   if (strstr($key, 'cf_')) $val['type'] = 'Coordinerende functie';
//   if (strstr($key, 'bf_')) $val['type'] = 'Basisfunctie';
//   if (strstr($key, 'sf_')) $val['type'] = 'Subfunctie';
//   $key = str_replace(['cf_','bf_','sf_'],'',$key);
//   $key = str_replace('_'.$val['hoortbij'],'',$key);
//   $key = $val['hoortbij'].'_'.$key;
//   $tms[$key] = $val;
// }
// // die (json_encode(['ja'=>'ja']));
// // die('test: "sfgdfgsd"');
// die(yaml_emit($tms));
// // die();
// yaml_emit_file('tms_new.yaml', $tms);

foreach ($config['components']['schemas'] as $schemaName => $schema) {
  $code = '';
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
    $content = "(function(){ $const\nAIM.extend({\n\toperations:{ $operations\n\t\t\t}\n\t\t}\n\t}\n})()";
    // $content = "(function(){ $const\nAIM.extend({\n\tpaths: ".str_replace("\n","\n  ",str_replace("    ","  ",json_encode($paths, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT))).",\n\toperations:{ $operations\n\t\t\t}\n\t\t}\n\t}\n})()";
    file_put_contents("../lib/$schemaName.js",str_replace("\t","  ",$content));

    $md = "# $schemaName\n";
    file_put_contents($_SERVER['DOCUMENT_ROOT']."/sites/aliconnect/docs/index/2-Learn/6-Libraries/TMS/$schemaName.md",$md);

    echo "<a href='../lib/$schemaName.js' target='source'>$schemaName.js</a><br>";
  }
}
