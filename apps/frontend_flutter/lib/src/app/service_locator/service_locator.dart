import 'package:appwrite/appwrite.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:get_it/get_it.dart';

import '../../../firebase_options.dart';

var sl = GetIt.instance;

Future<void> serviceLocator() async {
  await _initAppwrite();
}

Future<void> _initAppwrite() async {
  Client client = Client();
  client
      .setEndpoint('https://cloud.appwrite.io/v1')
      .setProject('6680736300121d58b7e8')
      .setSelfSigned(status: true);

  sl.registerSingleton(client);
}

Future<void> _initFirebase() async {
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
}
