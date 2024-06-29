import 'package:dartz/dartz.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

import '../../../../app/error/failure.dart';

abstract class IAuth {
  Future<Either<AuthResponse, Failure>> signUp({
    required String username,
    required String email,
    required String password,
  });

  Future<Either<AuthResponse, Failure>> signIn({
    required String email,
    required String password,
  });

  Either<User, Failure> getCurrentUser();

  Either<Session, Failure> getCurrentSession();
}
