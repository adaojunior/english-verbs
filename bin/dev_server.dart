library english_verbs.dev_server;

import 'package:pub_serve_rewrites/rewrites.dart';

main() {
  server()
    ..ignoreAll([r'^(\S+\.(json|html|js|dart|css|png))$',])
    ..rewrite(r'(.*)', to: '/index.html')
    ..start('http://localhost:8080');
}
