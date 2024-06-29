import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../feature/auth/presentation/screen/auth_screen.dart';

class AppRouter {
  static GoRouter router = GoRouter(
    initialLocation: '/auth',
    routes: [
      GoRoute(
        path: '/auth',
        pageBuilder: (context, state) => MaterialPage(
          key: state.pageKey,
          child: const AuthScreen(),
        ),
      ),
    ],
  );
}
