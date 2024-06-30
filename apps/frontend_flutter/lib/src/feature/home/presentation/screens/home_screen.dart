import 'package:flutter/material.dart';
import 'package:frontend_flutter/src/app/service_locator/supabase_service.dart';
import 'package:go_router/go_router.dart';
import 'package:network_info_plus/network_info_plus.dart';

import '../../../../app/service_locator/service_locator.dart';
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
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Hello,',
                            style: AppTheme.theme.textTheme.displayMedium,
                          ),
                          Text(
                            sl
                                .get<SupabaseService>()
                                .client
                                .auth
                                .currentUser!
                                .email
                                .toString(),
                            style:
                                AppTheme.theme.textTheme.displaySmall!.copyWith(
                              color: Colors.white.withOpacity(0.7),
                            ),
                          ),
                        ],
                      ),
                      const Spacer(),
                      IconButton(
                        onPressed: () => context.push('/scan-qr'),
                        icon: const Icon(
                          Icons.qr_code_2_outlined,
                          color: Colors.white,
                          size: 38,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 36),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: [
                      Text(
                        'Your Balance',
                        style: AppTheme.theme.textTheme.labelMedium!.copyWith(
                          color: Colors.white.withOpacity(0.7),
                        ),
                      ),
                      Row(
                        children: [
                          Image.asset(
                            'assets/logo/coin.png',
                            width: 48,
                          ),
                          const SizedBox(width: 8),
                          Text(
                            '12498.67 SND',
                            style: AppTheme.theme.textTheme.labelMedium,
                          ),
                        ],
                      ),
                    ],
                  ),
                  const Spacer(),
                  SizedBox(
                    height: 232,
                    child: Stack(
                      children: [
                        Align(
                          alignment: Alignment.bottomCenter,
                          child: Container(
                            height: 200,
                            width: double.infinity,
                            decoration: BoxDecoration(
                              color: Colors.white.withOpacity(0.1),
                              borderRadius: BorderRadius.circular(16),
                              border: Border.all(
                                color: Colors.white.withOpacity(0.2),
                                width: 2,
                              ),
                            ),
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Text(
                                  'Request',
                                  style: AppTheme.theme.textTheme.displayMedium,
                                ),
                              ],
                            ),
                          ),
                        ),
                        Positioned(
                          top: 0.0,
                          left: (MediaQuery.sizeOf(context).width ~/ 2) - 48,
                          child: Center(
                            child: Container(
                              width: 82,
                              height: 82,
                              decoration: BoxDecoration(
                                color: AppTheme.accentColor,
                                borderRadius: BorderRadius.circular(41),
                                border: Border.all(
                                  color: Colors.white.withOpacity(0.2),
                                  width: 2,
                                ),
                              ),
                              child: const Icon(
                                Icons.arrow_downward_rounded,
                                color: Colors.white,
                                size: 38,
                              ),
                            ),
                          ),
                        ),
                      ],
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
