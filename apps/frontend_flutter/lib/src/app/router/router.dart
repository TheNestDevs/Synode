import 'package:flutter/material.dart';
import 'package:frontend_flutter/src/feature/home/presentation/screens/widgets/send_screen.dart';
import 'package:go_router/go_router.dart';

import '../../feature/auth/presentation/auth_screen.dart';
import '../../feature/home/presentation/screens/home_screen.dart';
import '../../feature/home/presentation/screens/widgets/qr_code_screen.dart';
import '../service_locator/service_locator.dart';
import '../service_locator/supabase_service.dart';

class AppRouter {
  static GoRouter router = GoRouter(
    initialLocation: sl<SupabaseService>().client.auth.currentSession != null
        ? "/"
        : "/auth",
    routes: [
      GoRoute(
        path: '/auth',
        pageBuilder: (context, state) => MaterialPage(
          key: state.pageKey,
          child: const LoginScreen(),
        ),
      ),
      GoRoute(
        path: '/',
        pageBuilder: (context, state) => MaterialPage(
          key: state.pageKey,
          child: const HomeScreen(),
        ),
      ),
      GoRoute(
        path: '/scan-qr',
        pageBuilder: (context, state) => MaterialPage(
          key: state.pageKey,
          child: const QrCodeScreen(),
        ),
      ),
      GoRoute(
        path: '/send',
        pageBuilder: (context, state) => MaterialPage(
          key: state.pageKey,
          child: const SendScreen(),
        ),
      ),
    ],
  );
}
