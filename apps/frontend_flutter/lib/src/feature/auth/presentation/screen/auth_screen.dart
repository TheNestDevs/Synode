import 'package:flutter/material.dart';

import '../../../../app/theme/theme.dart';

class AuthScreen extends StatelessWidget {
  const AuthScreen({super.key});

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
          Positioned(
            bottom: 160,
            left: 14,
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 18.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Welcome to',
                    style: AppTheme.theme.textTheme.displayLarge,
                  ),
                  Text(
                    'next generation \npayments.',
                    style: AppTheme.theme.textTheme.displayMedium!.copyWith(
                      color: Colors.white.withOpacity(0.7),
                    ),
                  ),
                ],
              ),
            ),
          ),
          Center(
            child: ElevatedButton(
              onPressed: () {},
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Image.asset(
                    'assets/logo/g-logo.png',
                    width: 32,
                  ),
                  Text(
                    'Google Sign In',
                    style: AppTheme.theme.textTheme.labelSmall!
                        .copyWith(color: Colors.black),
                  ),
                ],
              ),
            ),
          )
        ],
      ),
    );
  }
}
