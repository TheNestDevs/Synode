import 'package:flutter/material.dart';

import 'src/app/app.dart';
import 'src/app/service_locator/service_locator.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await serviceLocator();
  runApp(const MyApp());
}
