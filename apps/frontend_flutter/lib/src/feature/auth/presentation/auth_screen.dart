import 'package:flutter/material.dart';
import 'package:frontend_flutter/src/app/service_locator/service_locator.dart';
import 'package:frontend_flutter/src/app/service_locator/supabase_service.dart';
import 'package:frontend_flutter/src/feature/auth/data/repository/auth_repository.dart';
import 'package:go_router/go_router.dart';

import '../../../app/common/styled_form_field.dart';
import '../../../app/theme/theme.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  late TextEditingController _emailController;
  late TextEditingController _passwordController;

  @override
  void initState() {
    _emailController = TextEditingController();
    _passwordController = TextEditingController();
    super.initState();
  }

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  Future<void> _login() async {
    AuthRepository auth = AuthRepository(
      client: sl.get<SupabaseService>().client,
    );

    final res = await auth.signIn(
        email: _emailController.text.trim(),
        password: _passwordController.text.trim());

    res.fold(
      (authRes) {
        context.push('/');
      },
      (failure) {
        print(failure.message);
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          Container(
            decoration: const BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [
                  AppTheme.accentColor,
                  Colors.black,
                ],
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(18.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Login',
                  style: AppTheme.theme.textTheme.displayLarge,
                ),
                SizedBox(height: 24),
                Form(
                  child: Column(
                    children: [
                      StyledFormField(
                        label: 'Email',
                        icon: const Icon(Icons.email),
                        controller: _emailController,
                      ),
                      SizedBox(height: 18),
                      StyledFormField(
                        label: 'Password',
                        icon: const Icon(Icons.lock),
                        controller: _passwordController,
                        obscureText: true,
                      ),
                      ElevatedButton(
                        onPressed: () => _login(),
                        child: Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Text(
                            'Login',
                            style: AppTheme.theme.textTheme.labelMedium,
                          ),
                        ),
                      ),
                      TextButton(
                        onPressed: () => context.push('/signup'),
                        child: Text(
                          'Don\'t have an account? Sign up',
                          style: AppTheme.theme.textTheme.labelSmall,
                        ),
                      )
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
