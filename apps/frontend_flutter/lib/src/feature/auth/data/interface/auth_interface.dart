import 'package:firebase_auth/firebase_auth.dart';

import '../../../../app/failure/failure.dart';

abstract class IAuth {
  Future<(UserCredential?, Failure?)> googleSignIn();

  Future<void> signOut();
}
