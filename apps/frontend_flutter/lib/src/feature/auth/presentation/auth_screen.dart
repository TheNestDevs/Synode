import 'package:flutter/material.dart';
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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 24.0),
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
                    onPressed: () {},
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
    );
  }
}
