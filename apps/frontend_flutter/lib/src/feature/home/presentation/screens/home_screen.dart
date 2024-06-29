import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:network_info_plus/network_info_plus.dart';

import '../../../../app/theme/theme.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  Future<void> _getMac() async {
    final info = await NetworkInfo().getWifiName();

    print(info);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Stack(
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
            Column(
              children: [
                Row(
                  children: [
                    IconButton(
                      onPressed: () => context.push('/scan-qr'),
                      icon: const Icon(Icons.qr_code_2_rounded),
                      iconSize: 28,
                      color: Colors.white,
                    ),
                    IconButton(
                      onPressed: () => _getMac(),
                      icon: Icon(Icons.abc),
                    )
                  ],
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
